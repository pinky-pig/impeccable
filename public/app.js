import {
	initGlassTerminal,
	renderTerminalLayout,
} from "./js/components/glass-terminal.js";
import { initLensEffect } from "./js/components/lens.js";
import { initFrameworkViz } from "./js/components/framework-viz.js";
import { initScrollReveal } from "./js/utils/reveal.js";
import { initAnchorScroll, initHashTracking } from "./js/utils/scroll.js";

// ============================================
// STATE
// ============================================

let allCommands = [];
const INSTALL_ONBOARDING_DISMISSED_KEY = "impeccable-install-onboarding-dismissed";
const INSTALL_ONBOARDING_SELECTED_KEY = "impeccable-install-onboarding-selection";

const INSTALL_ONBOARDING_COPY = {
	universal: {
		summary: "运行通用安装命令，Impeccable 会自动识别你的工具并写到正确目录。",
		target: "universal",
	},
	claude: {
		summary: "先把插件加入 Claude Code marketplace，再到 Discover 标签页完成安装。",
		target: "claude",
	},
	manual: {
		summary: "下载通用 ZIP，解压到项目根目录，适合受限环境或你想手动检查目录结构时。",
		target: "manual",
	},
};

// ============================================
// CONTENT LOADING
// ============================================

async function loadContent() {
	try {
		const [commandsRes, patternsRes] = await Promise.all([
			fetch("/api/commands"),
			fetch("/api/patterns"),
		]);

		// Check for HTTP errors
		if (!commandsRes.ok) {
			throw new Error(`Commands API failed: ${commandsRes.status}`);
		}
		if (!patternsRes.ok) {
			throw new Error(`Patterns API failed: ${patternsRes.status}`);
		}

		allCommands = await commandsRes.json();
		const patternsData = await patternsRes.json();

		// Render commands (Glass Terminal)
		renderTerminalLayout(allCommands);

		// Render patterns with tabbed navigation
		renderPatternsWithTabs(patternsData.patterns, patternsData.antipatterns);
	} catch (error) {
		console.error("Failed to load content:", error);
		showLoadError(error);
	}
}

function showLoadError(error) {
	// Show error in commands section
	const commandsGallery = document.querySelector('.commands-gallery');
	if (commandsGallery) {
		commandsGallery.innerHTML = `
			<div class="load-error" role="alert">
				<div class="load-error-icon" aria-hidden="true">⚠</div>
				<h3 class="load-error-title">命令加载失败</h3>
				<p class="load-error-text">加载内容时出现问题，请检查网络连接后重试。</p>
				<button class="btn btn-secondary load-error-retry" onclick="location.reload()">
					重试
				</button>
			</div>
		`;
	}

	// Show error in patterns section
	const patternsContainer = document.getElementById("patterns-categories");
	if (patternsContainer) {
		patternsContainer.innerHTML = `
			<div class="load-error" role="alert">
				<div class="load-error-icon" aria-hidden="true">⚠</div>
				<h3 class="load-error-title">模式加载失败</h3>
				<p class="load-error-text">加载内容时出现问题，请检查网络连接后重试。</p>
				<button class="btn btn-secondary load-error-retry" onclick="location.reload()">
					重试
				</button>
			</div>
		`;
	}
}

function initInstallOnboarding() {
	const guide = document.querySelector("[data-onboarding-guide]");
	if (!guide) return;

	try {
		if (localStorage.getItem(INSTALL_ONBOARDING_DISMISSED_KEY) === "true") {
			guide.hidden = true;
			return;
		}
	} catch (_error) {
		// Ignore storage failures and keep the guide visible.
	}

	const cards = Array.from(guide.querySelectorAll("[data-onboarding-provider]"));
	const summary = guide.querySelector("[data-onboarding-summary]");
	const jumpButton = guide.querySelector("[data-onboarding-jump]");
	const dismissButton = guide.querySelector("[data-onboarding-dismiss]");
	let selectedProvider = "universal";

	const flashInstallRow = (targetName) => {
		const row = document.querySelector(`[data-install-option="${targetName}"]`);
		if (!row) return;

		row.scrollIntoView({ behavior: "smooth", block: "center" });
		row.classList.remove("install-terminal-row--focused");
		window.setTimeout(() => {
			row.classList.add("install-terminal-row--focused");
		}, 120);
		window.setTimeout(() => {
			row.classList.remove("install-terminal-row--focused");
		}, 2200);
	};

	const setProvider = (providerName) => {
		const config = INSTALL_ONBOARDING_COPY[providerName] || INSTALL_ONBOARDING_COPY.universal;
		selectedProvider = providerName in INSTALL_ONBOARDING_COPY ? providerName : "universal";

		cards.forEach((card) => {
			const isActive = card.dataset.onboardingProvider === selectedProvider;
			card.classList.toggle("is-active", isActive);
			card.setAttribute("aria-pressed", isActive ? "true" : "false");
		});

		if (summary) {
			summary.textContent = config.summary;
		}

		try {
			localStorage.setItem(INSTALL_ONBOARDING_SELECTED_KEY, selectedProvider);
		} catch (_error) {
			// Ignore storage failures.
		}
	};

	cards.forEach((card) => {
		card.addEventListener("click", () => {
			setProvider(card.dataset.onboardingProvider);
		});
	});

	jumpButton?.addEventListener("click", () => {
		const config = INSTALL_ONBOARDING_COPY[selectedProvider] || INSTALL_ONBOARDING_COPY.universal;
		flashInstallRow(config.target);
	});

	dismissButton?.addEventListener("click", () => {
		guide.hidden = true;
		try {
			localStorage.setItem(INSTALL_ONBOARDING_DISMISSED_KEY, "true");
		} catch (_error) {
			// Ignore storage failures.
		}
	});

	let initialProvider = "universal";
	try {
		initialProvider = localStorage.getItem(INSTALL_ONBOARDING_SELECTED_KEY) || "universal";
	} catch (_error) {
		// Ignore storage failures.
	}
	setProvider(initialProvider);
}

function renderPatternsWithTabs(patterns, antipatterns) {
	const container = document.getElementById("patterns-categories");
	if (!container || !patterns || !antipatterns) return;

	// Create a map of antipatterns by category name
	const antipatternMap = {};
	antipatterns.forEach(cat => {
		antipatternMap[cat.name] = cat.items;
	});

	// Generate unique IDs for tabs
	const tabId = (name) => `pattern-tab-${name.toLowerCase().replace(/\s+/g, '-')}`;
	const panelId = (name) => `pattern-panel-${name.toLowerCase().replace(/\s+/g, '-')}`;

	// Build tabs with WAI-ARIA attributes
	const tabsHTML = patterns
		.map((category, i) => `<button
			class="pattern-tab${i === 0 ? ' active' : ''}"
			data-tab="${category.name}"
			role="tab"
			id="${tabId(category.name)}"
			aria-selected="${i === 0 ? 'true' : 'false'}"
			aria-controls="${panelId(category.name)}"
			tabindex="${i === 0 ? '0' : '-1'}"
		>${category.name}</button>`)
		.join("");

	// Build panels with WAI-ARIA attributes
	const panelsHTML = patterns
		.map((category, i) => {
			const antiItems = antipatternMap[category.name] || [];
			return `
		<div
			class="pattern-panel${i === 0 ? ' active' : ''}"
			data-panel="${category.name}"
			role="tabpanel"
			id="${panelId(category.name)}"
			aria-labelledby="${tabId(category.name)}"
			${i !== 0 ? 'hidden' : ''}
		>
			<div class="pattern-columns">
				<div class="pattern-column pattern-column--anti">
					<span class="pattern-column-label" id="dont-label-${i}">不要这样做</span>
					<ul class="pattern-list" aria-labelledby="dont-label-${i}">
						${antiItems.map((item) => `<li class="pattern-item pattern-item--anti">${item}</li>`).join("")}
					</ul>
				</div>
				<div class="pattern-column pattern-column--do">
					<span class="pattern-column-label" id="do-label-${i}">推荐这样做</span>
					<ul class="pattern-list" aria-labelledby="do-label-${i}">
						${category.items.map((item) => `<li class="pattern-item pattern-item--do">${item}</li>`).join("")}
					</ul>
				</div>
			</div>
		</div>
	`;
		})
		.join("");

	container.innerHTML = `
		<div class="pattern-tabs" role="tablist" aria-label="模式分类">${tabsHTML}</div>
		<div class="pattern-panels">${panelsHTML}</div>
	`;

	const tabs = container.querySelectorAll('.pattern-tab');
	const panels = container.querySelectorAll('.pattern-panel');

	// Function to switch tabs
	const switchTab = (newTab) => {
		const tabName = newTab.dataset.tab;

		// Update ARIA attributes on all tabs
		tabs.forEach(t => {
			t.classList.remove('active');
			t.setAttribute('aria-selected', 'false');
			t.setAttribute('tabindex', '-1');
		});

		// Activate the new tab
		newTab.classList.add('active');
		newTab.setAttribute('aria-selected', 'true');
		newTab.setAttribute('tabindex', '0');
		newTab.focus();

		// Update panels
		panels.forEach(p => {
			p.classList.remove('active');
			p.setAttribute('hidden', '');
		});
		const activePanel = container.querySelector(`[data-panel="${tabName}"]`);
		activePanel.classList.add('active');
		activePanel.removeAttribute('hidden');
	};

	// Tab click handling
	tabs.forEach(tab => {
		tab.addEventListener('click', () => switchTab(tab));
	});

	// Keyboard navigation (Arrow keys, Home, End)
	tabs.forEach((tab, index) => {
		tab.addEventListener('keydown', (e) => {
			let targetIndex = index;

			switch (e.key) {
				case 'ArrowLeft':
				case 'ArrowUp':
					e.preventDefault();
					targetIndex = index === 0 ? tabs.length - 1 : index - 1;
					break;
				case 'ArrowRight':
				case 'ArrowDown':
					e.preventDefault();
					targetIndex = index === tabs.length - 1 ? 0 : index + 1;
					break;
				case 'Home':
					e.preventDefault();
					targetIndex = 0;
					break;
				case 'End':
					e.preventDefault();
					targetIndex = tabs.length - 1;
					break;
				default:
					return;
			}

			switchTab(tabs[targetIndex]);
		});
	});
}

// ============================================
// EVENT HANDLERS
// ============================================

// Handle bundle download clicks via event delegation
document.addEventListener("click", (e) => {
	const bundleBtn = e.target.closest("[data-bundle]");
	if (bundleBtn) {
		const provider = bundleBtn.dataset.bundle;
		const prefixToggle = document.getElementById('prefix-toggle');
		const usePrefixed = prefixToggle && prefixToggle.checked;
		const bundleName = usePrefixed ? `${provider}-prefixed` : provider;
		window.location.href = `/dist/${bundleName}.zip`;
	}

	// Handle copy button clicks
	const copyBtn = e.target.closest("[data-copy]");
	if (copyBtn) {
		const textToCopy = copyBtn.dataset.copy;
		navigator.clipboard.writeText(textToCopy).then(() => {
			copyBtn.classList.add('copied');
			setTimeout(() => copyBtn.classList.remove('copied'), 1500);
		});
	}
});


// ============================================
// STARTUP
// ============================================

function init() {
	initAnchorScroll();
	initHashTracking();
	initLensEffect();
	initScrollReveal();
	initGlassTerminal();
	initFrameworkViz();
	initInstallOnboarding();
	loadContent();

	document.body.classList.add("loaded");
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", init);
} else {
	init();
}

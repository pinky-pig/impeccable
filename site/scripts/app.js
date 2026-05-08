import {
	initGlassTerminal,
	renderTerminalLayout,
} from "./components/glass-terminal.js";
import { initLensEffect } from "./components/lens.js";
import { initFrameworkViz } from "./components/framework-viz.js";
import { initScrollReveal } from "./utils/reveal.js";
import { initAnchorScroll, initHashTracking } from "./utils/scroll.js";
import { initSectionNav } from "./components/section-nav.js";
import { initFoundationGrid } from "./components/foundation-grid.js";
import { initLiveDemo } from "./components/live-demo.js";

// ============================================
// STATE
// ============================================

let allCommands = [];

const commandTranslations = {
	impeccable: {
		tagline: "所有命令背后的设计智能。",
		description: "当用户要设计、重设计、规划、评审、审计、打磨、澄清、精简、加固、优化、适配、动效化、上色、抽取组件，或以其他方式改进前端界面时使用。覆盖网站、落地页、仪表盘、产品 UI、应用壳层、组件、表单、设置页、引导流程和空状态。处理 UX 评审、视觉层级、信息架构、认知负担、可访问性、性能、响应式、主题、反模式、排版、字体、间距、布局、对齐、色彩、动效、微交互、UX 文案、错误态、边界场景、i18n 以及可复用设计系统或 token。也适用于需要更大胆、更有趣的平庸设计，需要降噪的喧闹设计、在浏览器里对 UI 元素做实时迭代，或想实现技术上非常强的视觉效果。后端或纯非 UI 任务不适用。"
	},
	craft: {
		tagline: "先把设计定清楚，再一口气构建出来。",
		description: "完整的“brief 确认后再实现”流程。先进行多轮 shape 发现，必要时补齐视觉探针和北极星 mock，再进入构建与视觉迭代。适合从零把一个新功能做完整。"
	},
	teach: {
		tagline: "每个项目只做一次，把你的产品背景教给 Impeccable。",
		description: "为项目收集设计上下文。在信息不足时进行多轮访谈，并写出 PRODUCT.md（战略：用户、品牌、原则）；如果代码可分析，则同时写出 DESIGN.md（视觉：颜色、排版、组件）。之后所有命令都会先读取这两个文件。每个项目通常只需执行一次。"
	},
	document: {
		tagline: "生成规范兼容的 DESIGN.md，把视觉系统沉淀下来，让所有 AI Agent 都能守住品牌。",
		description: "生成一份记录当前视觉系统的 DESIGN.md。会自动提取颜色、排版、间距、圆角与组件模式，再请用户确认氛围和色彩性格等描述语言。遵循 Google Stitch 的 DESIGN.md 格式，方便被其他工具直接消费。"
	},
	extract: {
		tagline: "把可复用组件、token 和模式抽回设计系统。",
		description: "识别重复的模式、组件和设计 token，并把它们收敛到设计系统里。适合代码库已经出现漂移，希望重新拉回一致性时使用。"
	},
	live: {
		tagline: "在浏览器里迭代 UI。选中元素、留下说明，获得三个变体，接受一个后直接写回源码。",
		description: "交互式实时变体模式。在浏览器中选中元素、指定设计动作，通过 HMR 热替换得到 AI 生成的 HTML+CSS 变体。需要正在运行的开发服务器。适合实时探索设计方案。"
	},
	adapt: {
		tagline: "让设计在不同屏幕、设备和场景下都成立，而不是靠删功能凑合。",
		description: "让设计适配不同屏幕尺寸、设备、上下文或平台。实现断点、流式布局与触控目标。适合响应式、移动端布局、跨设备兼容等需求。"
	},
	animate: {
		tagline: "用有目的的动效表达状态，而不是做装饰。",
		description: "审视一个功能，并加入能提升可用性与愉悦感的动画、微交互和动效。适合需要转场、悬停效果、微交互或整体更“活”的界面。"
	},
	audit: {
		tagline: "五维技术质量检查，按 P0 到 P3 输出严重级别。",
		description: "从可访问性、性能、主题、响应式和反模式五个维度做技术质量检查，给出评分报告、P0-P3 严重级别与可执行计划。"
	},
	bolder: {
		tagline: "把过于安全的设计推向更有冲击力的方向，但不滑进混乱。",
		description: "放大平淡或保守设计的张力，让它更有记忆点，同时保持可用性。适合“太 bland”“太 generic”“不够有个性”的界面。"
	},
	clarify: {
		tagline: "把让人困惑的 UX 文案改写成界面自己会解释自己的样子。",
		description: "改进不清楚的 UX 文案、错误信息、微文案、标签和说明，使界面更容易理解。适合修正文案含糊、标签不清、错误提示差或说明不好跟随的情况。"
	},
	colorize: {
		tagline: "给单调界面加上有策略的色彩，而不是胡乱变花。",
		description: "为过于灰、过于单色的界面增加有策略的色彩，让它更有温度、表达力和参与感。"
	},
	critique: {
		tagline: "带评分、角色测试和自动检测的设计评审。",
		description: "从 UX 角度评估设计，分析视觉层级、信息架构、情绪共鸣、认知负担和整体质量，并结合量化评分、角色化测试、自动反模式检测与改进建议。"
	},
	delight: {
		tagline: "用小而准的个性时刻，把功能性界面变得值得记住。",
		description: "加入令人愉悦的细节、个性和意外之喜，让界面从“能用”提升到“想用”。"
	},
	distill: {
		tagline: "狠一点地删。把设计压回本质。",
		description: "通过移除不必要的复杂度，把设计提炼到真正有力、干净的状态。适合需要简化、去噪、减负的 UI。"
	},
	harden: {
		tagline: "把界面做成可上线状态。边界情况、i18n、错误态、溢出都要能扛。",
		description: "让界面具备生产级韧性：错误处理、国际化、文本溢出、边界场景管理和真实数据下的稳定性。"
	},
	onboard: {
		tagline: "设计首次使用体验、空状态和通往价值的路径。",
		description: "设计 onboarding 流程、首次使用体验和空状态，引导新用户尽快抵达价值点。涵盖欢迎页、账号初始化、渐进披露、上下文提示、功能公告和激活时刻。"
	},
	layout: {
		tagline: "修正布局、间距和视觉节奏。",
		description: "改善布局、间距和视觉节奏，修正单调网格、不一致间距和层级薄弱的问题。"
	},
	optimize: {
		tagline: "从 LCP 到包体积，定位并修好 UI 性能。",
		description: "诊断并修复加载速度、渲染、动画、图片和 bundle size 等前端性能问题。"
	},
	overdrive: {
		tagline: "把界面推过常规上限。着色器、物理感、60fps、电影级过渡。",
		description: "用技术上更激进的实现把界面推向非常规效果，比如着色器、弹簧物理、滚动驱动 reveal 和高帧率动画。"
	},
	polish: {
		tagline: "从不错到很强，中间差的就是这一轮细致打磨。",
		description: "在发布前做最后一轮质量打磨，修正对齐、间距、一致性和微观细节问题。"
	},
	quieter: {
		tagline: "让过度喧闹的设计降下来，但不丢掉原本意图。",
		description: "降低视觉攻击性和过度刺激感，让界面更克制、更成熟，同时保住核心表达。"
	},
	shape: {
		tagline: "先想清楚再开工。通过发现过程产出设计 brief，而不是靠猜。",
		description: "在写代码前先规划 UX 和 UI。通过多轮发现式访谈与可选视觉探针，产出一个由用户确认过的设计 brief。"
	},
	typeset: {
		tagline: "修正那些显得普通、失衡或像误打误撞出来的排版。",
		description: "通过调整字体选择、层级、尺寸、字重和可读性，让文字表达看起来是有意为之，而不是默认状态。"
	}
};

const patternCategoryTranslations = {
	Typography: "排版",
	"Color & Contrast": "色彩与对比",
	"Layout & Space": "布局与留白",
	"Visual Details": "视觉细节",
	Motion: "动效",
	Interaction: "交互"
};

const patternItemTranslations = {
	"Pair a distinctive display face with a restrained body face; vary across projects.": "标题字体要有个性，正文字体要克制；不同项目之间也要主动拉开差异。",
	"Use a ≥1.25 scale ratio between hierarchy steps. Flat scales read as bland.": "层级字号至少保持 1.25 倍比例；太平的 scale 会让界面显得没判断力。",
	"Cap body line length at 65–75ch. Wider is fatiguing.": "正文单行长度控制在 65–75ch；太宽会显著增加阅读疲劳。",
	"Use OKLCH. Reduce chroma near lightness extremes.": "优先使用 OKLCH；在极亮或极暗区域要主动收低色度。",
	"Tint neutrals toward the brand hue. Chroma 0.005–0.01 is enough.": "中性色也要轻微偏向品牌色相，0.005–0.01 的色度通常就够了。",
	"Pick a color strategy before picking colors (Restrained, Committed, Full, Drenched).": "先确定用色策略，再挑具体颜色，例如克制、明确、饱满或浸透。",
	"Vary spacing for rhythm. Tight groupings, generous separations.": "间距要有节奏，相关内容靠近，不相关内容拉开。",
	"Use the simplest tool: Flexbox for 1D, Grid for 2D, plain flow often enough.": "优先选择最简单的布局工具：一维用 Flexbox，二维用 Grid，很多时候普通文档流就足够。",
	"Let whitespace carry hierarchy before reaching for color or scale.": "先让留白承担层级，再考虑加颜色或放大字号。",
	"Commit to an aesthetic direction and execute it with precision.": "先明确审美方向，再高精度地把它执行到底。",
	"Use ornament only where it earns its place.": "装饰只能出现在它有明确价值的位置。",
	"Use transform and opacity. Animate the composited properties only.": "优先动画化 transform 和 opacity，只动合成层友好的属性。",
	"Ease out with exponential curves (quart / quint / expo).": "退出型缓动优先用 quart、quint、expo 这类指数曲线。",
	"Respect prefers-reduced-motion on every transition.": "所有动效都要尊重 `prefers-reduced-motion`。",
	"Use optimistic UI: update immediately, sync later.": "优先乐观更新：先让界面响应，再异步同步状态。",
	"Design empty states that teach the interface, not just say \"nothing here.\"": "空状态要顺手教会用户怎么开始，而不是只说“这里什么都没有”。",
	"Progressive disclosure: start simple, reveal sophistication on demand.": "采用渐进披露：先简单，再按需展开复杂度。",
	"Inter, Roboto, Plex, Fraunces, or any other reflex default. Look further.": "别条件反射地用 Inter、Roboto、Plex、Fraunces 这类默认解法，继续往外找。",
	"Monospace as lazy shorthand for \"technical.\"": "不要把等宽字体当成“技术感”的偷懒捷径。",
	"Long passages in uppercase. Reserve all-caps for short labels.": "大段全大写会很难读，全大写只留给短标签。",
	"Pure #000 or #fff. Always tint.": "避免纯黑纯白，永远给它一点色相。",
	"Dark mode + purple-to-cyan gradients. The AI tell.": "深色模式再配紫到青渐变，是最容易暴露 AI 味道的组合之一。",
	"Gradient text via background-clip. Use weight or size for emphasis.": "少用 background-clip 渐变文字；强调优先靠字重、字号或层级完成。",
	"Wrap everything in cards. Nested cards are always wrong.": "不要把所有东西都塞进卡片里，卡片套卡片基本永远是错的。",
	"Identical card grids of icon + heading + text, repeated endlessly.": "警惕无限重复的“图标 + 标题 + 文本”同构卡片网格。",
	"The hero-metric template: big number, small label, supporting stats, gradient accent.": "警惕那种“巨大数字 + 小标签 + 辅助统计 + 渐变点缀”的 hero 模板。",
	"Side-stripe borders (border-left/-right > 1px). The dashboard tell.": "左右粗边框侧条是典型 dashboard 套路，能不用就别用。",
	"Glassmorphism everywhere. Rare and purposeful or nothing.": "玻璃拟态只能偶尔且有目的地出现，否则宁可不用。",
	"Rounded rectangles with generic drop shadows. \"Could be any AI output.\"": "千篇一律的圆角矩形配通用投影，会立刻变成“这像任意一个 AI 输出”。",
	"Animate layout (width, height, padding, margin).": "尽量不要直接动画布局属性，比如 width、height、padding、margin。",
	"Bounce or elastic easing. Feels dated and tacky.": "弹跳和橡皮筋式缓动很容易显得过时、廉价。",
	"Decorative motion for its own sake. Motion should signal state.": "别为了动而动，动效应该在传达状态。",
	"Make every button primary. Hierarchy matters.": "不要把每个按钮都做成主按钮，层级比热闹更重要。",
	"Default to a modal. Exhaust inline alternatives first.": "不要默认上弹窗，先把行内替代方案想完。",
	"Repeat information the user can already see.": "用户已经看得到的信息，不要重复再说一遍。"
};

function localizeCommands(commands) {
	return commands.map((command) => ({
		...command,
		...(commandTranslations[command.id] || {}),
	}));
}

function localizePatternGroups(groups) {
	return groups.map((group) => ({
		...group,
		name: patternCategoryTranslations[group.name] || group.name,
		items: group.items.map((item) => patternItemTranslations[item] || item),
	}));
}

// ============================================
// CONTENT LOADING
// ============================================

function escapeHtml(value) {
	if (typeof value !== "string") return "";
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&#39;");
}

async function loadContent() {
	try {
		const [commandsRes, patternsRes] = await Promise.all([
			fetch("/_data/api/commands.json"),
			fetch("/_data/api/patterns.json"),
		]);

		// Check for HTTP errors
		if (!commandsRes.ok) {
			throw new Error(`Commands API failed: ${commandsRes.status}`);
		}
		if (!patternsRes.ok) {
			throw new Error(`Patterns API failed: ${patternsRes.status}`);
		}

		allCommands = localizeCommands(await commandsRes.json());
		const patternsData = await patternsRes.json();
		const localizedPatterns = localizePatternGroups(patternsData.patterns);
		const localizedAntipatterns = localizePatternGroups(patternsData.antipatterns);

		// Render commands (Glass Terminal)
		renderTerminalLayout(allCommands);

		// Initialize gallery card stack
		initGalleryStack();

		// Render patterns with tabbed navigation
		renderPatternsWithTabs(localizedPatterns, localizedAntipatterns);
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
				<p class="load-error-text">内容加载时出现问题，请检查网络后重试。</p>
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
				<p class="load-error-text">内容加载时出现问题，请检查网络后重试。</p>
				<button class="btn btn-secondary load-error-retry" onclick="location.reload()">
					重试
				</button>
			</div>
		`;
	}
}

function initGalleryStack() {
	const container = document.querySelector('.gallery-stack-container');
	const stack = document.getElementById('gallery-stack');
	if (!stack || !container) return;

	const cards = stack.querySelectorAll('.gallery-stack-card');
	const counter = container.querySelector('.gallery-stack-counter');
	const total = cards.length;
	let current = 0;
	let lastScroll = 0;

	function update() {
		cards.forEach((card, i) => {
			const offset = (i - current + total) % total;
			card.dataset.offset = offset;
		});
	}

	function next() { current = (current + 1) % total; update(); }
	function prev() { current = (current - 1 + total) % total; update(); }

	container.querySelector('.gallery-stack-prev').addEventListener('click', prev);
	container.querySelector('.gallery-stack-next').addEventListener('click', next);

	stack.addEventListener('wheel', (e) => {
		e.preventDefault();
		const now = Date.now();
		if (now - lastScroll < 350) return;
		lastScroll = now;
		if (e.deltaY > 0) next(); else prev();
	}, { passive: false });

	update();
}

function renderPatternsWithTabs(patterns, antipatterns) {
	const container = document.getElementById("patterns-categories");
	if (!container || !patterns || !antipatterns) return;

	const antipatternMap = {};
	antipatterns.forEach(cat => { antipatternMap[cat.name] = cat.items; });

	const tabsHTML = patterns.map((cat, i) =>
		`<button class="patterns-tab${i === 0 ? ' is-active' : ''}" data-index="${i}">${escapeHtml(cat.name)}</button>`
	).join('');

	const panelsHTML = patterns.map((cat, i) => {
		const antiItems = antipatternMap[cat.name] || [];
		return `
		<div class="patterns-content${i === 0 ? ' is-active' : ''}" data-index="${i}">
			<div class="patterns-col patterns-col--dont">
				<ul>${antiItems.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
			</div>
			<div class="patterns-col patterns-col--do">
				<ul>${cat.items.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
			</div>
		</div>`;
	}).join('');

	container.innerHTML = `<div class="patterns-tabs-wrap"><div class="patterns-tabs" data-scroll="start">${tabsHTML}</div></div>${panelsHTML}`;

	const tabsEl = container.querySelector('.patterns-tabs');
	const tabsWrap = container.querySelector('.patterns-tabs-wrap');

	container.addEventListener('click', (e) => {
		const tab = e.target.closest('.patterns-tab');
		if (!tab) return;
		const index = tab.dataset.index;
		container.querySelectorAll('.patterns-tab').forEach(t => t.classList.remove('is-active'));
		container.querySelectorAll('.patterns-content').forEach(p => p.classList.remove('is-active'));
		tab.classList.add('is-active');
		container.querySelector(`.patterns-content[data-index="${index}"]`).classList.add('is-active');
		// Center the clicked tab inside the tabs strip (not the page). Using
		// scrollBy on the container keeps the page scroll untouched.
		if (tabsEl) {
			const tabRect = tab.getBoundingClientRect();
			const stripRect = tabsEl.getBoundingClientRect();
			const offset = (tabRect.left + tabRect.width / 2) - (stripRect.left + stripRect.width / 2);
			tabsEl.scrollBy({ left: offset, behavior: 'smooth' });
		}
	});

	// Track scroll position so the edge-fade mask only appears on sides where
	// there's actually more content. At the start, no left fade; at the end,
	// no right fade; if no overflow, no fade at all.
	const updateScrollState = () => {
		if (!tabsEl) return;
		const { scrollLeft, scrollWidth, clientWidth } = tabsEl;
		const max = scrollWidth - clientWidth;
		let state;
		if (max <= 1) state = 'none';
		else if (scrollLeft <= 1) state = 'start';
		else if (scrollLeft >= max - 1) state = 'end';
		else state = 'middle';
		tabsEl.dataset.scroll = state;
		if (tabsWrap) tabsWrap.dataset.scroll = state;
	};
	tabsEl?.addEventListener('scroll', updateScrollState, { passive: true });
	window.addEventListener('resize', updateScrollState);
	updateScrollState();
}

// ============================================
// EVENT HANDLERS
// ============================================

// Handle bundle download clicks via event delegation.
// Each download button carries the full bundle name in data-bundle
// (currently just "universal") so the handler is just a redirect.
document.addEventListener("click", (e) => {
	const bundleBtn = e.target.closest("[data-bundle]");
	if (bundleBtn) {
		const bundleName = bundleBtn.dataset.bundle;
		window.location.href = `/api/download/bundle/${bundleName}`;
	}

	// Handle copy button clicks
	const copyBtn = e.target.closest("[data-copy]");
	if (copyBtn) {
		const textToCopy = copyBtn.dataset.copy;
		const onCopied = () => {
			copyBtn.classList.add('copied');
			setTimeout(() => copyBtn.classList.remove('copied'), 1500);
		};
		if (navigator.clipboard?.writeText) {
			navigator.clipboard.writeText(textToCopy).then(onCopied).catch(() => {});
		} else {
			// Fallback for non-HTTPS or older browsers
			const ta = Object.assign(document.createElement('textarea'), { value: textToCopy, style: 'position:fixed;left:-9999px' });
			document.body.appendChild(ta);
			ta.select();
			try { document.execCommand('copy'); onCopied(); } catch {}
			ta.remove();
		}
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
	initFoundationGrid();
	initSectionNav();
	initWhyTabs();
	initLanguageTabs();
	initLiveDemo();
	loadContent();

	document.body.classList.add("loaded");
}

function initLanguageTabs() {
	const toggle = document.querySelector('.language-view-toggle');
	if (!toggle) return;
	const tabs = Array.from(toggle.querySelectorAll('.language-view-tab'));
	const panels = Array.from(document.querySelectorAll('.language-view[data-view-panel]'));
	if (!tabs.length || !panels.length) return;

	tabs.forEach((tab) => {
		tab.addEventListener('click', () => {
			const view = tab.dataset.view;
			tabs.forEach((t) => {
				const on = t === tab;
				t.classList.toggle('is-active', on);
				t.setAttribute('aria-selected', on ? 'true' : 'false');
			});
			panels.forEach((p) => {
				const on = p.dataset.viewPanel === view;
				p.classList.toggle('is-active', on);
				if (on) p.removeAttribute('hidden');
				else p.setAttribute('hidden', '');
			});
		});
	});
}

function initWhyTabs() {
	const container = document.querySelector('.why-layout');
	if (!container) return;
	const tabs = Array.from(container.querySelectorAll('.why-tab'));
	const panels = Array.from(container.querySelectorAll('.why-panel'));
	if (!tabs.length || !panels.length) return;

	const CYCLE_MS = 7000;
	const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	let current = Math.max(tabs.findIndex((tab) => tab.classList.contains('is-active')), 0);
	let timer = null;
	let autoRotate = !reducedMotion;
	let visible = false;

	const tabStrip = container.querySelector('.why-tabs');
	const getPanelForTab = (tab) => {
		const panelId = tab?.getAttribute('aria-controls');
		return panelId ? container.querySelector(`#${CSS.escape(panelId)}`) : null;
	};

	const centerActiveInStrip = (active) => {
		// On mobile the tab list is a horizontal scroll strip. Keep the
		// active pill visible without touching the page scroll. Using
		// scrollTo with behavior:auto + direct scrollLeft assignment,
		// because smooth-scroll on this container is disabled by the
		// parent's mask-image compositing and silently no-ops.
		if (!tabStrip || tabStrip.scrollWidth <= tabStrip.clientWidth + 1) return;
		const tabRect = active.getBoundingClientRect();
		const stripRect = tabStrip.getBoundingClientRect();
		const offset = (tabRect.left + tabRect.width / 2) - (stripRect.left + stripRect.width / 2);
		if (Math.abs(offset) < 2) return;
		tabStrip.scrollLeft += offset;
	};

	const activate = (index, fromAuto = false) => {
		const targetTab = tabs[index];
		const targetPanel = getPanelForTab(targetTab);
		if (!targetTab || !targetPanel) return;
		current = index;
		tabs.forEach((tab, i) => {
			const on = i === index;
			tab.classList.toggle('is-active', on);
			tab.setAttribute('aria-selected', on ? 'true' : 'false');
			// Reset cycling class, re-add on the new active tab so the
			// progress indicator restarts cleanly.
			tab.classList.remove('is-cycling');
		});
		panels.forEach((panel) => {
			const on = panel === targetPanel;
			panel.classList.toggle('is-active', on);
			if (on) panel.removeAttribute('hidden');
			else panel.setAttribute('hidden', '');
		});
		if (autoRotate && visible) {
			// Force reflow so the animation restart is picked up.
			void targetTab.offsetWidth;
			targetTab.classList.add('is-cycling');
		}
		centerActiveInStrip(targetTab);
	};

	const scheduleNext = () => {
		clearTimeout(timer);
		if (!autoRotate || !visible) return;
		timer = setTimeout(() => {
			const next = (current + 1) % tabs.length;
			activate(next, true);
			scheduleNext();
		}, CYCLE_MS);
	};

	const stopAuto = () => {
		autoRotate = false;
		clearTimeout(timer);
		tabs.forEach((t) => t.classList.remove('is-cycling'));
	};

	tabs.forEach((tab, index) => {
		tab.addEventListener('click', () => {
			stopAuto();
			activate(index);
		});
		tab.addEventListener('keydown', (e) => {
			if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
			e.preventDefault();
			stopAuto();
			const dir = e.key === 'ArrowDown' ? 1 : -1;
			const next = (index + dir + tabs.length) % tabs.length;
			tabs[next].focus();
			activate(next);
		});
	});

	container.addEventListener('mouseenter', () => {
		// Pause auto-rotation on hover. Resume only if still allowed and
		// user hasn't interacted (stopAuto flips autoRotate off).
		clearTimeout(timer);
		tabs.forEach((t) => t.classList.remove('is-cycling'));
	});
	container.addEventListener('mouseleave', () => {
		if (autoRotate && visible) {
			// Re-apply cycling class to current tab and resume the timer.
			const active = tabs[current];
			void active.offsetWidth;
			active.classList.add('is-cycling');
			scheduleNext();
		}
	});

	// Observe visibility so we only rotate while the user can see it.
	const io = new IntersectionObserver((entries) => {
		entries.forEach((e) => {
			visible = e.isIntersecting;
			if (visible) {
				if (autoRotate) {
					const active = tabs[current];
					void active.offsetWidth;
					active.classList.add('is-cycling');
					scheduleNext();
				}
			} else {
				clearTimeout(timer);
				tabs.forEach((t) => t.classList.remove('is-cycling'));
			}
		});
	}, { threshold: 0.35 });
	io.observe(container);
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", init);
} else {
	init();
}

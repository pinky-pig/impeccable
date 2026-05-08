// ============================================
// DATA: Skill focus areas, command processes, relationships
// ============================================

// Items that are fully complete and ready for public use
// All others will show "Coming Soon"
export const readySkills = [
  'impeccable'  // Consolidated skill with all design domains
];

export const readyCommands = [
  'layout'  // First command to be fully completed
];

// Commands marked as alpha — shown with a badge in the UI
export const alphaCommands = [
  'live'
];

// Consolidated impeccable skill with reference domains
export const skillFocusAreas = {
  'impeccable': [
    { area: 'Typography', detail: '字号比例、节奏、层级与表达' },
    { area: 'Color & Contrast', detail: '可访问性、系统化与主题策略' },
    { area: 'Spatial Design', detail: '布局、间距与构图' },
    { area: 'Responsive', detail: '流式布局与触控目标' },
    { area: 'Interaction', detail: '状态、反馈与可感知性' },
    { area: 'Motion', detail: '微交互与转场节奏' },
    { area: 'UX Writing', detail: '清晰度、语气与错误提示' }
  ]
};

// Guideline counts per dimension (verified from reference files)
export const dimensionGuidelineCounts = {
  'Typography': 33,
  'Color & Contrast': 29,
  'Spatial Design': 27,
  'Motion': 32,
  'Interaction': 36,
  'Responsive': 23,
  'UX Writing': 32
};

// Reference domains within the impeccable skill
export const skillReferenceDomains = [
  'typography',
  'color-and-contrast',
  'spatial-design',
  'responsive-design',
  'interaction-design',
  'motion-design',
  'ux-writing'
];

export const commandProcessSteps = {
  'impeccable': ['直达', '设计', '构建', '打磨'],
  'craft': ['规划', '参考', '构建', '迭代'],
  'shape': ['访谈', '归纳', '简报', '确认'],
  'overdrive': ['评估', '定向', '构建', '抛光'],
  'critique': ['评估', '批评', '排序', '建议'],
  'audit': ['扫描', '记录', '排序', '建议'],
  'typeset': ['评估', '选型', '尺度', '细化'],
  'layout': ['评估', '网格', '节奏', '平衡'],
  'colorize': ['分析', '策略', '应用', '平衡'],
  'animate': ['识别', '设计', '实现', '打磨'],
  'delight': ['识别', '设计', '实现'],
  'bolder': ['分析', '放大', '增强'],
  'quieter': ['分析', '降噪', '细化'],
  'distill': ['审视', '删减', '提炼'],
  'clarify': ['阅读', '简化', '改进', '验证'],
  'adapt': ['分析', '调整', '优化'],
  'polish': ['发现', '复查', '打磨', '校验'],
  'optimize': ['剖析', '定位', '改进', '测量'],
  'harden': ['评估', '实现', '测试', '校验'],
  'onboard': ['识别', '设计', '引导', '衡量'],
  'teach': ['探索', '访谈', '归纳', '保存'],
  'document': ['扫描', '提取', '描述', '写入'],
  'extract': ['识别', '抽象', '迁移', '记录'],
  'live': ['启动', '选择', '生成', '接受']
};

export const commandCategories = {
  // CREATE - build something new
  'impeccable': 'create',
  'craft': 'create',
  'shape': 'create',
  // EVALUATE - review and assess
  'critique': 'evaluate',
  'audit': 'evaluate',
  // REFINE - improve existing design
  'typeset': 'refine',
  'layout': 'refine',
  'colorize': 'refine',
  'animate': 'refine',
  'delight': 'refine',
  'bolder': 'refine',
  'quieter': 'refine',
  'overdrive': 'refine',
  // SIMPLIFY - reduce and clarify
  'distill': 'simplify',
  'clarify': 'simplify',
  'adapt': 'simplify',
  // HARDEN - production-ready
  'polish': 'harden',
  'optimize': 'harden',
  'harden': 'harden',
  'onboard': 'harden',
  // SYSTEM - setup and tooling
  'teach': 'system',
  'document': 'system',
  'extract': 'system',
  'live': 'system'
};

// Skill relationships - now consolidated into impeccable skill
// The impeccable skill contains all domains as reference files
export const skillRelationships = {
  'impeccable': {
    description: '通过渐进式参考加载提供完整的设计智能',
    referenceDomains: ['typography', 'color-and-contrast', 'spatial-design', 'responsive-design', 'interaction-design', 'motion-design', 'ux-writing']
  }
};

export const commandRelationships = {
  'impeccable': { flow: '创造：以完整设计智能直接进入任务' },
  'craft': { flow: '创造：从 shape 到 build 的完整实现流' },
  'shape': { flow: '创造：通过结构化发现来规划 UX 与 UI' },
  'critique': { leadsTo: ['polish', 'distill', 'bolder', 'quieter', 'typeset', 'layout'], flow: '评估：带评分的 UX 与设计评审' },
  'audit': { leadsTo: ['harden', 'optimize', 'adapt', 'clarify'], flow: '评估：技术质量审计' },
  'typeset': { combinesWith: ['bolder', 'polish'], flow: '打磨：修正排版与文字层级' },
  'layout': { combinesWith: ['distill', 'adapt'], flow: '打磨：修正布局与间距' },
  'colorize': { combinesWith: ['bolder', 'delight'], flow: '打磨：增加有策略的色彩' },
  'animate': { combinesWith: ['delight'], flow: '打磨：加入有目的的动效' },
  'delight': { combinesWith: ['bolder', 'animate'], flow: '打磨：增加个性与愉悦感' },
  'bolder': { pairs: 'quieter', flow: '打磨：放大胆怯的设计' },
  'quieter': { pairs: 'bolder', flow: '打磨：压低过激的设计' },
  'overdrive': { combinesWith: ['animate', 'delight'], flow: '打磨：实现技术上非常规的视觉效果' },
  'distill': { combinesWith: ['quieter', 'polish'], flow: '简化：提炼到本质' },
  'clarify': { combinesWith: ['polish', 'adapt'], flow: '简化：改善 UX 文案' },
  'adapt': { combinesWith: ['polish', 'clarify'], flow: '简化：适配不同场景与设备' },
  'polish': { flow: '加固：最终打磨并对齐设计系统' },
  'optimize': { flow: '加固：提升性能表现' },
  'harden': { combinesWith: ['optimize'], flow: '加固：处理边界场景、错误与 i18n' },
  'onboard': { combinesWith: ['clarify', 'delight'], flow: '加固：完善首次使用体验与空状态' },
  'teach': { flow: '系统：一次性的项目设计上下文建立' },
  'extract': { flow: '系统：抽取设计系统组件与 token' },
  'live': { flow: '系统：浏览器中的可视变体模式' }
};

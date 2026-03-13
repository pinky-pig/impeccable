// ============================================
// DATA: Skill focus areas, command processes, relationships
// ============================================

// 已完成并可公开使用的项目
// 其他项目将显示“即将推出”
export const readySkills = [
  'frontend-design'  // Consolidated skill with all design domains
];

export const readyCommands = [
  'normalize'  // First command to be fully completed
];

// Consolidated frontend-design skill with reference domains
export const skillFocusAreas = {
  'frontend-design': [
    { area: '排版', detail: '比例、节奏、层级、表达力' },
    { area: '色彩与对比', detail: '可访问性、系统化、主题化' },
    { area: '空间设计', detail: '布局、间距、构图' },
    { area: '响应式', detail: '流式布局、触控目标' },
    { area: '交互', detail: '状态、反馈、可感知性' },
    { area: '动效', detail: '微交互、转场' },
    { area: 'UX 文案', detail: '清晰度、语气、错误信息' }
  ]
};

// Reference domains within the frontend-design skill
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
  'teach-impeccable': ['收集', '澄清', '整理', '保存'],
  'audit': ['扫描', '记录', '排序', '建议'],
  'critique': ['评估', '批注', '排序', '建议'],
  'normalize': ['分析', '识别', '对齐', '验证'],
  'polish': ['检查', '打磨', '验证'],
  'optimize': ['分析', '定位', '优化', '测量'],
  'harden': ['测试', '处理', '覆盖', '校验'],
  'clarify': ['阅读', '简化', '改写', '测试'],
  'quieter': ['分析', '收敛', '精修'],
  'bolder': ['分析', '增强', '放大'],
  'distill': ['审视', '删减', '提炼'],
  'animate': ['识别', '设计', '实现', '润色'],
  'colorize': ['分析', '制定策略', '应用', '平衡'],
  'delight': ['识别', '设计', '实现'],
  'extract': ['识别', '抽象', '整理'],
  'adapt': ['分析', '调整', '优化'],
  'onboard': ['梳理', '设计', '引导']
};

export const commandCategories = {
  'teach-impeccable': 'system',
  'audit': 'diagnostic',
  'critique': 'diagnostic',
  'normalize': 'quality',
  'polish': 'quality',
  'optimize': 'quality',
  'harden': 'quality',
  'clarify': 'adaptation',
  'quieter': 'intensity',
  'bolder': 'intensity',
  'distill': 'adaptation',
  'animate': 'enhancement',
  'colorize': 'enhancement',
  'delight': 'enhancement',
  'extract': 'system',
  'adapt': 'adaptation',
  'onboard': 'enhancement'
};

// Skill relationships - now consolidated into frontend-design skill
// The frontend-design skill contains all domains as reference files
export const skillRelationships = {
  'frontend-design': {
    description: '具备渐进式参考加载机制的综合设计智能',
    referenceDomains: ['typography', 'color-and-contrast', 'spatial-design', 'responsive-design', 'interaction-design', 'motion-design', 'ux-writing']
  }
};

export const commandRelationships = {
  'teach-impeccable': { flow: '初始化：一次性收集项目设计上下文' },
  'audit': { leadsTo: ['normalize', 'harden', 'optimize', 'adapt', 'clarify'], flow: '诊断：技术质量审计' },
  'critique': { leadsTo: ['polish', 'distill', 'bolder', 'quieter'], flow: '诊断：UX 与设计评审' },
  'normalize': { combinesWith: ['clarify', 'adapt'], flow: '质量：对齐设计系统' },
  'polish': { flow: '质量：上线前最终润色' },
  'optimize': { flow: '质量：性能优化' },
  'harden': { combinesWith: ['optimize'], flow: '质量：错误处理与边界场景加固' },
  'clarify': { combinesWith: ['normalize', 'adapt'], flow: '适配：改善 UX 文案' },
  'quieter': { pairs: 'bolder', flow: '强度：降低视觉攻击性' },
  'bolder': { pairs: 'quieter', flow: '强度：增强平淡设计的冲击力' },
  'distill': { combinesWith: ['quieter', 'normalize'], flow: '适配：提炼到本质' },
  'animate': { combinesWith: ['delight'], flow: '增强：加入动效' },
  'colorize': { combinesWith: ['bolder', 'delight'], flow: '增强：加入策略性色彩' },
  'delight': { combinesWith: ['bolder', 'animate'], flow: '增强：加入个性与趣味' },
  'extract': { flow: '系统：提取设计系统元素' },
  'adapt': { combinesWith: ['normalize', 'clarify'], flow: '适配：面向不同设备与场景调整' },
  'onboard': { combinesWith: ['clarify', 'delight'], flow: '增强：优化引导与空状态' }
};

// ============================================
// 数据：技能关注点、命令流程与关系
// ============================================

// 已完成并可公开使用的项目
// 其他项目将显示“即将推出”
export const readySkills = [
  'impeccable'  // 整合后的核心技能，覆盖全部设计维度
];

export const readyCommands = [
  'layout'  // 首个完整收敛的新命令
];

// 标记为 beta 的命令会在界面里显示徽标
export const betaCommands = [
  'overdrive'
];

// 整合后的 impeccable 技能及其参考维度
export const skillFocusAreas = {
  'impeccable': [
    { area: 'Typography', detail: '比例、节奏、层级与表达' },
    { area: 'Color & Contrast', detail: '可访问性、系统化与主题设计' },
    { area: 'Spatial Design', detail: '布局、间距与构图' },
    { area: 'Responsive', detail: '流式布局与触控目标' },
    { area: 'Interaction', detail: '状态、反馈与可感知性' },
    { area: 'Motion', detail: '微交互与过渡动效' },
    { area: 'UX Writing', detail: '清晰度、语气与错误提示' }
  ]
};

// 各维度准则数量（根据参考文件校验）
export const dimensionGuidelineCounts = {
  'Typography': 33,
  'Color & Contrast': 29,
  'Spatial Design': 27,
  'Motion': 32,
  'Interaction': 36,
  'Responsive': 23,
  'UX Writing': 32
};

// impeccable 技能内部引用的设计维度
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
  'shape': ['Interview', 'Synthesize', 'Brief', 'Confirm'],
  'impeccable craft': ['Shape', 'Reference', 'Build', 'Iterate'],
  'impeccable': ['Direct', 'Design', 'Build', 'Refine'],
  'overdrive': ['Assess', 'Choose', 'Build', 'Polish'],
  'critique': ['Evaluate', 'Critique', 'Prioritize', 'Suggest'],
  'audit': ['Scan', 'Document', 'Prioritize', 'Recommend'],
  'typeset': ['Assess', 'Select', 'Scale', 'Refine'],
  'layout': ['Assess', 'Grid', 'Rhythm', 'Balance'],
  'colorize': ['Analyze', 'Strategy', 'Apply', 'Balance'],
  'animate': ['Identify', 'Design', 'Implement', 'Polish'],
  'delight': ['Identify', 'Design', 'Implement'],
  'bolder': ['Analyze', 'Amplify', 'Impact'],
  'quieter': ['Analyze', 'Reduce', 'Refine'],
  'distill': ['Audit', 'Remove', 'Clarify'],
  'clarify': ['Read', 'Simplify', 'Improve', 'Test'],
  'adapt': ['Analyze', 'Adjust', 'Optimize'],
  'polish': ['Discover', 'Review', 'Refine', 'Verify'],
  'optimize': ['Profile', 'Identify', 'Improve', 'Measure'],
  'harden': ['Test', 'Handle', 'Onboard', 'Validate'],
  'impeccable teach': ['Explore', 'Interview', 'Synthesize', 'Save'],
  'impeccable extract': ['Identify', 'Abstract', 'Migrate', 'Document']
};

export const commandCategories = {
  // CREATE - build something new
  'shape': 'create',
  'impeccable craft': 'create',
  'impeccable': 'create',
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
  // SYSTEM - setup and tooling
  'impeccable teach': 'system',
  'impeccable extract': 'system'
};

// 技能关系：现在整合进 impeccable
// impeccable 技能以内嵌参考文件的方式承载所有设计维度
export const skillRelationships = {
  'impeccable': {
    description: '带渐进式参考加载机制的完整设计智能',
    referenceDomains: ['typography', 'color-and-contrast', 'spatial-design', 'responsive-design', 'interaction-design', 'motion-design', 'ux-writing']
  }
};

export const commandRelationships = {
  'shape': { flow: 'Create：通过结构化发现来规划 UX 与 UI' },
  'impeccable craft': { flow: 'Create：完整的 shape 到 build 流程，并带可视化迭代' },
  'impeccable': { flow: 'Create：加载完整设计智能后的自由设计' },
  'overdrive': { combinesWith: ['animate', 'delight'], flow: 'Refine：实现更有技术野心的效果' },
  'critique': { leadsTo: ['polish', 'distill', 'bolder', 'quieter', 'typeset', 'layout'], flow: 'Evaluate：带评分的 UX 与设计评审' },
  'audit': { leadsTo: ['harden', 'optimize', 'adapt', 'clarify'], flow: 'Evaluate：技术质量审计' },
  'typeset': { combinesWith: ['bolder', 'polish'], flow: 'Refine：修正排版与字体层级' },
  'layout': { combinesWith: ['distill', 'adapt'], flow: 'Refine：优化布局与间距' },
  'colorize': { combinesWith: ['bolder', 'delight'], flow: 'Refine：加入策略性色彩' },
  'animate': { combinesWith: ['delight'], flow: 'Refine：加入有目的的动效' },
  'delight': { combinesWith: ['bolder', 'animate'], flow: 'Refine：增加个性与愉悦感' },
  'bolder': { pairs: 'quieter', flow: 'Refine：强化偏保守的设计' },
  'quieter': { pairs: 'bolder', flow: 'Refine：收敛过于激进的设计' },
  'distill': { combinesWith: ['quieter', 'polish'], flow: 'Simplify：提炼到本质' },
  'clarify': { combinesWith: ['polish', 'adapt'], flow: 'Simplify：优化 UX 文案' },
  'adapt': { combinesWith: ['polish', 'clarify'], flow: 'Simplify：适配不同使用场景' },
  'polish': { flow: 'Harden：最终打磨并对齐设计系统' },
  'optimize': { flow: 'Harden：性能优化' },
  'harden': { combinesWith: ['optimize'], flow: 'Harden：处理边界情况、引导与错误状态' },
  'impeccable teach': { flow: 'System：一次性建立项目设计上下文' },
  'impeccable extract': { flow: 'System：抽取设计系统组件与 tokens' }
};

/**
 * 文档页面使用的命令分类与关联关系数据。
 * 从 scripts/lib/sub-pages-data.js 提取，供 Astro 模板复用。
 */

export const SKILL_CATEGORIES: Record<string, string> = {
  impeccable: 'create',
  craft: 'create',
  shape: 'create',
  critique: 'evaluate',
  audit: 'evaluate',
  typeset: 'refine',
  layout: 'refine',
  colorize: 'refine',
  animate: 'refine',
  delight: 'refine',
  bolder: 'refine',
  quieter: 'refine',
  overdrive: 'refine',
  distill: 'simplify',
  clarify: 'simplify',
  adapt: 'simplify',
  polish: 'harden',
  optimize: 'harden',
  harden: 'harden',
  onboard: 'harden',
  teach: 'system',
  document: 'system',
  extract: 'system',
  live: 'system',
};

export const CATEGORY_ORDER = ['create', 'evaluate', 'refine', 'simplify', 'harden', 'system'];

export const CATEGORY_LABELS: Record<string, string> = {
  create: '创建',
  evaluate: '评估',
  refine: '打磨',
  simplify: '简化',
  harden: '强化',
  system: '系统',
};

export const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  create: '从空白开始搭建新东西，把想法落成真正可用的功能。',
  evaluate: '审视当前结果。评分、批评、找出真正需要修的地方。',
  refine: '一次只改一个维度：排版、布局、色彩、动效。',
  simplify: '剥离复杂度。删掉那些并没有真正发挥作用的部分。',
  harden: '把界面推到可上线状态。边界情况、性能与最后的细节补强。',
  system: '配置与工具链。围绕设计系统的整理、提炼与组织工作。',
};

export const COMMAND_RELATIONSHIPS: Record<string, {
  leadsTo?: string[];
  pairs?: string;
  combinesWith?: string[];
}> = {
  craft: { combinesWith: ['shape'] },
  shape: { combinesWith: ['craft'] },
  audit: { leadsTo: ['harden', 'optimize', 'adapt', 'clarify'] },
  critique: { leadsTo: ['polish', 'distill', 'bolder', 'quieter', 'typeset', 'layout'] },
  typeset: { combinesWith: ['bolder', 'polish'] },
  layout: { combinesWith: ['distill', 'adapt'] },
  colorize: { combinesWith: ['bolder', 'delight'] },
  animate: { combinesWith: ['delight'] },
  delight: { combinesWith: ['bolder', 'animate'] },
  bolder: { pairs: 'quieter' },
  quieter: { pairs: 'bolder' },
  overdrive: { combinesWith: ['animate', 'delight'] },
  distill: { combinesWith: ['quieter', 'polish'] },
  clarify: { combinesWith: ['polish', 'adapt'] },
  adapt: { combinesWith: ['polish', 'clarify'] },
  polish: {},
  optimize: {},
  harden: { combinesWith: ['optimize'] },
  onboard: { combinesWith: ['clarify', 'delight'] },
  teach: { combinesWith: ['document'] },
  document: { combinesWith: ['teach', 'extract'] },
  extract: { combinesWith: ['document'] },
  live: {},
};

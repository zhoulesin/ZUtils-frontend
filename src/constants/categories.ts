import type { PluginCategory } from '@/types/plugin'

export interface CategoryOption {
  value: PluginCategory | ''
  label: string
  icon: string
}

export const CATEGORIES: CategoryOption[] = [
  { value: '', label: '全部分类', icon: '⊞' },
  { value: 'UTILITY', label: '实用工具', icon: '🔧' },
  { value: 'SYSTEM', label: '系统管理', icon: '⚙️' },
  { value: 'NETWORK', label: '网络查询', icon: '🌐' },
  { value: 'MEDIA', label: '媒体处理', icon: '🎨' },
  { value: 'AI', label: 'AI 功能', icon: '🤖' },
]

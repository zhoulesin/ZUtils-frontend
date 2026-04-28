export type PluginCategory = 'UTILITY' | 'SYSTEM' | 'NETWORK' | 'MEDIA' | 'AI'

export const CATEGORY_LABELS: Record<PluginCategory, string> = {
  UTILITY: '实用工具',
  SYSTEM: '系统管理',
  NETWORK: '网络查询',
  MEDIA: '媒体处理',
  AI: 'AI 功能',
}

export interface ParameterDto {
  name: string
  description?: string
  type?: 'STRING' | 'NUMBER' | 'INTEGER' | 'BOOLEAN' | 'ARRAY' | 'OBJECT'
  required?: boolean
}

export interface DependencyDto {
  name: string
  version: string
  dexUrl: string
  checksum?: string
}

export interface PluginListResponse {
  id: string
  functionName: string
  description: string
  icon: string
  category: PluginCategory
  author: string
  version: string
  downloads: number
  rating: number
  createdAt: string
  updatedAt: string
}

export interface PluginDetailResponse {
  id: string
  functionName: string
  description: string
  icon: string
  category: PluginCategory
  author: string
  minAppVersion: string
  downloads: number
  rating: number
  createdAt: string
  updatedAt: string
  currentVersion: VersionResponse
  versionHistory: VersionResponse[]
}

export interface VersionResponse {
  id: string
  pluginId: string
  version: string
  dexUrl: string
  dexSize: number
  checksum?: string
  className: string
  parameters: ParameterDto[]
  requiredPermissions: string[]
  dependencies: DependencyDto[]
  changelog?: string
  status: string
  publishedAt: string
}

export interface PluginManifestResponse {
  functionName: string
  description?: string
  version: string
  dexUrl: string
  className: string
  checksum?: string
  size?: number
  parameters: ParameterDto[]
  requiredPermissions: string[]
  dependencies: DependencyDto[]
}

export interface CreatePluginRequest {
  functionName: string
  description: string
  icon: string
  category: PluginCategory
  author: string
}

export interface CreateVersionRequest {
  version: string
  className: string
  parameters: ParameterDto[]
  requiredPermissions: string[]
  dependencies: DependencyDto[]
  changelog?: string
}

import client from './client'
import type { ApiResponse, Page } from '@/types/api'
import type {
  PluginListResponse,
  PluginDetailResponse,
  PluginManifestResponse,
  CreatePluginRequest,
  ParameterDto,
  McpToolResponse,
} from '@/types/plugin'

export const pluginsApi = {
  list: (params?: { category?: string; page?: number; size?: number; sort?: string }) =>
    client.get<ApiResponse<Page<PluginListResponse>>>('/plugins', { params }).then((r) => r.data),

  detail: (id: string) =>
    client.get<ApiResponse<PluginDetailResponse>>(`/plugins/${id}`).then((r) => r.data),

  create: (data: CreatePluginRequest) =>
    client.post<ApiResponse<PluginListResponse>>('/plugins', data).then((r) => r.data),

  manifest: () =>
    client.get<ApiResponse<PluginManifestResponse[]>>('/plugins/manifest').then((r) => r.data),

  mcpTools: () =>
    client.get<ApiResponse<McpToolResponse[]>>('/mcp/tools').then((r) => r.data),

  publishFromPlayground: (data: {
    code: string
    functionName: string
    description: string
    category: string
    className: string
    parameters: ParameterDto[]
    testArgs: Record<string, unknown>
  }) =>
    client
      .post<ApiResponse<{
        success: boolean
        pluginId?: string
        dexUrl?: string
        dexSize?: number
        className?: string
        functionName?: string
        error?: string
      }>>('/plugins/from-playground', data)
      .then((r) => r.data.data),
}

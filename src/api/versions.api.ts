import client from './client'
import type { ApiResponse } from '@/types/api'
import type { VersionResponse, CreateVersionRequest } from '@/types/plugin'

export const versionsApi = {
  list: (pluginId: string) =>
    client.get<ApiResponse<VersionResponse[]>>(`/plugins/${pluginId}/versions`).then((r) => r.data),

  create: (pluginId: string, metadata: CreateVersionRequest, file: File) => {
    const formData = new FormData()
    formData.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }))
    formData.append('file', file)
    return client
      .post<ApiResponse<VersionResponse>>(`/plugins/${pluginId}/versions`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((r) => r.data)
  },

  dexUrl: (pluginId: string, version: string) =>
    client
      .get<ApiResponse<{ dexUrl: string }>>(`/plugins/${pluginId}/versions/${version}/dex`)
      .then((r) => r.data),
}

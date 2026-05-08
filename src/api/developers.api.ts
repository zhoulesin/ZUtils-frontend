import client from './client'
import type { ApiResponse } from '@/types/api'

export interface DeveloperProfile {
  memberUid: string
  nickname: string
  bio: string | null
  avatarUrl: string | null
  role: string
  pluginCount: number
  totalDownloads: number
  plugins: DeveloperPlugin[]
}

export interface DeveloperPlugin {
  id: string
  functionName: string
  description: string
  downloads: number
  rating: number
  version: string
}

export const developersApi = {
  getPublicProfile: (memberUid: string) =>
    client.get<ApiResponse<DeveloperProfile>>(`/developers/${memberUid}`).then((r) => r.data),
}

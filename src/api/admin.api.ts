import client from './client'
import type { ApiResponse } from '@/types/api'

export interface AdminPlugin {
  id: string
  functionName: string
  description: string
  category: string
  author: string
  authorNickname?: string
  downloads: number
  rating: number
  createdAt: string
  dexUrl?: string
  dexExists?: boolean
}

export const adminApi = {
  plugins: () =>
    client.get<ApiResponse<AdminPlugin[]>>('/admin/plugins').then((r) => r.data),

  users: () =>
    client.get<ApiResponse<any[]>>('/admin/users').then((r) => r.data),
}

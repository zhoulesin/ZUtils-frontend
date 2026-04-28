import client from './client'
import type { ApiResponse } from '@/types/api'
import type { TestRequest, TestResult } from '@/types/test'

export const testApi = {
  run: (data: TestRequest) =>
    client.post<ApiResponse<TestResult>>('/test/run', data).then((r) => r.data.data),

  presets: () =>
    client.get<ApiResponse<Record<string, string>>>('/test/presets').then((r) => r.data.data),
}

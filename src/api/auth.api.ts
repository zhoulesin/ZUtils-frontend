import client from './client'
import type { ApiResponse } from '@/types/api'
import type { LoginRequest, RegisterRequest, AuthResponse } from '@/types/auth'

export const authApi = {
  login: (data: LoginRequest) =>
    client.post<ApiResponse<AuthResponse>>('/auth/login', data).then((r) => r.data),

  register: (data: RegisterRequest) =>
    client.post<ApiResponse<AuthResponse>>('/auth/register', data).then((r) => r.data),
}

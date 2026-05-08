import client from './client'
import type { ApiResponse } from '@/types/api'
import type { LoginRequest, RegisterRequest, AuthResponse, UpdateProfileRequest, UpdateProfileResponse } from '@/types/auth'

export const authApi = {
  login: (data: LoginRequest) =>
    client.post<ApiResponse<AuthResponse>>('/auth/login', data).then((r) => r.data),

  register: (data: RegisterRequest) =>
    client.post<ApiResponse<AuthResponse>>('/auth/register', data).then((r) => r.data),

  updateProfile: (data: UpdateProfileRequest) =>
    client.put<ApiResponse<UpdateProfileResponse>>('/auth/profile', data).then((r) => r.data),
}

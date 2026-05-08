export interface LoginRequest {
  username: string
  password: string
}

export interface RegisterRequest {
  username: string
  email: string
  password: string
  nickname?: string
  memberUid?: string
}

export interface DeveloperInfo {
  id: number
  username: string
  nickname?: string
  email: string
  role?: string
  memberUid?: string
  avatarUrl?: string
}

export interface AuthResponse {
  token: string
  developer: DeveloperInfo
}

export interface User {
  id: number
  username: string
  nickname: string
  email: string
  role: string
  memberUid: string
  avatarUrl: string
  bio: string
}

export interface UpdateProfileRequest {
  nickname?: string
  email?: string
  currentPassword?: string
  newPassword?: string
  avatarUrl?: string
  bio?: string
}

export interface UpdateProfileResponse {
  id: number
  username: string
  nickname: string
  email: string
  role: string
}

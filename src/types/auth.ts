export interface LoginRequest {
  username: string
  password: string
}

export interface RegisterRequest {
  username: string
  email: string
  password: string
}

export interface DeveloperInfo {
  id: number
  username: string
  email: string
}

export interface AuthResponse {
  token: string
  developer: DeveloperInfo
}

export interface User {
  username: string
  email: string
}

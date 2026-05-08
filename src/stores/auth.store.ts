import { create } from 'zustand'
import type { User } from '@/types/auth'
import { authApi } from '@/api/auth.api'
import type { LoginRequest, RegisterRequest } from '@/types/auth'

interface AuthState {
  token: string | null
  user: User | null
  loading: boolean
  error: string | null
  isAuthenticated: boolean
  login: (data: LoginRequest) => Promise<void>
  register: (data: RegisterRequest) => Promise<void>
  logout: () => void
  clearError: () => void
  updateUser: (user: Partial<User>) => void
}

const token = localStorage.getItem('zutils_token')

function buildUser(developer: {
  id: number
  username: string
  nickname?: string
  email: string
  role?: string
  memberUid?: string
  avatarUrl?: string
}): User {
  return {
    id: developer.id,
    username: developer.username,
    nickname: developer.nickname || developer.username,
    email: developer.email,
    role: developer.role || 'DEVELOPER',
    memberUid: developer.memberUid || '',
    avatarUrl: developer.avatarUrl || '',
    bio: '',
  }
}

export const useAuthStore = create<AuthState>((set) => ({
  token,
  user: JSON.parse(localStorage.getItem('zutils_user') ?? 'null'),
  loading: false,
  error: null,
  isAuthenticated: !!token,

  login: async (data) => {
    set({ loading: true, error: null })
    try {
      const res = await authApi.login(data)
      const { token: t, developer } = res.data
      const user = buildUser(developer)
      localStorage.setItem('zutils_token', t)
      localStorage.setItem('zutils_user', JSON.stringify(user))
      set({ token: t, user, loading: false, isAuthenticated: true })
    } catch {
      set({ loading: false, error: '登录失败，请检查用户名和密码' })
      throw new Error('登录失败')
    }
  },

  register: async (data) => {
    set({ loading: true, error: null })
    try {
      const res = await authApi.register(data)
      const { token: t, developer } = res.data
      const user = buildUser(developer)
      localStorage.setItem('zutils_token', t)
      localStorage.setItem('zutils_user', JSON.stringify(user))
      set({ token: t, user, loading: false, isAuthenticated: true })
    } catch {
      set({ loading: false, error: '注册失败，请稍后重试' })
      throw new Error('注册失败')
    }
  },

  logout: () => {
    localStorage.removeItem('zutils_token')
    localStorage.removeItem('zutils_user')
    set({ token: null, user: null, isAuthenticated: false })
  },

  clearError: () => set({ error: null }),

  updateUser: (partial) => {
    set((state) => {
      if (!state.user) return {}
      const updated = { ...state.user, ...partial }
      localStorage.setItem('zutils_user', JSON.stringify(updated))
      return { user: updated }
    })
  },
}))

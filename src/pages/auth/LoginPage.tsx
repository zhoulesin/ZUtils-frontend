import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/auth.store'
import { ROUTES } from '@/constants/routes'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login, loading, error, clearError } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()
    try {
      await login({ username, password })
      navigate(ROUTES.DEV_DASHBOARD)
    } catch {}
  }

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md items-center px-4 py-16">
      <div className="w-full rounded-2xl border border-raycast-border-solid bg-raycast-surface p-8">
        <h1 className="mb-6 text-center text-2xl font-bold text-raycast-text">开发者登录</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-raycast-muted">用户名</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border border-raycast-border-solid bg-raycast-elevated px-4 py-2.5 text-sm text-raycast-text placeholder:text-raycast-dim focus:border-primary-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-raycast-muted">密码</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-raycast-border-solid bg-raycast-elevated px-4 py-2.5 text-sm text-raycast-text placeholder:text-raycast-dim focus:border-primary-500 focus:outline-none"
              required
            />
          </div>
          {error && <p className="text-sm text-raycast-red">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-primary-600 py-2.5 text-sm font-semibold text-white hover:bg-primary-500 disabled:opacity-50"
          >
            {loading ? '登录中...' : '登录'}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-raycast-muted">
          没有账号？{' '}
          <Link to={ROUTES.REGISTER} className="text-primary-400 hover:underline">
            立即注册
          </Link>
        </p>
        <div className="mt-4 rounded-lg bg-raycast-elevated p-3 text-xs text-raycast-muted">
          <p className="font-medium text-raycast-text">测试账号：</p>
          <p>用户名：zutils-team</p>
          <p>密码：admin123</p>
        </div>
      </div>
    </div>
  )
}

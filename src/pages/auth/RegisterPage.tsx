import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/auth.store'
import { ROUTES } from '@/constants/routes'

export default function RegisterPage() {
  const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '' })
  const { register, loading, error, clearError } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()
    if (form.password !== form.confirm) {
      alert('两次密码不一致')
      return
    }
    try {
      await register({ username: form.username, email: form.email, password: form.password })
      navigate(ROUTES.DEV_DASHBOARD)
    } catch {}
  }

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md items-center px-4 py-16">
      <div className="w-full">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">注册开发者</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {(['username', 'email', 'password', 'confirm'] as const).map((field) => (
            <div key={field}>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                {field === 'username' ? '用户名' : field === 'email' ? '邮箱' : field === 'password' ? '密码' : '确认密码'}
              </label>
              <input
                type={field.includes('password') || field === 'confirm' ? 'password' : field === 'email' ? 'email' : 'text'}
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-primary-500 focus:outline-none"
                required
              />
            </div>
          ))}
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-primary-600 py-2 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50"
          >
            {loading ? '注册中...' : '注册'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-500">
          已有账号？{' '}
          <Link to={ROUTES.LOGIN} className="text-primary-600 hover:underline">
            立即登录
          </Link>
        </p>
      </div>
    </div>
  )
}

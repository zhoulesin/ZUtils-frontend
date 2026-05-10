import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { pluginsApi } from '@/api/plugins.api'
import type { PluginCategory } from '@/types/plugin'
import { CATEGORY_LABELS } from '@/types/plugin'
import { ROUTES } from '@/constants/routes'

export default function CreatePluginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    functionName: '',
    description: '',
    icon: '',
    category: 'UTILITY' as PluginCategory,
    author: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const res = await pluginsApi.create(form)
      navigate(ROUTES.DEV_VERSION_NEW(res.data.id))
    } catch {
      setError('创建失败，请稍后重试')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold text-raycast-text">创建新插件</h1>
      <form onSubmit={handleSubmit} className="space-y-5 rounded-xl border-raycast-border-solid bg-raycast-surface p-6">
        <div>
          <label className="mb-1 block text-sm font-medium text-raycast-muted">函数名 *</label>
          <input
            value={form.functionName}
            onChange={(e) => setForm({ ...form, functionName: e.target.value })}
            className="w-full rounded-lg border border-raycast-border-solid bg-raycast-elevated px-4 py-2.5 text-sm text-raycast-text placeholder:text-raycast-dim focus:border-primary-500 focus:outline-none"
            placeholder="例如: getWeather"
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-raycast-muted">描述</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full rounded-lg border border-raycast-border-solid bg-raycast-elevated px-4 py-2.5 text-sm text-raycast-text placeholder:text-raycast-dim focus:border-primary-500 focus:outline-none"
            rows={3}
            placeholder="描述此插件的功能..."
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-raycast-muted">分类</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value as PluginCategory })}
            className="w-full rounded-lg border border-raycast-border-solid bg-raycast-elevated px-4 py-2.5 text-sm text-raycast-text placeholder:text-raycast-dim focus:border-primary-500 focus:outline-none"
          >
            {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-raycast-text">作者</label>
          <input
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
            className="w-full rounded-lg border border-raycast-border-solid bg-raycast-elevated px-4 py-2.5 text-sm text-raycast-text placeholder:text-raycast-dim focus:border-primary-500 focus:outline-none"
            placeholder="ZPlatform Team"
          />
        </div>
        {error && <p className="text-sm text-raycast-red">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-primary-600 py-2 text-sm font-semibold text-white hover:bg-primary-500 disabled:opacity-50"
        >
          {submitting ? '创建中...' : '创建并发布版本'}
        </button>
      </form>
    </div>
  )
}

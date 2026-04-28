import { useState, useEffect } from 'react'
import { pluginsApi } from '@/api/plugins.api'
import type { PluginListResponse } from '@/types/plugin'
import { Package, CheckCircle, Clock, XCircle } from 'lucide-react'
import { ROUTES } from '@/constants/routes'
import { Link } from 'react-router-dom'

export default function AdminDashboardPage() {
  const [plugins, setPlugins] = useState<PluginListResponse[]>([])

  useEffect(() => {
    pluginsApi.list({ size: 100 }).then((res) => setPlugins(res.data.content)).catch(() => {})
  }, [])

  const stats = [
    { label: '全部插件', value: plugins.length, icon: Package, color: 'text-blue-600 bg-blue-50' },
    { label: '已上架', value: plugins.length, icon: CheckCircle, color: 'text-green-600 bg-green-50' },
    { label: '待审核', value: 0, icon: Clock, color: 'text-amber-600 bg-amber-50' },
    { label: '已拒绝', value: 0, icon: XCircle, color: 'text-red-600 bg-red-50' },
  ]

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">管理后台</h1>
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border bg-white p-4">
            <div className={`mb-3 inline-flex rounded-lg p-2 ${s.color}`}>
              <s.icon className="h-5 w-5" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{s.value}</div>
            <div className="text-sm text-gray-500">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="rounded-xl border bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold">快捷操作</h2>
        <Link to={ROUTES.ADMIN_REVIEWS} className="text-primary-600 hover:underline text-sm">
          前往插件审核 →
        </Link>
      </div>
    </div>
  )
}

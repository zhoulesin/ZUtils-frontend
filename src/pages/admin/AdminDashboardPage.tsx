import { useState, useEffect } from 'react'
import { adminApi, type AdminPlugin } from '@/api/admin.api'
import { Package, CheckCircle, Clock, XCircle, Download, Star } from 'lucide-react'
import { formatNumber } from '@/utils/formatters'

export default function AdminDashboardPage() {
  const [plugins, setPlugins] = useState<AdminPlugin[]>([])

  useEffect(() => {
    adminApi.plugins().then((res) => setPlugins(res.data as AdminPlugin[])).catch(() => {})
  }, [])

  const stats = [
    { label: '全部插件', value: plugins.length, icon: Package, color: 'text-blue-600 bg-blue-50' },
    { label: '已上架', value: plugins.filter(p => p.dexExists).length, icon: CheckCircle, color: 'text-green-600 bg-green-50' },
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
        <h2 className="mb-4 text-lg font-semibold">插件列表</h2>
        {plugins.length === 0 ? (
          <p className="text-sm text-gray-400">暂无插件</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50 text-left text-gray-500">
                  <th className="px-4 py-3 font-medium">函数名</th>
                  <th className="px-4 py-3 font-medium">创建者</th>
                  <th className="px-4 py-3 font-medium">下载量</th>
                  <th className="px-4 py-3 font-medium">创建时间</th>
                </tr>
              </thead>
              <tbody>
                {plugins.map((p) => (
                  <tr key={p.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{p.functionName}</td>
                    <td className="px-4 py-3 text-gray-600">@{p.authorNickname || p.author}</td>
                    <td className="px-4 py-3 text-gray-600">
                      <span className="flex items-center gap-1">
                        <Download className="h-3 w-3" />
                        {formatNumber(p.downloads)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-400">{p.createdAt?.slice(0, 10)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

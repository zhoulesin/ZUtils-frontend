import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus, ExternalLink, Edit3 } from 'lucide-react'
import { pluginsApi } from '@/api/plugins.api'
import type { PluginListResponse } from '@/types/plugin'
import { CATEGORY_LABELS } from '@/types/plugin'
import { EmptyState } from '@/components/common/EmptyState'
import { LoadingSkeleton } from '@/components/common/LoadingSkeleton'
import { formatNumber } from '@/utils/formatters'
import { ROUTES } from '@/constants/routes'

export default function MyPluginsPage() {
  const [plugins, setPlugins] = useState<PluginListResponse[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    pluginsApi.list({ size: 100 })
      .then((res) => setPlugins(res.data.content))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingSkeleton count={3} />

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">我的插件</h1>
        <Link
          to={ROUTES.DEV_PLUGINS_NEW}
          className="inline-flex items-center gap-1 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
        >
          <Plus className="h-4 w-4" /> 创建插件
        </Link>
      </div>

      {plugins.length === 0 ? (
        <EmptyState title="还没有插件" description="点击上方按钮创建你的第一个插件" />
      ) : (
        <div className="overflow-x-auto rounded-xl border bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50 text-left text-gray-500">
                <th className="px-4 py-3 font-medium">函数名</th>
                <th className="px-4 py-3 font-medium">分类</th>
                <th className="px-4 py-3 font-medium">版本</th>
                <th className="px-4 py-3 font-medium">下载量</th>
                <th className="px-4 py-3 font-medium">评分</th>
                <th className="px-4 py-3 font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {plugins.map((p) => (
                <tr key={p.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{p.functionName}</td>
                  <td className="px-4 py-3 text-gray-500">{CATEGORY_LABELS[p.category] ?? p.category}</td>
                  <td className="px-4 py-3">v{p.version}</td>
                  <td className="px-4 py-3">{formatNumber(p.downloads)}</td>
                  <td className="px-4 py-3">{p.rating.toFixed(1)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link
                        to={ROUTES.PLUGIN_DETAIL(p.id)}
                        className="inline-flex items-center gap-1 text-primary-600 hover:underline"
                      >
                        <ExternalLink className="h-3 w-3" /> 查看
                      </Link>
                      <Link
                        to={ROUTES.DEV_VERSION_NEW(p.id)}
                        className="inline-flex items-center gap-1 text-gray-600 hover:underline"
                      >
                        <Edit3 className="h-3 w-3" /> 新版本
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

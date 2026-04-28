import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Star, Download, Calendar, Package, Shield, QrCode, ArrowLeft } from 'lucide-react'
import { pluginsApi } from '@/api/plugins.api'
import type { PluginDetailResponse } from '@/types/plugin'
import { CATEGORY_LABELS } from '@/types/plugin'
import { LoadingSkeleton } from '@/components/common/LoadingSkeleton'
import { QRCodeModal } from '@/components/common/QRCodeModal'
import { formatBytes, formatDate, formatNumber } from '@/utils/formatters'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'

export default function PluginDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [plugin, setPlugin] = useState<PluginDetailResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [qrOpen, setQrOpen] = useState(false)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    pluginsApi
      .detail(id)
      .then((res) => setPlugin(res.data))
      .catch(() => setPlugin(null))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="mx-auto max-w-4xl px-4 py-8"><LoadingSkeleton count={1} /></div>
  if (!plugin) return <div className="mx-auto max-w-4xl px-4 py-8 text-center text-gray-500">插件不存在</div>

  const v = plugin.currentVersion
  const installDeepLink = `zutils://install?pluginId=${plugin.id}`

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Link to={ROUTES.MARKETPLACE} className="mb-6 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900">
        <ArrowLeft className="h-4 w-4" /> 返回市场
      </Link>

      <div className="mb-8 rounded-2xl border bg-white p-6 sm:p-8">
        <div className="mb-6 flex items-start gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary-50 text-2xl">
            🧩
          </div>
          <div className="flex-1">
            <div className="mb-1 flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">{plugin.functionName}</h1>
              <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                {CATEGORY_LABELS[plugin.category] ?? plugin.category}
              </span>
            </div>
            <p className="mb-2 text-gray-500">{plugin.description}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span>作者：{plugin.author}</span>
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
                {plugin.rating.toFixed(1)}
              </span>
              <span className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                {formatNumber(plugin.downloads)} 下载
              </span>
            </div>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-4 rounded-xl bg-gray-50 p-4 text-sm sm:grid-cols-4">
          <div>
            <div className="text-gray-400">版本</div>
            <div className="font-medium">v{v.version}</div>
          </div>
          <div>
            <div className="text-gray-400">大小</div>
            <div className="font-medium">{formatBytes(v.dexSize)}</div>
          </div>
          <div>
            <div className="text-gray-400">更新</div>
            <div className="font-medium">{formatDate(v.publishedAt)}</div>
          </div>
          <div>
            <div className="text-gray-400">最低版本</div>
            <div className="font-medium">{plugin.minAppVersion}</div>
          </div>
        </div>

        <button
          onClick={() => setQrOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3 text-sm font-semibold text-white hover:bg-primary-700"
        >
          <QrCode className="h-5 w-5" />
          扫码安装到手机
        </button>
        <QRCodeModal open={qrOpen} onClose={() => setQrOpen(false)} value={installDeepLink} />
      </div>

      {v.parameters.length > 0 && (
        <div className="mb-8 rounded-2xl border bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold">参数说明</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-gray-500">
                  <th className="pb-2 pr-4 font-medium">参数名</th>
                  <th className="pb-2 pr-4 font-medium">类型</th>
                  <th className="pb-2 pr-4 font-medium">必填</th>
                  <th className="pb-2 font-medium">说明</th>
                </tr>
              </thead>
              <tbody>
                {v.parameters.map((p) => (
                  <tr key={p.name} className="border-b last:border-0">
                    <td className="py-2 pr-4 font-mono text-primary-600">{p.name}</td>
                    <td className="py-2 pr-4 text-gray-600">{p.type ?? 'STRING'}</td>
                    <td className="py-2 pr-4">{p.required ? <span className="text-red-500">是</span> : <span className="text-gray-400">否</span>}</td>
                    <td className="py-2 text-gray-500">{p.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {v.requiredPermissions.length > 0 && (
        <div className="mb-8 rounded-2xl border bg-white p-6">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <Shield className="h-5 w-5" /> 权限声明
          </h2>
          <div className="flex flex-wrap gap-2">
            {v.requiredPermissions.map((perm) => (
              <span key={perm} className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                {perm}
              </span>
            ))}
          </div>
        </div>
      )}

      {v.dependencies.length > 0 && (
        <div className="mb-8 rounded-2xl border bg-white p-6">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <Package className="h-5 w-5" /> 依赖
          </h2>
          <div className="space-y-2">
            {v.dependencies.map((dep) => (
              <div key={dep.name} className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-2 text-sm">
                <span className="font-medium">{dep.name}</span>
                <span className="text-gray-500">v{dep.version}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

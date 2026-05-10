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
  if (!plugin) return <div className="mx-auto max-w-4xl px-4 py-8 text-center text-raycast-muted">插件不存在</div>

  const v = plugin.currentVersion
  const installDeepLink = `zutils://install?pluginId=${plugin.id}`

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Link to={ROUTES.MARKETPLACE} className="mb-6 inline-flex items-center gap-1 text-sm text-raycast-muted hover:text-raycast-text">
        <ArrowLeft className="h-4 w-4" /> 返回市场
      </Link>

      <div className="mb-8 rounded-2xl border border-raycast-border-solid bg-raycast-surface p-6 sm:p-8">
        <div className="mb-6 flex items-start gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-raycast-elevated text-2xl">
            🧩
          </div>
          <div className="flex-1">
            <div className="mb-1 flex items-center gap-3">
              <h1 className="text-2xl font-bold text-raycast-text">{plugin.functionName}</h1>
              <span className="rounded-full bg-raycast-elevated px-2.5 py-0.5 text-xs font-medium text-raycast-muted">
                {CATEGORY_LABELS[plugin.category] ?? plugin.category}
              </span>
            </div>
            <p className="mb-2 text-raycast-muted">{plugin.description}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-raycast-muted">
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

        <div className="mb-6 grid grid-cols-2 gap-4 rounded-xl bg-raycast-elevated p-4 text-sm sm:grid-cols-4">
          <div>
            <div className="text-raycast-dim">版本</div>
            <div className="font-medium">v{v.version}</div>
          </div>
          <div>
            <div className="text-raycast-dim">大小</div>
            <div className="font-medium">{formatBytes(v.dexSize)}</div>
          </div>
          <div>
            <div className="text-raycast-dim">更新</div>
            <div className="font-medium">{formatDate(v.publishedAt)}</div>
          </div>
          <div>
            <div className="text-raycast-dim">最低版本</div>
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
        <div className="mb-8 rounded-2xl border bg-raycast-surface p-6">
          <h2 className="mb-4 text-lg font-semibold">参数说明</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-raycast-border-solid text-left text-raycast-muted">
                  <th className="pb-2 pr-4 font-medium">参数名</th>
                  <th className="pb-2 pr-4 font-medium">类型</th>
                  <th className="pb-2 pr-4 font-medium">必填</th>
                  <th className="pb-2 font-medium">说明</th>
                </tr>
              </thead>
              <tbody>
                {v.parameters.map((p) => (
                  <tr key={p.name} className="border-b border-raycast-border-solid last:border-0">
                    <td className="py-2 pr-4 font-mono text-primary-400">{p.name}</td>
                    <td className="py-2 pr-4 text-raycast-muted">{p.type ?? 'STRING'}</td>
                    <td className="py-2 pr-4">{p.required ? <span className="text-raycast-red">是</span> : <span className="text-raycast-dim">否</span>}</td>
                    <td className="py-2 text-raycast-muted">{p.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {v.requiredPermissions.length > 0 && (
        <div className="mb-8 rounded-2xl border bg-raycast-surface p-6">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <Shield className="h-5 w-5" /> 权限声明
          </h2>
          <div className="flex flex-wrap gap-2">
            {v.requiredPermissions.map((perm) => (
              <span key={perm} className="rounded-full bg-raycast-amber/10 px-3 py-1 text-xs font-medium text-raycast-amber">
                {perm}
              </span>
            ))}
          </div>
        </div>
      )}

      {v.dependencies.length > 0 && (
        <div className="mb-8 rounded-2xl border bg-raycast-surface p-6">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <Package className="h-5 w-5" /> 依赖
          </h2>
          <div className="space-y-2">
            {v.dependencies.map((dep) => (
              <div key={dep.name} className="flex items-center justify-between rounded-lg bg-raycast-elevated px-4 py-2 text-sm">
                <span className="font-medium">{dep.name}</span>
                <span className="text-raycast-muted">v{dep.version}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

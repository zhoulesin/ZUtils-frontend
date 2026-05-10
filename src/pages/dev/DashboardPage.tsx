import { useState, useEffect } from 'react'
import { pluginsApi } from '@/api/plugins.api'
import type { PluginListResponse } from '@/types/plugin'
import { Download, Star, Package, TrendingUp } from 'lucide-react'
import { formatNumber } from '@/utils/formatters'

export default function DashboardPage() {
  const [plugins, setPlugins] = useState<PluginListResponse[]>([])

  useEffect(() => {
    pluginsApi.my({ size: 100 }).then((res) => setPlugins(res.data.content)).catch(() => {})
  }, [])

  const totalDownloads = plugins.reduce((s, p) => s + p.downloads, 0)
  const avgRating = plugins.length ? plugins.reduce((s, p) => s + p.rating, 0) / plugins.length : 0

  const stats = [
    { label: '插件总数', value: plugins.length, icon: Package, color: 'text-raycast-blue bg-raycast-blue/10' },
    { label: '总下载量', value: formatNumber(totalDownloads), icon: Download, color: 'text-raycast-green bg-raycast-green/10' },
    { label: '平均评分', value: avgRating.toFixed(1), icon: Star, color: 'text-raycast-amber bg-raycast-amber/10' },
    { label: '已上架', value: plugins.filter((p) => p.version).length, icon: TrendingUp, color: 'text-purple-400 bg-purple-500/10' },
  ]

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-raycast-text">开发者仪表盘</h1>
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border-raycast-border-solid bg-raycast-surface p-4">
            <div className={`mb-3 inline-flex rounded-lg p-2 ${s.color}`}>
              <s.icon className="h-5 w-5" />
            </div>
            <div className="text-2xl font-bold text-raycast-text">{s.value}</div>
            <div className="text-sm text-raycast-muted">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border-raycast-border-solid bg-raycast-surface p-6">
        <h2 className="mb-4 text-lg font-semibold">最近动态</h2>
        {plugins.length === 0 ? (
          <p className="text-sm text-raycast-dim">暂无插件，去创建一个吧</p>
        ) : (
          <div className="space-y-3">
            {plugins.slice(0, 5).map((p) => (
              <div key={p.id} className="flex items-center justify-between rounded-lg bg-raycast-elevated px-4 py-3 text-sm">
                <span className="font-medium">{p.functionName}</span>
                <span className="text-raycast-muted">v{p.version} · {formatNumber(p.downloads)} 下载</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

import { Link } from 'react-router-dom'
import { Star, Download } from 'lucide-react'
import type { PluginListResponse } from '@/types/plugin'
import { CATEGORY_LABELS } from '@/types/plugin'
import { formatNumber } from '@/utils/formatters'
import { ROUTES } from '@/constants/routes'

interface PluginCardProps {
  plugin: PluginListResponse
}

export function PluginCard({ plugin }: PluginCardProps) {
  return (
    <Link
      to={ROUTES.PLUGIN_DETAIL(plugin.id)}
      className="group rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-primary-200 hover:shadow-md"
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50 text-xl text-primary-600">
          {plugin.icon ? (
            <img src={plugin.icon} alt="" className="h-8 w-8 rounded" />
          ) : (
            '🧩'
          )}
        </div>
        <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
          {CATEGORY_LABELS[plugin.category as keyof typeof CATEGORY_LABELS] ?? plugin.category}
        </span>
      </div>

      <h3 className="mb-1 text-base font-semibold text-gray-900 group-hover:text-primary-600">
        {plugin.functionName}
      </h3>
      <p className="mb-4 line-clamp-2 text-sm text-gray-500">{plugin.description}</p>

      <div className="flex items-center gap-4 text-sm text-gray-500">
        <span className="flex items-center gap-1">
          <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
          {plugin.rating.toFixed(1)}
        </span>
        <span className="flex items-center gap-1">
          <Download className="h-4 w-4" />
          {formatNumber(plugin.downloads)}
        </span>
        <span className="ml-auto text-xs text-gray-400">v{plugin.version}</span>
      </div>
    </Link>
  )
}

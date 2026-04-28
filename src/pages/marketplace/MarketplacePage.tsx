import { useState, useEffect } from 'react'
import { Search, Plug, Puzzle } from 'lucide-react'
import { pluginsApi } from '@/api/plugins.api'
import type { PluginListResponse, McpToolResponse } from '@/types/plugin'
import { PluginCard } from '@/components/common/PluginCard'
import { LoadingSkeleton } from '@/components/common/LoadingSkeleton'
import { EmptyState } from '@/components/common/EmptyState'
import { Pagination } from '@/components/common/Pagination'
import { CATEGORIES } from '@/constants/categories'
import { useDebounce } from '@/hooks/useDebounce'

type Section = 'plugins' | 'mcp'

const MCP_ICONS: Record<string, string> = {
  weather_current: '🌤',
  translate_text: '🌐',
}

export default function MarketplacePage() {
  const [section, setSection] = useState<Section>('plugins')
  const [plugins, setPlugins] = useState<PluginListResponse[]>([])
  const [mcpTools, setMcpTools] = useState<McpToolResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const debouncedSearch = useDebounce(search)

  useEffect(() => {
    if (section === 'plugins') {
      setLoading(true)
      pluginsApi
        .list({ category: category || undefined, page: page - 1, size: 20 })
        .then((res) => {
          setPlugins(res.data.content)
          setTotalPages(res.data.totalPages)
        })
        .catch(() => setPlugins([]))
        .finally(() => setLoading(false))
    } else {
      setLoading(true)
      pluginsApi
        .mcpTools()
        .then((res) => setMcpTools(res.data))
        .catch(() => setMcpTools([]))
        .finally(() => setLoading(false))
    }
  }, [section, category, page])

  const filteredPlugins = debouncedSearch
    ? plugins.filter((p) =>
        p.functionName.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        p.description?.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    : plugins

  const filteredMcp = debouncedSearch
    ? mcpTools.filter((t) =>
        t.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        t.description?.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    : mcpTools

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="mb-2 text-2xl font-bold text-gray-900">插件市场</h1>
        <p className="text-gray-500">浏览和发现可安装的插件与 MCP 工具</p>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={section === 'plugins' ? '搜索插件...' : '搜索 MCP 工具...'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-primary-500 focus:outline-none"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => { setSection('plugins'); setPage(1) }}
            className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium ${
              section === 'plugins'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Puzzle className="h-4 w-4" />
            DEX 插件
          </button>
          <button
            onClick={() => setSection('mcp')}
            className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium ${
              section === 'mcp'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Plug className="h-4 w-4" />
            MCP 工具
          </button>
        </div>
      </div>

      {section === 'plugins' && (
        <div className="mb-6 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => { setCategory(cat.value); setPage(1) }}
              className={`rounded-full px-3 py-1.5 text-sm font-medium ${
                category === cat.value
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <LoadingSkeleton />
      ) : section === 'plugins' ? (
        filteredPlugins.length === 0 ? (
          <EmptyState title="没有找到插件" description="试试其他关键词或分类" />
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPlugins.map((plugin) => (
                <PluginCard key={plugin.id} plugin={plugin} />
              ))}
            </div>
            <div className="mt-8">
              <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
            </div>
          </>
        )
      ) : filteredMcp.length === 0 ? (
        <EmptyState title="没有找到 MCP 工具" description="暂无可用 MCP 工具" />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredMcp.map((tool) => (
            <div
              key={tool.name}
              className="group rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-primary-200 hover:shadow-md"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-xl">
                  {MCP_ICONS[tool.name] || '🔌'}
                </div>
                <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                  MCP
                </span>
              </div>

              <h3 className="mb-1 text-base font-semibold text-gray-900">
                {tool.name}
              </h3>
              <p className="mb-4 line-clamp-2 text-sm text-gray-500">{tool.description}</p>

              {tool.parameters?.properties && (
                <div className="space-y-1">
                  <p className="text-xs font-medium text-gray-400">参数：</p>
                  {Object.entries(tool.parameters.properties).map(([key, prop]) => (
                    <div key={key} className="flex items-center gap-2 text-xs text-gray-500">
                      <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-gray-700">
                        {key}
                      </code>
                      <span className={tool.parameters?.required?.includes(key) ? 'text-red-400' : ''}>
                        {tool.parameters?.required?.includes(key) ? '(必填)' : '(选填)'}
                      </span>
                      <span className="truncate">{prop.description}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { pluginsApi } from '@/api/plugins.api'
import type { PluginListResponse } from '@/types/plugin'
import { PluginCard } from '@/components/common/PluginCard'
import { LoadingSkeleton } from '@/components/common/LoadingSkeleton'
import { EmptyState } from '@/components/common/EmptyState'
import { Pagination } from '@/components/common/Pagination'
import { CATEGORIES } from '@/constants/categories'
import { useDebounce } from '@/hooks/useDebounce'

export default function MarketplacePage() {
  const [plugins, setPlugins] = useState<PluginListResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const debouncedSearch = useDebounce(search)

  useEffect(() => {
    setLoading(true)
    pluginsApi
      .list({
        category: category || undefined,
        page: page - 1,
        size: 20,
      })
      .then((res) => {
        setPlugins(res.data.content)
        setTotalPages(res.data.totalPages)
      })
      .catch(() => setPlugins([]))
      .finally(() => setLoading(false))
  }, [category, page])

  const filtered = debouncedSearch
    ? plugins.filter((p) => p.functionName.toLowerCase().includes(debouncedSearch.toLowerCase()) || p.description?.toLowerCase().includes(debouncedSearch.toLowerCase()))
    : plugins

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="mb-2 text-2xl font-bold text-gray-900">插件市场</h1>
        <p className="text-gray-500">浏览和发现可安装的 DEX 插件</p>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="搜索插件..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-primary-500 focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                setCategory(cat.value)
                setPage(1)
              }}
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
      </div>

      {loading ? (
        <LoadingSkeleton />
      ) : filtered.length === 0 ? (
        <EmptyState title="没有找到插件" description="试试其他关键词或分类" />
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((plugin) => (
              <PluginCard key={plugin.id} plugin={plugin} />
            ))}
          </div>
          <div className="mt-8">
            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
          </div>
        </>
      )}
    </div>
  )
}

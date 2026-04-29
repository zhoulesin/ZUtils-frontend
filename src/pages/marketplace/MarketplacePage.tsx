import { useState, useEffect } from 'react'
import { Search, Plug, Puzzle, Smartphone, Zap } from 'lucide-react'
import { pluginsApi } from '@/api/plugins.api'
import type { PluginListResponse, McpToolResponse } from '@/types/plugin'
import { PluginCard } from '@/components/common/PluginCard'
import { LoadingSkeleton } from '@/components/common/LoadingSkeleton'
import { EmptyState } from '@/components/common/EmptyState'
import { Pagination } from '@/components/common/Pagination'
import { CATEGORIES } from '@/constants/categories'
import { useDebounce } from '@/hooks/useDebounce'

type Section = 'plugins' | 'mcp' | 'builtin' | 'skill'

const MCP_ICONS: Record<string, string> = {
  weather_current: '🌤',
  translate_text: '🌐',
  web_search: '🔍',
}

const BUILTIN_FUNCTIONS = [
  { category: '通知', items: [
    { name: 'send_notification', description: '发送系统通知到通知栏', icon: '🔔', params: ['title', 'content'] },
    { name: 'toast', description: '在屏幕底部显示短时提示消息', icon: '💬', params: ['message'] },
  ]},
  { category: '自动化', items: [
    { name: 'create_automation', description: '创建定时自动化规则（每日/每周）', icon: '⏰', params: ['name', 'cron', 'steps'] },
  ]},
  { category: '系统', items: [
    { name: 'getCurrentTime', description: '获取当前系统时间', icon: '🕐', params: ['format'] },
    { name: 'getBatteryLevel', description: '获取当前电池电量百分比', icon: '🔋', params: [] },
    { name: 'setScreenBrightness', description: '设置屏幕亮度', icon: '☀️', params: ['level'] },
    { name: 'getDeviceInfo', description: '获取设备基本信息', icon: '📱', params: [] },
    { name: 'getVolume', description: '获取当前媒体音量', icon: '🔊', params: [] },
    { name: 'setVolume', description: '设置媒体音量', icon: '🔉', params: ['level'] },
    { name: 'getNetworkType', description: '获取当前网络类型', icon: '📶', params: [] },
    { name: 'getStorageInfo', description: '获取存储空间信息', icon: '💾', params: [] },
    { name: 'getScreenInfo', description: '获取屏幕信息', icon: '🖥️', params: [] },
  ]},
  { category: '剪贴板', items: [
    { name: 'setClipboard', description: '将文本写入系统剪贴板', icon: '📋', params: ['text'] },
    { name: 'getClipboard', description: '读取系统剪贴板内容', icon: '📄', params: [] },
  ]},
]

const FUNCTION_LABELS: Record<string, { name: string; icon: string; color: string }> = {
  weather_current: { name: '查天气', icon: '🌤', color: 'bg-blue-100 text-blue-700' },
  web_search: { name: '搜网页', icon: '🔍', color: 'bg-indigo-100 text-indigo-700' },
  news_headlines: { name: '看新闻', icon: '📰', color: 'bg-red-100 text-red-700' },
  geo_location: { name: '查位置', icon: '📍', color: 'bg-green-100 text-green-700' },
  translate_text: { name: '翻译', icon: '🌐', color: 'bg-teal-100 text-teal-700' },
  send_notification: { name: '发通知', icon: '🔔', color: 'bg-orange-100 text-orange-700' },
  create_automation: { name: '定时', icon: '⏰', color: 'bg-purple-100 text-purple-700' },
  toast: { name: '提示', icon: '💬', color: 'bg-gray-100 text-gray-700' },
}

const SKILLS = [
  {
    id: 'skill-weather-notify',
    name: '查北京天气并通知我',
    description: '查询北京今天天气，发送系统通知到通知栏',
    icon: '🌤',
    steps: [
      { function: 'weather_current', type: 'mcp', args: { location: '北京' } },
      { function: 'send_notification', type: 'local', args: { title: '天气通知', content: '北京天气预报已播报' } },
    ],
  },
  {
    id: 'skill-daily-news',
    name: '每日新闻推送',
    description: '每天早上10点获取最新新闻头条并发送通知到通知栏',
    icon: '📰',
    cron: '0 10 * * *',
    steps: [
      { function: 'news_headlines', type: 'mcp', args: { category: '综合', limit: '5' } },
      { function: 'send_notification', type: 'local', args: { title: '每日新闻', content: '今日新闻摘要已生成，请查看' } },
    ],
  },
]

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
    } else if (section === 'mcp') {
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

  const filteredBuiltin = debouncedSearch
    ? BUILTIN_FUNCTIONS.map(group => ({
        ...group,
        items: group.items.filter(f =>
          f.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          f.description.toLowerCase().includes(debouncedSearch.toLowerCase())
        ),
      })).filter(g => g.items.length > 0)
    : BUILTIN_FUNCTIONS

  const filteredSkills = debouncedSearch
    ? SKILLS.filter(s =>
        s.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        s.description.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    : SKILLS

  const placeholderText = section === 'plugins' ? '搜索插件...'
    : section === 'mcp' ? '搜索 MCP 工具...'
    : section === 'builtin' ? '搜索内置函数...'
    : '搜索 Skill...'

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="mb-2 text-2xl font-bold text-gray-900">插件市场</h1>
        <p className="text-gray-500">浏览和发现 DEX 插件、MCP 工具、内置函数与 Skill</p>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={placeholderText}
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
          <button
            onClick={() => setSection('builtin')}
            className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium ${
              section === 'builtin'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Smartphone className="h-4 w-4" />
            内置函数
          </button>
          <button
            onClick={() => setSection('skill')}
            className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium ${
              section === 'skill'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Zap className="h-4 w-4" />
            Skill
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

      {loading && section !== 'builtin' && section !== 'skill' ? (
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
      ) : section === 'mcp' ? (
        filteredMcp.length === 0 ? (
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
        )
      ) : section === 'builtin' ? (
        <div className="space-y-8">
          {filteredBuiltin.length === 0 ? (
            <EmptyState title="没有找到内置函数" description="试试其他关键词" />
          ) : (
            filteredBuiltin.map((group) => (
              <div key={group.category}>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-400">
                  {group.category}
                </h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((fn) => (
                    <div
                      key={fn.name}
                      className="group rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-gray-300 hover:shadow-sm"
                    >
                      <div className="mb-3 flex items-center gap-3">
                        <span className="text-lg">{fn.icon}</span>
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900">{fn.name}</h4>
                          <p className="text-xs text-gray-500">{fn.description}</p>
                        </div>
                      </div>
                      {fn.params.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {fn.params.map((p) => (
                            <span key={p} className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-mono text-gray-600">
                              {p}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSkills.length === 0 ? (
            <EmptyState title="没有找到 Skill" description="暂无可用 Skill" />
          ) : (
            filteredSkills.map((skill) => (
              <div
                key={skill.id}
                className="group rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-primary-200 hover:shadow-md"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-2xl">{skill.icon}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold text-gray-900">{skill.name}</h3>
                      {'cron' in skill && (
                        <span className="rounded bg-purple-100 px-1.5 py-0.5 text-[10px] font-medium text-purple-600">
                          定时
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{skill.description}</p>
                    {'cron' in skill && (
                      <p className="mt-0.5 text-xs text-purple-500">
                        ⏰ {(skill as any).cron}
                      </p>
                    )}
                  </div>
                </div>

                <div className="relative mb-4">
                  {skill.steps.map((step, i) => {
                    const label = FUNCTION_LABELS[step.function] || { name: step.function, icon: '⚡', color: 'bg-gray-100 text-gray-700' }
                    return (
                      <div key={i} className="flex items-start gap-3">
                        {i > 0 && (
                          <div className="absolute left-[15px] top-0 h-4 w-0.5 -translate-y-3 bg-gray-200" style={{ marginTop: i === 1 ? '-4px' : '0' }} />
                        )}
                        <div className="flex flex-col items-center">
                          <span className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${label.color}`}>
                            {label.icon}
                          </span>
                          {i < skill.steps.length - 1 && <div className="h-4 w-0.5 bg-gray-200" />}
                        </div>
                        <div className="flex-1 pt-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-900">{label.name}</span>
                            <span className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${
                              step.type === 'mcp' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                            }`}>
                              {step.type === 'mcp' ? 'MCP' : '本地'}
                            </span>
                          </div>
                          <div className="mt-0.5 flex flex-wrap gap-1">
                            {Object.entries(step.args).map(([k, v]) => (
                              <span key={k} className="rounded bg-gray-50 px-1.5 py-0.5 text-[11px] font-mono text-gray-500">
                                {k}={typeof v === 'string' ? v : JSON.stringify(v)}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700">
                    使用
                  </button>
                  <button className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">
                    详情
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

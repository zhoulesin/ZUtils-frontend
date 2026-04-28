import { useState } from 'react'
import { X, Package, ExternalLink } from 'lucide-react'
import { pluginsApi } from '@/api/plugins.api'
import type { TestResult } from '@/types/test'
import type { ParameterDto, PluginCategory } from '@/types/plugin'
import { CATEGORY_LABELS } from '@/types/plugin'
import { ROUTES } from '@/constants/routes'

interface PublishPluginDialogProps {
  open: boolean
  onClose: () => void
  code: string
  testArgs: Record<string, unknown>
  lastResult: TestResult
}

export function PublishPluginDialog({
  open,
  onClose,
  code,
  testArgs,
  lastResult,
}: PublishPluginDialogProps) {
  const [functionName, setFunctionName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<PluginCategory>('UTILITY')
  const [className, setClassName] = useState('')
  const [parameters, setParameters] = useState<ParameterDto[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<{
    success: boolean
    pluginId?: string
    dexUrl?: string
    dexSize?: number
    className?: string
    error?: string
  } | null>(null)

  if (!open) return null

  const autoGenerate = () => {
    const fn = functionName || 'myFunction'
    const cn = fn.replace(/[^a-zA-Z0-9]/g, '') + 'Function'
    return { functionName: fn, className: cn }
  }

  const addParam = () => {
    setParameters([...parameters, { name: '', description: '', type: 'STRING', required: false }])
  }

  const updateParam = (i: number, field: keyof ParameterDto, value: string | boolean) => {
    setParameters(parameters.map((p, idx) =>
      idx === i ? { ...p, [field]: value } as ParameterDto : p
    ))
  }

  const removeParam = (i: number) => {
    setParameters(parameters.filter((_, idx) => idx !== i))
  }

  const handleSubmit = async () => {
    if (!functionName || !className) return
    setSubmitting(true)
    setResult(null)
    try {
      const ag = { functionName, description, category, className, parameters }
      const res = await pluginsApi.publishFromPlayground({
        code,
        ...ag,
        testArgs,
      })
      setResult(res)
    } catch (e: any) {
      setResult({ success: false, error: e?.response?.data?.message || 'Request failed' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div
        className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary-600" />
            <h3 className="text-lg font-semibold">发布为插件</h3>
          </div>
          <button onClick={onClose} className="rounded-lg p-1 hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        {!result ? (
          <div className="space-y-4">
            <div className="rounded-lg bg-green-50 p-3 text-xs text-green-700">
              代码已通过测试（{lastResult.durationMs}ms）
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">函数名 *</label>
                <input
                  value={functionName}
                  onChange={(e) => {
                    setFunctionName(e.target.value)
                    setClassName(e.target.value.replace(/[^a-zA-Z0-9]/g, '') + 'Function')
                  }}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none"
                  placeholder="greet"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">分类</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as PluginCategory)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none"
                >
                  {Object.entries(CATEGORY_LABELS).map(([v, l]) => (
                    <option key={v} value={v}>{l}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">描述</label>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none"
                placeholder="Function description"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">类名</label>
              <input
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm focus:border-primary-500 focus:outline-none"
                placeholder="GreetFunction"
              />
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">参数</label>
                <button
                  onClick={addParam}
                  className="text-xs text-primary-600 hover:underline"
                >
                  + 添加参数
                </button>
              </div>
              <div className="space-y-2">
                {parameters.map((p, i) => (
                  <div key={i} className="flex items-center gap-2 rounded-lg bg-gray-50 p-2">
                    <input
                      value={p.name}
                      onChange={(e) => updateParam(i, 'name', e.target.value)}
                      className="w-24 rounded border px-2 py-1 text-xs"
                      placeholder="name"
                    />
                    <select
                      value={p.type}
                      onChange={(e) => updateParam(i, 'type', e.target.value)}
                      className="rounded border px-2 py-1 text-xs"
                    >
                      <option value="STRING">String</option>
                      <option value="NUMBER">Number</option>
                      <option value="BOOLEAN">Boolean</option>
                      <option value="INTEGER">Integer</option>
                    </select>
                    <label className="flex items-center gap-1 text-xs text-gray-500">
                      <input
                        type="checkbox"
                        checked={p.required ?? false}
                        onChange={(e) => updateParam(i, 'required', e.target.checked)}
                      />
                      必填
                    </label>
                    <button
                      onClick={() => removeParam(i)}
                      className="ml-auto text-xs text-red-500 hover:underline"
                    >
                      删除
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {submitting && (
              <div className="text-sm text-gray-500 animate-pulse">生成 DEX 并发布中...</div>
            )}

            <button
              onClick={handleSubmit}
              disabled={submitting || !functionName || !className}
              className="w-full rounded-lg bg-primary-600 py-2 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50"
            >
              {submitting ? '发布中...' : '发布到插件市场'}
            </button>
          </div>
        ) : result.success ? (
          <div className="space-y-4">
            <div className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
              ✅ 插件已发布到市场
            </div>
            <div className="space-y-2 rounded-lg bg-gray-50 p-3 text-xs font-mono">
              <div><span className="text-gray-500">插件 ID:</span> {result.pluginId}</div>
              <div><span className="text-gray-500">类名:</span> {result.className}</div>
              <div><span className="text-gray-500">DEX 大小:</span> {result.dexSize} bytes</div>
            </div>
            <a
              href={ROUTES.PLUGIN_DETAIL(result.pluginId ?? '')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 rounded-lg bg-primary-600 py-2 text-sm font-semibold text-white hover:bg-primary-700"
            >
              <ExternalLink className="h-4 w-4" />
              查看插件详情
            </a>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
              ❌ 发布失败：{result.error}
            </div>
            <button
              onClick={() => setResult(null)}
              className="w-full rounded-lg border py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              重试
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

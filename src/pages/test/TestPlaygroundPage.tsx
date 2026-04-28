import { useState } from 'react'
import { Play, RotateCcw, Code2, Package } from 'lucide-react'
import { KotlinEditor } from '@/components/business/KotlinEditor'
import { TestResultPanel } from '@/components/business/TestResultPanel'
import { PublishPluginDialog } from '@/components/business/PublishPluginDialog'
import { PRESETS } from '@/constants/presets'
import { testApi } from '@/api/test.api'
import type { TestResult } from '@/types/test'
import { useDebounce } from '@/hooks/useDebounce'

export default function TestPlaygroundPage() {
  const [code, setCode] = useState(PRESETS[0]!.code)
  const [argsText, setArgsText] = useState(JSON.stringify(PRESETS[0]!.args, null, 2))
  const [activePreset, setActivePreset] = useState(PRESETS[0]!.name)
  const [result, setResult] = useState<TestResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [publishOpen, setPublishOpen] = useState(false)

  const debouncedArgs = useDebounce(argsText, 500)
  const parsedArgs = parseArgs(debouncedArgs)

  function parseArgs(text: string): Record<string, unknown> | null {
    try {
      const parsed = JSON.parse(text)
      if (typeof parsed !== 'object' || parsed === null) return null
      return parsed as Record<string, unknown>
    } catch {
      return null
    }
  }

  const handleRun = async () => {
    if (!parsedArgs) {
      setError('参数 JSON 格式错误')
      return
    }
    setError('')
    setLoading(true)
    try {
      const res = await testApi.run({ code, args: parsedArgs })
      setResult(res)
    } catch {
      setResult({ success: false, output: '', error: '服务端请求失败，请确认 Server 已启动', durationMs: 0 })
    } finally {
      setLoading(false)
    }
  }

  const applyPreset = (preset: typeof PRESETS[number]) => {
    setActivePreset(preset.name)
    setCode(preset.code)
    setArgsText(JSON.stringify(preset.args, null, 2))
    setResult(null)
    setError('')
  }

  return (
    <div className="mx-auto flex max-w-[1440px] flex-col" style={{ height: 'calc(100vh - 5rem)' }}>
      <div className="flex items-center justify-between border-b bg-white px-6 py-3">
        <div className="flex items-center gap-3">
          <Code2 className="h-5 w-5 text-primary-600" />
          <h1 className="text-base font-semibold text-gray-900">Kotlin Playground</h1>
          <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
            纯逻辑测试 · 无 Android API
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleRun}
            disabled={loading || !parsedArgs}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-primary-700 disabled:opacity-40"
          >
            <Play className="h-4 w-4" />
            运行
          </button>
          <button
            onClick={() => {
              setResult(null)
              setError('')
            }}
            className="inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            重置
          </button>
          <button
            onClick={() => setPublishOpen(true)}
            disabled={!result?.success}
            className="inline-flex items-center gap-1.5 rounded-lg border border-primary-200 bg-primary-50 px-3 py-1.5 text-sm font-medium text-primary-700 hover:bg-primary-100 disabled:opacity-30 disabled:cursor-not-allowed"
            title={result?.success ? '' : '请先运行代码并确保执行成功'}
          >
            <Package className="h-4 w-4" />
            发布为插件
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 border-b bg-gray-50 px-6 py-2">
        <span className="text-xs font-medium text-gray-400">预设：</span>
        {PRESETS.map((p) => (
          <button
            key={p.name}
            onClick={() => applyPreset(p)}
            className={`rounded-md px-2.5 py-1 text-xs font-medium ${
              activePreset === p.name
                ? 'bg-primary-100 text-primary-700'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {error && (
        <div className="bg-red-50 px-6 py-2 text-xs text-red-600">{error}</div>
      )}

      <div className="flex flex-1 overflow-hidden">
        <div className="flex w-3/5 flex-col border-r">
          <div className="flex items-center justify-between border-b bg-gray-50 px-4 py-1.5">
            <span className="text-xs font-medium text-gray-500">fun run(args: Map&lt;String, Any?&gt;): Any?</span>
            <span className="text-xs text-gray-400">Kotlin</span>
          </div>
          <div className="flex-1">
            <KotlinEditor value={code} onChange={setCode} />
          </div>
        </div>

        <div className="flex w-2/5 flex-col">
          <div className="flex flex-col border-b" style={{ height: '40%' }}>
            <div className="flex items-center justify-between border-b bg-gray-50 px-4 py-1.5">
              <span className="text-xs font-medium text-gray-500">参数 (JSON)</span>
              {!parsedArgs && (
                <span className="text-xs text-red-400">JSON 格式错误</span>
              )}
            </div>
            <textarea
              value={argsText}
              onChange={(e) => setArgsText(e.target.value)}
              className="flex-1 resize-none border-0 p-4 font-mono text-sm leading-relaxed outline-none"
              spellCheck={false}
            />
          </div>
          <div className="flex-1 overflow-auto p-4">
            <TestResultPanel result={result} loading={loading} />
          </div>
        </div>
      </div>

      {publishOpen && result?.success && (
        <PublishPluginDialog
          open={publishOpen}
          onClose={() => setPublishOpen(false)}
          code={code}
          testArgs={parsedArgs ?? {}}
          lastResult={result}
        />
      )}
    </div>
  )
}

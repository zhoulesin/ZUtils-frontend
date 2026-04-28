import { CheckCircle2, XCircle, Clock, Terminal } from 'lucide-react'
import type { TestResult } from '@/types/test'

interface TestResultPanelProps {
  result: TestResult | null
  loading: boolean
}

export function TestResultPanel({ result, loading }: TestResultPanelProps) {
  if (loading) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 text-gray-400">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
        <span className="text-sm">编译执行中...</span>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 text-gray-400">
        <Terminal className="h-10 w-10" />
        <span className="text-sm">点击「运行」测试你的代码</span>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex items-center gap-3 border-b pb-3">
        {result.success ? (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle2 className="h-5 w-5" />
            <span className="text-sm font-semibold">执行成功</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-red-600">
            <XCircle className="h-5 w-5" />
            <span className="text-sm font-semibold">执行失败</span>
          </div>
        )}
        <span className="flex items-center gap-1 text-xs text-gray-400">
          <Clock className="h-3 w-3" />
          {result.durationMs}ms
        </span>
      </div>

      {result.success ? (
        <div className="flex-1">
          <div className="mb-1 text-xs font-medium text-gray-500">输出：</div>
          <pre className="h-full overflow-auto rounded-lg bg-gray-900 p-4 font-mono text-sm leading-relaxed text-green-400">
            {result.output || (
              <span className="text-gray-500 italic">（无输出）</span>
            )}
          </pre>
        </div>
      ) : (
        <div className="flex-1">
          <div className="mb-1 text-xs font-medium text-gray-500">错误：</div>
          <pre className="h-full overflow-auto rounded-lg bg-red-50 p-4 font-mono text-sm leading-relaxed text-red-700">
            {result.error}
          </pre>
        </div>
      )}
    </div>
  )
}

import { PackageOpen } from 'lucide-react'

interface EmptyStateProps {
  title?: string
  description?: string
}

export function EmptyState({
  title = '暂无数据',
  description = '这里还没有内容',
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-gray-400">
      <PackageOpen className="mb-4 h-16 w-16" />
      <h3 className="mb-1 text-lg font-medium text-gray-600">{title}</h3>
      <p className="text-sm">{description}</p>
    </div>
  )
}

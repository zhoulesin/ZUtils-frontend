import { Link } from 'react-router-dom'
import { EmptyState } from '@/components/common/EmptyState'
import { ROUTES } from '@/constants/routes'

export default function ReviewListPage() {
  // Placeholder — will fetch from admin API when available
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">插件审核</h1>
      <EmptyState title="暂无待审核插件" description="新提交的插件会出现在这里" />
    </div>
  )
}

import { Link } from 'react-router-dom'
import { FileQuestion } from 'lucide-react'
import { ROUTES } from '@/constants/routes'

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-gray-400">
      <FileQuestion className="mb-4 h-24 w-24" />
      <h1 className="mb-2 text-4xl font-bold text-gray-600">404</h1>
      <p className="mb-6 text-lg">页面不存在</p>
      <Link to={ROUTES.HOME} className="rounded-lg bg-primary-600 px-6 py-2 text-sm font-medium text-white hover:bg-primary-700">
        返回首页
      </Link>
    </div>
  )
}

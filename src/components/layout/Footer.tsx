export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-primary-600">ZUtils</span>
            <span className="text-sm text-gray-500">AI 驱动的 Android 动态功能引擎</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="https://github.com/zhoulesin/ZUtils" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">
              GitHub
            </a>
            <span>© 2026 ZUtils Team</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

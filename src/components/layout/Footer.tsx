export function Footer() {
  return (
    <footer className="border-t border-raycast-border-solid bg-raycast-bg py-8">
      <div className="mx-auto max-w-7xl px-4 font-inter tracking-[0.2px] sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-raycast-text">ZPlatform</span>
            <span className="text-sm text-raycast-muted">AI 驱动的 Android 动态功能引擎</span>
          </div>
          <div className="flex gap-6 text-sm text-raycast-muted">
            <a href="https://github.com/zhoulesin/ZUtils" target="_blank" rel="noopener noreferrer" className="hover:text-raycast-text">
              GitHub
            </a>
            <span className="text-raycast-dim">© 2026 ZPlatform Team</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/auth.store'
import { ROUTES } from '@/constants/routes'
import { useState } from 'react'

export function Navbar() {
  const { isAuthenticated, user, logout } = useAuthStore()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate(ROUTES.HOME)
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to={ROUTES.HOME} className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary-600">ZUtils</span>
          <span className="hidden text-sm text-gray-500 sm:inline">Plugin Market</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link to={ROUTES.MARKETPLACE} className="text-sm font-medium text-gray-600 hover:text-gray-900">
            市场
          </Link>
          {isAuthenticated ? (
            <>
              <Link to={ROUTES.DEV_PLUGINS} className="text-sm font-medium text-gray-600 hover:text-gray-900">
                开发者
              </Link>
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 text-sm font-medium hover:bg-gray-200"
                >
                  <span className="h-6 w-6 rounded-full bg-primary-500 text-white flex items-center justify-center text-xs">
                    {user?.username?.charAt(0).toUpperCase()}
                  </span>
                  {user?.username}
                </button>
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg border bg-white py-1 shadow-lg">
                    <Link to={ROUTES.DEV_DASHBOARD} className="block px-4 py-2 text-sm hover:bg-gray-50">
                      仪表盘
                    </Link>
                    <Link to={ROUTES.DEV_PLUGINS} className="block px-4 py-2 text-sm hover:bg-gray-50">
                      我的插件
                    </Link>
                    <hr className="my-1" />
                    <button onClick={handleLogout} className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50">
                      退出登录
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link
              to={ROUTES.LOGIN}
              className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
            >
              登录
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

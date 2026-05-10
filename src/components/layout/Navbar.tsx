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
    <nav className="sticky top-0 z-50 border-b border-[#252829] bg-raycast-bg/80 backdrop-blur-md font-inter">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 tracking-[0.2px] sm:px-6 lg:px-8">
        <Link to={ROUTES.HOME} className="flex items-center gap-2">
          <span className="text-2xl font-bold text-raycast-text">ZPlatform</span>
          <span className="hidden text-sm text-raycast-muted sm:inline">能力平台</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link to={ROUTES.MARKETPLACE} className="text-sm font-medium text-raycast-muted hover:text-raycast-text">
            市场
          </Link>
          {isAuthenticated ? (
            <>
              <Link to={ROUTES.DEV_PLUGINS} className="text-sm font-medium text-raycast-muted hover:text-raycast-text">
                开发者
              </Link>
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center gap-2 rounded-full bg-raycast-elevated px-3 py-1.5 text-sm font-medium text-raycast-text"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-raycast-surface text-xs text-raycast-text">
                    {user?.username?.charAt(0).toUpperCase()}
                  </span>
                  {user?.username}
                </button>
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg border border-[#252829] bg-raycast-surface py-1 shadow-lg">
                    <Link to={ROUTES.DEV_DASHBOARD} className="block px-4 py-2 text-sm text-raycast-muted hover:text-raycast-text">
                      仪表盘
                    </Link>
                    <Link to={ROUTES.DEV_PLUGINS} className="block px-4 py-2 text-sm text-raycast-muted hover:text-raycast-text">
                      我的插件
                    </Link>
                    <Link to={ROUTES.DEV_PROFILE} className="block px-4 py-2 text-sm text-raycast-muted hover:text-raycast-text">
                      个人设置
                    </Link>
                    <hr className="my-1 border-[#252829]" />
                    <button onClick={handleLogout} className="block w-full px-4 py-2 text-left text-sm text-raycast-red hover:text-raycast-text">
                      退出登录
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link
              to={ROUTES.LOGIN}
              className="rounded-full px-4 py-2 text-sm font-medium"
              style={{ backgroundColor: 'hsla(0,0%,100%,0.815)', color: '#18191a' }}
            >
              登录
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

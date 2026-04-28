import { NavLink, Outlet } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'

const sidebarLinks = [
  { to: ROUTES.DEV_DASHBOARD, label: '仪表盘' },
  { to: ROUTES.DEV_PLUGINS, label: '我的插件' },
  { to: '/dev/playground', label: '创建插件' },
]

export function DevLayout() {
  return (
    <div className="mx-auto flex max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <aside className="hidden w-56 shrink-0 md:block">
        <nav className="space-y-1">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end
              className={({ isActive }) =>
                `block rounded-lg px-4 py-2 text-sm font-medium ${
                  isActive ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="min-w-0 flex-1">
        <Outlet />
      </div>
    </div>
  )
}

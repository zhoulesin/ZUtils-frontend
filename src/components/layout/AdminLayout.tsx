import { NavLink, Outlet } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'

const sidebarLinks = [
  { to: ROUTES.ADMIN, label: '概览' },
  { to: ROUTES.ADMIN_REVIEWS, label: '插件审核' },
]

export function AdminLayout() {
  return (
    <div className="mx-auto flex max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <aside className="hidden w-56 shrink-0 md:block">
        <div className="mb-4 px-4 text-xs font-semibold uppercase tracking-wider text-gray-400">管理后台</div>
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

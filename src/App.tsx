import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { DevLayout } from '@/components/layout/DevLayout'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { ErrorBoundary } from '@/components/common/ErrorBoundary'
import { ROUTES } from '@/constants/routes'
import { lazy, Suspense } from 'react'

const HomePage = lazy(() => import('@/pages/HomePage'))
const MarketplacePage = lazy(() => import('@/pages/marketplace/MarketplacePage'))
const PluginDetailPage = lazy(() => import('@/pages/marketplace/PluginDetailPage'))
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'))
const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage'))
const DashboardPage = lazy(() => import('@/pages/dev/DashboardPage'))
const MyPluginsPage = lazy(() => import('@/pages/dev/MyPluginsPage'))
const CreatePluginPage = lazy(() => import('@/pages/dev/CreatePluginPage'))
const NewVersionPage = lazy(() => import('@/pages/dev/NewVersionPage'))
const AdminDashboardPage = lazy(() => import('@/pages/admin/AdminDashboardPage'))
const ReviewListPage = lazy(() => import('@/pages/admin/ReviewListPage'))
const TestPlaygroundPage = lazy(() => import('@/pages/test/TestPlaygroundPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

function PageLoader() {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route element={<Layout />}>
              <Route path={ROUTES.HOME} element={<HomePage />} />
              <Route path={ROUTES.MARKETPLACE} element={<MarketplacePage />} />
              <Route path="/marketplace/:id" element={<PluginDetailPage />} />

              <Route path={ROUTES.LOGIN} element={<LoginPage />} />
              <Route path={ROUTES.REGISTER} element={<RegisterPage />} />

              <Route path="/dev" element={<DevLayout />}>
                <Route index element={<DashboardPage />} />
                <Route path="plugins" element={<MyPluginsPage />} />
                <Route path="playground" element={<TestPlaygroundPage />} />
                <Route path="plugins/:id/versions/new" element={<NewVersionPage />} />
              </Route>

              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboardPage />} />
                <Route path="plugins" element={<ReviewListPage />} />
              </Route>

              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  )
}

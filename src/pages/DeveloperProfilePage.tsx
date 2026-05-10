import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { User, Package, Download, ArrowLeft } from 'lucide-react'
import { developersApi } from '@/api/developers.api'
import type { DeveloperProfile } from '@/api/developers.api'
import { LoadingSkeleton } from '@/components/common/LoadingSkeleton'
import { EmptyState } from '@/components/common/EmptyState'
import { CATEGORY_LABELS } from '@/types/plugin'
import { formatNumber } from '@/utils/formatters'
import { ROUTES } from '@/constants/routes'

export default function DeveloperProfilePage() {
  const { memberUid } = useParams<{ memberUid: string }>()
  const [profile, setProfile] = useState<DeveloperProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!memberUid) return
    setLoading(true)
    setError(null)
    developersApi.getPublicProfile(memberUid)
      .then((res) => setProfile(res.data))
      .catch(() => setError('开发者不存在'))
      .finally(() => setLoading(false))
  }, [memberUid])

  if (loading) return <LoadingSkeleton />
  if (error || !profile) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <EmptyState title="开发者不存在" description={error || '未找到该开发者资料'} />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        to={ROUTES.MARKETPLACE}
        className="mb-6 inline-flex items-center gap-1 text-sm text-raycast-muted hover:text-raycast-text"
      >
        <ArrowLeft className="h-4 w-4" />返回市场
      </Link>

      <div className="mb-8 rounded-xl border border-raycast-border-solid bg-raycast-surface p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-primary-500/10 text-3xl text-primary-400">
            {profile.avatarUrl ? (
              <img src={profile.avatarUrl} alt="" className="h-20 w-20 rounded-xl object-cover" />
            ) : (
              <User className="h-10 w-10" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold text-raycast-text">{profile.nickname}</h1>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                profile.role === 'ADMIN' ? 'bg-purple-500/10 text-purple-400' : 'bg-raycast-blue/10 text-raycast-blue'
              }`}>
                {profile.role === 'ADMIN' ? '管理员' : '开发者'}
              </span>
            </div>
            <p className="mb-3 text-sm text-raycast-muted">@{profile.memberUid}</p>
            {profile.bio && (
              <p className="text-sm text-raycast-muted">{profile.bio}</p>
            )}
            <div className="mt-4 flex gap-6">
              <div className="flex items-center gap-1.5 text-sm text-raycast-muted">
                <Package className="h-4 w-4 text-raycast-dim" />
                <span className="font-semibold text-raycast-text">{profile.pluginCount}</span> 个插件
              </div>
              <div className="flex items-center gap-1.5 text-sm text-raycast-muted">
                <Download className="h-4 w-4 text-raycast-dim" />
                <span className="font-semibold text-raycast-text">{formatNumber(profile.totalDownloads)}</span> 次下载
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 className="mb-4 text-lg font-semibold text-raycast-text">开发的插件</h2>
      {profile.plugins.length === 0 ? (
        <EmptyState title="暂无插件" description="该开发者还没有发布任何插件" />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {profile.plugins.map((p) => (
            <Link
              key={p.id}
              to={ROUTES.PLUGIN_DETAIL(p.id)}
              className="rounded-xl border border-raycast-border-solid bg-raycast-surface p-5 transition-all hover:border-primary-200 hover:shadow-md"
            >
              <h3 className="mb-1 font-semibold text-raycast-text">{p.functionName}</h3>
              <p className="mb-3 line-clamp-2 text-sm text-raycast-muted">{p.description}</p>
              <div className="flex items-center gap-3 text-xs text-raycast-dim">
                <span>v{p.version}</span>
                <span>{formatNumber(p.downloads)} 次下载</span>
                <span className="ml-auto text-yellow-500">★ {p.rating.toFixed(1)}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

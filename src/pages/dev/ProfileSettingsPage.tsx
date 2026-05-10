import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/auth.store'
import { authApi } from '@/api/auth.api'
import { developersApi } from '@/api/developers.api'
import { ROUTES } from '@/constants/routes'

export default function ProfileSettingsPage() {
  const { user, updateUser } = useAuthStore()
  const navigate = useNavigate()

  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [bio, setBio] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      navigate(ROUTES.LOGIN)
      return
    }
    if (user.memberUid) {
      developersApi.getPublicProfile(user.memberUid)
        .then((res) => {
          const p = res.data
          setNickname(p.nickname || '')
          setEmail(user.email)
          setAvatarUrl(p.avatarUrl || '')
          setBio(p.bio || '')
          updateUser({ bio: p.bio || '' })
        })
        .catch(() => setNickname(user.nickname))
        .finally(() => setLoading(false))
    } else {
      setNickname(user.nickname)
      setEmail(user.email)
      setAvatarUrl(user.avatarUrl)
      setBio(user.bio)
      setLoading(false)
    }
  }, [user])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
      </div>
    )
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage(null)
    try {
      const res = await authApi.updateProfile({
        nickname: nickname || undefined,
        email: email || undefined,
        avatarUrl: avatarUrl || undefined,
        bio: bio || undefined,
      })
      updateUser({
        nickname: res.data.nickname,
        email: res.data.email,
        avatarUrl,
        bio,
      })
      setMessage({ type: 'success', text: '保存成功' })
      setCurrentPassword('')
      setNewPassword('')
    } catch {
      setMessage({ type: 'error', text: '保存失败，请重试' })
    } finally {
      setSaving(false)
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentPassword || !newPassword) {
      setMessage({ type: 'error', text: '请输入当前密码和新密码' })
      return
    }
    setSaving(true)
    setMessage(null)
    try {
      const res = await authApi.updateProfile({
        currentPassword,
        newPassword,
      })
      updateUser({
        nickname: res.data.nickname,
        email: res.data.email,
      })
      setMessage({ type: 'success', text: '密码修改成功' })
      setCurrentPassword('')
      setNewPassword('')
    } catch (err: any) {
      const msg = err?.response?.data?.message || '密码修改失败'
      setMessage({ type: 'error', text: msg })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-raycast-text">个人设置</h1>

      {message && (
        <div className={`mb-4 rounded-lg px-4 py-3 text-sm ${
          message.type === 'success' ? 'bg-raycast-green/10 text-raycast-green' : 'bg-raycast-red/10 text-raycast-red'
        }`}>
          {message.text}
        </div>
      )}

      <div className="space-y-6">
        <form onSubmit={handleSave} className="space-y-5 rounded-xl border-raycast-border-solid bg-raycast-surface p-6">
          <h2 className="text-base font-semibold text-raycast-text">基本信息</h2>

          {user?.memberUid && (
            <div>
              <label className="mb-1 block text-sm font-medium text-raycast-muted">开发者 ID</label>
              <input
                type="text"
                value={user.memberUid}
                disabled
                className="w-full rounded-lg border border-raycast-border-solid bg-raycast-elevated px-4 py-2 text-sm text-raycast-muted"
              />
              <p className="mt-1 text-xs text-raycast-dim">memberUid 不可修改</p>
            </div>
          )}

          <div>
            <label className="mb-1 block text-sm font-medium text-raycast-muted">昵称</label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              maxLength={50}
              className="w-full rounded-lg border border-raycast-border-solid bg-raycast-elevated px-4 py-2.5 text-sm text-raycast-text placeholder:text-raycast-dim focus:border-primary-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-raycast-muted">邮箱</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength={100}
              className="w-full rounded-lg border border-raycast-border-solid bg-raycast-elevated px-4 py-2.5 text-sm text-raycast-text placeholder:text-raycast-dim focus:border-primary-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-raycast-muted">头像 URL</label>
            <input
              type="text"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              maxLength={500}
              placeholder="https://..."
              className="w-full rounded-lg border border-raycast-border-solid bg-raycast-elevated px-4 py-2.5 text-sm text-raycast-text placeholder:text-raycast-dim focus:border-primary-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-raycast-muted">个人简介</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              maxLength={1000}
              rows={3}
              placeholder="介绍一下自己..."
              className="w-full rounded-lg border border-raycast-border-solid bg-raycast-elevated px-4 py-2.5 text-sm text-raycast-text placeholder:text-raycast-dim focus:border-primary-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-primary-600 px-6 py-2 text-sm font-medium text-white hover:bg-primary-500 disabled:opacity-50"
          >
            {saving ? '保存中...' : '保存'}
          </button>
        </form>

        <form onSubmit={handleChangePassword} className="space-y-5 rounded-xl border-raycast-border-solid bg-raycast-surface p-6">
          <h2 className="text-base font-semibold text-raycast-text">修改密码</h2>

          <div>
            <label className="mb-1 block text-sm font-medium text-raycast-muted">当前密码</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full rounded-lg border border-raycast-border-solid bg-raycast-elevated px-4 py-2.5 text-sm text-raycast-text placeholder:text-raycast-dim focus:border-primary-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-raycast-muted">新密码</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="至少 8 位，含大小写字母和数字"
              className="w-full rounded-lg border border-raycast-border-solid bg-raycast-elevated px-4 py-2.5 text-sm text-raycast-text placeholder:text-raycast-dim focus:border-primary-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="rounded-lg border-raycast-border-solid bg-raycast-surface px-6 py-2 text-sm font-medium text-raycast-text hover:bg-raycast-elevated disabled:opacity-50"
          >
            {saving ? '修改中...' : '修改密码'}
          </button>
        </form>
      </div>
    </div>
  )
}

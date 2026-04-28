import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Upload } from 'lucide-react'
import { versionsApi } from '@/api/versions.api'
import type { ParameterDto, DependencyDto } from '@/types/plugin'
import { ROUTES } from '@/constants/routes'

export default function NewVersionPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [version, setVersion] = useState('1.0.0')
  const [className, setClassName] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [changelog, setChangelog] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const calculateChecksum = async (_file: File): Promise<string> => {
    const buf = await _file.arrayBuffer()
    const hash = await crypto.subtle.digest('SHA-256', buf)
    return 'sha256:' + Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, '0')).join('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!id || !file) return
    setSubmitting(true)
    setError('')
    try {
      const checksum = await calculateChecksum(file)
      await versionsApi.create(id, {
        version,
        className,
        parameters: [],
        requiredPermissions: [],
        dependencies: [],
        changelog,
      }, file)
      navigate(ROUTES.DEV_PLUGINS)
    } catch {
      setError('发布失败，请稍后重试')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">发布新版本</h1>
      <form onSubmit={handleSubmit} className="space-y-5 rounded-xl border bg-white p-6">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">版本号 *</label>
          <input
            value={version}
            onChange={(e) => setVersion(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-primary-500 focus:outline-none"
            placeholder="1.0.0"
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">实现类全限定名 *</label>
          <input
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm font-mono text-sm focus:border-primary-500 focus:outline-none"
            placeholder="com.example.GetWeatherFunction"
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">DEX 文件 *</label>
          <div className="mt-1 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 px-6 py-8">
            <div className="text-center">
              <Upload className="mx-auto mb-2 h-8 w-8 text-gray-400" />
              {file ? (
                <p className="text-sm text-gray-600">{file.name} ({(file.size / 1024).toFixed(1)} KB)</p>
              ) : (
                <>
                  <p className="text-sm text-gray-500">拖拽或点击选择 DEX 文件</p>
                  <input
                    type="file"
                    accept=".dex"
                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                    className="mt-2 text-sm"
                    required
                  />
                </>
              )}
            </div>
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">更新日志</label>
          <textarea
            value={changelog}
            onChange={(e) => setChangelog(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-primary-500 focus:outline-none"
            rows={3}
            placeholder="本次更新的内容..."
          />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={submitting || !file}
          className="w-full rounded-lg bg-primary-600 py-2 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50"
        >
          {submitting ? '发布中...' : '发布版本'}
        </button>
      </form>
    </div>
  )
}

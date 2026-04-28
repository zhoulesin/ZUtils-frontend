import { Link } from 'react-router-dom'
import { ArrowRight, Puzzle, Code, Shield } from 'lucide-react'
import { ROUTES } from '@/constants/routes'

const features = [
  {
    icon: Puzzle,
    title: '丰富插件',
    desc: '从天气查询到二维码生成，不断扩展的能力库',
  },
  {
    icon: Code,
    title: '开发者友好',
    desc: '编写 ZFunction 接口，编译 DEX，一键上传发布',
  },
  {
    icon: Shield,
    title: '安全可靠',
    desc: 'DEX 签名校验 + 权限隔离 + 人工审核保障安全',
  },
]

export default function HomePage() {
  return (
    <div>
      <section className="border-b border-gray-200 bg-gradient-to-b from-primary-50 to-white py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            ZUtils <span className="text-primary-600">Plugin Market</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
            发现、安装、管理 ZUtils Android App 的 DEX 插件。让 AI 驱动的手机助手能力无限扩展。
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              to={ROUTES.MARKETPLACE}
              className="rounded-xl bg-primary-600 px-6 py-3 text-sm font-semibold text-white hover:bg-primary-700"
            >
              浏览市场
              <ArrowRight className="ml-2 inline h-4 w-4" />
            </Link>
            <Link
              to={ROUTES.DEV_PLUGINS_NEW}
              className="rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              发布插件
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-2 text-2xl font-bold text-gray-900">为什么使用 ZUtils 插件？</h2>
            <p className="text-gray-500">扩展 Android App 能力的最简单方式</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-xl border bg-white p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50">
                  <f.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">{f.title}</h3>
                <p className="text-sm text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

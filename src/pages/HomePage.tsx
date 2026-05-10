import { Link } from 'react-router-dom'
import { ArrowRight, MessageSquare, Puzzle, Zap, Shield } from 'lucide-react'
import { motion } from 'framer-motion'
import { ROUTES } from '@/constants/routes'
import { PhoneMockup } from '@/components/mockups/PhoneMockup'
import { useEffect, useState } from 'react'
import { pluginsApi } from '@/api/plugins.api'
import type { PluginListResponse } from '@/types/plugin'

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: 'easeOut' as const },
}

const fadeLeft = {
  initial: { opacity: 0, x: -40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: 'easeOut' as const },
}

const fadeRight = {
  initial: { opacity: 0, x: 40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: 'easeOut' as const },
}

const stagger = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease: 'easeOut' as const },
}

/* ===== Inline screen mockups ===== */

function ChatScreen() {
  return (
    <div className="flex h-full flex-col text-xs" style={{ color: '#f9f9f9' }}>
      {/* Status bar */}
      <div className="mb-2 flex items-center justify-between px-1 py-1 text-[10px]" style={{ color: '#6a6b6c' }}>
        <span>9:41</span>
        <div className="flex gap-1">🔋</div>
      </div>
      {/* Header */}
      <div className="mb-3 rounded-xl px-3 py-2" style={{ backgroundColor: '#101111' }}>
        <div className="text-[11px] font-semibold" style={{ color: '#f9f9f9' }}>ZOffice 助理</div>
        <div className="text-[9px]" style={{ color: '#6a6b6c' }}>一句话办事</div>
      </div>
      {/* Chat messages */}
      <div className="flex flex-1 flex-col gap-2 overflow-hidden">
        <div className="self-start max-w-[80%] rounded-2xl rounded-bl-md px-3 py-2" style={{ backgroundColor: '#1b1c1e' }}>
          <div className="text-[10px] font-medium" style={{ color: '#55b3ff' }}>北京今天天气</div>
          <div className="mt-1 text-[10px]" style={{ color: '#9c9c9d' }}>正在解析意图...</div>
        </div>
        <div className="self-end max-w-[85%] rounded-2xl rounded-br-md px-3 py-2" style={{ backgroundColor: '#101111', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-1.5">
            <span>🌤</span>
            <span className="text-[10px] font-semibold" style={{ color: '#f9f9f9' }}>22°C</span>
          </div>
          <div className="mt-0.5 text-[9px]" style={{ color: '#9c9c9d' }}>北京 · 多云 · 湿度45%</div>
          <div className="mt-1 flex gap-2 text-[9px]" style={{ color: '#6a6b6c' }}>
            <span>⬆ 26°</span><span>⬇ 14°</span>
          </div>
        </div>
        <div className="mt-auto rounded-xl px-3 py-2" style={{ backgroundColor: '#101111', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="text-[9px]" style={{ color: '#6a6b6c' }}>说出或输入你的办公需求</div>
        </div>
      </div>
    </div>
  )
}

function MarketScreen() {
  return (
    <div className="flex h-full flex-col text-xs" style={{ color: '#f9f9f9' }}>
      <div className="mb-2 flex items-center justify-between px-1 py-1 text-[10px]" style={{ color: '#6a6b6c' }}>
        <span>9:41</span>
      </div>
      <div className="mb-2 flex items-center justify-between">
        <div className="text-[11px] font-semibold" style={{ color: '#f9f9f9' }}>市场</div>
        <div className="rounded-full px-2 py-0.5 text-[9px] font-medium" style={{ backgroundColor: '#FF6363', color: '#fff' }}>3个可用</div>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        {[
          { icon: '🧮', name: '计算器', tag: '工具', color: '#55b3ff' },
          { icon: '🔲', name: '二维码', tag: '工具', color: '#5fc992' },
          { icon: '🆔', name: 'UUID', tag: '工具', color: '#ffbc33' },
          { icon: '🔤', name: '字符串', tag: '文本', color: '#FF6363' },
        ].map((p) => (
          <div key={p.name} className="flex items-center gap-2 rounded-xl px-3 py-2" style={{ backgroundColor: '#101111', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="flex h-7 w-7 items-center justify-center rounded-lg text-sm" style={{ backgroundColor: '#1b1c1e' }}>{p.icon}</div>
            <div className="flex-1">
              <div className="text-[10px] font-semibold">{p.name}</div>
              <div className="text-[8px]" style={{ color: '#6a6b6c' }}>v1.0</div>
            </div>
            <div className="rounded-md px-1.5 py-0.5 text-[8px] font-medium" style={{ backgroundColor: `${p.color}20`, color: p.color }}>{p.tag}</div>
          </div>
        ))}
        <div className="mt-auto rounded-xl px-3 py-2 text-center text-[9px]" style={{ backgroundColor: '#101111', border: '1px dashed rgba(255,255,255,0.1)', color: '#6a6b6c' }}>
          搜索更多插件...
        </div>
      </div>
    </div>
  )
}

function DexScreen() {
  return (
    <div className="flex h-full flex-col text-xs" style={{ color: '#f9f9f9' }}>
      <div className="mb-2 flex items-center justify-between px-1 py-1 text-[10px]" style={{ color: '#6a6b6c' }}>
        <span>9:41</span>
      </div>
      <div className="mb-3 rounded-xl px-3 py-2" style={{ backgroundColor: '#101111' }}>
        <div className="text-[11px] font-semibold" style={{ color: '#f9f9f9' }}>自动化规则</div>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        {[
          { name: '早安天气', cron: '0 8 * * *', icon: '🌤' },
          { name: '每日新闻', cron: '0 10 * * *', icon: '📰' },
          { name: '下班提醒', cron: '0 18 * * 1-5', icon: '⏰' },
        ].map((r) => (
          <div key={r.name} className="flex items-center gap-2 rounded-xl px-3 py-2" style={{ backgroundColor: '#101111', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="text-lg">{r.icon}</div>
            <div className="flex-1">
              <div className="text-[10px] font-semibold">{r.name}</div>
              <div className="text-[8px]" style={{ color: '#6a6b6c' }}>{r.cron}</div>
            </div>
            <div className="h-3.5 w-6 rounded-full" style={{ backgroundColor: '#5fc992' }}>
              <div className="h-3 w-3 translate-x-3 rounded-full bg-white" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function HomePage() {
  const [featured, setFeatured] = useState<PluginListResponse[]>([])

  useEffect(() => {
    pluginsApi.list({ page: 0, size: 4 }).then((res) => {
      if (res?.data?.content) setFeatured(res.data.content)
    }).catch(() => {})
  }, [])

  return (
    <div className="font-inter" style={{ backgroundColor: '#07080a' }}>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ backgroundColor: '#07080a' }}>
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
            <motion.div className="flex-1 text-center lg:text-left" {...fadeLeft}>
              <div
                className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5"
                style={{ backgroundColor: '#1b1c1e', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#5fc992' }} />
                <span className="text-sm" style={{ color: '#9c9c9d', letterSpacing: '0.2px' }}>
                  v1.0 — AI 驱动的能力平台
                </span>
              </div>
              <h1
                className="mb-6 max-w-3xl text-5xl font-normal leading-tight sm:text-6xl"
                style={{
                  color: '#f9f9f9',
                  letterSpacing: '0.2px',
                  fontFeatureSettings: '"calt","kern","liga","ss03"',
                }}
              >
                用 <span style={{ color: '#FF6363' }}>自然语言</span><br />
                驱动你的手机
              </h1>
              <p
                className="mb-8 max-w-xl text-lg"
                style={{ color: '#9c9c9d', letterSpacing: '0.2px' }}
              >
                ZPlatform 将 AI 助理、能力市场和自动化引擎合为一体。
                说一句话，App 自动执行 — 查天气、发微信、管理日程。
              </p>
              <div className="flex items-center gap-4 lg:justify-start">
                <Link
                  to={ROUTES.MARKETPLACE}
                  className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-base font-semibold transition-opacity hover:opacity-60"
                  style={{ backgroundColor: 'hsla(0,0%,100%,0.815)', color: '#18191a', letterSpacing: '0.3px' }}
                >
                  探索能力 <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to={ROUTES.DEV_PLUGINS_NEW}
                  className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-base font-semibold transition-opacity hover:opacity-60"
                  style={{ border: '1px solid rgba(255,255,255,0.1)', color: '#6a6b6c', boxShadow: 'rgba(0,0,0,0.03) 0px 7px 3px' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#f9f9f9')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#6a6b6c')}
                >
                  发布插件
                </Link>
              </div>
            </motion.div>
            <motion.div className="flex-shrink-0" {...fadeRight}>
              <PhoneMockup screen={<ChatScreen />} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* App Preview Triptych */}
      <section className="py-20" style={{ backgroundColor: '#07080a' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div className="mb-14 text-center" {...fadeUp}>
            <h2 className="mb-3 text-3xl font-medium" style={{ color: '#f9f9f9', letterSpacing: '0.2px' }}>
              一个 App，三种能力
            </h2>
            <p className="text-base" style={{ color: '#9c9c9d', letterSpacing: '0.2px' }}>
              AI 驱动的全能平台
            </p>
          </motion.div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: <MessageSquare className="h-5 w-5" style={{ color: '#55b3ff' }} />,
                title: 'AI 助理',
                desc: '自然语言输入，LLM 自动解析并执行多步工作链',
                screen: <ChatScreen />,
              },
              {
                icon: <Puzzle className="h-5 w-5" style={{ color: '#5fc992' }} />,
                title: '能力市场',
                desc: 'DEX 插件、MCP 工具、Skill，即装即用',
                screen: <MarketScreen />,
              },
              {
                icon: <Zap className="h-5 w-5" style={{ color: '#ffbc33' }} />,
                title: '自动化引擎',
                desc: '定时规则 + AccessibilityService，全自动执行',
                screen: <DexScreen />,
              },
            ].map((item, i) => (
              <motion.div key={item.title} {...stagger} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <div
                  className="rounded-2xl p-6 text-center"
                  style={{
                    backgroundColor: '#101111',
                    border: '1px solid rgba(255,255,255,0.06)',
                    boxShadow: 'rgb(27,28,30) 0px 0px 0px 1px, rgb(7,8,10) 0px 0px 0px 1px inset',
                  }}
                >
                  <PhoneMockup screen={item.screen} className="mb-4" />
                  <div className="mb-3 mt-4 flex items-center justify-center gap-2">
                    {item.icon}
                    <h3 className="text-lg font-medium" style={{ color: '#f9f9f9' }}>{item.title}</h3>
                  </div>
                  <p className="text-sm font-medium" style={{ color: '#9c9c9d', letterSpacing: '0.2px' }}>
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capability Showcase */}
      <section className="py-20" style={{ backgroundColor: '#07080a' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div className="mb-14 text-center" {...fadeUp}>
            <h2 className="mb-3 text-3xl font-medium" style={{ color: '#f9f9f9', letterSpacing: '0.2px' }}>
              为开发者而生
            </h2>
            <p className="text-base" style={{ color: '#9c9c9d', letterSpacing: '0.2px' }}>
              从编写到发布，全链路工具链
            </p>
          </motion.div>
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              { icon: <Shield className="h-6 w-6" />, title: '安全沙箱', desc: 'DEX 签名校验 + SHA-256 完整性验证 + 权限隔离，保障插件安全' },
              { icon: <Zap className="h-6 w-6" />, title: '热加载', desc: '无需重启 App，动态下载加载 DEX 插件，体验如丝般顺滑' },
              { icon: <Puzzle className="h-6 w-6" />, title: 'MCP 兼容', desc: '支持 MCP 协议远程工具，对接任意云端能力' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="rounded-2xl p-6"
                style={{
                  backgroundColor: '#101111',
                  border: '1px solid rgba(255,255,255,0.06)',
                  boxShadow: 'rgb(27,28,30) 0px 0px 0px 1px, rgb(7,8,10) 0px 0px 0px 1px inset',
                }}
                {...stagger}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: '#1b1c1e', color: '#FF6363' }}>
                  {item.icon}
                </div>
                <h3 className="mb-2 text-lg font-medium" style={{ color: '#f9f9f9' }}>{item.title}</h3>
                <p className="text-sm font-medium" style={{ color: '#9c9c9d', letterSpacing: '0.2px' }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Plugins */}
      {featured.length > 0 && (
        <section className="py-20" style={{ backgroundColor: '#07080a' }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div className="mb-10 flex items-center justify-between" {...fadeUp}>
              <h2 className="text-3xl font-medium" style={{ color: '#f9f9f9', letterSpacing: '0.2px' }}>
                热门插件
              </h2>
              <Link
                to={ROUTES.MARKETPLACE}
                className="inline-flex items-center gap-1 text-sm font-semibold transition-opacity hover:opacity-60"
                style={{ color: '#9c9c9d', letterSpacing: '0.3px' }}
              >
                查看全部 <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((plugin, i) => (
                <motion.div
                  key={plugin.id}
                  className="rounded-2xl p-5"
                  style={{
                    backgroundColor: '#101111',
                    border: '1px solid rgba(255,255,255,0.06)',
                    boxShadow: 'rgb(27,28,30) 0px 0px 0px 1px, rgb(7,8,10) 0px 0px 0px 1px inset',
                  }}
                  {...stagger}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <div className="mb-3 flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl text-lg"
                      style={{ backgroundColor: '#1b1c1e' }}
                    >
                      {plugin.icon || '🧩'}
                    </div>
                    <div>
                      <div className="text-sm font-semibold" style={{ color: '#f9f9f9' }}>
                        {plugin.functionName || plugin.id}
                      </div>
                      <div className="text-xs font-medium" style={{ color: '#6a6b6c' }}>
                        v{plugin.version}
                      </div>
                    </div>
                  </div>
                  <p
                    className="mb-3 text-xs font-medium line-clamp-2"
                    style={{ color: '#9c9c9d', letterSpacing: '0.2px' }}
                  >
                    {plugin.description}
                  </p>
                  <div className="flex items-center gap-3 text-xs font-medium" style={{ color: '#6a6b6c' }}>
                    <span>{plugin.downloads || 0} 下载</span>
                    <span>·</span>
                    <span>{plugin.authorNickname || plugin.author || '未知'}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <section className="pb-24 pt-8" style={{ backgroundColor: '#07080a' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="rounded-3xl p-14 text-center"
            style={{
              backgroundColor: '#101111',
              border: '1px solid rgba(255,255,255,0.06)',
              boxShadow: 'rgb(27,28,30) 0px 0px 0px 1px, rgb(7,8,10) 0px 0px 0px 1px inset',
            }}
            {...fadeUp}
          >
            <h2
              className="mb-4 text-3xl font-medium"
              style={{ color: '#f9f9f9', letterSpacing: '0.2px' }}
            >
              准备好扩展你的 App 了吗？
            </h2>
            <p className="mb-8 text-base" style={{ color: '#9c9c9d', letterSpacing: '0.2px' }}>
              加入开发者社区，构建你的第一个能力模块
            </p>
            <Link
              to={ROUTES.MARKETPLACE}
              className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-base font-semibold transition-opacity hover:opacity-60"
              style={{ backgroundColor: 'hsla(0,0%,100%,0.815)', color: '#18191a', letterSpacing: '0.3px' }}
            >
              开始探索 <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

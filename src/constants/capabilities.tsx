import type { ReactNode } from 'react'

export interface Capability {
  icon: ReactNode
  title: string
  description: string
}

export const capabilities: Capability[] = [
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="4" y="4" width="28" height="28" rx="8" stroke="#55b3ff" strokeWidth="1.5" />
        <path d="M18 12v12M12 18h12" stroke="#55b3ff" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: '能力市场',
    description: '浏览、安装 DEX 插件、MCP 工具与 Skill，一站式扩展 App 能力',
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M8 26V10a2 2 0 012-2h16a2 2 0 012 2v16a2 2 0 01-2 2H10a2 2 0 01-2-2z" stroke="#5fc992" strokeWidth="1.5" />
        <path d="M14 16l3 3 5-6" stroke="#5fc992" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'DEX 热加载',
    description: '无需重启 App，动态下载加载 DEX 插件，功能即装即用',
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="14" stroke="#ffbc33" strokeWidth="1.5" />
        <path d="M18 10v8l5 3" stroke="#ffbc33" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: 'MCP 远程工具',
    description: '云端能力即插即用，天气、翻译、搜索等 MCP 工具开箱可用',
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M12 8h12l4 10-4 10H12l-4-10 4-10z" stroke="#FF6363" strokeWidth="1.5" />
        <circle cx="18" cy="18" r="3" fill="#FF6363" />
      </svg>
    ),
    title: 'AI 意图解析',
    description: '自然语言输入，LLM 自动拆解为多步工作链并执行',
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="6" y="4" width="24" height="28" rx="3" stroke="#55b3ff" strokeWidth="1.5" />
        <rect x="9" y="8" width="18" height="4" rx="1" fill="#55b3ff" fillOpacity="0.2" />
        <rect x="9" y="15" width="18" height="2" rx="1" fill="#55b3ff" fillOpacity="0.2" />
        <rect x="9" y="20" width="12" height="2" rx="1" fill="#55b3ff" fillOpacity="0.2" />
      </svg>
    ),
    title: '安全沙箱',
    description: 'DEX 签名校验 + SHA-256 完整性验证 + 权限隔离，安全可靠',
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="6" y="6" width="24" height="14" rx="3" stroke="#5fc992" strokeWidth="1.5" />
        <path d="M12 24l4 4 8-8" stroke="#5fc992" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: '在线 Playground',
    description: 'Monaco 编辑器编写 Kotlin 代码，在线编译并一键发布为插件',
  },
]

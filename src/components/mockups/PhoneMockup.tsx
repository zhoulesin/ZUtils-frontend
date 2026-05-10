import type { ReactNode } from 'react'

interface PhoneMockupProps {
  screen: ReactNode
  className?: string
}

export function PhoneMockup({ screen, className = '' }: PhoneMockupProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className="relative overflow-hidden"
        style={{
          width: 280,
          height: 560,
          borderRadius: 40,
          backgroundColor: '#0a0a0c',
          border: '2px solid rgba(255,255,255,0.12)',
          boxShadow: `
            rgba(0,0,0,0.5) 0px 0px 0px 2px,
            rgba(255,255,255,0.08) 0px 0px 14px,
            rgba(255,255,255,0.05) 0px 0px 0px 1px inset
          `,
        }}
      >
        {/* Notch */}
        <div
          className="absolute left-1/2 top-0 z-10 -translate-x-1/2 rounded-b-2xl"
          style={{ width: 100, height: 24, backgroundColor: '#0a0a0c' }}
        >
          <div
            className="absolute left-1/2 top-1.5 -translate-x-1/2 rounded-full"
            style={{ width: 10, height: 10, backgroundColor: '#1b1c1e' }}
          />
        </div>

        {/* Screen */}
        <div
          className="h-full w-full overflow-hidden"
          style={{ padding: '28px 12px 12px', backgroundColor: '#07080a' }}
        >
          {screen}
        </div>
      </div>
    </div>
  )
}

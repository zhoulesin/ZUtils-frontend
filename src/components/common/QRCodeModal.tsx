import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

interface QRCodeModalProps {
  open: boolean
  onClose: () => void
  value: string
  title?: string
}

export function QRCodeModal({ open, onClose, value, title = '扫码安装到手机' }: QRCodeModalProps) {
  const [QRCodeImg, setQRCodeImg] = useState<string>('')

  useEffect(() => {
    if (!open || !value) return
    import('qrcode').then((QRCode) => {
      QRCode.toString(value, { type: 'svg', margin: 2, width: 256, color: { dark: '#1e40af' } }).then(
        (svg: string) => setQRCodeImg(`data:image/svg+xml;base64,${btoa(svg)}`),
      )
    })
  }, [open, value])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="rounded-2xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="rounded-lg p-1 hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>
        {QRCodeImg && (
          <div className="flex flex-col items-center gap-3">
            <img src={QRCodeImg} alt="QR Code" className="h-64 w-64" />
            <p className="text-sm text-gray-500">打开 ZUtils App 扫码安装</p>
          </div>
        )}
      </div>
    </div>
  )
}

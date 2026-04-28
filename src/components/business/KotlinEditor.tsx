import Editor from '@monaco-editor/react'
import { Loader2 } from 'lucide-react'

interface KotlinEditorProps {
  value: string
  onChange: (value: string) => void
}

export function KotlinEditor({ value, onChange }: KotlinEditorProps) {
  return (
    <Editor
      height="100%"
      defaultLanguage="kotlin"
      theme="vs-dark"
      value={value}
      onChange={(v) => onChange(v ?? '')}
      loading={<Loader2 className="h-6 w-6 animate-spin text-primary-500" />}
      options={{
        minimap: { enabled: false },
        fontSize: 13,
        lineNumbers: 'on',
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: 4,
        wordWrap: 'on',
        padding: { top: 12 },
      }}
    />
  )
}

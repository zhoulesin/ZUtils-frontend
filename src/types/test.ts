export interface TestRequest {
  code: string
  args?: Record<string, unknown>
}

export interface TestResult {
  success: boolean
  output: string
  error: string
  durationMs: number
}

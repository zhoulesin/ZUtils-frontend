export interface Preset {
  name: string
  label: string
  code: string
  args: Record<string, unknown>
}

export const PRESETS: Preset[] = [
  {
    name: 'hello',
    label: 'Hello World',
    args: { name: 'ZUtils' },
    code: `val name = args["name"]?.toString() ?: "World"
return "Hello, $name!"`,
  },
  {
    name: 'calculate',
    label: '计算器',
    args: { a: 42, b: 7, op: '+' },
    code: `val a = args["a"]?.toString()?.toIntOrNull() ?: 0
val b = args["b"]?.toString()?.toIntOrNull() ?: 0
val op = args["op"]?.toString() ?: "+"
return when (op) {
    "+" -> a + b
    "-" -> a - b
    "*" -> a * b
    "/" -> if (b != 0) a / b else "division by zero"
    else -> "unknown op"
}`,
  },
  {
    name: 'uuid',
    label: 'UUID 生成',
    args: { count: 3 },
    code: `val count = args["count"]?.toString()?.toIntOrNull() ?: 1
return (1..count).map { java.util.UUID.randomUUID().toString() }`,
  },
  {
    name: 'strlen',
    label: '字符串长度统计',
    args: { text: 'Hello ZUtils!' },
    code: `val text = args["text"]?.toString() ?: ""
val len = text.length
val chars = text.toSet().size
return "length=$len, unique_chars=$chars"`,
  },
  {
    name: 'bridge-toast',
    label: 'Bridge Toast',
    args: { content: 'Hello from DEX!' },
    code: `val b = bridge ?: return "no bridge（沙箱模式 bridge 不可用，发布后自动注入）"
val callApi = b::class.java.getMethod("callApi", String::class.java, List::class.java)

// bridge 预置了两助手变量：appContext(Application) + appHandler(主线程Handler)
// 可从 AppApiBridge 反射获取：
val handlerField = b::class.java.getField("appHandler")
val handler = handlerField.get(b)

// 主线程上创建并显示 Toast
handler::class.java.getMethod("post", Class.forName("java.lang.Runnable"))
    .invoke(handler, java.lang.Runnable {
        val toast = callApi.invoke(b, "android.widget.Toast",
            listOf("makeText", "appContext", args["content"] ?: "", "0"))
        toast::class.java.getMethod("show").invoke(toast)
    })
return "toast 已显示"`,
  },
]

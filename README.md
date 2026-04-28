# ZUtils Frontend

插件市场 Web 端，面向开发者浏览、搜索、发布 DEX 插件。

## 功能

- **插件市场** — 浏览/搜索/筛选插件
- **插件详情** — 参数表格、权限声明、扫码安装
- **开发者中心** — 仪表盘、插件管理
- **Kotlin Playground** — Monaco 编辑器 + 在线编译执行 + 发布为插件
- **认证** — JWT 登录/注册

## 技术栈

React 19 + TypeScript + Vite 6 + Tailwind CSS 3 + Zustand + Axios + Monaco Editor

## 启动

```bash
cd ZUtils-frontend
npm install
npm run dev        # 启动在 http://localhost:3000
```

开发模式自动代理 `/api` 请求到 `http://localhost:8080`。

## 路由

| 路径 | 页面 |
|------|------|
| `/` | 首页 |
| `/marketplace` | 插件市场 |
| `/marketplace/:id` | 插件详情 |
| `/login` / `/register` | 登录/注册 |
| `/dev` | 开发者仪表盘 |
| `/dev/plugins` | 我的插件 |
| `/dev/playground` | Kotlin Playground |
| `/admin` | 管理后台 |

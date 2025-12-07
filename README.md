# SonicSoul AI - AI音乐定制服务

一个现代化的AI音乐定制平台，使用React + Vite构建，集成Google Gemini AI。

## ✨ 特性

- 🎵 AI驱动的音乐定制
- 🎨 现代化的UI设计，采用TikTok风格配色
- 📱 完全响应式设计
- ⚡ 快速的开发体验（Vite）
- 🌐 支持GitHub Pages部署

## 🚀 本地开发

### 前置要求

- Node.js 18+
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 配置环境变量

创建 `.env.local` 文件并添加你的Gemini API密钥：

```
GEMINI_API_KEY=your_api_key_here
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 查看应用

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 📦 部署到GitHub Pages

### 方法1: 自动部署（推荐）

1. **在GitHub上创建仓库**（如果还没有）
   - 访问 https://github.com/new
   - 仓库名称：`Music-Creator-`
   - 设置为公开仓库

2. **添加远程仓库并推送**

```bash
git remote add origin https://github.com/CanadianCodeCracker/Music-Creator-.git
git push -u origin main
```

3. **配置GitHub Pages**
   - 进入仓库的 Settings > Pages
   - Source 选择 "GitHub Actions"
   - 保存设置

4. **添加Gemini API密钥到GitHub Secrets**
   - 进入仓库的 Settings > Secrets and variables > Actions
   - 点击 "New repository secret"
   - Name: `GEMINI_API_KEY`
   - Value: 你的Gemini API密钥
   - 点击 "Add secret"

5. **触发部署**
   - 推送代码到main分支会自动触发部署
   - 或者在 Actions 标签页手动触发 workflow

6. **访问你的网站**
   - 部署完成后访问：https://canadiancodecracker.github.io/Music-Creator-/

### 方法2: 手动部署

```bash
npm run deploy
```

这会构建项目并推送到 `gh-pages` 分支。

## 🛠️ 技术栈

- **前端框架**: React 19
- **构建工具**: Vite 6
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **图标**: Lucide React
- **AI集成**: Google Gemini API

## 📁 项目结构

```
sonicsoul-ai/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions部署配置
├── components/                  # React组件
│   ├── Hero.tsx                # 首页英雄区
│   ├── Wizard.tsx              # 定制向导
│   ├── FAQ.tsx                 # 常见问题
│   ├── Footer.tsx              # 页脚
│   └── LandingModules.tsx      # 着陆页模块
├── App.tsx                      # 主应用组件
├── index.tsx                    # 应用入口
├── index.html                   # HTML模板
├── index.css                    # 全局样式
├── types.ts                     # TypeScript类型定义
├── vite.config.ts              # Vite配置
└── package.json                # 项目依赖

```

## 🔧 配置说明

### Vite配置 (vite.config.ts)

- **base**: 设置为 `/Music-Creator-/` 以匹配GitHub Pages路径
- **usePolling**: 启用以支持OneDrive等云存储目录
- **环境变量**: 自动注入Gemini API密钥

### 部署配置

- **homepage**: 在package.json中设置GitHub Pages URL
- **deploy脚本**: 使用gh-pages包进行手动部署
- **GitHub Actions**: 自动化CI/CD流程

## 🐛 常见问题

### 开发服务器无法启动

如果遇到 `fsevents.watch is not a function` 错误：
- 这是因为项目在OneDrive等云存储目录中
- 已在vite.config.ts中配置 `usePolling: true` 解决

### 部署后页面空白

- 确保 `vite.config.ts` 中的 `base` 路径正确
- 检查GitHub Pages设置是否正确
- 查看浏览器控制台的错误信息

### API密钥问题

- 本地开发：在 `.env.local` 中设置
- GitHub Pages：在仓库的Secrets中设置

## 📝 许可证

MIT License

## 🤝 贡献

欢迎提交Issue和Pull Request！

---

由 [SonicSoul AI](https://canadiancodecracker.github.io/Music-Creator-/) 制作 ❤️

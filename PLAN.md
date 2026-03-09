# 个人网站实施计划

## 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **内容管理**: Markdown + gray-matter + remark/rehype
- **部署**: Vercel (连接 GitHub repo，push 即部署)
- **Unity 支持**: WebGL build 通过 iframe 嵌入

---

## 项目结构

```
ResumeWebsite/
├── content/                          # 所有可编辑内容
│   ├── resume.md                     # 简历内容
│   └── projects/                     # 每个项目一个 md 文件
│       ├── project-1.md
│       └── my-unity-game.md
├── public/
│   ├── images/                       # 项目截图、头像等
│   └── unity-builds/                 # Unity WebGL 产物
│       └── my-game/
│           ├── Build/
│           ├── TemplateData/
│           └── index.html
├── src/
│   ├── app/
│   │   ├── layout.tsx                # 全局布局
│   │   ├── page.tsx                  # 首页
│   │   ├── resume/
│   │   │   └── page.tsx              # 简历页
│   │   └── projects/
│   │       ├── page.tsx              # 项目列表页
│   │       └── [slug]/
│   │           └── page.tsx          # 项目详情页
│   ├── components/
│   │   ├── Navbar.tsx                # 顶部导航栏
│   │   ├── Footer.tsx                # 页脚
│   │   ├── ProjectCard.tsx           # 项目卡片（列表页用）
│   │   ├── MarkdownRenderer.tsx      # Markdown 渲染组件
│   │   └── UnityPlayer.tsx           # Unity WebGL 嵌入组件
│   └── lib/
│       ├── markdown.ts               # MD 文件读取与解析
│       └── projects.ts               # 项目数据获取工具函数
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 分步实施计划

### Phase 1: 项目初始化

- [ ] 用 `create-next-app` 初始化项目（TypeScript + Tailwind + App Router）
- [ ] 清理模板默认内容
- [ ] 安装 Markdown 相关依赖：`gray-matter`, `remark`, `remark-html`, `remark-gfm`
- [ ] 创建 `content/` 目录结构

### Phase 2: 基础布局与导航

- [ ] 创建 `BaseLayout`：包含 Navbar + Footer + 主内容区
- [ ] 实现 `Navbar` 组件：包含首页 / Resume / Projects 导航链接，支持移动端响应式菜单
- [ ] 实现 `Footer` 组件：GitHub / LinkedIn / Email 等社交链接
- [ ] 配置全局样式（Tailwind 主题色、字体、暗色模式可选）

### Phase 3: Markdown 内容系统

- [ ] 实现 `lib/markdown.ts`：
  - `getMarkdownContent(filePath)` — 读取并解析单个 md 文件
  - 使用 `gray-matter` 提取 frontmatter 元数据
  - 使用 `remark` + `remark-html` + `remark-gfm` 将 Markdown 转为 HTML
- [ ] 实现 `lib/projects.ts`：
  - `getAllProjects()` — 读取 `content/projects/` 下所有 md 文件，返回列表
  - `getProjectBySlug(slug)` — 根据文件名获取单个项目
- [ ] 创建 `MarkdownRenderer` 组件：安全渲染解析后的 HTML，配合 Tailwind Typography 插件美化排版

### Phase 4: 首页

- [ ] 设计简洁的 landing page
  - 个人简介（姓名、一句话介绍、头像）
  - 快速导航到 Resume 和 Projects
  - 可选：精选项目展示（取 2-3 个 featured 项目）

### Phase 5: 简历页

- [ ] 创建 `content/resume.md`，用 Markdown 编写简历内容
- [ ] `resume/page.tsx` 读取并渲染 `resume.md`
- [ ] 添加"下载 PDF"按钮（可选，将 PDF 放在 `public/` 下）

Markdown 格式示例：
```markdown
---
name: "Xiaoshuo Yao"
title: "Software Engineer"
email: "xxx@email.com"
linkedin: "https://linkedin.com/in/xxx"
github: "https://github.com/xxx"
---

## Education
### University Name — M.S. in Computer Science
*Sep 2022 - May 2024*
- GPA: x.xx

## Experience
### Company Name — Software Engineer
*Jun 2024 - Present*
- Did something impactful
- Built something cool

## Skills
- **Languages**: Python, TypeScript, C++
- **Frameworks**: React, Next.js, Node.js
```

### Phase 6: 项目展示

- [ ] 创建示例项目 md 文件，定义 frontmatter schema：
  ```markdown
  ---
  title: "项目名称"
  description: "一句话描述"
  tech: ["React", "Python", "Unity"]
  github: "https://github.com/..."
  demo: "https://..."
  image: "/images/projects/project-1.png"
  type: "web"              # web | unity | cli | other
  unityBuild: "/unity-builds/my-game/"   # 仅 type=unity 时
  featured: true
  date: 2025-01-01
  ---

  ## 详细介绍
  这里用 Markdown 写项目详细描述...
  ```
- [ ] 实现 `ProjectCard` 组件：缩略图 + 标题 + 描述 + 技术标签
- [ ] 实现项目列表页 `projects/page.tsx`：网格/卡片布局展示所有项目，按日期排序
- [ ] 实现项目详情页 `projects/[slug]/page.tsx`：
  - 渲染 Markdown 内容
  - 显示 GitHub / Demo 链接
  - 如果 `type === "unity"`，嵌入 Unity 播放器

### Phase 7: Unity WebGL 支持

- [ ] 创建 `UnityPlayer` 组件：
  - 使用 iframe 加载 Unity WebGL build
  - 支持全屏切换按钮
  - 加载状态提示（Unity build 加载通常较慢）
  - 响应式尺寸适配
- [ ] 在 `next.config.js` 中配置 headers，确保 Unity 压缩文件（.gz / .br）的 MIME type 正确
- [ ] 项目详情页检测 `type: "unity"` 时自动渲染 `UnityPlayer`
- [ ] 在 `.gitignore` 中考虑是否将大型 Unity build 排除（可用 Git LFS 或单独上传）

### Phase 8: 部署

- [ ] 将项目推送到 GitHub
- [ ] 在 Vercel 中导入 GitHub repo
- [ ] 配置自定义域名（可选）
- [ ] 验证部署正常：首页、简历页、项目列表、项目详情、Unity 播放

---

## 内容更新工作流

```
想改简历？   → 编辑 content/resume.md → git push → 自动部署
想加项目？   → 在 content/projects/ 新建一个 .md 文件 → git push → 自动部署
想加 Unity 游戏？ → 把 Build 产物放到 public/unity-builds/ → 写一个对应的 .md → git push
```

---

## 依赖清单

```json
{
  "dependencies": {
    "next": "^14",
    "react": "^18",
    "react-dom": "^18",
    "gray-matter": "^4.0.3",
    "remark": "^15",
    "remark-html": "^16",
    "remark-gfm": "^4"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/react": "^18",
    "@types/node": "^20",
    "tailwindcss": "^3",
    "@tailwindcss/typography": "^0.5",
    "autoprefixer": "^10",
    "postcss": "^8"
  }
}
```

---

## 未来扩展方向

- **博客系统**: 在 `content/blog/` 下加 md 文件，复用现有 Markdown 基础设施
- **暗色模式**: 用 `next-themes` 实现
- **搜索功能**: 客户端全文搜索（Fuse.js）
- **评论系统**: 集成 Giscus（基于 GitHub Discussions）
- **国际化**: 中英文切换
- **分析**: Vercel Analytics 或 Google Analytics

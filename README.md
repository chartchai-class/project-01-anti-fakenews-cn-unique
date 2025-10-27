# 社交反假新闻系统（Vue 3 + Vite）

本项目用于课程作业演示：用户录入新闻、社区投票判断是否为假新闻，并对理由进行评论说明。判定以投票多数为准；评论与投票仅在前端状态管理中保存（刷新后清空新增数据），满足“简单单页应用”要求。

## 功能点
- 首页：新闻列表、筛选（全部/假/不假）、每页数量选择、分页
- 详情页：新闻完整信息（主题、正文、状态、记者、时间、图片链接）、投票统计、评论分页
- 投票页：独立投票页面，支持填写评论与图片链接（URL）
- 判定规则：多数票决定“假/不假”，持平为“待判定”
- 存储：Pinia 管理前端状态，无服务端 POST；刷新后新增评论清空
- 模拟数据：自动生成 30 条新闻及多条评论，保证分页效果

## 技术栈
- Vue 3 + Vite
- Vue Router
- Pinia（前端状态管理）
- Vercel 静态构建部署

## 本地开发
```bash
npm i
```

```bash
npm run dev
```

## 构建与预览
```bash
npm run build
```

```bash
npm run preview
```

## 部署到 Vercel
- 将仓库推送到 GitHub 后，在 Vercel 导入该仓库，框架选择 **Vite** 或使用本仓库内 `vercel.json` 默认配置。
- 构建命令：`npm run build`，输出目录：`dist`。
- 若使用命令行：
  ```bash
  vercel --prod
  ```
  （需本地安装 `vercel` 并已登录）

## 小组信息（请按要求填写）
- 小组名：`<填写你们的小组名>`
- 成员信息：
  - 学号：`<学号1>`，姓名：`<姓名1>`
  - 学号：`<学号2>`，姓名：`<姓名2>`
  - 学号：`<学号3>`，姓名：`<姓名3>`
- 视频链接（2-3 分钟演示）：`<粘贴你们的视频 URL>`
- 已部署网站 URL（Vercel）：`<粘贴你们的生产环境 URL>`

> 注意：请进入课程课堂系统创建/加入你们的小组，并在最终提交前确认 README 信息完整。

## 目录结构
- `src/pages/Home.vue`：首页列表、筛选与分页
- `src/pages/NewsDetail.vue`：新闻详情、评论与投票统计、评论分页
- `src/pages/Vote.vue`：独立投票页面
- `src/stores/newsStore.js`：Pinia 状态与操作
- `src/mock/news.js`：模拟数据与统计计算
- `src/components/Pagination.vue`：通用分页组件
- `vercel.json`：Vercel 部署配置
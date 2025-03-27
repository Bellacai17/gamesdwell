This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# GamesDwell - 社交互动功能使用指南

这个文档描述了GamesDwell网站新添加的社交互动功能以及如何使用它们。

## 功能概述

我们为GamesDwell添加了以下社交互动功能：

1. **游戏评分和评论系统** - 允许玩家为游戏评分并留下评论
2. **社交分享功能** - 轻松分享游戏到各种社交平台
3. **热门游戏排行榜** - 展示网站上最受欢迎的游戏
4. **最新游戏展示** - 展示最新添加的游戏

## 使用方法

### 评分和评论系统

1. 在游戏详情页面，您可以看到当前游戏的平均评分和评论
2. 滚动到"Player Reviews"部分使用评分表单：
   - 点击星星图标来选择1-5星的评分
   - 在文本框中输入您的评论
   - 点击"Submit Review"按钮提交
3. 您可以查看其他用户的评论，以及给评论点赞或回复

### 社交分享功能

在游戏详情页面，您可以使用社交分享按钮将游戏分享到各种平台：

- Twitter
- Facebook
- Reddit
- WhatsApp
- Telegram
- 复制链接

点击相应的图标即可分享到对应平台。

### 热门游戏排行榜

1. 在首页和游戏详情页的侧边栏，您可以看到热门游戏排行榜
2. 排行榜基于游戏评分和播放次数排序
3. 点击任何游戏卡片即可进入该游戏详情页

### 最新游戏展示

1. 在首页下方，您可以浏览最新添加的游戏
2. 点击"View All"链接可以查看按添加时间排序的完整游戏列表

## 技术实现

这些功能通过以下组件实现：

- `GameRatings.tsx` - 游戏评分和评论系统
- `SocialShare.tsx` - 社交分享按钮
- `PopularGames.tsx` - 热门游戏排行榜
- `games.ts` - 游戏数据接口，处理评分、评论和播放统计

数据存储在`data/games.json`中，包含游戏的所有信息，包括：

- 基本信息（标题、描述、类别等）
- 游戏URL和尺寸
- 评分和评论
- 播放统计
- 发布和更新日期

## 未来扩展

我们计划在未来添加更多社交互动功能：

1. 用户账户系统，允许用户保存喜欢的游戏和进度
2. 成就系统，奖励活跃玩家
3. 好友系统，允许玩家与朋友互动
4. 游戏挑战和排行榜

## 帮助和支持

如果您在使用这些功能时遇到任何问题，请联系我们的支持团队：

- 电子邮件：support@gamesdwell.com
- Twitter：@GamesDwell
- Discord：GamesDwell社区

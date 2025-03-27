import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 获取当前请求路径
  const { pathname } = request.nextUrl;
  
  // 为API路由添加CORS头
  if (pathname.startsWith('/api/')) {
    // 检查是否为OPTIONS请求（预检请求）
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Max-Age': '86400', // 预检请求的有效期（秒）
        },
      });
    }
    
    // 处理API请求，添加CORS头
    const response = NextResponse.next();
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return response;
  }
  
  // 游戏播放统计中间件
  if (pathname.startsWith('/game/') && !request.nextUrl.searchParams.has('_playing')) {
    // 在URL中添加参数以防止重复记录
    const url = request.nextUrl.clone();
    url.searchParams.set('_playing', 'true');
    
    // 这里不做重定向，只是让代码继续执行
    // 实际的播放统计在客户端组件中处理
  }
  
  // 非API路由，继续处理
  return NextResponse.next();
}

// 配置匹配的路由
export const config = {
  matcher: [
    // API路由
    '/api/:path*',
    // 游戏详情页
    '/game/:path*',
  ],
}; 
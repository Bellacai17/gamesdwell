'use client';

import { useState, useEffect, useRef } from 'react';

interface ResponsiveIframeProps {
  src: string;
  title: string;
  width: number;
  height: number;
  gameId?: string;
  className?: string;
  allowFullScreen?: boolean;
}

export default function ResponsiveIframe({
  src,
  title,
  width,
  height,
  gameId,
  className = '',
  allowFullScreen = true
}: ResponsiveIframeProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(`${height / width * 100}%`);
  const [playRecorded, setPlayRecorded] = useState(false);

  // 计算游戏容器的高度，基于原始宽高比
  useEffect(() => {
    const calculateAspectRatio = () => {
      // 确保宽高是有效的数字
      if (width && height && width > 0 && height > 0) {
        // 计算宽高比例
        const ratio = (height / width) * 100;
        setAspectRatio(`${ratio}%`);
      }
    };

    calculateAspectRatio();
  }, [width, height]);

  // 添加错误处理和加载状态
  const handleIframeLoad = () => {
    setIframeLoaded(true);
    
    // 当iframe加载后，记录游戏播放
    if (gameId && !playRecorded) {
      recordGamePlay(gameId);
    }
  };
  
  // 记录游戏播放统计
  const recordGamePlay = async (id: string) => {
    try {
      setPlayRecorded(true);
      const response = await fetch('/api/games/play', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gameId: id }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to record game play');
      }
      
      // 可选：记录成功处理
      console.log('Game play recorded successfully');
    } catch (error) {
      console.error('Error recording game play:', error);
      // 播放统计失败不影响用户体验，所以这里只记录错误
    }
  };

  const handleIframeError = () => {
    console.error('Failed to load iframe content');
    // 实际应用中可以处理错误，例如显示错误消息
  };

  return (
    <div ref={containerRef} className={`responsive-iframe-container ${className}`}>
      {/* 通过内部div设置paddingBottom来保持宽高比 */}
      <div className="relative w-full" style={{ paddingBottom: aspectRatio }}>
        {/* 加载动画 */}
        {!iframeLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
            <span className="ml-3 text-gray-300">Loading game...</span>
          </div>
        )}
        
        {/* 游戏iframe */}
        <iframe
          ref={iframeRef}
          src={src}
          title={title}
          className={`absolute top-0 left-0 w-full h-full border-0 ${iframeLoaded ? 'opacity-100' : 'opacity-0'}`}
          allowFullScreen={allowFullScreen}
          loading="lazy"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
        ></iframe>
      </div>
      
      <style jsx>{`
        .responsive-iframe-container {
          width: 100%;
          overflow: hidden;
          position: relative;
          background-color: #000;
        }
        
        iframe {
          transition: opacity 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
} 
import { useState, useEffect, useRef } from 'react';
import { Game, GameError, GameLoadingState } from '../types/game';

interface GameIframeProps {
  game: Game;
  className?: string;
}

export default function GameIframe({ game, className = '' }: GameIframeProps) {
  const [loadingState, setLoadingState] = useState<GameLoadingState>('idle');
  const [error, setError] = useState<GameError | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleLoad = () => {
      setLoadingState('ready');
      setError(null);
    };

    const handleError = (event: ErrorEvent) => {
      setLoadingState('error');
      setError({
        code: 'IFRAME_LOAD_ERROR',
        message: 'Failed to load game',
        details: event
      });
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('load', handleLoad);
      iframe.addEventListener('error', handleError);
      document.addEventListener('fullscreenchange', handleFullscreenChange);
    }

    return () => {
      if (iframe) {
        iframe.removeEventListener('load', handleLoad);
        iframe.removeEventListener('error', handleError);
        document.removeEventListener('fullscreenchange', handleFullscreenChange);
      }
    };
  }, []);

  const toggleFullscreen = async () => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    try {
      if (!document.fullscreenElement) {
        await iframe.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error('Error toggling fullscreen:', err);
    }
  };

  return (
    <div className={`game-iframe-container ${className}`}>
      {/* Loading State */}
      {loadingState === 'loading' && (
        <div className="game-iframe-loading">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
        </div>
      )}

      {/* Error State */}
      {loadingState === 'error' && error && (
        <div className="game-iframe-error">
          <div className="text-center p-6 bg-dark/80 rounded-lg">
            <h3 className="text-xl font-tech text-accent mb-2">Error Loading Game</h3>
            <p className="text-text-secondary mb-4">{error.message}</p>
            <button
              onClick={() => {
                setLoadingState('idle');
                setError(null);
              }}
              className="button-primary"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Game IFrame */}
      <div className="game-iframe-wrapper">
        <iframe
          ref={iframeRef}
          src={game.iframeUrl}
          className={`game-iframe ${isFullscreen ? 'fullscreen' : ''}`}
          title={game.title}
          allowFullScreen
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      </div>

      {/* Controls Overlay */}
      <div className="absolute bottom-4 right-4 flex gap-2">
        {/* Fullscreen Toggle */}
        <button
          onClick={toggleFullscreen}
          className="p-2 rounded-full bg-dark/80 backdrop-blur-sm text-text-secondary hover:text-accent transition-colors"
          aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        >
          {isFullscreen ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          )}
        </button>

        {/* Performance Indicator */}
        {game.performance && (
          <div className="px-3 py-1 rounded-full bg-dark/80 backdrop-blur-sm text-xs text-text-secondary">
            Target: {game.performance.targetFPS} FPS
          </div>
        )}
      </div>
    </div>
  );
} 
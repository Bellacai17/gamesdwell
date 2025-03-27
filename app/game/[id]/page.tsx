import { getGameById, getAllGames } from '../../lib/games';
import { notFound } from 'next/navigation';
import GameHighlights from '../../components/GameHighlights';
import GameScreenshots from '../../components/GameScreenshots'; 
import GameTips from '../../components/GameTips';
import RelatedGames from '../../components/RelatedGames';
import GameRatings from '../../components/GameRatings';
import SocialShare from '../../components/SocialShare';
import PopularGames from '../../components/PopularGames';
import ResponsiveIframe from '../../components/ResponsiveIframe';
import GamePreview from '../../components/GamePreview';
import { Metadata } from 'next';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const game = await getGameById(params.id);
  
  if (!game) {
    return {
      title: 'Game Not Found',
      description: 'The requested game could not be found'
    };
  }
  
  return {
    title: `${game.title} - Play Online | GamesDwell`,
    description: game.description,
    openGraph: {
      title: `${game.title} - Play Online | GamesDwell`,
      description: game.description,
      images: [game.thumbnail],
    },
  };
}

export default async function GamePage({ params }: Props) {
  const game = await getGameById(params.id);
  
  if (!game) {
    notFound();
  }
  
  // 获取相关游戏（同类别或相同标签）
  const allGames = await getAllGames();
  const relatedGames = allGames
    .filter(g => 
      g.id !== game.id && 
      (g.category === game.category || 
        g.tags.some(tag => game.tags.includes(tag)))
    )
    .slice(0, 3);
    
  // 获取热门游戏
  const popularGames = [...allGames]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .filter(g => g.id !== game.id)
    .slice(0, 5);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 主要内容区 - 游戏和详情 */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-tech text-white mb-4">{game.title}</h1>
          
          {/* 游戏预览视频 */}
          <GamePreview game={game} className="mb-8" />
          
          <div className="bg-gray-800 rounded-lg overflow-hidden mb-8">
            {/* 游戏区域 */}
            <div className="game-container bg-black">
              <ResponsiveIframe 
                src={game.url} 
                title={game.title}
                width={game.iframeWidth} 
                height={game.iframeHeight}
                gameId={game.id}
              />
            </div>
            
            {/* 社交分享和评分区 */}
            <div className="p-4 flex flex-wrap justify-between items-center border-t border-gray-700">
              <SocialShare game={game} className="mb-4 md:mb-0" />
              <GameRatings game={game} compact={true} />
            </div>
          </div>
          
          {/* 游戏截图 */}
          <GameScreenshots game={game} className="mb-8" />
          
          {/* 游戏亮点和玩法指南 */}
          <GameHighlights game={game} className="mb-8" />
          
          {/* 游戏提示和策略 */}
          <GameTips game={game} className="mb-8" />
          
          {/* 完整评价和评论区 */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-tech text-secondary mb-4">Player Reviews</h2>
            <GameRatings game={game} />
          </div>
        </div>
        
        {/* 侧边栏 */}
        <div className="space-y-8">
          {/* 相关游戏 */}
          <RelatedGames games={relatedGames} />
          
          {/* 热门游戏 */}
          <PopularGames games={popularGames} />
        </div>
      </div>
    </div>
  );
}

// 格式化播放次数
function formatPlayCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
}
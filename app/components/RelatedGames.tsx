import Image from 'next/image';
import Link from 'next/link';
import { Game } from '../types/game';

interface RelatedGamesProps {
  games: Game[];
}

export default function RelatedGames({ games }: RelatedGamesProps) {
  if (!games || games.length === 0) {
    return null;
  }

  return (
    <div className="bg-dark rounded-lg p-6">
      <h2 className="text-2xl font-tech text-accent mb-4">You Might Also Like</h2>
      
      <div className="space-y-4">
        {games.map(game => (
          <Link 
            href={`/game/${game.id}`} 
            key={game.id} 
            className="flex items-center gap-4 p-3 rounded-md hover:bg-accent/10 transition-colors"
          >
            <div className="relative w-16 h-16 flex-shrink-0 rounded overflow-hidden">
              <Image
                src={game.thumbnailUrl}
                alt={game.title}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="flex-grow min-w-0">
              <h3 className="font-tech text-secondary text-lg truncate">{game.title}</h3>
              <div className="flex items-center text-text-tertiary text-sm">
                <span className="truncate">{game.category}</span>
                {game.metadata?.rating && (
                  <>
                    <span className="mx-2">•</span>
                    <span className="flex items-center">
                      <svg className="w-3 h-3 text-accent mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      {game.metadata.rating.score.toFixed(1)}
                    </span>
                  </>
                )}
              </div>
            </div>
            
            <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <Link 
          href="/" 
          className="inline-block text-sm text-accent hover:text-secondary transition-colors"
        >
          View All Games
        </Link>
      </div>
    </div>
  );
} 
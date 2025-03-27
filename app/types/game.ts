export interface Game {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  tags: string[];
  thumbnail: string;
  iframeWidth: number;
  iframeHeight: number;
  screenshots?: string[];
  highlights?: {
    title: string;
    description: string;
    icon?: string;
  }[];
  howToPlay?: string[];
  tips?: {
    title: string;
    content: string;
    difficulty: 'beginner' | 'advanced' | 'expert';
  }[];
  storyBackground?: string;
  developerNotes?: string;
  previewVideo?: string;
  
  rating?: number;
  ratingCount?: number;
  playCount?: number;
  comments?: GameComment[];
  releaseDate?: string;
  lastUpdated?: string;
}

export interface GameComment {
  id: string;
  userId: string;
  username: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  likes: number;
  replies?: GameCommentReply[];
}

export interface GameCommentReply {
  id: string;
  userId: string;
  username: string;
  userAvatar?: string;
  comment: string;
  date: string;
  likes: number;
}

export type GameCategory = {
  id: string;
  name: string;
  description: string;
  icon: string;
  slug: string;
  featured?: boolean;
  gameCount: number;
  lastUpdated: string;
};

export type GameError = {
  code: string;
  message: string;
  details?: unknown;
};

export type GameLoadingState = 'idle' | 'loading' | 'ready' | 'error';
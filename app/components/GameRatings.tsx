'use client';

import { useState } from 'react';
import { Game, GameComment } from '../types/game';

interface GameRatingsProps {
  game: Game;
  compact?: boolean;
  className?: string;
}

export default function GameRatings({ game, compact = false, className = '' }: GameRatingsProps) {
  const [userRating, setUserRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [userComment, setUserComment] = useState<string>('');
  const [showAllComments, setShowAllComments] = useState<boolean>(false);
  
  const averageRating = game.rating || 0;
  const ratingCount = game.ratingCount || 0;
  
  // 模拟评论数据
  const simulatedComments: GameComment[] = game.comments || [
    {
      id: '1',
      userId: 'user1',
      username: 'GameMaster42',
      userAvatar: '/images/avatars/avatar1.jpg',
      rating: 5,
      comment: 'This game is absolutely fantastic! The controls are smooth and the graphics are amazing.',
      date: '2023-04-15',
      likes: 12,
      replies: [
        {
          id: 'reply1',
          userId: 'user2',
          username: 'PixelPro',
          userAvatar: '/images/avatars/avatar2.jpg',
          comment: 'I totally agree! Been playing for hours!',
          date: '2023-04-16',
          likes: 3
        }
      ]
    },
    {
      id: '2',
      userId: 'user3',
      username: 'CasualGamer',
      userAvatar: '/images/avatars/avatar3.jpg',
      rating: 4,
      comment: 'Really fun game but could use some more levels. Looking forward to updates!',
      date: '2023-04-10',
      likes: 5
    },
    {
      id: '3',
      userId: 'user4',
      username: 'GameReviewer',
      userAvatar: '/images/avatars/avatar4.jpg',
      rating: 3,
      comment: 'Decent game but has some performance issues on mobile devices.',
      date: '2023-04-05',
      likes: 2
    }
  ];
  
  // 要显示的评论数量
  const visibleComments = showAllComments 
    ? simulatedComments 
    : simulatedComments.slice(0, 2);
  
  // 处理评分提交
  const handleRatingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you for your rating of ${userRating} stars and comment!`);
    // 实际应用中，这里会调用API将评分和评论保存到数据库
  };
  
  // 精简模式视图
  if (compact) {
    return (
      <div className={`flex items-center ${className}`}>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg 
              key={star}
              className={`w-5 h-5 ${averageRating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="text-white ml-2">{averageRating.toFixed(1)}</span>
        <span className="text-gray-400 text-sm ml-1">({ratingCount})</span>
      </div>
    );
  }
  
  // 完整评分组件
  return (
    <div className={`game-ratings ${className}`}>
      {/* 当前游戏评分概况 */}
      <div className="flex items-center mb-6">
        <div className="flex flex-col items-center mr-6">
          <div className="text-4xl font-bold text-white">{averageRating.toFixed(1)}</div>
          <div className="flex mt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg 
                key={star}
                className={`w-4 h-4 ${averageRating >= star ? 'text-yellow-400' : 'text-gray-400'}`}
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <div className="text-gray-400 text-sm mt-1">{ratingCount} ratings</div>
        </div>
        
        <div className="flex-grow">
          {[5, 4, 3, 2, 1].map((num) => {
            // 计算该评分的百分比
            const percentage = ratingCount > 0 
              ? Math.round((simulatedComments.filter(c => c.rating === num).length / ratingCount) * 100) 
              : 0;
              
            return (
              <div key={num} className="flex items-center text-sm mb-1">
                <div className="w-3">{num}</div>
                <svg className="w-3 h-3 text-yellow-400 ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <div className="flex-grow mx-2 bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-yellow-400 h-full" 
                    style={{ width: `${percentage}%` }} 
                  />
                </div>
                <div className="text-gray-400 w-8 text-right">{percentage}%</div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* 添加评分表单 */}
      <form onSubmit={handleRatingSubmit} className="mb-8 p-4 bg-gray-700 rounded-lg">
        <h3 className="text-white text-lg mb-4">Add Your Rating</h3>
        
        <div className="flex items-center mb-4">
          <span className="text-gray-300 mr-3">Your rating:</span>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setUserRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="focus:outline-none"
              >
                <svg 
                  className={`w-8 h-8 transition-colors ${
                    (hoverRating || userRating) >= star 
                      ? 'text-yellow-400' 
                      : 'text-gray-400'
                  }`}
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
            ))}
          </div>
        </div>
        
        <div className="mb-4">
          <textarea
            value={userComment}
            onChange={(e) => setUserComment(e.target.value)}
            placeholder="Share your thoughts about this game..."
            className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            rows={4}
          />
        </div>
        
        <button 
          type="submit" 
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
          disabled={userRating === 0}
        >
          Submit Review
        </button>
      </form>
      
      {/* 用户评论列表 */}
      {visibleComments.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-white text-lg mb-4">Player Comments</h3>
          
          {visibleComments.map((comment) => (
            <div key={comment.id} className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-3">
                  <div className="w-10 h-10 rounded-full bg-gray-500 overflow-hidden">
                    {comment.userAvatar ? (
                      <img 
                        src={comment.userAvatar} 
                        alt={comment.username} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary text-white text-lg font-bold">
                        {comment.username.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex-grow">
                  <div className="flex justify-between items-center mb-1">
                    <div className="font-medium text-white">{comment.username}</div>
                    <div className="text-gray-400 text-sm">{comment.date}</div>
                  </div>
                  
                  <div className="flex mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg 
                        key={star}
                        className={`w-4 h-4 ${comment.rating >= star ? 'text-yellow-400' : 'text-gray-400'}`}
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  
                  <p className="text-gray-200 mb-3">{comment.comment}</p>
                  
                  <div className="flex items-center text-sm text-gray-400">
                    <button className="flex items-center hover:text-primary transition-colors">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                      </svg>
                      {comment.likes}
                    </button>
                    
                    <button className="flex items-center ml-4 hover:text-primary transition-colors">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      Reply
                    </button>
                  </div>
                  
                  {/* 回复 */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-4 pl-4 border-l-2 border-gray-600 space-y-4">
                      {comment.replies.map(reply => (
                        <div key={reply.id} className="flex items-start">
                          <div className="flex-shrink-0 mr-2">
                            <div className="w-8 h-8 rounded-full bg-gray-500 overflow-hidden">
                              {reply.userAvatar ? (
                                <img 
                                  src={reply.userAvatar} 
                                  alt={reply.username} 
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white text-sm font-bold">
                                  {reply.username.charAt(0).toUpperCase()}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex-grow">
                            <div className="flex justify-between items-center mb-1">
                              <div className="font-medium text-white text-sm">{reply.username}</div>
                              <div className="text-gray-400 text-xs">{reply.date}</div>
                            </div>
                            
                            <p className="text-gray-300 text-sm">{reply.comment}</p>
                            
                            <div className="flex items-center mt-1 text-xs text-gray-400">
                              <button className="flex items-center hover:text-primary transition-colors">
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                </svg>
                                {reply.likes}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {/* 显示更多评论按钮 */}
          {simulatedComments.length > 2 && (
            <button 
              onClick={() => setShowAllComments(!showAllComments)}
              className="text-primary hover:text-primary-light transition-colors mt-4 text-sm font-medium"
            >
              {showAllComments ? 'Show Less Comments' : `Show All Comments (${simulatedComments.length})`}
            </button>
          )}
        </div>
      )}
    </div>
  );
} 
'use client';

import { useState } from 'react';
import type { Comment } from '@/types';
import { UserAvatar } from '@/components/shared/UserAvatar';
import { Button } from '@/components/ui/Button';
import { formatRelativeTime } from '@/lib/utils/format';
import { useLocale } from '@/lib/hooks/useLocale';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface MarketCommentsProps {
  comments: Comment[];
  marketId: string;
}

export function MarketComments({ comments: initial }: MarketCommentsProps) {
  const { locale, t, commentContent, isKa } = useLocale();
  const [comments, setComments] = useState(initial);
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (!content.trim()) return;
    const newComment: Comment = {
      id: `c-${Date.now()}`,
      market_id: '',
      user_id: 'demo-user',
      content: content.trim(),
      likes: 0,
      created_at: new Date().toISOString(),
      profile: {
        id: 'demo-user',
        username: 'rezi_modebadze',
        avatar_url: null,
        lari_points: 8750,
        total_volume: 0,
        total_pnl: 0,
        rank: 'Predictor',
        created_at: '',
      },
    };
    setComments([newComment, ...comments]);
    setContent('');
  };

  return (
    <div className="glass-card p-4">
      <h3 className={cn('font-sora text-sm font-semibold text-slate-300 mb-4', isKa && 'font-georgian')}>
        {t('discussion')} ({comments.length})
      </h3>
      <div className="flex gap-3 mb-4">
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={t('sharePrediction')}
          className={cn(
            'flex-1 rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:border-teal/50 focus:outline-none',
            isKa && 'font-georgian placeholder:font-georgian'
          )}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        />
        <Button size="md" onClick={handleSubmit} className={isKa ? 'font-georgian' : ''}>
          {t('post')}
        </Button>
      </div>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-3">
            <UserAvatar username={comment.profile?.username ?? 'anon'} size="sm" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-white">@{comment.profile?.username}</span>
                <span className="text-xs text-slate-500">
                  {formatRelativeTime(comment.created_at, locale)}
                </span>
              </div>
              <p className={cn('text-sm text-slate-300', isKa && 'font-georgian')}>
                {commentContent(comment)}
              </p>
              <button className="flex items-center gap-1 mt-2 text-xs text-slate-500 hover:text-no transition-colors">
                <Heart className="h-3.5 w-3.5" />
                {comment.likes}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

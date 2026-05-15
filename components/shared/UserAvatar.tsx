import { cn } from '@/lib/utils/cn';

interface UserAvatarProps {
  username: string;
  avatarUrl?: string | null;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizes = { sm: 'h-8 w-8 text-xs', md: 'h-10 w-10 text-sm', lg: 'h-14 w-14 text-lg' };

export function UserAvatar({ username, avatarUrl, size = 'md', className }: UserAvatarProps) {
  const initial = username.charAt(0).toUpperCase();
  const colors = [
    'bg-teal/20 text-teal',
    'bg-amber/20 text-amber',
    'bg-yes/20 text-yes',
    'bg-no/20 text-no',
  ];
  const colorIndex = username.charCodeAt(0) % colors.length;

  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={username}
        className={cn('rounded-full object-cover', sizes[size], className)}
      />
    );
  }

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full font-semibold',
        sizes[size],
        colors[colorIndex],
        className
      )}
    >
      {initial}
    </div>
  );
}

export function formatLariPoints(amount: number, locale = 'en'): string {
  const formatted = new Intl.NumberFormat(locale === 'ka' ? 'ka-GE' : 'en-US', {
    maximumFractionDigits: 0,
  }).format(amount);
  return `${formatted.replace(/,/g, ' ')} ₾P`;
}

export function formatPrice(price: number): string {
  return `${(price * 100).toFixed(1)}%`;
}

export function formatDate(date: string | Date, locale = 'en'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  if (locale === 'ka') {
    return d.toLocaleDateString('ka-GE', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export function formatRelativeTime(date: string, locale = 'en'): string {
  const diff = Date.now() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  if (locale === 'ka') {
    if (minutes < 1) return 'ახლახან';
    if (minutes < 60) return `${minutes} წთ წინ`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} სთ წინ`;
    const days = Math.floor(hours / 24);
    return `${days} დღე წინ`;
  }
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function formatVolume(volume: number): string {
  if (volume >= 1_000_000) return `${(volume / 1_000_000).toFixed(1)}M`;
  if (volume >= 1_000) return `${(volume / 1_000).toFixed(1)}K`;
  return volume.toString();
}

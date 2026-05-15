'use client';

import { Suspense } from 'react';
import MarketsContent from './MarketsContent';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';

export default function MarketsPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <MarketsContent />
    </Suspense>
  );
}

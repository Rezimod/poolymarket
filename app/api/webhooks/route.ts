import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-webhook-secret');
  if (secret !== process.env.ADMIN_SECRET_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const payload = await request.json();
  const { marketId, outcome, source } = payload;

  if (!marketId || !outcome) {
    return NextResponse.json({ error: 'Missing marketId or outcome' }, { status: 400 });
  }

  const resolveUrl = new URL('/api/resolve', request.url);
  const res = await fetch(resolveUrl.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-admin-key': process.env.ADMIN_SECRET_KEY ?? '',
    },
    body: JSON.stringify({ marketId, outcome, source }),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-base">
      <nav className="border-b border-white/8 px-6 py-4 flex items-center gap-6">
        <Link href="/admin/markets" className="font-sora font-bold text-white">
          Admin <span className="text-teal">Panel</span>
        </Link>
        <Link href="/admin/markets" className="text-sm text-slate-400 hover:text-white">
          Markets
        </Link>
        <Link href="/admin/resolve" className="text-sm text-slate-400 hover:text-white">
          Resolve
        </Link>
        <Link href="/admin/users" className="text-sm text-slate-400 hover:text-white">
          Users
        </Link>
        <Link href="/markets" className="text-sm text-slate-500 hover:text-teal ml-auto">
          ← Back to app
        </Link>
      </nav>
      <main className="p-6 max-w-4xl mx-auto">{children}</main>
    </div>
  );
}

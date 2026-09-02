import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 font-bold text-slate-950">
            R
          </span>
          <span className="text-lg font-semibold text-white">Race Fuel</span>
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium text-slate-300">
          <Link href="/" className="transition hover:text-white">
            Home
          </Link>
          <Link href="/core" className="transition hover:text-white">
            Core
          </Link>
          <Link href="/docs" className="transition hover:text-white">
            Docs
          </Link>
        </div>
      </nav>
    </header>
  );
}

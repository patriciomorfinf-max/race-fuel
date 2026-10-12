import Link from "next/link";

const links = [
  { href: "/core", label: "Core" },
  { href: "/research", label: "Research" },
  { href: "/product", label: "Product" },
  { href: "/pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
];

export default function Navbar() {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-bold text-white">
          Race<span className="text-orange-500">Fuel</span>
        </Link>
        <div className="flex gap-5 text-sm font-medium text-slate-300">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="transition hover:text-orange-400">
              {l.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

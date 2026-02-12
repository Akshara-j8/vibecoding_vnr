import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-slate-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-cyan-400">
          Physiverse
        </Link>
        <div className="space-x-4">
          <Link href="/" className="text-white hover:text-cyan-400 transition">
            Home
          </Link>
          <Link href="/dashboard" className="text-white hover:text-cyan-400 transition">
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
}

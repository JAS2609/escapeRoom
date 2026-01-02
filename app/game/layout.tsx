import type { ReactNode } from "react";
import Link from "next/link";

export default function GameLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-black text-white">  
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
        <h1 className="text-xl font-bold tracking-wide">
          🚨 Escape Room
        </h1>
        <nav className="flex items-center gap-4 text-sm">
          <Link
            href="/game"
            className="hover:text-yellow-400 transition"
          >
            Jail
          </Link>
        </nav>
      </header>
    
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-6xl">
          {children}
        </div>
      </main>
      <footer className="px-6 py-3 text-center text-xs text-gray-400 border-t border-gray-700">
        Solve the puzzles. Free your friends.
      </footer>
    </div>
  );
}

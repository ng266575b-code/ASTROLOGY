"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute requireAdmin={true}>
      <div className="min-h-screen bg-[#020205] text-white flex flex-col">
        {/* Admin Header */}
        <header className="h-16 bg-red-900/20 border-b border-red-500/30 px-6 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-xl font-bold tracking-widest text-red-400">ORBITAR <span className="text-white">ADMIN SECURE PORTAL</span></h1>
          </div>
          <div className="text-xs font-mono text-gray-500 bg-black/50 px-3 py-1 rounded border border-white/10">
            Clearance Level: OMEGA
          </div>
        </header>

        {/* Main Admin Area */}
        <main className="flex-1 p-8 relative">
          {/* Subtle grid background for admin */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            {children}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

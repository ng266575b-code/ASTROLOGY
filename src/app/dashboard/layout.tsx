"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { name: "Dashboard", id: "/dashboard" },
    { name: "Insights", id: "/dashboard/insights" },
    { name: "Kundli", id: "/dashboard/kundli" },
    { name: "Tarot", id: "/dashboard/tarot" },
    { name: "Match", id: "/dashboard/match" },
    { name: "Guides", id: "/dashboard/guides" },
  ];

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#050810] text-white flex flex-col">
        {/* Dashboard Header (No Sidebar) */}
        <header className="sticky top-0 z-50 bg-[#0a0514]/80 backdrop-blur-xl border-b border-white/10 px-6 lg:px-12 h-20 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <Link href="/" className="text-2xl font-heading font-extrabold tracking-widest text-glow-gold hover:text-white transition-colors">
              ORBITAR <span className="text-sm font-normal text-gray-400">DASHBOARD</span>
            </Link>
            
            <nav className="hidden md:flex gap-6">
              {navItems.map((item) => {
                const isActive = pathname === item.id;
                return (
                  <Link 
                    key={item.id} 
                    href={item.id}
                    className={`text-sm font-bold uppercase tracking-wider transition-colors py-2 border-b-2 ${
                      isActive 
                        ? "text-celestial-gold border-celestial-gold" 
                        : "text-gray-400 border-transparent hover:text-white"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-xs text-gray-500 hover:text-aurora-purple hidden lg:block">Admin Portal</Link>
            <button 
              onClick={handleLogout}
              className="border border-white/20 hover:bg-white/10 px-4 py-2 rounded-lg text-sm font-bold transition-colors flex items-center gap-2"
            >
              Sign Out
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 lg:p-12 relative overflow-hidden">
          {/* Subtle cosmic background glow */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-aurora-purple/5 blur-[150px] rounded-full pointer-events-none" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            {children}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

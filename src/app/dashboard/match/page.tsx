"use client";
import { GlassCard } from "@/components/ui/GlassCard";

export default function DashboardMatch() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <h1 className="text-4xl font-heading font-bold text-white mb-4">Synastry & Compatibility</h1>
      <p className="text-gray-400 mb-12">Check your cosmic alignment with your partner.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <GlassCard glowColor="aurora" className="p-8 bg-black/60">
          <h3 className="text-xl font-bold text-celestial-gold mb-4 text-center">Your Details</h3>
          <p className="text-sm text-gray-500 text-center mb-6">Auto-filled from your profile</p>
          <div className="w-24 h-24 mx-auto bg-aurora-purple/20 rounded-full flex items-center justify-center text-4xl mb-4 border border-aurora-purple/50">🧑</div>
          <p className="text-center font-bold text-white">Satyam</p>
        </GlassCard>

        <GlassCard glowColor="gold" className="p-8 bg-black/60">
          <h3 className="text-xl font-bold text-celestial-gold mb-4 text-center">Partner Details</h3>
          <p className="text-sm text-gray-500 text-center mb-6">Enter to check compatibility</p>
          <form className="flex flex-col gap-4">
            <input type="text" placeholder="Partner's Name" className="bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-white" />
            <input type="date" className="bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-white" />
            <button type="button" className="w-full bg-celestial-gold text-black font-bold py-2 rounded-lg mt-4">Calculate Match</button>
          </form>
        </GlassCard>
      </div>
    </div>
  );
}

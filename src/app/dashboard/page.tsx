"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { GlassCard } from "@/components/ui/GlassCard";
import { motion } from "framer-motion";

export default function DashboardOverview() {
  const [userName, setUserName] = useState("Cosmic Traveler");

  useEffect(() => {
    const fetchUser = async () => {
      if (auth.currentUser) {
        const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
        if (userDoc.exists()) {
          setUserName(userDoc.data().name || "Cosmic Traveler");
        }
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Top Welcome Row */}
      <div className="flex flex-col md:flex-row gap-6 items-stretch">
        {/* Welcome Card */}
        <GlassCard glowColor="aurora" className="flex-1 p-8 bg-gradient-to-br from-black/80 to-[#1a0b2e]/60 border border-aurora-purple/30">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-aurora-purple/20 border-2 border-aurora-purple flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(157,0,255,0.4)]">
              🧑‍🚀
            </div>
            <div>
              <h2 className="text-3xl font-heading font-bold text-white mb-1">Welcome back,</h2>
              <p className="text-xl text-glow-gold font-bold">{userName}</p>
              <p className="text-sm text-gray-400 mt-2">Astro Enthusiast - Level 5</p>
            </div>
          </div>
        </GlassCard>

        {/* Daily Horoscope Summary */}
        <GlassCard glowColor="gold" className="md:w-1/3 p-6 bg-black/60 border border-white/10">
          <h3 className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-4">Daily Horoscope</h3>
          <h4 className="text-2xl font-bold text-celestial-gold mb-2">Capricorn</h4>
          <p className="text-sm text-gray-300 italic">"A day for exploration and creativity. Trust your cosmic intuition as planetary shifts favor your 10th house."</p>
        </GlassCard>
      </div>

      {/* Main Grid Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Interactive Sky Map (Mock) */}
        <div className="lg:col-span-2">
          <GlassCard glowColor="aurora" className="h-[400px] p-6 bg-black/60 border border-white/10 flex flex-col relative overflow-hidden group">
            <h3 className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-4 relative z-10">Interactive Sky Map</h3>
            
            <div className="flex-1 rounded-xl bg-[#03050a] border border-white/5 relative overflow-hidden flex items-center justify-center">
              {/* Mock Sky Map graphics */}
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
              
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                className="w-[300px] h-[300px] rounded-full border border-white/10 relative"
              >
                {/* Sun */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-yellow-500 shadow-[0_0_40px_rgba(255,200,0,0.8)]"></div>
                {/* Earth orbit */}
                <div className="absolute inset-4 rounded-full border border-blue-500/20"></div>
                <div className="absolute top-4 left-1/2 w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(0,100,255,0.8)]"></div>
                {/* Mars orbit */}
                <div className="absolute -inset-8 rounded-full border border-red-500/20"></div>
                <div className="absolute bottom-[-2rem] right-1/4 w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(255,0,0,0.8)]"></div>
              </motion.div>
            </div>
            
            <p className="text-xs text-gray-500 mt-4 relative z-10">Tonight's View (Your Location: Simulated)</p>
          </GlassCard>
        </div>

        {/* Right Column: Events & Activity */}
        <div className="flex flex-col gap-6">
          <GlassCard glowColor="gold" className="p-6 bg-black/60 border border-white/10">
            <h3 className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-4">Current Celestial Events</h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-xl">☄️</div>
                <div>
                  <h5 className="font-bold text-sm text-white">Meteor Shower Alert!</h5>
                  <p className="text-xs text-gray-400">Peaks in 2 Days</p>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-xl">🌖</div>
                <div>
                  <h5 className="font-bold text-sm text-white">Lunar Eclipse</h5>
                  <p className="text-xs text-gray-400">Oct 28</p>
                </div>
              </li>
            </ul>
          </GlassCard>

          <GlassCard glowColor="aurora" className="flex-1 p-6 bg-black/60 border border-white/10">
            <h3 className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-4">Cosmic News</h3>
            <div className="mb-4 pb-4 border-b border-white/10">
              <h5 className="font-bold text-sm text-white mb-1">Hubble discovers new exoplanet</h5>
              <p className="text-xs text-gray-400 leading-relaxed">NASA's telescope has found a potentially habitable world 40 light-years away.</p>
            </div>
            <div>
              <h5 className="font-bold text-sm text-white mb-1">Artemis Mission Update</h5>
              <p className="text-xs text-gray-400 leading-relaxed">The lunar base plans are moving forward ahead of schedule.</p>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

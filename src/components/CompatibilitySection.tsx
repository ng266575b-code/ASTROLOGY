"use client";

import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { LoginRequiredModal } from "./ui/LoginRequiredModal";
import { motion } from "framer-motion";
import { GlassCard } from "./ui/GlassCard";
import { CircularGauge } from "./ui/CircularGauge";

const ZODIACS = [
  "Aries", "Taurus", "Gemini", "Cancer", 
  "Leo", "Virgo", "Libra", "Scorpio", 
  "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

export function CompatibilitySection() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleCalculate = () => {
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }
    // Existing calculation logic would go here
  };

  return (
    <section id="synastry" className="py-24 px-6 lg:px-20 bg-cosmic-blue relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-celestial-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-4xl md:text-5xl font-bold mb-4 text-white"
          >
            Cosmic <span className="text-glow-gold text-celestial-gold">Synastry</span>
          </motion.h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Analyze the astrological resonance between two cosmic identities.</p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          {/* Form Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-md"
          >
            <GlassCard glowColor="aurora" className="p-8">
              <h3 className="font-heading text-2xl font-semibold mb-6 text-white text-center">Select Entities</h3>
              
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-gray-400">Entity 1 (Your Sign)</label>
                  <select className="bg-black/50 border border-white/20 rounded-lg p-3 text-white outline-none focus:border-celestial-gold cursor-pointer appearance-none">
                    {ZODIACS.map(z => <option key={z} value={z}>{z}</option>)}
                  </select>
                </div>
                
                <div className="flex justify-center text-aurora-green animate-pulse">
                  <span className="text-2xl font-bold">+</span>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm text-gray-400">Entity 2 (Partner&apos;s Sign)</label>
                  <select className="bg-black/50 border border-white/20 rounded-lg p-3 text-white outline-none focus:border-celestial-gold cursor-pointer appearance-none">
                    {ZODIACS.map(z => <option key={z} value={z}>{z}</option>)}
                  </select>
                </div>

                <button 
                  onClick={handleCalculate}
                  className="mt-4 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  Calculate Resonance
                </button>
              </div>
            </GlassCard>
          </motion.div>

          {/* Results Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-lg"
          >
            <div className="grid grid-cols-2 gap-6">
              <GlassCard className="flex flex-col items-center justify-center py-8">
                <CircularGauge value={95} label="Love" color="var(--color-aurora-purple)" />
              </GlassCard>
              <GlassCard className="flex flex-col items-center justify-center py-8">
                <CircularGauge value={60} label="Business" color="var(--color-celestial-gold)" />
              </GlassCard>
              <GlassCard className="col-span-2 flex flex-col items-center justify-center py-8">
                <CircularGauge value={88} label="Overall Harmony" color="var(--color-aurora-green)" />
              </GlassCard>
            </div>
          </motion.div>
        </div>
      </div>
      <LoginRequiredModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        featureName="Cosmic Synastry" 
      />
    </section>
  );
}

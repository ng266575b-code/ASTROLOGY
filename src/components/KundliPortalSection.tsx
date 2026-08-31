"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "./ui/GlassCard";
import { VedicKundliChart } from "./VedicKundliChart";
import { auth } from "@/lib/firebase";
import { LoginRequiredModal } from "./ui/LoginRequiredModal";
import { ConnectModal } from "./ui/ConnectModal";

export function KundliPortalSection() {
  const [formData, setFormData] = useState({ name: "", dob: "", time: "", place: "" });
  const [isGenerated, setIsGenerated] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }
    
    if (!formData.name || !formData.dob || !formData.time || !formData.place) return;
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsGenerated(true);
    }, 1500);
  };

  return (
    <section id="kundli" className="py-24 px-6 lg:px-20 bg-[#0B0F19] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-aurora-purple/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-4xl md:text-5xl font-bold mb-4 text-white"
          >
            Free <span className="text-aurora-purple text-glow-gold">Kundli & Horoscope</span>
          </motion.h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Enter your exact birth details to generate your personalized Kundli and read your current astrological forecast.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Input Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/3"
          >
            <GlassCard glowColor="aurora" className="p-8 border-2 border-aurora-purple/30 bg-black/40">
              <h3 className="font-heading text-2xl font-bold text-white mb-6">Birth Details</h3>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter your name" 
                    className="w-full bg-black/40 border border-white/20 rounded-lg py-2 px-3 text-white outline-none focus:border-aurora-purple transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Date of Birth</label>
                  <input 
                    type="date" 
                    value={formData.dob}
                    onChange={(e) => setFormData({...formData, dob: e.target.value})}
                    className="w-full bg-black/40 border border-white/20 rounded-lg py-2 px-3 text-white outline-none focus:border-aurora-purple transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Time of Birth</label>
                  <input 
                    type="time" 
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    className="w-full bg-black/40 border border-white/20 rounded-lg py-2 px-3 text-white outline-none focus:border-aurora-purple transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Place of Birth</label>
                  <input 
                    type="text" 
                    value={formData.place}
                    onChange={(e) => setFormData({...formData, place: e.target.value})}
                    placeholder="City, Country" 
                    className="w-full bg-black/40 border border-white/20 rounded-lg py-2 px-3 text-white outline-none focus:border-aurora-purple transition-colors"
                    required
                  />
                </div>
                
                <button 
                  type="submit" 
                  disabled={loading}
                  className="mt-4 w-full bg-gradient-to-r from-aurora-purple to-celestial-gold text-black font-bold py-3 rounded-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span className="animate-pulse">Generating...</span>
                  ) : (
                    "Generate Kundli"
                  )}
                </button>
              </form>
            </GlassCard>
          </motion.div>

          {/* Results Area */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-2/3 h-full"
          >
            {!isGenerated ? (
              <GlassCard glowColor="gold" className="w-full h-[600px] flex flex-col items-center justify-center p-8 border-2 border-dashed border-white/20 bg-black/20 text-center">
                <div className="w-24 h-24 mb-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <span className="text-4xl opacity-50">🔮</span>
                </div>
                <h3 className="text-xl font-heading font-bold text-gray-300 mb-2">Awaiting Birth Details</h3>
                <p className="text-gray-500 max-w-sm">Fill out the form to unlock your precise astrological natal chart and a customized horoscope reading.</p>
              </GlassCard>
            ) : (
              <div className="w-full h-full flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
                
                {/* Generated Horoscope Snippet (Tentative Prediction) */}
                <GlassCard glowColor="aurora" className="p-6 border border-aurora-purple/50 bg-black/60 shadow-[0_0_20px_rgba(157,0,255,0.2)]">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-heading text-xl font-bold text-celestial-gold">
                      Tentative Prediction for {formData.name}
                    </h3>
                    <span className="text-xs bg-white/10 text-gray-400 px-2 py-1 rounded">AI Generated</span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6">
                    {(() => {
                      const seedStr = formData.name + formData.dob + formData.place;
                      const seed = seedStr.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
                      
                      const houses = ["1st (Self)", "2nd (Wealth)", "3rd (Courage)", "4th (Home)", "5th (Creativity)", "7th (Partnerships)", "9th (Luck & Dharma)", "10th (Career)", "11th (Gains)", "12th (Spirituality)"];
                      const planets = ["Sun (Surya)", "Moon (Chandra)", "Mars (Mangal)", "Mercury (Budh)", "Jupiter (Guru)", "Venus (Shukra)", "Saturn (Shani)"];
                      
                      const house = houses[seed % houses.length];
                      const planet = planets[seed % planets.length];
                      
                      const themes = [
                        `signifies a powerful period for professional growth and personal transformation. Trust your intuition over the next 48 hours as ${planet}'s transit reveals hidden opportunities.`,
                        `indicates a time of emotional healing and strengthening relationships. The alignment in your ${house} house suggests a sudden positive shift in your domestic life.`,
                        `brings immense financial clarity. You may find unexpected sources of income as ${planet} blesses your endeavors this week.`,
                        `pushes you towards spiritual growth. Meditation and self-reflection will yield profound insights thanks to the current placement in your ${house} house.`,
                        `sparks a wave of creativity. Your ideas will be well-received by peers, and ${planet}'s influence guarantees a successful collaborative project.`,
                        `warns you to be cautious with sudden changes. However, strong energy in your ${house} house ensures that patience will eventually lead to long-term stability.`
                      ];
                      
                      const theme = themes[seed % themes.length];
                      
                      return `Based on your birth at ${formData.time} in ${formData.place} on ${formData.dob}, your cosmic alignments show a strong ${planet} influence in your ${house} house. This ${theme}`;
                    })()}
                  </p>
                  
                  <button 
                    onClick={() => setIsConnectModalOpen(true)}
                    className="w-full md:w-auto bg-gradient-to-r from-aurora-purple to-celestial-gold text-black font-bold py-3 px-6 rounded-lg hover:scale-105 transition-transform flex items-center justify-center gap-2 mx-auto shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                  >
                    For further and deep details contact astrologer
                  </button>
                </GlassCard>

                {/* Generated Natal Chart */}
                <div className="flex-1 w-full rounded-2xl overflow-hidden border-2 border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] bg-[#0a0514] flex flex-col items-center justify-center relative min-h-[400px]">
                  <div className="absolute top-4 left-6 z-20">
                    <h4 className="text-celestial-gold font-bold tracking-widest text-sm uppercase">Natal Chart</h4>
                    <p className="text-xs text-gray-400">Precision Generated</p>
                  </div>
                  
                  <div className="scale-[0.85] md:scale-100 flex items-center justify-center w-full h-full mt-4">
                    <VedicKundliChart seed={formData.name + formData.dob} />
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      
      <LoginRequiredModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        featureName="Free Kundli & Horoscope" 
      />
      <ConnectModal 
        isOpen={isConnectModalOpen} 
        onClose={() => setIsConnectModalOpen(false)} 
      />
    </section>
  );
}

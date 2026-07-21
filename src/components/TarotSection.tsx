"use client";

import { motion } from "framer-motion";
import { GlassCard } from "./ui/GlassCard";
import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { LoginRequiredModal } from "./ui/LoginRequiredModal";

const CARDS = [
  { title: "Past", description: "The foundations of your current cosmic state.", delay: 0 },
  { title: "Present", description: "The energies surrounding you right now.", delay: 0.2 },
  { title: "Future", description: "The trajectory of your immediate timeline.", delay: 0.4 },
];

const TAROT_DECK = [
  { name: "The Fool", meaning: "New beginnings, optimism, and taking a leap of faith into the unknown." },
  { name: "The Magician", meaning: "Action, the power to manifest, and utilizing your inner cosmic resources." },
  { name: "The High Priestess", meaning: "Intuition, sacred knowledge, and trusting your inner voice." },
  { name: "The Empress", meaning: "Abundance, nurturing, fertility, and alignment with nature." },
  { name: "The Emperor", meaning: "Structure, stability, rules, and claiming your personal power." },
  { name: "The Lovers", meaning: "Deep connections, passion, choices, and unifying cosmic energies." },
  { name: "The Chariot", meaning: "Determination, willpower, overcoming obstacles, and swift movement." },
  { name: "Strength", meaning: "Courage, subtle power, compassion, and taming the inner beast." },
  { name: "The Hermit", meaning: "Soul-searching, introspection, and receiving inner cosmic guidance." },
  { name: "Wheel of Fortune", meaning: "Good luck, karma, life cycles, and a sudden turning point." },
  { name: "The Star", meaning: "Hope, faith, purpose, and a beautiful cosmic omen of renewal." },
  { name: "The Moon", meaning: "Illusion, fear, anxiety, but also deep subconscious breakthroughs." },
  { name: "The Sun", meaning: "Positivity, fun, warmth, success, and absolute vitality." }
];

export function TarotSection() {
  const [revealed, setRevealed] = useState<Record<number, { name: string, meaning: string }>>({});
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleReveal = (idx: number) => {
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }
    if (revealed[idx]) return; // already revealed
    const randomCard = TAROT_DECK[Math.floor(Math.random() * TAROT_DECK.length)];
    setRevealed(prev => ({ ...prev, [idx]: randomCard }));
  };

  return (
    <section id="tarot" className="py-24 px-6 lg:px-20 bg-[#0B0F19] relative overflow-hidden">
      {/* Mystical background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-aurora-green/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="font-heading text-4xl md:text-5xl font-bold mb-4 text-white"
          >
            Digital <span className="text-aurora-green text-glow-gold">Tarot</span>
          </motion.h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Draw three cards to reveal the hidden threads of your journey.</p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-12" style={{ perspective: 1000 }}>
          {CARDS.map((card, idx) => {
            const isRevealed = !!revealed[idx];
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 50, rotateY: 30 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ delay: card.delay, duration: 0.8, ease: "easeOut" }}
                className="w-64 h-96"
              >
                <motion.div
                  className="w-full h-full relative cursor-pointer"
                  style={{ transformStyle: "preserve-3d" }}
                  animate={{ rotateY: isRevealed ? 180 : 0 }}
                  transition={{ duration: 0.6, type: "spring", stiffness: 60 }}
                  onClick={() => handleReveal(idx)}
                  whileHover={!isRevealed ? { y: -10, scale: 1.02 } : {}}
                >
                  {/* Front of Card (Unrevealed) */}
                  <GlassCard 
                    glowColor="gold" 
                    className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center p-6 border-2 border-celestial-gold/30 bg-black/40"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <div className="w-16 h-16 mb-8 rounded-full bg-celestial-gold/10 flex items-center justify-center border border-celestial-gold/50 shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                      <span className="text-2xl text-celestial-gold font-bold">{idx + 1}</span>
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-celestial-gold mb-4 uppercase tracking-widest">{card.title}</h3>
                    <p className="text-center text-sm text-gray-300">
                      {card.description}
                    </p>
                    <div className="mt-auto text-xs text-aurora-green animate-pulse uppercase tracking-widest font-semibold">
                      Tap to Reveal
                    </div>
                  </GlassCard>

                  {/* Back of Card (Revealed) */}
                  <GlassCard 
                    glowColor="aurora" 
                    className="absolute top-0 left-0 w-full h-full flex flex-col items-center p-6 border-[3px] border-aurora-purple/80 bg-gradient-to-b from-[#1a0f35] to-[#0a0514] shadow-[0_0_30px_rgba(157,0,255,0.5),inset_0_0_20px_rgba(157,0,255,0.2)]"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-50 pointer-events-none rounded-xl"></div>
                    
                    <h4 className="text-[10px] text-celestial-gold tracking-[0.3em] uppercase mt-2 mb-2 z-10 font-bold">{card.title} Draw</h4>
                    
                    <div className="flex-1 flex flex-col items-center justify-center w-full z-10 relative">
                      <div className="w-16 h-16 rounded-full bg-aurora-purple/20 flex items-center justify-center mb-6 shadow-[0_0_25px_rgba(157,0,255,0.8)] border border-aurora-purple/60 backdrop-blur-sm relative">
                        <div className="absolute inset-0 rounded-full border border-celestial-gold/30 animate-[spin_4s_linear_infinite]"></div>
                        <span className="text-2xl drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">✨</span>
                      </div>
                      
                      <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4 text-center drop-shadow-[0_0_15px_rgba(157,0,255,0.9)] leading-tight">
                        {isRevealed ? revealed[idx].name : ""}
                      </h3>
                      
                      <div className="w-3/4 h-[2px] bg-gradient-to-r from-transparent via-celestial-gold/60 to-transparent mb-5"></div>
                      
                      <p className="text-center text-sm md:text-sm text-gray-200 leading-relaxed font-medium px-2 drop-shadow-md">
                        {isRevealed ? revealed[idx].meaning : ""}
                      </p>
                    </div>
                  </GlassCard>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
      <LoginRequiredModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        featureName="Digital Tarot" 
      />
    </section>
  );
}

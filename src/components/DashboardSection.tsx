"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { GlassCard } from "./ui/GlassCard";
import { CircularGauge } from "./ui/CircularGauge";
import { AIChat } from "./AIChat";

export function DashboardSection() {
  const ref = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

  const [selectedInsight, setSelectedInsight] = useState<{name: string, text: string} | null>(null);

  const ZODIAC_INSIGHTS = [
    { name: "Aries", text: "Bold energy surrounds you.\nSeize the moment with courage." },
    { name: "Taurus", text: "Ground yourself in stability.\nPatience brings lasting rewards." },
    { name: "Gemini", text: "Communication flows easily.\nShare your innovative ideas." },
    { name: "Cancer", text: "Nurture your emotional core.\nFamily ties grow stronger today." },
    { name: "Leo", text: "Your creative spark ignites.\nStep confidently into the spotlight." },
    { name: "Virgo", text: "Organization is your key.\nSmall details yield big results." },
    { name: "Libra", text: "Harmony balances your spirit.\nSeek beauty in all interactions." },
    { name: "Scorpio", text: "Deep transformations unfold.\nEmbrace the mysteries within." },
    { name: "Sagittarius", text: "Adventure calls to you.\nExpand your philosophical horizons." },
    { name: "Capricorn", text: "Discipline paves the way.\nYour ambitions are within reach." },
    { name: "Aquarius", text: "Visionary thoughts emerge.\nEmbrace your unique perspective." },
    { name: "Pisces", text: "Intuition guides your path.\nLet your dreams flow freely." }
  ];

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleSliceHover = (i: number) => {
    setSelectedInsight(ZODIAC_INSIGHTS[i]);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setSelectedInsight(null);
    }, 3000);
  };

  // Generate 12 SVG pie slices
  const getSlicePath = (i: number) => {
    const a1 = (i * 30 - 15) * (Math.PI / 180);
    const a2 = ((i + 1) * 30 - 15) * (Math.PI / 180);
    const x1 = 50 + 50 * Math.sin(a1);
    const y1 = 50 - 50 * Math.cos(a1);
    const x2 = 50 + 50 * Math.sin(a2);
    const y2 = 50 - 50 * Math.cos(a2);
    return `M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`;
  };

  return (
    <section 
      id="dashboard"
      ref={ref}
      className="relative min-h-screen bg-cosmic-blue pt-32 pb-20 px-6 lg:px-20 overflow-hidden"
    >
      {/* Background gradients for the dashboard */}
      <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />
      <div className="absolute -left-[20%] top-[20%] w-[50%] h-[50%] bg-aurora-purple/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -right-[20%] bottom-[10%] w-[40%] h-[40%] bg-celestial-gold/5 blur-[100px] rounded-full pointer-events-none" />

      <motion.div style={{ opacity, y }} className="max-w-7xl mx-auto z-10 relative">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-glow-gold">
            The Orbitar AI Dashboard
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Initialize your personalized matrix. Discover real-time insights synchronized with the cosmos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          {/* Left Column - AI Chat */}
          <div className="order-2 lg:order-1 flex flex-col gap-8">
            <AIChat />
          </div>

          {/* Center Column - Anti-Gravity Cards */}
          <div className="order-1 lg:order-2 flex justify-center relative">
            <div className="absolute inset-0 bg-aurora-purple/10 blur-[100px] rounded-full z-0 pointer-events-none" />
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative z-10 w-[300px] h-[300px] md:w-[450px] md:h-[450px]"
            >
              {Array.from({ length: 12 }).map((_, i) => {
                const angle = (i / 12) * Math.PI * 2;
                const radius = i % 2 === 0 ? 32 : 44; 
                const left = (50 + Math.cos(angle) * radius).toFixed(2);
                const top = (50 + Math.sin(angle) * radius).toFixed(2);
                
                return (
                  <div 
                    key={i} 
                    className="absolute z-20 w-12 h-12 md:w-16 md:h-16"
                    style={{ left: `calc(${left}% - 2rem)`, top: `calc(${top}% - 2rem)` }}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1,
                        y: [0, i % 2 === 0 ? -15 : 15, 0],
                        x: [0, i % 3 === 0 ? 10 : -10, 0]
                      }}
                      transition={{ 
                        opacity: { duration: 1, delay: i * 0.1 },
                        scale: { duration: 1, delay: i * 0.1 },
                        y: { duration: 4 + (i % 3), repeat: Infinity, ease: "easeInOut" },
                        x: { duration: 5 + (i % 2), repeat: Infinity, ease: "easeInOut" }
                      }}
                      className="w-full h-full cursor-pointer group"
                      onMouseEnter={() => handleSliceHover(i)}
                    >
                      <div className="w-full h-full rounded-2xl bg-white/5 border border-white/10 shadow-[0_0_20px_rgba(157,0,255,0.2)] backdrop-blur-xl overflow-hidden p-2 transition-all duration-300 group-hover:border-aurora-purple/50 group-hover:bg-white/10 group-hover:scale-110">
                        <Image 
                          src={`/icon_${ZODIAC_INSIGHTS[i].name.toLowerCase()}.png`}
                          alt={ZODIAC_INSIGHTS[i].name}
                          fill
                          className="object-contain p-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                          priority={i < 4}
                        />
                      </div>
                    </motion.div>
                  </div>
                );
              })}

              {/* Insight Popup */}
              {selectedInsight && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-[85%] pointer-events-none"
                >
                  <GlassCard glowColor="gold" className="p-5 text-center bg-black/80 backdrop-blur-md">
                    <h4 className="text-lg md:text-xl font-heading font-bold text-white mb-2 uppercase tracking-widest drop-shadow-md">
                      {selectedInsight.name}
                    </h4>
                    <p className="text-sm md:text-base font-medium text-celestial-gold whitespace-pre-line leading-relaxed">
                      {selectedInsight.text}
                    </p>
                  </GlassCard>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Right Column - Gauges */}
          <div className="order-3 lg:order-3 flex flex-col sm:flex-row lg:flex-col gap-6 justify-center">
            <GlassCard className="flex-1 flex items-center justify-center py-6">
              <CircularGauge value={85} label="Love Energy" color="var(--color-aurora-purple)" />
            </GlassCard>
            <GlassCard className="flex-1 flex items-center justify-center py-6">
              <CircularGauge value={92} label="Career Focus" color="var(--color-celestial-gold)" />
            </GlassCard>
            <GlassCard className="flex-1 flex items-center justify-center py-6">
              <CircularGauge value={78} label="Finance Outlook" color="var(--color-aurora-green)" />
            </GlassCard>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

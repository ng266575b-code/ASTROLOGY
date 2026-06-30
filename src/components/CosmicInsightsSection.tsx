"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { getDailyHoroscope } from "@/app/actions";

const ZODIACS = [
  { name: "Aries", symbol: "RAM", dates: "MAR 21 - APR 19" },
  { name: "Taurus", symbol: "BULL", dates: "APR 20 - MAY 20" },
  { name: "Gemini", symbol: "TWINS", dates: "MAY 21 - JUN 20" },
  { name: "Cancer", symbol: "CRAB", dates: "JUN 21 - JUL 22" },
  { name: "Leo", symbol: "LION", dates: "JUL 23 - AUG 22" },
  { name: "Virgo", symbol: "MAIDEN", dates: "AUG 23 - SEP 22" },
  { name: "Libra", symbol: "SCALES", dates: "SEP 23 - OCT 22" },
  { name: "Scorpio", symbol: "SCORPION", dates: "OCT 23 - NOV 21" },
  { name: "Sagittarius", symbol: "ARCHER", dates: "NOV 22 - DEC 21" },
  { name: "Capricorn", symbol: "GOAT", dates: "DEC 22 - JAN 19" },
  { name: "Aquarius", symbol: "WATER BEARER", dates: "JAN 20 - FEB 18" },
  { name: "Pisces", symbol: "FISH", dates: "FEB 19 - MAR 20" }
];

function getSeededRandom(seed: number) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

function generateStats(signIndex: number) {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate() + signIndex * 13;
  return { 
    love: Math.floor(getSeededRandom(seed) * 40) + 60,
    career: Math.floor(getSeededRandom(seed + 1) * 40) + 60,
    health: Math.floor(getSeededRandom(seed + 2) * 40) + 60
  };
}

export function CosmicInsightsSection() {
  const [insights, setInsights] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [stats, setStats] = useState({ love: 80, career: 95, health: 70 });
  const [dateRangeStr, setDateRangeStr] = useState("");
  const autoRotateRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize Date Range & Fetch Data
  useEffect(() => {
    const today = new Date();
    const past = new Date();
    past.setDate(today.getDate() - 20);

    const formatOpts: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
    const todayFormatted = new Intl.DateTimeFormat('en-US', formatOpts).format(today);
    const pastFormatted = new Intl.DateTimeFormat('en-US', formatOpts).format(past);
    setDateRangeStr(`${pastFormatted} - ${todayFormatted}`);

    async function fetchHoroscopes() {
      try {
        const promises = ZODIACS.map(async (sign) => {
          const text = await getDailyHoroscope(sign.name);
          return { sign: sign.name, text: text || "Cosmic energies are shifting..." };
        });
        
        const results = await Promise.all(promises);
        const newInsights: Record<string, string> = {};
        results.forEach(r => newInsights[r.sign] = r.text);
        setInsights(newInsights);
      } catch (error) {
        console.error("Failed to fetch horoscopes:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchHoroscopes();
  }, []);

  // Update Stats when index changes
  useEffect(() => {
    setStats(generateStats(selectedIdx));
  }, [selectedIdx]);

  // Auto-rotate every 6 seconds
  useEffect(() => {
    const startRotation = () => {
      autoRotateRef.current = setInterval(() => {
        setSelectedIdx((prev) => (prev + 1) % 12);
      }, 6000);
    };

    startRotation();

    return () => {
      if (autoRotateRef.current) clearInterval(autoRotateRef.current);
    };
  }, []);

  // Allow user to click and pause rotation temporarily
  const handleSignClick = (idx: number) => {
    setSelectedIdx(idx);
    if (autoRotateRef.current) {
      clearInterval(autoRotateRef.current);
      autoRotateRef.current = setInterval(() => {
        setSelectedIdx((prev) => (prev + 1) % 12);
      }, 8000); // Wait 8 seconds after a manual click before resuming auto-rotation
    }
  };

  const selectedSign = ZODIACS[selectedIdx];
  const wheelRotation = -(selectedIdx * 30);

  return (
    <section id="insights" className="pt-20 bg-cosmic-blue relative overflow-hidden min-h-screen flex flex-col items-center justify-between">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-aurora-purple/10 via-[#0B0F19] to-[#0B0F19] pointer-events-none" />

      {/* Text Display Area */}
      <div className="relative z-20 text-center w-full max-w-4xl mx-auto mt-12 px-6">
        <h4 className="text-gray-400 tracking-[0.2em] text-xs md:text-sm font-semibold mb-6 uppercase">Your Daily Guidance</h4>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIdx}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center"
          >
            <h1 className="text-5xl md:text-7xl font-heading text-celestial-gold font-bold uppercase tracking-wider mb-2 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">
              {selectedSign.name}
            </h1>
            <h2 className="text-2xl md:text-4xl font-heading text-celestial-gold font-medium mb-3 uppercase tracking-widest drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]">
              Daily Horoscope
            </h2>
            <p className="text-aurora-purple text-base md:text-lg font-medium mb-6 tracking-wide">
              {dateRangeStr}
            </p>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 relative opacity-90 drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">
                <Image src={`/icon_${selectedSign.name.toLowerCase()}.png`} alt="icon" fill className="object-contain" />
              </div>
              <span className="text-celestial-gold tracking-widest uppercase font-bold text-sm">
                {selectedSign.symbol}
              </span>
            </div>

            <div className="min-h-[120px] mb-8">
              {loading ? (
                <div className="flex justify-center py-6">
                  <div className="w-8 h-8 border-4 border-aurora-purple border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <p className="text-gray-200 text-sm md:text-lg leading-relaxed max-w-3xl text-center shadow-black drop-shadow-md">
                  {insights[selectedSign.name] || "The cosmos are aligning today."}
                </p>
              )}
            </div>

            {/* Progress Bars */}
            <div className="flex justify-center gap-6 md:gap-16 w-full max-w-2xl mb-8">
              {[
                { label: 'Love', val: stats.love },
                { label: 'Career', val: stats.career },
                { label: 'Health', val: stats.health }
              ].map(stat => (
                <div key={stat.label} className="flex flex-col items-start w-24 md:w-32">
                  <div className="flex justify-between w-full text-white text-xs md:text-sm font-medium mb-2">
                    <span>{stat.label}</span>
                    <span>{stat.val}%</span>
                  </div>
                  <div className="w-full h-1.5 md:h-2 bg-white/10 rounded-full overflow-hidden shadow-[inset_0_0_5px_rgba(0,0,0,0.5)]">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-aurora-purple to-celestial-gold"
                      initial={{ width: 0 }}
                      animate={{ width: `${stat.val}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <button className="px-8 py-3 rounded-full border border-celestial-gold text-celestial-gold font-medium uppercase tracking-widest hover:bg-celestial-gold hover:text-black transition-all hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] text-sm md:text-base">
              View All Signs
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Radial Dial Container (U-Shape) */}
      <div className="relative w-full max-w-[1200px] h-[350px] md:h-[450px] mt-10 overflow-hidden shrink-0 z-10">
        
        {/* The rotating wheel */}
        <motion.div 
          className="absolute bottom-24 md:bottom-32 left-1/2 w-[1000px] h-[1000px] md:w-[1600px] md:h-[1600px] rounded-full"
          style={{ x: "-50%" }}
          animate={{ rotate: wheelRotation }}
          transition={{ type: "spring", stiffness: 40, damping: 15 }}
        >
          {/* Thick Tracks */}
          <div className="absolute inset-0 rounded-full border-[50px] md:border-[70px] border-[#0f1424] shadow-[inset_0_0_40px_rgba(0,0,0,0.9),_0_0_60px_rgba(157,0,255,0.2)]">
             <div className="absolute inset-0 rounded-full border-y-[4px] border-aurora-purple m-[6px] md:m-[10px] drop-shadow-[0_0_12px_rgba(157,0,255,0.8)] opacity-80"></div>
             <div className="absolute inset-0 rounded-full border border-white/20 m-[20px] md:m-[35px]"></div>
          </div>

          {/* Icons placed around the track */}
          {ZODIACS.map((sign, i) => {
             const angleDeg = i * 30; // 0 to 330
             // Counter-rotate the icon so it stays upright!
             const iconRotation = -(wheelRotation + angleDeg);
             
             return (
               <div 
                 key={sign.name}
                 className="absolute bottom-0 left-1/2 -translate-x-1/2 origin-top cursor-pointer flex flex-col justify-end"
                 style={{ 
                   height: "50%",
                   transform: `rotate(${angleDeg}deg)` 
                 }}
                 onClick={() => handleSignClick(i)}
               >
                  <motion.div 
                    className="relative w-10 h-10 md:w-16 md:h-16 mb-5 md:mb-7 mx-auto z-20"
                    animate={{ rotate: iconRotation }}
                    transition={{ type: "spring", stiffness: 40, damping: 15 }}
                  >
                     <Image 
                        src={`/icon_${sign.name.toLowerCase()}.png`} 
                        alt={sign.name} 
                        fill 
                        className={`object-contain transition-all duration-300 ${selectedIdx === i ? 'opacity-100 drop-shadow-[0_0_20px_rgba(212,175,55,1)] brightness-125' : 'opacity-50 hover:opacity-100 hover:drop-shadow-[0_0_10px_rgba(157,0,255,0.8)]'}`}
                     />
                  </motion.div>
                  {/* Small decorative dot below the icon */}
                  <div className="w-1.5 h-1.5 rounded-full bg-celestial-gold mx-auto mb-2 opacity-50 shadow-[0_0_5px_rgba(212,175,55,1)]"></div>
               </div>
             )
          })}
        </motion.div>

        {/* Selected Highlight Overlay (Static) */}
        <div className="absolute bottom-0 md:bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center justify-end z-30 pointer-events-none pb-4 w-full">
           <div className="w-20 h-24 md:w-28 md:h-32 border-[3px] border-celestial-gold rounded-t-xl bg-black/60 backdrop-blur-md shadow-[0_0_30px_rgba(212,175,55,0.3),inset_0_0_20px_rgba(212,175,55,0.2)] relative z-20 flex items-center justify-center">
              <div className="absolute -top-[12px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[12px] border-b-celestial-gold drop-shadow-[0_-5px_5px_rgba(212,175,55,0.5)]"></div>
              {/* Display the active icon clearly inside the highlighted box! */}
              <div className="relative w-12 h-12 md:w-16 md:h-16">
                 <Image src={`/icon_${selectedSign.name.toLowerCase()}.png`} alt="icon" fill className="object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.8)] brightness-125" />
              </div>
           </div>
           
           <div className="text-center mt-2 md:mt-4 z-20">
              <p className="text-celestial-gold font-heading text-lg md:text-2xl uppercase font-bold tracking-widest drop-shadow-md">{selectedSign.name}</p>
              <p className="text-aurora-purple text-[10px] md:text-xs tracking-[0.2em] whitespace-nowrap opacity-90">{selectedSign.dates}</p>
           </div>
        </div>
      </div>
    </section>
  );
}

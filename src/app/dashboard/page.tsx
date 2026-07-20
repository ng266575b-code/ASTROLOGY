"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { GlassCard } from "@/components/ui/GlassCard";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const HOROSCOPES = [
  { sign: "Aries", text: "A burst of fiery energy propels your career forward today. Take the lead on new projects." },
  { sign: "Taurus", text: "Financial stability is highlighted. A surprise investment opportunity might present itself." },
  { sign: "Gemini", text: "Communication is your superpower today. An important conversation will clear up past misunderstandings." },
  { sign: "Cancer", text: "Focus on domestic harmony. Your intuition is heightened regarding family matters." },
  { sign: "Leo", text: "Creative pursuits are favored. Don't be afraid to step into the spotlight and share your talents." },
  { sign: "Virgo", text: "Organization brings peace of mind. A health or fitness routine started today will have lasting benefits." },
  { sign: "Libra", text: "Romance and partnerships glow. Balance your personal needs with those of your significant other." },
  { sign: "Scorpio", text: "Deep transformation is occurring. Let go of old habits to make room for cosmic growth." },
  { sign: "Sagittarius", text: "Adventure calls! Even a short trip or learning a new subject will satisfy your wanderlust." },
  { sign: "Capricorn", text: "Professional recognition is on the horizon. Your hard work and discipline are finally paying off." },
  { sign: "Aquarius", text: "Innovative ideas flow effortlessly. Connect with like-minded groups to turn your vision into reality." },
  { sign: "Pisces", text: "Spiritual insights guide you. Pay attention to your dreams, they hold answers to your waking questions." }
];

const CELESTIAL_EVENTS = [
  { icon: "☄️", title: "Perseid Meteor Shower", time: "Peaking Tonight", url: "https://solarsystem.nasa.gov/asteroids-comets-and-meteors/meteors-and-meteorites/perseids/in-depth/" },
  { icon: "🌖", title: "Penumbral Lunar Eclipse", time: "March 25, 2024", url: "https://en.wikipedia.org/wiki/March_2024_lunar_eclipse" },
  { icon: "🪐", title: "Saturn at Opposition", time: "September 8, 2024", url: "https://in-the-sky.org/news.php?id=20240908_12_100" }
];

const COSMIC_NEWS = [
  { title: "James Webb Telescope Discovers New Exoplanet Water Signatures", desc: "NASA's premier observatory has detected distinct signs of water vapor in the atmosphere of a distant super-Earth.", url: "https://webbtelescope.org/" },
  { title: "Solar Maximum Approaching Faster Than Expected", desc: "Scientists report increased solar flare activity, predicting spectacular auroras in lower latitudes this month.", url: "https://www.swpc.noaa.gov/" }
];

export default function DashboardOverview() {
  const [userName, setUserName] = useState("Cosmic Traveler");
  const [currentHoroIndex, setCurrentHoroIndex] = useState(0);

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

    // Auto-rotate horoscopes every 3 seconds
    const interval = setInterval(() => {
      setCurrentHoroIndex((prev) => (prev + 1) % HOROSCOPES.length);
    }, 3000);

    return () => clearInterval(interval);
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

        {/* Daily Horoscope Summary (Auto-Rotating) */}
        <GlassCard glowColor="gold" className="md:w-1/3 p-6 bg-black/60 border border-white/10 flex flex-col justify-center relative overflow-hidden">
          <h3 className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-2 absolute top-6">Daily Horoscope</h3>
          
          <div className="h-24 mt-6 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentHoroIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <h4 className="text-2xl font-bold text-celestial-gold mb-2">{HOROSCOPES[currentHoroIndex].sign}</h4>
                <p className="text-sm text-gray-300 italic line-clamp-2">"{HOROSCOPES[currentHoroIndex].text}"</p>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Progress dots */}
          <div className="flex gap-1 absolute bottom-4">
            {HOROSCOPES.map((_, i) => (
              <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === currentHoroIndex ? "w-4 bg-celestial-gold" : "w-1 bg-white/20"}`} />
            ))}
          </div>
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
              {CELESTIAL_EVENTS.map((evt, i) => (
                <li key={i}>
                  <Link href={evt.url} target="_blank" className="flex items-center gap-4 group cursor-pointer hover:bg-white/5 p-2 -mx-2 rounded-lg transition-colors">
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">{evt.icon}</div>
                    <div className="flex-1">
                      <h5 className="font-bold text-sm text-white group-hover:text-celestial-gold transition-colors">{evt.title}</h5>
                      <p className="text-xs text-gray-400">{evt.time}</p>
                    </div>
                    <div className="text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">↗</div>
                  </Link>
                </li>
              ))}
            </ul>
          </GlassCard>

          <GlassCard glowColor="aurora" className="flex-1 p-6 bg-black/60 border border-white/10">
            <h3 className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-4">Cosmic News</h3>
            <div className="flex flex-col gap-4">
              {COSMIC_NEWS.map((news, i) => (
                <Link key={i} href={news.url} target="_blank" className="block group border-b border-white/5 pb-3 last:border-0 last:pb-0">
                  <h5 className="font-bold text-sm text-white mb-1 group-hover:text-aurora-purple transition-colors">{news.title}</h5>
                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{news.desc}</p>
                </Link>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

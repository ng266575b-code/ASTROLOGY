"use client";

import { motion } from "framer-motion";

export function VedicKundliChart({ seed = "default" }: { seed?: string }) {
  // Generate deterministic number from seed string
  const seedNum = seed.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);

  // Randomize ascendant based on seed
  const ascendant = (seedNum % 12) + 1;
  
  // Randomize planet placements deterministically
  const planets = [
    { name: "Su", house: ((seedNum * 2) % 12) + 1 },
    { name: "Mo", house: ((seedNum * 3) % 12) + 1 },
    { name: "Ma", house: ((seedNum * 5) % 12) + 1 },
    { name: "Me", house: ((seedNum * 7) % 12) + 1 },
    { name: "Ju", house: ((seedNum * 11) % 12) + 1 },
    { name: "Ve", house: ((seedNum * 13) % 12) + 1 },
    { name: "Sa", house: ((seedNum * 17) % 12) + 1 },
    { name: "Ra", house: ((seedNum * 19) % 12) + 1 },
    { name: "Ke", house: (((seedNum * 19) % 12) + 1 + 6 > 12) ? ((seedNum * 19) % 12) + 1 - 6 : ((seedNum * 19) % 12) + 1 + 6 }, // Ke is always opposite Ra
  ];

  const getZodiacNum = (houseNum: number) => {
    let z = ascendant + (houseNum - 1);
    if (z > 12) z -= 12;
    return z;
  };

  // Center coordinates for the 12 houses to place text
  // Coordinates based on a 400x400 SVG box
  const houseCoords = [
    { h: 1, x: 200, y: 100 },
    { h: 2, x: 100, y: 50 },
    { h: 3, x: 50, y: 100 },
    { h: 4, x: 100, y: 200 },
    { h: 5, x: 50, y: 300 },
    { h: 6, x: 100, y: 350 },
    { h: 7, x: 200, y: 300 },
    { h: 8, x: 300, y: 350 },
    { h: 9, x: 350, y: 300 },
    { h: 10, x: 300, y: 200 },
    { h: 11, x: 350, y: 100 },
    { h: 12, x: 300, y: 50 },
  ];

  return (
    <motion.div
      className="relative flex items-center justify-center w-[350px] h-[350px] md:w-[450px] md:h-[450px]"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {/* Outer Glow */}
      <div className="absolute inset-0 bg-aurora-purple/10 blur-3xl pointer-events-none" />

      {/* Vedic North Indian Kundli SVG */}
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full text-celestial-gold drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]"
      >
        {/* Chart Background */}
        <rect x="10" y="10" width="380" height="380" fill="#130b29" stroke="none" />
        
        {/* Outer Square Border */}
        <rect x="10" y="10" width="380" height="380" stroke="currentColor" strokeWidth="3" fill="none" />
        
        {/* Diagonals */}
        <line x1="10" y1="10" x2="390" y2="390" stroke="currentColor" strokeWidth="2" />
        <line x1="390" y1="10" x2="10" y2="390" stroke="currentColor" strokeWidth="2" />
        
        {/* Inner Diamond (Midpoint connections) */}
        <line x1="200" y1="10" x2="390" y2="200" stroke="currentColor" strokeWidth="2" />
        <line x1="390" y1="200" x2="200" y2="390" stroke="currentColor" strokeWidth="2" />
        <line x1="200" y1="390" x2="10" y2="200" stroke="currentColor" strokeWidth="2" />
        <line x1="10" y1="200" x2="200" y2="10" stroke="currentColor" strokeWidth="2" />

        {/* Render Planets and Zodiac Numbers in each House */}
        {houseCoords.map((house) => {
          // Find planets in this house
          const housePlanets = planets.filter((p) => p.house === house.h).map(p => p.name).join(", ");
          const zodiac = getZodiacNum(house.h);

          return (
            <g key={house.h}>
              {/* Zodiac Sign Number */}
              <text
                x={house.x}
                y={house.y - 15}
                textAnchor="middle"
                fill="rgba(255, 255, 255, 0.4)"
                fontSize="14"
                fontFamily="sans-serif"
              >
                {zodiac}
              </text>
              
              {/* Planets */}
              <text
                x={house.x}
                y={house.y + 10}
                textAnchor="middle"
                fill="var(--color-aurora-green, #00FF9D)"
                fontSize="18"
                fontWeight="bold"
                fontFamily="sans-serif"
                className="drop-shadow-[0_0_8px_rgba(0,255,157,0.8)]"
              >
                {housePlanets}
              </text>
            </g>
          );
        })}
      </svg>
    </motion.div>
  );
}

import { motion } from "framer-motion";

interface CircularGaugeProps {
  value: number; // 0 to 100
  label: string;
  color: string;
}

export function CircularGauge({ value, label, color, lightMode }: CircularGaugeProps & { lightMode?: boolean }) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative flex items-center justify-center">
        {/* Background Circle */}
        <svg className="w-32 h-32 transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke={lightMode ? "rgba(0,0,0,0.1)" : "rgba(255, 255, 255, 0.1)"}
            strokeWidth="8"
            fill="transparent"
          />
          {/* Progress Circle */}
          <motion.circle
            cx="64"
            cy="64"
            r={radius}
            stroke={color}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            strokeLinecap="round"
            style={{
              filter: `drop-shadow(0 0 8px ${color})`,
            }}
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className={`text-2xl font-heading font-bold ${lightMode ? 'text-gray-900' : 'text-white'}`}>{value}%</span>
        </div>
      </div>
      <span className={`mt-4 text-sm font-medium tracking-wider uppercase ${lightMode ? 'text-gray-700' : 'text-gray-300'}`}>{label}</span>
    </div>
  );
}

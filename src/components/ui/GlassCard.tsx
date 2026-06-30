import { ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  glowColor?: "none" | "gold" | "aurora";
}

export function GlassCard({ children, className = "", glowColor = "none", ...props }: GlassCardProps) {
  let glowClass = "";
  if (glowColor === "gold") glowClass = "glow-border-gold";
  if (glowColor === "aurora") glowClass = "glow-border-aurora";

  return (
    <motion.div
      className={`glass-card ${glowClass} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}

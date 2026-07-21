"use client";

import { motion } from "framer-motion";
import { GlassCard } from "./ui/GlassCard";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Er. Ajay Verma",
    role: "Spiritual Seeker",
    content: "The astrological guidance provided here has been nothing short of extraordinary. The clarity and precision are truly unmatched! 5 stars to the entire team.",
    rating: 5,
    image: "https://cbii.shivalikcollege.edu.in/assets/ak-DP7NnX5A.jpg"
  },
  {
    id: 2,
    name: "Er. Kshitij Jain",
    role: "Tech Enthusiast",
    content: "A beautifully designed platform that perfectly blends technology with ancient cosmic wisdom. Orbitar AI Oracle is my daily go-to for insights.",
    rating: 5,
    image: "https://cbii.shivalikcollege.edu.in/assets/kshitijjain-DvrFwvbC.jpg"
  },
  {
    id: 3,
    name: "Kavya T.",
    role: "Yoga Instructor",
    content: "The UI is absolutely gorgeous. Exploring my cosmic insights was so easy and magical. A must-have platform for anyone spiritual.",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=kavya"
  },
  {
    id: 4,
    name: "Vikram P.",
    role: "Business Owner",
    content: "Dr. Surmadhur Pant's guidance changed my perspective completely. This platform connects you with the best premium cosmic guides.",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=vikram"
  },
  {
    id: 5,
    name: "Meera J.",
    role: "Creative Writer",
    content: "The beautiful cosmic design and the Tarot section are my daily go-to. It sets a positive, mystical tone for my entire day. 5 stars!",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=meera"
  }
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 px-6 lg:px-20 bg-[#050810] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-celestial-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-4xl md:text-5xl font-bold mb-4 text-white"
          >
            Cosmic <span className="text-celestial-gold text-glow-gold">Testimonials</span>
          </motion.h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            See what other travelers of the cosmos are saying about their journey.
          </p>
        </div>

        <div className="flex overflow-x-auto gap-6 pb-8 pt-4 px-4 scrollbar-hide snap-x snap-mandatory">
          {TESTIMONIALS.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="min-w-[320px] md:min-w-[380px] snap-center"
            >
              <GlassCard glowColor="aurora" className="h-full flex flex-col p-8 border-2 border-white/10 hover:border-aurora-purple/50 transition-colors">
                <div className="flex items-center gap-4 mb-6">
                  <img src={testimonial.image} alt={testimonial.name} className="w-14 h-14 rounded-full border-2 border-celestial-gold/50" />
                  <div>
                    <h4 className="font-heading font-bold text-lg text-white">{testimonial.name}</h4>
                    <p className="text-xs text-aurora-green">{testimonial.role}</p>
                  </div>
                </div>
                
                <p className="text-gray-300 italic mb-6 flex-1 text-sm leading-relaxed">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center gap-1 text-celestial-gold">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

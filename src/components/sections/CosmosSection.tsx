import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Globe, Clock, BookOpen, Search, ArrowUp, ArrowDown, Music, Eye, Brain } from 'lucide-react';
import Image from 'next/image';

interface CosmosSectionProps {
  isActive: boolean;
  t: (key: string) => string;
  language?: 'DE' | 'EN' | 'LA';
}

function CosmosSection({ isActive, t, language = 'DE' }: CosmosSectionProps) {
  const [selectedSphere, setSelectedSphere] = useState<any>(null);
  const [isRotating, setIsRotating] = useState(false);

  if (!isActive) return null;

  return (
    <motion.section
      className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-black" />
      
      <div className="relative z-10 w-full max-w-8xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-300 mb-6">
            Macrobius' Kosmos
          </h1>
          <h2 className="text-2xl md:text-3xl text-yellow-200 mb-8">
            Die Neun Himmlischen Sphären
          </h2>
          <p className="text-lg md:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-8">
            Im 5. Jahrhundert nach Christus dokumentierte Macrobius in seinem Kommentar zu Scipios Traum eine 
            kosmologische Vision, die das mittelalterliche Weltbild prägte und tausend Jahre später Tycho Brahe 
            zu revolutionären astronomischen Beobachtungen inspirierte.
          </p>
        </motion.div>
        
        <div className="text-center">
          <div className="text-6xl mb-4">🌌</div>
          <p className="text-xl text-white/80">
            Interaktive Kosmologie-Visualisierung wird geladen...
          </p>
          <div className="mt-8 p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
            <h3 className="text-lg font-semibold text-yellow-300 mb-4">Oracle Cloud Integration</h3>
            <p className="text-white/80">
              Verbinde zu Oracle Cloud Backend für authentische Macrobius-Kosmologie...
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default CosmosSection;
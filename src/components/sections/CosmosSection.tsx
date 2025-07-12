import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Globe, Clock, BookOpen, Search, ArrowUp, ArrowDown, Music, Eye, Brain, AlertCircle, Wifi } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

interface CosmosSectionProps {
  isActive: boolean;
  t?: (key: string) => string; // Optional for backward compatibility
  language?: 'DE' | 'EN' | 'LA';
}

function CosmosSection({ isActive, t: propT, language = 'DE' }: CosmosSectionProps) {
  const { t: contextT } = useLanguage();
  const t = propT || contextT; // Use prop t if provided, otherwise context t
  
  const [selectedSphere, setSelectedSphere] = useState<number | null>(null);
  const [isRotating, setIsRotating] = useState(false);
  const [oracleStatus, setOracleStatus] = useState<'connected' | 'disconnected' | 'checking'>('checking');

  // Check Oracle Cloud connection status
  useEffect(() => {
    const checkOracleConnection = async () => {
      try {
        setOracleStatus('checking');
        // Simulate connection check to Oracle Cloud
        const response = await fetch('http://152.70.184.232:8080/health', { 
          method: 'GET',
          timeout: 5000
        }).catch(() => null);
        
        if (response && response.ok) {
          setOracleStatus('connected');
        } else {
          setOracleStatus('disconnected');
        }
      } catch (error) {
        setOracleStatus('disconnected');
      }
    };

    if (isActive) {
      checkOracleConnection();
    }
  }, [isActive]);

  // Nine Celestial Spheres data with translations
  const celestialSpheres = [
    {
      id: 1,
      name: t('cosmos.sphere1_name'),
      latin: 'Luna',
      description: t('cosmos.sphere1_description'),
      properties: t('cosmos.sphere1_properties'),
      influence: t('cosmos.sphere1_influence'),
      color: 'from-gray-300 to-gray-500'
    },
    {
      id: 2,
      name: t('cosmos.sphere2_name'),
      latin: 'Mercurius',
      description: t('cosmos.sphere2_description'),
      properties: t('cosmos.sphere2_properties'),
      influence: t('cosmos.sphere2_influence'),
      color: 'from-orange-300 to-orange-500'
    },
    {
      id: 3,
      name: t('cosmos.sphere3_name'),
      latin: 'Venus',
      description: t('cosmos.sphere3_description'),
      properties: t('cosmos.sphere3_properties'),
      influence: t('cosmos.sphere3_influence'),
      color: 'from-pink-300 to-pink-500'
    },
    {
      id: 4,
      name: t('cosmos.sphere4_name'),
      latin: 'Sol',
      description: t('cosmos.sphere4_description'),
      properties: t('cosmos.sphere4_properties'),
      influence: t('cosmos.sphere4_influence'),
      color: 'from-yellow-300 to-yellow-500'
    },
    {
      id: 5,
      name: t('cosmos.sphere5_name'),
      latin: 'Mars',
      description: t('cosmos.sphere5_description'),
      properties: t('cosmos.sphere5_properties'),
      influence: t('cosmos.sphere5_influence'),
      color: 'from-red-300 to-red-500'
    },
    {
      id: 6,
      name: t('cosmos.sphere6_name'),
      latin: 'Iuppiter',
      description: t('cosmos.sphere6_description'),
      properties: t('cosmos.sphere6_properties'),
      influence: t('cosmos.sphere6_influence'),
      color: 'from-blue-300 to-blue-500'
    },
    {
      id: 7,
      name: t('cosmos.sphere7_name'),
      latin: 'Saturnus',
      description: t('cosmos.sphere7_description'),
      properties: t('cosmos.sphere7_properties'),
      influence: t('cosmos.sphere7_influence'),
      color: 'from-purple-300 to-purple-500'
    },
    {
      id: 8,
      name: t('cosmos.sphere8_name'),
      latin: 'Stellae Fixae',
      description: t('cosmos.sphere8_description'),
      properties: t('cosmos.sphere8_properties'),
      influence: t('cosmos.sphere8_influence'),
      color: 'from-indigo-300 to-indigo-500'
    },
    {
      id: 9,
      name: t('cosmos.sphere9_name'),
      latin: 'Primum Mobile',
      description: t('cosmos.sphere9_description'),
      properties: t('cosmos.sphere9_properties'),
      influence: t('cosmos.sphere9_influence'),
      color: 'from-white to-gray-200'
    }
  ];

  if (!isActive) return null;

  return (
    <motion.section
      className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-black" />
      
      {/* Animated Stars Background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 w-full max-w-8xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-300 mb-6">
            {t('cosmos.title')}
          </h1>
          <h2 className="text-2xl md:text-3xl text-yellow-200 mb-8">
            {t('cosmos.subtitle')}
          </h2>
          <p className="text-lg md:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-8">
            {t('cosmos.description')}
          </p>
        </motion.div>

        {/* Oracle Cloud Status */}
        <div className="mb-8 flex justify-center">
          <div className={`flex items-center gap-3 px-4 py-2 rounded-lg border ${
            oracleStatus === 'connected' 
              ? 'bg-green-900/30 border-green-500 text-green-300' 
              : oracleStatus === 'disconnected'
              ? 'bg-red-900/30 border-red-500 text-red-300'
              : 'bg-yellow-900/30 border-yellow-500 text-yellow-300'
          }`}>
            {oracleStatus === 'connected' ? (
              <Wifi className="w-4 h-4" />
            ) : oracleStatus === 'disconnected' ? (
              <AlertCircle className="w-4 h-4" />
            ) : (
              <Clock className="w-4 h-4 animate-spin" />
            )}
            <span className="text-sm">
              {oracleStatus === 'connected' 
                ? t('oracle.connected')
                : oracleStatus === 'disconnected'
                ? t('oracle.error')
                : t('oracle.connecting')
              }
            </span>
          </div>
        </div>
        
        {/* Nine Celestial Spheres */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {celestialSpheres.map((sphere, index) => (
            <motion.div
              key={sphere.id}
              className={`relative bg-gradient-to-br ${sphere.color} bg-opacity-20 backdrop-blur-md rounded-xl border border-white/20 p-6 cursor-pointer hover:scale-105 transition-all duration-300`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              onClick={() => setSelectedSphere(selectedSphere === sphere.id ? null : sphere.id)}
            >
              {/* Sphere Visual */}
              <div className="text-center mb-4">
                <motion.div 
                  className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${sphere.color} shadow-lg mb-3`}
                  animate={{ 
                    rotate: isRotating ? 360 : 0,
                    scale: selectedSphere === sphere.id ? 1.1 : 1
                  }}
                  transition={{ 
                    rotate: { duration: 10, ease: "linear", repeat: Infinity },
                    scale: { duration: 0.3 }
                  }}
                />
                <h3 className="text-lg font-bold text-white mb-1">{sphere.name}</h3>
                <p className="text-sm text-yellow-200 italic">{sphere.latin}</p>
              </div>
              
              <p className="text-white/80 text-sm leading-relaxed mb-4">
                {sphere.description}
              </p>
              
              <AnimatePresence>
                {selectedSphere === sphere.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-white/20 pt-4 mt-4"
                  >
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-yellow-300 mb-1">{t('cosmos.properties_label')}</h4>
                        <p className="text-white/70 text-sm">{sphere.properties}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-yellow-300 mb-1">{t('cosmos.influence_label')}</h4>
                        <p className="text-white/70 text-sm">{sphere.influence}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Cosmological Insights */}
        <motion.div
          className="bg-gradient-to-br from-purple/20 to-indigo/20 rounded-xl border border-purple/30 p-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <h3 className="text-2xl font-bold text-yellow-300 mb-6 text-center flex items-center justify-center gap-2">
            <Brain className="w-6 h-6" />
            {t('cosmos.insights_title')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl mb-4">🎵</div>
              <h4 className="font-semibold text-yellow-300 mb-2">{t('cosmos.insight1_title')}</h4>
              <p className="text-white/80 text-sm leading-relaxed">
                {t('cosmos.insight1_description')}
              </p>
            </div>
            <div>
              <div className="text-4xl mb-4">🔢</div>
              <h4 className="font-semibold text-yellow-300 mb-2">{t('cosmos.insight2_title')}</h4>
              <p className="text-white/80 text-sm leading-relaxed">
                {t('cosmos.insight2_description')}
              </p>
            </div>
            <div>
              <div className="text-4xl mb-4">👁️</div>
              <h4 className="font-semibold text-yellow-300 mb-2">{t('cosmos.insight3_title')}</h4>
              <p className="text-white/80 text-sm leading-relaxed">
                {t('cosmos.insight3_description')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Tycho Brahe Connection */}
        <motion.div
          className="mt-8 bg-gradient-to-br from-amber/20 to-orange/20 rounded-xl border border-amber/30 p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <div className="text-center">
            <h4 className="text-xl font-bold text-amber-300 mb-3">{t('cosmos.tycho_title')}</h4>
            <p className="text-white/80 text-sm leading-relaxed max-w-3xl mx-auto">
              {t('cosmos.tycho_description')}
            </p>
          </div>
        </motion.div>

        {/* Interactive Controls */}
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => setIsRotating(!isRotating)}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <Star className="w-4 h-4" />
            {isRotating ? t('cosmos.stop_rotation') : t('cosmos.start_rotation')}
          </button>
          <button
            onClick={() => setSelectedSphere(null)}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
          >
            {t('cosmos.reset_view')}
          </button>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { 
            opacity: 0.3; 
            transform: scale(0.8); 
          }
          50% { 
            opacity: 1; 
            transform: scale(1.2); 
          }
        }
      `}</style>
    </motion.section>
  );
}

export default CosmosSection;
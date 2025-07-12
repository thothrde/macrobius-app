import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wine, Users, BookOpen, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface BanquetSectionProps {
  isActive: boolean;
  t?: (key: string) => string; // Optional for backward compatibility
  language?: 'DE' | 'EN' | 'LA';
}

function BanquetSection({ isActive, t: propT, language = 'DE' }: BanquetSectionProps) {
  const { t: contextT } = useLanguage();
  const t = propT || contextT; // Use prop t if provided, otherwise context t
  
  const [selectedParticipant, setSelectedParticipant] = useState<number | null>(null);

  if (!isActive) return null;

  return (
    <motion.section
      className="relative min-h-screen flex items-center justify-center px-4 py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-wine-900 via-wine-800 to-wine-900" />
      
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="flex items-center justify-center space-x-4 mb-6">
            <Wine className="w-8 h-8 text-gold" />
            <h1 className="text-5xl md:text-7xl font-bold text-gold">
              {t('banquet.title')}
            </h1>
            <Users className="w-8 h-8 text-gold" />
          </div>
          
          <h2 className="text-2xl md:text-3xl text-gold-200 mb-8">
            {t('banquet.subtitle')}
          </h2>
          
          <p className="text-lg md:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
            {t('banquet.description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Banquet Scene */}
          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-gold mb-6 flex items-center gap-2">
              <Wine className="w-6 h-6" />
              {t('banquet.scene_title')}
            </h3>
            
            <div className="space-y-4">
              <div className="text-6xl text-center mb-6">🍷</div>
              
              <div className="bg-gradient-to-br from-gold/20 to-wine/20 rounded-lg p-6">
                <h4 className="font-semibold text-gold mb-3">{t('banquet.participants_title')}</h4>
                <div className="space-y-2 text-white/90">
                  <p>• <strong>{t('banquet.participant1_name')}</strong> - {t('banquet.participant1_role')}</p>
                  <p>• <strong>{t('banquet.participant2_name')}</strong> - {t('banquet.participant2_role')}</p>
                  <p>• <strong>{t('banquet.participant3_name')}</strong> - {t('banquet.participant3_role')}</p>
                  <p>• <strong>{t('banquet.participant4_name')}</strong> - {t('banquet.participant4_role')}</p>
                  <p>• <strong>{t('banquet.participant5_name')}</strong> - {t('banquet.participant5_role')}</p>
                </div>
              </div>
              
              <div className="bg-wine/20 rounded-lg p-4">
                <h4 className="font-semibold text-gold mb-2">{t('banquet.context_title')}</h4>
                <p className="text-white/80 text-sm leading-relaxed">
                  {t('banquet.context_description')}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Discussion Topics */}
          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-gold mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6" />
              {t('banquet.topics_title')}
            </h3>
            
            <div className="space-y-4">
              {[
                {
                  day: t('banquet.day1'),
                  topics: [
                    t('banquet.day1_topic1'),
                    t('banquet.day1_topic2'),
                    t('banquet.day1_topic3')
                  ],
                  icon: '📜'
                },
                {
                  day: t('banquet.day2'), 
                  topics: [
                    t('banquet.day2_topic1'),
                    t('banquet.day2_topic2'),
                    t('banquet.day2_topic3')
                  ],
                  icon: '🌌'
                },
                {
                  day: t('banquet.day3'),
                  topics: [
                    t('banquet.day3_topic1'),
                    t('banquet.day3_topic2'),
                    t('banquet.day3_topic3')
                  ],
                  icon: '⚖️'
                }
              ].map((day, index) => (
                <motion.div
                  key={day.day}
                  className="bg-gradient-to-r from-gold/20 to-wine/20 rounded-lg p-4 hover:from-gold/30 hover:to-wine/30 transition-all cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.2 }}
                  onClick={() => setSelectedParticipant(selectedParticipant === index ? null : index)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{day.icon}</span>
                      <div>
                        <h4 className="font-semibold text-gold">{day.day}</h4>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {day.topics.map((topic, topicIndex) => (
                            <span
                              key={topicIndex}
                              className="px-3 py-1 bg-white/20 text-white/90 rounded-full text-sm"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Clock className="w-5 h-5 text-gold/60" />
                  </div>
                  
                  <AnimatePresence>
                    {selectedParticipant === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t border-white/20"
                      >
                        <p className="text-white/80 text-sm italic">
                          {t('banquet.quote')}
                        </p>
                        <p className="text-gold/80 text-xs mt-2">- {t('banquet.quote_attribution')}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Cultural Legacy */}
        <motion.div
          className="mt-16 bg-gradient-to-br from-gold/20 to-wine/20 rounded-xl border border-gold/30 p-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <h3 className="text-2xl font-bold text-gold mb-6 text-center">
            🏛️ {t('banquet.legacy_title')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl mb-4">📜</div>
              <h4 className="font-semibold text-gold mb-2">{t('banquet.legacy1_title')}</h4>
              <p className="text-white/80 text-sm leading-relaxed">
                {t('banquet.legacy1_description')}
              </p>
            </div>
            <div>
              <div className="text-4xl mb-4">🎭</div>
              <h4 className="font-semibold text-gold mb-2">{t('banquet.legacy2_title')}</h4>
              <p className="text-white/80 text-sm leading-relaxed">
                {t('banquet.legacy2_description')}
              </p>
            </div>
            <div>
              <div className="text-4xl mb-4">🌍</div>
              <h4 className="font-semibold text-gold mb-2">{t('banquet.legacy3_title')}</h4>
              <p className="text-white/80 text-sm leading-relaxed">
                {t('banquet.legacy3_description')}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default BanquetSection;
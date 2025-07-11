import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wine, Users, BookOpen, Clock } from 'lucide-react';

interface BanquetSectionProps {
  isActive: boolean;
  t: (key: string) => string;
  language?: 'DE' | 'EN' | 'LA';
}

function BanquetSection({ isActive, t, language = 'DE' }: BanquetSectionProps) {
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
              Saturnalia
            </h1>
            <Users className="w-8 h-8 text-gold" />
          </div>
          
          <h2 className="text-2xl md:text-3xl text-gold-200 mb-8">
            Das Gelehrte Gastmahl
          </h2>
          
          <p className="text-lg md:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
            In Macrobius' Saturnalia treffen sich die gebildetsten Männer Roms zu einem 
            dreitägigen Festmahl. Zwischen Wein und Speisen entspinnen sich gelehrte Gespräche 
            über Literatur, Philosophie, Religion und Naturwissenschaften - ein Spiegel 
            der spätrömischen Bildungskultur.
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
              Das Gastmahl
            </h3>
            
            <div className="space-y-4">
              <div className="text-6xl text-center mb-6">🍷</div>
              
              <div className="bg-gradient-to-br from-gold/20 to-wine/20 rounded-lg p-6">
                <h4 className="font-semibold text-gold mb-3">Die Teilnehmer</h4>
                <div className="space-y-2 text-white/90">
                  <p>• <strong>Vettius Agorius Praetextatus</strong> - Stadtpräfekt und Philosoph</p>
                  <p>• <strong>Virius Nicomachus Flavianus</strong> - Historiker und Staatsmann</p>
                  <p>• <strong>Quintus Aurelius Symmachus</strong> - Redner und Senator</p>
                  <p>• <strong>Servius</strong> - Grammatiker und Vergil-Kommentator</p>
                  <p>• <strong>Caecina Albinus</strong> - Gelehrter und Politiker</p>
                </div>
              </div>
              
              <div className="bg-wine/20 rounded-lg p-4">
                <h4 className="font-semibold text-gold mb-2">Kultureller Kontext</h4>
                <p className="text-white/80 text-sm leading-relaxed">
                  Diese Männer repräsentierten die letzte Generation der klassischen römischen 
                  Bildungselite. Ihre Gespräche konservierten jahrtausendealtes Wissen für 
                  die Nachwelt.
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
              Gesprächsthemen
            </h3>
            
            <div className="space-y-4">
              {[
                {
                  day: 'Tag 1',
                  topics: ['Vergils Dichtkunst', 'Antike Grammatik', 'Sprachgeschichte'],
                  icon: '📜'
                },
                {
                  day: 'Tag 2', 
                  topics: ['Philosophie und Religion', 'Astronomie', 'Naturwissenschaften'],
                  icon: '🌌'
                },
                {
                  day: 'Tag 3',
                  topics: ['Recht und Gesellschaft', 'Geschichte Roms', 'Kulturelle Traditionen'],
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
                          „In solchen Gesprächen zeigt sich die wahre Bildung - nicht als totes Wissen, 
                          sondern als lebendige Kultur, die von Generation zu Generation weitergegeben wird.“
                        </p>
                        <p className="text-gold/80 text-xs mt-2">- Macrobius über die Saturnalien</p>
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
            🏛️ Kulturelles Erbe
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl mb-4">📜</div>
              <h4 className="font-semibold text-gold mb-2">Textbewahrung</h4>
              <p className="text-white/80 text-sm leading-relaxed">
                Die Saturnalien konservierten hunderte antiker Zitate und Fragmente, 
                die sonst verloren gegangen wären
              </p>
            </div>
            <div>
              <div className="text-4xl mb-4">🎭</div>
              <h4 className="font-semibold text-gold mb-2">Bildungsideal</h4>
              <p className="text-white/80 text-sm leading-relaxed">
                Das Modell des gelehrten Gesprächs prägte mittelalterliche und 
                Renaissance-Bildung nachhaltig
              </p>
            </div>
            <div>
              <div className="text-4xl mb-4">🌍</div>
              <h4 className="font-semibold text-gold mb-2">Kulturvermittlung</h4>
              <p className="text-white/80 text-sm leading-relaxed">
                Die Verbindung von Unterhaltung und Gelehrsamkeit wurde zum 
                Vorbild humanistischer Kultur
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default BanquetSection;
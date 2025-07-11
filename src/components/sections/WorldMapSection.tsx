import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, Globe, Compass, Mountain } from 'lucide-react';

interface WorldMapSectionProps {
  isActive: boolean;
  t: (key: string) => string;
  language?: 'DE' | 'EN' | 'LA';
}

function WorldMapSection({ isActive, t, language = 'DE' }: WorldMapSectionProps) {
  const [selectedZone, setSelectedZone] = useState<number | null>(null);

  const climateZones = [
    {
      id: 1,
      name: 'Arktische Zone',
      latinName: 'Zona Frigida Septentrionalis',
      description: 'Die nördliche Eiszone - unbewohnbar aufgrund extremer Kälte',
      characteristics: 'Ewiges Eis, keine Vegetation, unbewohnbar',
      macrobiusQuote: 'Zona frigida et inhabitabilis propter nimium frigus',
      color: '#E0F2FE'
    },
    {
      id: 2,
      name: 'Nördliche gemäßigte Zone',
      latinName: 'Zona Temperata Septentrionalis', 
      description: 'Die bewohnbare Zone der nördlichen Hemisphäre',
      characteristics: 'Vier Jahreszeiten, fruchtbare Länder, dichte Besiedlung',
      macrobiusQuote: 'Zona temperata et habitabilis, ubi nos vivimus',
      color: '#86EFAC'
    },
    {
      id: 3,
      name: 'Heiße Äquatorzone',
      latinName: 'Zona Torrida',
      description: 'Die brennende Zone am Äquator - zu heiß für menschliches Leben',
      characteristics: 'Extreme Hitze, Wüsten, schwer überwindbar',
      macrobiusQuote: 'Zona torrida et inhabitabilis propter nimium calorem',
      color: '#FDE047'
    },
    {
      id: 4,
      name: 'Südliche gemäßigte Zone',
      latinName: 'Zona Temperata Australis',
      description: 'Die hypothetische Antipoden-Zone der südlichen Hemisphäre',
      characteristics: 'Spiegel unserer Welt, aber unzugänglich',
      macrobiusQuote: 'Zona temperata sed nobis incognita',
      color: '#A7F3D0'
    },
    {
      id: 5,
      name: 'Südliche Eiszone',
      latinName: 'Zona Frigida Australis',
      description: 'Die südliche Eiszone - Spiegelbild der nördlichen Kälte',
      characteristics: 'Ewiges Eis, symmetrisch zur nördlichen Zone',
      macrobiusQuote: 'Zona frigida australis, similis septentrionali',
      color: '#E0F2FE'
    }
  ];

  if (!isActive) return null;

  return (
    <motion.section
      className="relative min-h-screen flex items-center justify-center px-4 py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-green-900 to-blue-900" />
      
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="flex items-center justify-center space-x-4 mb-6">
            <Map className="w-8 h-8 text-blue-400" />
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-green-200 to-blue-200">
              Macrobius' Weltkarte
            </h1>
            <Globe className="w-8 h-8 text-green-400" />
          </div>
          
          <h2 className="text-2xl md:text-3xl text-blue-200 mb-8">
            Die Fünf Klimazonen der Erde
          </h2>
          
          <p className="text-lg md:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
            Macrobius' geographische Weltanschauung teilte die Erde in fünf konzentrische 
            Klimazonen - eine bemerkenswert genaue wissenschaftliche Beschreibung für das 
            5. Jahrhundert. Diese Theorie beeinflusste die mittelalterliche Geographie 
            über 1000 Jahre lang.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* World Map Visualization */}
          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-blue-200 mb-6 flex items-center gap-2">
              <Compass className="w-6 h-6" />
              Die Erdkugel nach Macrobius
            </h3>
            
            {/* Simplified Earth Zones */}
            <div className="relative w-full h-96 bg-gradient-to-b from-white via-yellow-200 to-white rounded-xl overflow-hidden border-4 border-blue-300/50">
              {climateZones.map((zone, index) => (
                <motion.div
                  key={zone.id}
                  className="absolute left-0 right-0 cursor-pointer transition-all duration-300 hover:z-10"
                  style={{
                    top: `${index * 20}%`,
                    height: '20%',
                    backgroundColor: zone.color,
                    border: selectedZone === zone.id ? '3px solid #FFD700' : '1px solid rgba(255,255,255,0.3)'
                  }}
                  onClick={() => setSelectedZone(selectedZone === zone.id ? null : zone.id)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.02, zIndex: 10 }}
                >
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <h4 className="font-bold text-gray-800 text-sm">{zone.name}</h4>
                      <p className="text-gray-700 text-xs italic">{zone.latinName}</p>
                    </div>
                  </div>
                  
                  {/* Zone details on hover */}
                  {selectedZone === zone.id && (
                    <motion.div
                      className="absolute left-full top-0 ml-4 w-64 bg-black/90 text-white p-4 rounded-lg z-20"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <h5 className="font-bold text-yellow-300 mb-2">{zone.name}</h5>
                      <p className="text-sm mb-3">{zone.description}</p>
                      <div className="border-t border-white/20 pt-2">
                        <p className="text-xs italic text-yellow-200">'{zone.macrobiusQuote}'</p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
              
              {/* Earth center indicator */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-yellow-600 rounded-full border-2 border-white shadow-lg" />
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-white/80 text-sm">
                🔍 Klicken Sie auf die Zonen für Details
              </p>
            </div>
          </motion.div>

          {/* Zone Details */}
          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-green-200 mb-6 flex items-center gap-2">
              <Mountain className="w-6 h-6" />
              Klimazonen-Details
            </h3>
            
            <div className="space-y-4">
              {climateZones.map((zone, index) => (
                <motion.div
                  key={zone.id}
                  className={`p-4 rounded-lg border transition-all cursor-pointer ${
                    selectedZone === zone.id
                      ? 'bg-yellow-500/20 border-yellow-400/50'
                      : 'bg-white/5 border-white/20 hover:bg-white/10'
                  }`}
                  onClick={() => setSelectedZone(selectedZone === zone.id ? null : zone.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full border border-white/50"
                        style={{ backgroundColor: zone.color }}
                      />
                      <div>
                        <h4 className="font-semibold text-white">{zone.name}</h4>
                        <p className="text-white/60 text-sm italic">{zone.latinName}</p>
                      </div>
                    </div>
                    <span className="text-white/40 text-lg">#{zone.id}</span>
                  </div>
                  
                  <AnimatePresence>
                    {selectedZone === zone.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t border-white/20"
                      >
                        <div className="space-y-3">
                          <div>
                            <h5 className="font-semibold text-yellow-300 mb-1">Beschreibung:</h5>
                            <p className="text-white/80 text-sm">{zone.description}</p>
                          </div>
                          <div>
                            <h5 className="font-semibold text-green-300 mb-1">Eigenschaften:</h5>
                            <p className="text-white/80 text-sm">{zone.characteristics}</p>
                          </div>
                          <div className="bg-blue-500/10 border border-blue-500/20 rounded p-3">
                            <h5 className="font-semibold text-blue-300 mb-1">Macrobius' Originaltext:</h5>
                            <p className="text-blue-200 text-sm italic'>{zone.macrobiusQuote}'</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scientific Legacy */}
        <motion.div
          className="mt-16 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-xl border border-purple-500/20 p-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <h3 className="text-2xl font-bold text-purple-200 mb-6 text-center">
            🌍 Wissenschaftliches Erbe
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl mb-4">🧭</div>
              <h4 className="font-semibold text-purple-200 mb-2">Klimawissenschaft</h4>
              <p className="text-white/80 text-sm leading-relaxed">
                Macrobius' Klimazonen-Theorie war wissenschaftlich bemerkenswert genau 
                und beeinflusste die Geographie bis zur Renaissance
              </p>
            </div>
            <div>
              <div className="text-4xl mb-4">🗺️</div>
              <h4 className="font-semibold text-purple-200 mb-2">Kartographie</h4>
              <p className="text-white/80 text-sm leading-relaxed">
                Seine Beschreibungen prägten mittelalterliche Weltkarten und 
                förderten das Verständnis der Erdkugel
              </p>
            </div>
            <div>
              <div className="text-4xl mb-4">🌡️</div>
              <h4 className="font-semibold text-purple-200 mb-2">Moderne Bestätigung</h4>
              <p className="text-white/80 text-sm leading-relaxed">
                Die Köppen-Klimaklassifikation bestätigt heute Macrobius' 
                grundlegende Einteilung der Klimazonen
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default WorldMapSection;
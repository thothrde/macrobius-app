import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, Globe, Compass, Mountain, Thermometer, Eye, BookOpen, Snowflake, Sun, TreePine } from 'lucide-react';

interface WorldMapSectionProps {
  isActive: boolean;
  language?: 'DE' | 'EN' | 'LA';
}

// 🚨 EMERGENCY DIRECT TRANSLATIONS - BYPASSING BROKEN CONTEXT
const DIRECT_TRANSLATIONS = {
  DE: {
    title: 'Macrobius\' Weltkarte',
    subtitle: 'Die Fünf Klimazonen der Erde',
    description: 'Macrobius\' geographische Weltanschauung teilte die Erde in fünf konzentrische Klimazonen - eine bemerkenswert genaue wissenschaftliche Beschreibung für das 5. Jahrhundert. Diese Theorie beeinflusste die mittelalterliche Geographie über 1000 Jahre lang.',
    earth_title: 'Die Erdkugel nach Macrobius',
    click_zones: 'Klicken Sie auf die Zonen für Details',
    zones_details_title: 'Klimazonen-Details',
    description_label: 'Beschreibung',
    characteristics_label: 'Eigenschaften',
    macrobius_quote_label: 'Macrobius\' Originaltext',
    // Climate Zones
    zone1_name: 'Arktische Zone',
    zone1_latin: 'Zona Frigida Septentrionalis',
    zone1_description: 'Die nördliche Eiszone - unbewohnbar aufgrund extremer Kälte',
    zone1_characteristics: 'Ewiges Eis, keine Vegetation, unbewohnbar',
    zone1_quote: 'Zona frigida et inhabitabilis propter nimium frigus',
    zone2_name: 'Nördliche gemäßigte Zone',
    zone2_latin: 'Zona Temperata Septentrionalis',
    zone2_description: 'Die bewohnbare Zone der nördlichen Hemisphäre - unsere Welt',
    zone2_characteristics: 'Vier Jahreszeiten, fruchtbare Länder, dichte Besiedlung',
    zone2_quote: 'Zona temperata et habitabilis, ubi nos vivimus',
    zone3_name: 'Heiße Äquatorzone',
    zone3_latin: 'Zona Torrida',
    zone3_description: 'Die brennende Zone am Äquator - zu heiß für menschliches Leben',
    zone3_characteristics: 'Extreme Hitze, Wüsten, schwer überwindbar',
    zone3_quote: 'Zona torrida et inhabitabilis propter nimium calorem',
    zone4_name: 'Südliche gemäßigte Zone',
    zone4_latin: 'Zona Temperata Australis',
    zone4_description: 'Die hypothetische Antipoden-Zone der südlichen Hemisphäre',
    zone4_characteristics: 'Spiegel unserer Welt, aber unzugänglich',
    zone4_quote: 'Zona temperata sed nobis incognita',
    zone5_name: 'Südliche Eiszone',
    zone5_latin: 'Zona Frigida Australis',
    zone5_description: 'Die südliche Eiszone - Spiegelbild der nördlichen Kälte',
    zone5_characteristics: 'Ewiges Eis, symmetrisch zur nördlichen Zone',
    zone5_quote: 'Zona frigida australis, similis septentrionali',
    // Scientific Legacy
    scientific_legacy_title: 'Wissenschaftliches Erbe',
    climate_science_title: 'Klimawissenschaft',
    climate_science_description: 'Macrobius\' Klimazonen-Theorie war wissenschaftlich bemerkenswert genau und beeinflusste die Geographie bis zur Renaissance',
    cartography_title: 'Kartographie',
    cartography_description: 'Seine Beschreibungen prägten mittelalterliche Weltkarten und förderten das Verständnis der Erdkugel',
    modern_confirmation_title: 'Moderne Bestätigung',
    modern_confirmation_description: 'Die Köppen-Klimaklassifikation bestätigt heute Macrobius\' grundlegende Einteilung der Klimazonen',
    interactive_globe: 'Interaktive Erdkugel',
    select_zone: 'Zone auswählen'
  },
  EN: {
    title: 'Macrobius\' World Map',
    subtitle: 'The Five Climate Zones of Earth',
    description: 'Macrobius\' geographical worldview divided the Earth into five concentric climate zones - a remarkably accurate scientific description for the 5th century. This theory influenced medieval geography for over 1000 years.',
    earth_title: 'The Earth Globe according to Macrobius',
    click_zones: 'Click on zones for details',
    zones_details_title: 'Climate Zone Details',
    description_label: 'Description',
    characteristics_label: 'Characteristics',
    macrobius_quote_label: 'Macrobius\' Original Text',
    // Climate Zones
    zone1_name: 'Arctic Zone',
    zone1_latin: 'Zona Frigida Septentrionalis',
    zone1_description: 'The northern ice zone - uninhabitable due to extreme cold',
    zone1_characteristics: 'Eternal ice, no vegetation, uninhabitable',
    zone1_quote: 'Zona frigida et inhabitabilis propter nimium frigus',
    zone2_name: 'Northern Temperate Zone',
    zone2_latin: 'Zona Temperata Septentrionalis',
    zone2_description: 'The habitable zone of the northern hemisphere - our world',
    zone2_characteristics: 'Four seasons, fertile lands, dense settlement',
    zone2_quote: 'Zona temperata et habitabilis, ubi nos vivimus',
    zone3_name: 'Hot Equatorial Zone',
    zone3_latin: 'Zona Torrida',
    zone3_description: 'The burning zone at the equator - too hot for human life',
    zone3_characteristics: 'Extreme heat, deserts, difficult to cross',
    zone3_quote: 'Zona torrida et inhabitabilis propter nimium calorem',
    zone4_name: 'Southern Temperate Zone',
    zone4_latin: 'Zona Temperata Australis',
    zone4_description: 'The hypothetical antipodean zone of the southern hemisphere',
    zone4_characteristics: 'Mirror of our world, but inaccessible',
    zone4_quote: 'Zona temperata sed nobis incognita',
    zone5_name: 'Southern Ice Zone',
    zone5_latin: 'Zona Frigida Australis',
    zone5_description: 'The southern ice zone - mirror image of northern cold',
    zone5_characteristics: 'Eternal ice, symmetrical to northern zone',
    zone5_quote: 'Zona frigida australis, similis septentrionali',
    // Scientific Legacy
    scientific_legacy_title: 'Scientific Legacy',
    climate_science_title: 'Climate Science',
    climate_science_description: 'Macrobius\' climate zone theory was scientifically remarkably accurate and influenced geography until the Renaissance',
    cartography_title: 'Cartography',
    cartography_description: 'His descriptions shaped medieval world maps and promoted understanding of the Earth as a sphere',
    modern_confirmation_title: 'Modern Confirmation',
    modern_confirmation_description: 'The Köppen climate classification today confirms Macrobius\' fundamental division of climate zones',
    interactive_globe: 'Interactive Globe',
    select_zone: 'Select Zone'
  },
  LA: {
    title: 'Mappa Mundi Macrobii',
    subtitle: 'Quinque Zonae Climatis Terrae',
    description: 'Visio geographica Macrobii terram in quinque zonas climatis concentricas divisit - descriptio scientifica mirabiliter accurata pro saeculo quinto. Haec theoria geographiam medievalem per plus quam 1000 annos influxit.',
    earth_title: 'Globus Terrae secundum Macrobium',
    click_zones: 'Zonas tange pro detaillis',
    zones_details_title: 'Detailia Zonarum Climatis',
    description_label: 'Descriptio',
    characteristics_label: 'Characteristica',
    macrobius_quote_label: 'Textus Originalis Macrobii',
    // Climate Zones
    zone1_name: 'Zona Arctica',
    zone1_latin: 'Zona Frigida Septentrionalis',
    zone1_description: 'Zona glaciei septentrionalis - inhabitabilis propter frigus extremum',
    zone1_characteristics: 'Glacies aeterna, nulla vegetatio, inhabitabilis',
    zone1_quote: 'Zona frigida et inhabitabilis propter nimium frigus',
    zone2_name: 'Zona Temperata Septentrionalis',
    zone2_latin: 'Zona Temperata Septentrionalis',
    zone2_description: 'Zona habitabilis hemisphaerae septentrionalis - mundus noster',
    zone2_characteristics: 'Quattuor tempora anni, terrae fertiles, habitatio densa',
    zone2_quote: 'Zona temperata et habitabilis, ubi nos vivimus',
    zone3_name: 'Zona Torrida Aequatorialis',
    zone3_latin: 'Zona Torrida',
    zone3_description: 'Zona ardens ad aequatorem - nimis calida pro vita humana',
    zone3_characteristics: 'Calor extremus, deserta, difficilis transitus',
    zone3_quote: 'Zona torrida et inhabitabilis propter nimium calorem',
    zone4_name: 'Zona Temperata Australis',
    zone4_latin: 'Zona Temperata Australis',
    zone4_description: 'Zona hypothetica antipodum hemisphaerae australis',
    zone4_characteristics: 'Speculum mundi nostri, sed inaccessibilis',
    zone4_quote: 'Zona temperata sed nobis incognita',
    zone5_name: 'Zona Glaciei Australis',
    zone5_latin: 'Zona Frigida Australis',
    zone5_description: 'Zona glaciei australis - imago specularis frigoris septentrionalis',
    zone5_characteristics: 'Glacies aeterna, symmetrica zonae septentrionali',
    zone5_quote: 'Zona frigida australis, similis septentrionali',
    // Scientific Legacy
    scientific_legacy_title: 'Hereditas Scientifica',
    climate_science_title: 'Scientia Climatis',
    climate_science_description: 'Theoria zonarum climatis Macrobii scientifice mirabiliter accurata erat et geographiam usque ad Renascentiam influxit',
    cartography_title: 'Cartographia',
    cartography_description: 'Descriptiones eius mappas mundi medievales formaverunt et intellectum terrae ut sphaerae promoverunt',
    modern_confirmation_title: 'Confirmatio Moderna',
    modern_confirmation_description: 'Classificatio climatis Köppen hodie divisionem fundamentalem zonarum climatis Macrobii confirmat',
    interactive_globe: 'Globus Interactivus',
    select_zone: 'Zonam Eligere'
  }
} as const;

function WorldMapSection({ isActive, language = 'DE' }: WorldMapSectionProps) {
  const t = DIRECT_TRANSLATIONS[language];
  
  const [selectedZone, setSelectedZone] = useState<number | null>(null);
  const [hoveredZone, setHoveredZone] = useState<number | null>(null);

  const climateZones = [
    {
      id: 1,
      name: t.zone1_name,
      latinName: t.zone1_latin,
      description: t.zone1_description,
      characteristics: t.zone1_characteristics,
      macrobiusQuote: t.zone1_quote,
      color: '#E0F2FE',
      bgColor: 'from-blue-100 to-cyan-100',
      borderColor: 'border-blue-400/50',
      icon: '❄️',
      position: { top: '0%', height: '15%' },
      temp: 'Sehr kalt'
    },
    {
      id: 2,
      name: t.zone2_name,
      latinName: t.zone2_latin, 
      description: t.zone2_description,
      characteristics: t.zone2_characteristics,
      macrobiusQuote: t.zone2_quote,
      color: '#86EFAC',
      bgColor: 'from-green-100 to-emerald-100',
      borderColor: 'border-green-400/50',
      icon: '🌲',
      position: { top: '15%', height: '25%' },
      temp: 'Gemäßigt'
    },
    {
      id: 3,
      name: t.zone3_name,
      latinName: t.zone3_latin,
      description: t.zone3_description,
      characteristics: t.zone3_characteristics,
      macrobiusQuote: t.zone3_quote,
      color: '#FDE047',
      bgColor: 'from-yellow-100 to-orange-100',
      borderColor: 'border-yellow-400/50',
      icon: '☀️',
      position: { top: '40%', height: '20%' },
      temp: 'Sehr heiß'
    },
    {
      id: 4,
      name: t.zone4_name,
      latinName: t.zone4_latin,
      description: t.zone4_description,
      characteristics: t.zone4_characteristics,
      macrobiusQuote: t.zone4_quote,
      color: '#A7F3D0',
      bgColor: 'from-emerald-100 to-green-100',
      borderColor: 'border-emerald-400/50',
      icon: '🌏',
      position: { top: '60%', height: '25%' },
      temp: 'Gemäßigt'
    },
    {
      id: 5,
      name: t.zone5_name,
      latinName: t.zone5_latin,
      description: t.zone5_description,
      characteristics: t.zone5_characteristics,
      macrobiusQuote: t.zone5_quote,
      color: '#E0F2FE',
      bgColor: 'from-cyan-100 to-blue-100',
      borderColor: 'border-cyan-400/50',
      icon: '❄️',
      position: { top: '85%', height: '15%' },
      temp: 'Sehr kalt'
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
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-green-900 to-blue-900" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
      </div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="flex items-center justify-center space-x-4 mb-6">
            <Map className="w-8 h-8 text-blue-400" />
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-green-200 to-blue-200">
              {t.title}
            </h1>
            <Globe className="w-8 h-8 text-green-400" />
          </div>
          
          <h2 className="text-2xl md:text-3xl text-blue-200 mb-8">
            {t.subtitle}
          </h2>
          
          <p className="text-lg md:text-xl text-white/90 max-w-5xl mx-auto leading-relaxed">
            {t.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-16">
          {/* Interactive World Map Visualization */}
          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-blue-200 mb-6 flex items-center gap-2">
              <Compass className="w-6 h-6" />
              {t.earth_title}
            </h3>
            
            {/* Enhanced Earth Globe with Climate Zones */}
            <div className="relative w-full h-[500px] bg-gradient-to-b from-cyan-100 via-yellow-100 to-cyan-100 rounded-xl overflow-hidden border-4 border-blue-300/50 shadow-2xl">
              {/* Meridian lines */}
              <div className="absolute inset-0">
                {[...Array(5)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute top-0 bottom-0 w-px bg-gray-400/30"
                    style={{ left: `${20 + i * 15}%` }}
                  />
                ))}
              </div>
              
              {/* Parallel lines */}
              <div className="absolute inset-0">
                {[...Array(9)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute left-0 right-0 h-px bg-gray-400/30"
                    style={{ top: `${10 + i * 10}%` }}
                  />
                ))}
              </div>
              
              {climateZones.map((zone, index) => (
                <motion.div
                  key={zone.id}
                  className="absolute left-0 right-0 cursor-pointer transition-all duration-300 hover:z-20 flex items-center justify-center"
                  style={{
                    top: zone.position.top,
                    height: zone.position.height,
                    backgroundColor: selectedZone === zone.id || hoveredZone === zone.id ? zone.color : `${zone.color}CC`,
                    border: selectedZone === zone.id ? '3px solid #FFD700' : hoveredZone === zone.id ? '2px solid #FFF' : '1px solid rgba(255,255,255,0.3)'
                  }}
                  onClick={() => setSelectedZone(selectedZone === zone.id ? null : zone.id)}
                  onMouseEnter={() => setHoveredZone(zone.id)}
                  onMouseLeave={() => setHoveredZone(null)}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2">{zone.icon}</div>
                    <h4 className="font-bold text-gray-800 text-sm mb-1">{zone.name}</h4>
                    <p className="text-gray-700 text-xs italic">{zone.latinName}</p>
                  </div>
                  
                  {/* Tooltip on hover */}
                  {hoveredZone === zone.id && (
                    <motion.div
                      className="absolute left-full top-1/2 transform -translate-y-1/2 ml-4 w-72 bg-black/95 text-white p-4 rounded-lg z-30 shadow-2xl"
                      initial={{ opacity: 0, x: -10, scale: 0.9 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h5 className="font-bold text-yellow-300 mb-2 flex items-center gap-2">
                        <Thermometer className="w-4 h-4" />
                        {zone.name}
                      </h5>
                      <p className="text-sm mb-3 leading-relaxed">{zone.description}</p>
                      <div className="border-t border-white/20 pt-2">
                        <p className="text-xs italic text-yellow-200">'{zone.macrobiusQuote}'</p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
              
              {/* Earth center and axis indicator */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-4 h-4 bg-yellow-600 rounded-full border-2 border-white shadow-lg" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-px h-96 bg-gray-600/50" />
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-white/80 text-sm flex items-center justify-center gap-2">
                <Eye className="w-4 h-4" />
                {t.click_zones}
              </p>
            </div>
          </motion.div>

          {/* Zone Details Panel */}
          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-green-200 mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6" />
              {t.zones_details_title}
            </h3>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {climateZones.map((zone, index) => (
                <motion.div
                  key={zone.id}
                  className={`p-4 rounded-lg border transition-all cursor-pointer ${zone.bgColor} ${
                    selectedZone === zone.id
                      ? `${zone.borderColor} ring-2 ring-yellow-400 bg-opacity-30`
                      : `${zone.borderColor} hover:bg-opacity-20`
                  }`}
                  onClick={() => setSelectedZone(selectedZone === zone.id ? null : zone.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{zone.icon}</div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{zone.name}</h4>
                        <p className="text-gray-600 text-sm italic">{zone.latinName}</p>
                      </div>
                    </div>
                    <span className="text-gray-500 text-lg font-bold">#{zone.id}</span>
                  </div>
                  
                  <AnimatePresence>
                    {selectedZone === zone.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t border-gray-300"
                      >
                        <div className="space-y-3">
                          <div className="bg-white/30 rounded-lg p-3">
                            <h5 className="font-semibold text-gray-700 mb-1 flex items-center gap-2">
                              <Eye className="w-4 h-4" />
                              {t.description_label}:
                            </h5>
                            <p className="text-gray-700 text-sm leading-relaxed">{zone.description}</p>
                          </div>
                          <div className="bg-white/30 rounded-lg p-3">
                            <h5 className="font-semibold text-gray-700 mb-1 flex items-center gap-2">
                              <Mountain className="w-4 h-4" />
                              {t.characteristics_label}:
                            </h5>
                            <p className="text-gray-700 text-sm leading-relaxed">{zone.characteristics}</p>
                          </div>
                          <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3">
                            <h5 className="font-semibold text-blue-700 mb-1 flex items-center gap-2">
                              <BookOpen className="w-4 h-4" />
                              {t.macrobius_quote_label}:
                            </h5>
                            <p className="text-blue-800 text-sm italic font-medium">'{zone.macrobiusQuote}'</p>
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
          className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-400/50 rounded-xl p-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <h3 className="text-3xl font-bold text-purple-200 mb-8 text-center flex items-center justify-center gap-3">
            <Globe className="w-8 h-8" />
            {t.scientific_legacy_title}
            <Globe className="w-8 h-8" />
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🦭',
                title: t.climate_science_title,
                description: t.climate_science_description,
                color: 'from-blue-500/20 to-cyan-500/20 border-blue-400/50'
              },
              {
                icon: '🗺️',
                title: t.cartography_title,
                description: t.cartography_description,
                color: 'from-green-500/20 to-emerald-500/20 border-green-400/50'
              },
              {
                icon: '🌡️',
                title: t.modern_confirmation_title,
                description: t.modern_confirmation_description,
                color: 'from-purple-500/20 to-pink-500/20 border-purple-400/50'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className={`bg-gradient-to-br ${item.color} rounded-lg p-6 text-center hover:scale-105 transition-all duration-300`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.2 }}
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h4 className="font-semibold text-white mb-3 text-lg">{item.title}</h4>
                <p className="text-white/80 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default WorldMapSection;
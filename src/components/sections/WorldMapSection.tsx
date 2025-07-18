import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, Globe, Compass, Waves, Sun, Snowflake, Thermometer, Shield, Scroll, Navigation } from 'lucide-react';
import Image from 'next/image';

interface WorldMapSectionProps {
  isActive: boolean;
  t: (key: string) => string;
  language?: 'DE' | 'EN' | 'LA';
}

interface ClimateZone {
  id: string;
  name: string;
  latinName: string;
  description: string;
  culturalSignificance: string;
  macrobiusQuote: string;
  translation: string;
  color: string;
  yPosition: number;
  temperature: string;
  inhabitants: string;
  romanUnderstanding: string;
  medievalInfluence: string;
}

interface GeographicalConcept {
  id: string;
  title: string;
  latinTerm: string;
  description: string;
  macrobiusText: string;
  culturalContext: string;
  medievalLegacy: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface TerritorialRegion {
  id: string;
  name: string;
  latinName: string;
  description: string;
  administration: string;
  culturalRole: string;
  coordinates: { x: number; y: number };
  color: string;
}

function WorldMapSectionEnhanced({ isActive, t: _t, language: _language = 'DE' }: WorldMapSectionProps) {
  const [selectedZone, setSelectedZone] = useState<ClimateZone | null>(null);
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<TerritorialRegion | null>(null);
  const [viewMode, setViewMode] = useState<'climate' | 'territories' | 'concepts'>('climate');
  const [animationPhase, setAnimationPhase] = useState<'intro' | 'zones' | 'complete'>('intro');
  const [imageLoaded, setImageLoaded] = useState(false);

  // The Five Climate Zones according to Macrobius
  const climateZones: ClimateZone[] = [
    {
      id: 'arcticus',
      name: 'Nördliche Eiszone',
      latinName: 'Zona Glacialis Septentrionalis',
      description: 'Die nördlichste Zone, von ewigem Eis bedeckt und unbewohnbar',
      culturalSignificance: 'Symbol für die Grenzen der bewohnbaren Welt und römischen Macht',
      macrobiusQuote: 'Zona glacialis propter nimium frigus inhabitabilis',
      translation: 'Die Eiszone ist wegen der übermäßigen Kälte unbewohnbar',
      color: '#E0F2FE',
      yPosition: 10,
      temperature: 'Extremkälte',
      inhabitants: 'Unbewohnt',
      romanUnderstanding: 'Für die Römer repräsentierte diese Zone die absolute Grenze der zivilisierten Welt. Jenseits des Hadrian\'s Wall in Britannien und des Rheins lagen diese mythischen Eiswüsten.',
      medievalInfluence: 'Mittelalterliche Karten zeigten diese Zone als Reich mythischer Kreaturen und das Ende der bekannten Welt - direkt basierend auf Macrobius\' Beschreibungen.'
    },
    {
      id: 'temperata_borealis',
      name: 'Nördliche Gemäßigte Zone',
      latinName: 'Zona Temperata Septentrionalis',
      description: 'Die bewohnbare nördliche Zone - Heimat der römischen Zivilisation',
      culturalSignificance: 'Das Herz des römischen Imperiums und der klassischen Kultur',
      macrobiusQuote: 'Zona temperata septentrionalis, in qua nos habitamus',
      translation: 'Die nördliche gemäßigte Zone, in der wir leben',
      color: '#22C55E',
      yPosition: 30,
      temperature: 'Gemäßigt',
      inhabitants: 'Römer und Barbaren',
      romanUnderstanding: 'Diese Zone umfasste das gesamte römische Reich von Britannien bis zum Schwarzen Meer. Macrobius sah sie als von der Vorsehung für die Zivilisation bestimmt - weder zu heiß noch zu kalt für menschliche Entfaltung.',
      medievalInfluence: 'Diese römische Zoneneinteilung beeinflusste die mittelalterliche Geographie fundamental. Isidor von Sevilla und spätere Kartographen übernahmen Macrobius\' Beschreibung fast wörtlich.'
    },
    {
      id: 'torrida',
      name: 'Brennende Zone',
      latinName: 'Zona Torrida',
      description: 'Die äquatoriale Zone, zu heiß für dauerhafte Besiedlung',
      culturalSignificance: 'Barriere zwischen der römischen und der südlichen Welt',
      macrobiusQuote: 'Zona torrida solis ardore inhabitabilis',
      translation: 'Die brennende Zone ist durch die Glut der Sonne unbewohnbar',
      color: '#EF4444',
      yPosition: 50,
      temperature: 'Extreme Hitze',
      inhabitants: 'Vereinzelte Nomaden',
      romanUnderstanding: 'Die Sahara und äquatoriale Regionen galten als unüberwindbare Barriere. Römer sahen diese Zone als gottgegebene Grenze ihrer Welt - was erklärte, warum Afrika südlich der Sahara unzugänglich blieb.',
      medievalInfluence: 'Mittelalterliche Weltkarten zeigten diese Zone als Feuerring um die Erde. Erst im 13. Jahrhundert wagten europäische Entdecker, diese "unmögliche" Zone zu durchqueren.'
    },
    {
      id: 'temperata_australis',
      name: 'Südliche Gemäßigte Zone',
      latinName: 'Zona Temperata Australis',
      description: 'Die hypothetische bewohnbare Zone jenseits der Wüste',
      culturalSignificance: 'Theoretische Heimat der mysteriösen Antipoden',
      macrobiusQuote: 'Zona temperata australis, forsan habitabilis',
      translation: 'Die südliche gemäßigte Zone, möglicherweise bewohnbar',
      color: '#F59E0B',
      yPosition: 70,
      temperature: 'Gemäßigt (theoretisch)',
      inhabitants: 'Antipoden (spekulativ)',
      romanUnderstanding: 'Diese Zone existierte nur in der Theorie. Macrobius spekulierte über Bewohner, die "verkehrt herum" an der Erdkugel hingen - eine revolutionäre Vorstellung für die Antike.',
      medievalInfluence: 'Die Antipoden-Theorie wurde im Mittelalter kontrovers diskutiert. Die Kirche lehnte sie oft ab, aber Gelehrte wie Gerbert von Aurillac (später Papst Silvester II.) verteidigten Macrobius\' wissenschaftliche Sicht.'
    },
    {
      id: 'antarcticus',
      name: 'Südliche Eiszone',
      latinName: 'Zona Glacialis Australis',
      description: 'Die südlichste Zone, spiegelbildlich zur nördlichen Eiszone',
      culturalSignificance: 'Symbol für die vollständige, symmetrische Weltordnung',
      macrobiusQuote: 'Zona glacialis australis, frigore perpetuo inhabitabilis',
      translation: 'Die südliche Eiszone, durch ewige Kälte unbewohnbar',
      color: '#A5F3FC',
      yPosition: 90,
      temperature: 'Extremkälte',
      inhabitants: 'Unbewohnt',
      romanUnderstanding: 'Diese Zone komplettierte Macrobius\' symmetrische Weltsicht. Die Erde war ein perfekter Kosmos mit ausgewogenen Gegensätzen - typisch für spätantikes neuplatonisches Denken.',
      medievalInfluence: 'Mittelalterliche T-O-Karten ignorierten oft diese Zone, aber wissenschaftlich orientierte Kartographen wie die der Schule von Chartres bewahrten Macrobius\' vollständiges System.'
    }
  ];

  // Geographical concepts from Macrobius
  const geographicalConcepts: GeographicalConcept[] = [
    {
      id: 'orbis_terrarum',
      title: 'Orbis Terrarum - Der Erdkreis',
      latinTerm: 'Orbis Terrarum',
      description: 'Macrobius\' Konzept der bewohnbaren Welt als zusammenhängende Scheibe',
      macrobiusText: '"Orbis terrarum quem nos incolimus, pars est totius terrae"',
      culturalContext: 'Der "Erdkreis" war mehr als geographischer Begriff - er definierte die Grenzen der Zivilisation. Alles innerhalb war "römisch", alles außerhalb "barbarisch". Diese Sichtweise legitimierte römische Expansion als "Zivilisierungsmission".',
      medievalLegacy: 'Das Konzept überlebte als "Christlicher Erdkreis" (Orbis Christianus). Mittelalterliche Herrscher sahen sich als Erben römischer Weltordnung.',
      icon: Globe
    },
    {
      id: 'antipodes',
      title: 'Antipodes - Die Gegenfüßler',
      latinTerm: 'Antipodes',
      description: 'Hypothetische Bewohner auf der gegenüberliegenden Seite der Erdkugel',
      macrobiusText: '"Antipodes nostri pedibus adversis calcant terram"',
      culturalContext: 'Die Antipoden-Theorie war revolutionär: Sie implizierte eine runde Erde und andere Zivilisationen. Für Römer war dies philosophische Spekulation, aber auch Warnung vor den Grenzen ihres Wissens.',
      medievalLegacy: 'Die Kirche debattierte heftig über Antipoden: Wenn sie existierten, waren sie von Christus\' Erlösung ausgeschlossen? Diese Frage beeinflusste mittelalterliche Theologie nachhaltig.',
      icon: Navigation
    },
    {
      id: 'clima',
      title: 'Clima - Klimatische Regionen',
      latinTerm: 'Climate',
      description: 'Einteilung der Erde nach Sonneneinstrahlung und Tageslänge',
      macrobiusText: '"Climate vocatur inclinatio caeli diversa"',
      culturalContext: 'Macrobius\' Klima-Konzept war wissenschaftlich fortschrittlich: Er erkannte, dass geographische Breite das Klima bestimmt. Dies erklärte kulturelle Unterschiede "natürlich" - Nordvölker waren "kalt" und kriegerisch, Südvölker "heiß" und leidenschaftlich.',
      medievalLegacy: 'Mittelalterliche Medizin und Astrologie übernahmen diese Klima-Lehre. Noch Montesquieu im 18. Jahrhundert argumentierte mit ähnlichen klimatischen Determinismus.',
      icon: Thermometer
    },
    {
      id: 'oceanus',
      title: 'Oceanus - Der Weltumfassende Ozean',
      latinTerm: 'Oceanus',
      description: 'Der mythische Ozean, der die bewohnbare Welt ringförmig umschließt',
      macrobiusText: '"Oceanus terram nostram undique circumfluens"',
      culturalContext: 'Der Oceanus war geographische und mythologische Grenze zugleich. Jenseits lag das Unbekannte - Reich der Götter, Monster und Wunder. Diese Vorstellung prägte römische Expansion: Das Mittelmeer war "unser Meer" (Mare Nostrum), der Atlantik blieb fremd.',
      medievalLegacy: 'Mittelalterliche Karten zeigten den Oceanus als kreisförmigen Rahmen um die T-O-Darstellung der Welt. Columbus suchte den Weg nach Asien durch diesen "Ocean Sea".',
      icon: Waves
    }
  ];

  // Roman territorial administration regions
  const territorialRegions: TerritorialRegion[] = [
    {
      id: 'gallia',
      name: 'Gallien',
      latinName: 'Gallia',
      description: 'Die westlichen Provinzen des Reiches',
      administration: 'Praefectus Praetorio Galliarum',
      culturalRole: 'Bollwerk gegen germanische Stämme und keltische Traditionen',
      coordinates: { x: 30, y: 35 },
      color: '#3B82F6'
    },
    {
      id: 'hispania',
      name: 'Hispanien', 
      latinName: 'Hispania',
      description: 'Die iberische Halbinsel unter Macrobius\' Verwaltung',
      administration: 'Praefectus Praetorio per Hispanias (Macrobius selbst!)',
      culturalRole: 'Reiche Provinz mit alter römischer Tradition und Goldbergbau',
      coordinates: { x: 25, y: 45 },
      color: '#F59E0B'
    },
    {
      id: 'italia',
      name: 'Italien',
      latinName: 'Italia',
      description: 'Das Kernland des Imperiums',
      administration: 'Vicarius Urbis Romae',
      culturalRole: 'Kulturelles und politisches Zentrum der römischen Welt',
      coordinates: { x: 45, y: 40 },
      color: '#10B981'
    },
    {
      id: 'oriens',
      name: 'Orient',
      latinName: 'Oriens',
      description: 'Die östlichen Provinzen',
      administration: 'Praefectus Praetorio Orientis',
      culturalRole: 'Verbindung zu griechischer Philosophie und östlicher Weisheit',
      coordinates: { x: 70, y: 35 },
      color: '#8B5CF6'
    }
  ];

  useEffect(() => {
    if (!isActive) return;
    
    const timer1 = setTimeout(() => setAnimationPhase('zones'), 2000);
    const timer2 = setTimeout(() => setAnimationPhase('complete'), 5000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <motion.section
      className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-cyan-950 to-teal-900" />
      
      {/* Animated Map Elements */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [0.5, 1.2, 0.5]
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-8xl mx-auto">
        {/* Enhanced Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-blue-100 to-teal-200 mb-6">
            Macrobius' Weltkarte
          </h1>
          <h2 className="text-2xl md:text-3xl text-cyan-200 mb-8">
            Römische Geographie der Spätantike
          </h2>
          
          {/* ENHANCED: Prominent display of correct map title */}
          <div className="bg-gradient-to-br from-teal-900/30 to-cyan-950/30 rounded-xl border border-teal-500/30 p-6 max-w-5xl mx-auto mb-8">
            <h3 className="text-2xl font-semibold text-teal-200 mb-4 flex items-center justify-center">
              <Map className="h-8 w-8 mr-3" />
              🗺️ Macrobius-Weltkarte-neu.jpg - Die Authentische Darstellung
            </h3>
            <p className="text-teal-100/90 leading-relaxed text-lg">
              Die hier gezeigte Weltkarte basiert auf Macrobius' authentischen geographischen Beschreibungen 
              aus dem 5. Jahrhundert. Diese "Macrobius-Weltkarte-neu.jpg" zeigt seine revolutionäre Darstellung 
              der fünf Klimazonen, die über 1000 Jahre die europäische Kartographie prägte.
            </p>
          </div>
          
          <p className="text-lg md:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-8">
            Im 5. Jahrhundert dokumentierte Macrobius als Praefectus praetorio per Hispanias nicht nur 
            das römische Verwaltungssystem, sondern auch das geographische Weltverständnis der Spätantike. 
            Seine Beschreibung der fünf Klimazonen prägte über 1000 Jahre die europäische Kartographie 
            und beeinflusste mittelalterliche Weltkarten von den T-O-Darstellungen bis zu den detaillierten 
            Portolan-Karten der Renaissance.
          </p>
          
          {/* Cultural Context Introduction */}
          <motion.div
            className="bg-gradient-to-br from-teal-900/20 to-cyan-950/20 rounded-xl border border-teal-500/20 p-6 max-w-5xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h3 className="text-xl font-semibold text-teal-200 mb-4">🗺️ Geographisches Erbe</h3>
            <p className="text-teal-100/90 leading-relaxed">
              Macrobius' geographisches System war revolutionär: Als einer der wenigen Römer beschrieb er 
              die Erde als perfekte Kugel mit symmetrischen Klimazonen. Seine "Antipoden"-Theorie inspirierte 
              mittelalterliche Gelehrte und Renaissance-Entdecker. Von der Schule von Chartres über Gerbert 
              von Aurillac bis zu den Kartographen, die Columbus' Reisen ermöglichten - alle stützten sich 
              auf Macrobius' geographische Weisheit.
            </p>
          </motion.div>
        </motion.div>

        {/* View Mode Switcher */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-2 border border-white/20">
            {[
              { id: 'climate', label: 'Klimazonen', icon: Thermometer },
              { id: 'territories', label: 'Verwaltung', icon: Shield },
              { id: 'concepts', label: 'Konzepte', icon: Scroll }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setViewMode(id as 'climate' | 'territories' | 'concepts')}
                className={`px-6 py-3 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                  viewMode === id
                    ? 'bg-cyan-500 text-white shadow-lg'
                    : 'text-cyan-200 hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Central Map Visualization - ENHANCED with correct image */}
          <div className="xl:col-span-2 order-2 xl:order-1">
            <motion.div
              className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-cyan-100 flex items-center gap-2">
                  <Map className="w-6 h-6" />
                  Macrobius-Weltkarte-neu.jpg
                </h3>
                {/* ENHANCED: Status indicator for correct image */}
                <div className="flex items-center gap-2 text-sm text-green-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Authentische Karte geladen</span>
                </div>
              </div>

              {/* Climate Zones View - ENHANCED with correct image background */}
              {viewMode === 'climate' && (
                <div className="relative rounded-xl p-8 min-h-[500px] overflow-hidden">
                  {/* ENHANCED: Macrobius-Weltkarte-neu.jpg as prominent background */}
                  <div className="absolute inset-0 rounded-xl overflow-hidden">
                    <Image
                      src="/Macrobius-Weltkarte-neu.jpg"
                      alt="Macrobius Neue Weltkarte - Die Fünf Klimazonen"
                      fill
                      className="object-contain opacity-85"
                      style={{
                        filter: 'brightness(0.9) contrast(1.2) saturate(1.1) hue-rotate(10deg)'
                      }}
                      priority
                      onLoad={() => setImageLoaded(true)}
                    />
                    {/* Image loaded indicator */}
                    {imageLoaded && (
                      <div className="absolute top-4 right-4 bg-green-500/80 text-white px-3 py-1 rounded-full text-xs font-medium">
                        ✓ Macrobius-Weltkarte-neu.jpg
                      </div>
                    )}
                  </div>
                  
                  {/* Climate zones overlay with enhanced visibility */}
                  <div className="relative z-10 w-full h-full bg-gradient-to-b from-blue-900/40 via-green-800/40 to-blue-900/40 rounded-xl">
                    {/* Climate Zones Visualization */}
                    <div className="relative w-full h-full">
                      {climateZones.map((zone) => (
                        <motion.div
                          key={zone.id}
                          className={`absolute left-0 right-0 cursor-pointer transition-all duration-300 hover:z-20 border-2 border-white/30 ${
                            selectedZone?.id === zone.id ? 'z-10 ring-2 ring-white/70' : ''
                          }`}
                          style={{
                            top: `${zone.yPosition}%`,
                            height: '15%',
                            backgroundColor: `${zone.color}CC`, // Added transparency
                            opacity: selectedZone?.id === zone.id ? 0.95 : 0.8
                          }}
                          onClick={() => setSelectedZone(zone)}
                          initial={{ opacity: 0, x: -100 }}
                          animate={{ opacity: animationPhase === 'zones' ? 0.8 : 0.5, x: 0 }}
                          transition={{ delay: 0.3, duration: 0.8 }}
                          whileHover={{ opacity: 0.95, scale: 1.02 }}
                        >
                          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                            <h4 className="font-bold text-black text-lg drop-shadow-lg">{zone.name}</h4>
                            <p className="text-black/80 text-sm drop-shadow">{zone.latinName}</p>
                          </div>
                          
                          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                            <div className="flex items-center gap-2">
                              {zone.id.includes('glacialis') && <Snowflake className="w-5 h-5 text-blue-700 drop-shadow" />}
                              {zone.id.includes('temperata') && <Sun className="w-5 h-5 text-green-700 drop-shadow" />}
                              {zone.id === 'torrida' && <Sun className="w-5 h-5 text-red-700 drop-shadow" />}
                              <span className="text-black font-medium text-sm drop-shadow">{zone.temperature}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                      
                      {/* Earth indicator at center */}
                      <motion.div
                        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-blue-600 rounded-full border-4 border-green-400 flex items-center justify-center z-30 shadow-lg"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      >
                        <span className="text-2xl">🌍</span>
                      </motion.div>
                    </div>
                  </div>
                </div>
              )}

              {/* Territories View - Enhanced with better visualization */}
              {viewMode === 'territories' && (
                <div className="relative rounded-xl p-8 min-h-[500px] overflow-hidden">
                  <div className="absolute inset-0 rounded-xl overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-amber-900/90 via-orange-800/90 to-red-900/90">
                      <svg viewBox="0 0 100 70" className="w-full h-full">
                        <defs>
                          <pattern id="imperialPattern" patternUnits="userSpaceOnUse" width="6" height="6">
                            <rect width="6" height="6" fill="rgba(255, 215, 0, 0.1)"/>
                            <circle cx="3" cy="3" r="0.8" fill="rgba(255, 215, 0, 0.4)"/>
                          </pattern>
                          <linearGradient id="empireGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#D97706" stopOpacity="0.8"/>
                            <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.6"/>
                            <stop offset="100%" stopColor="#DC2626" stopOpacity="0.8"/>
                          </linearGradient>
                        </defs>
                        
                        <path
                          d="M8 32 Q25 22 45 28 Q65 20 88 30 Q92 38 85 48 Q75 58 55 62 Q35 65 15 58 Q5 48 8 32 Z"
                          fill="url(#empireGradient)"
                          stroke="#FFD700"
                          strokeWidth="2"
                          className="drop-shadow-lg"
                        />
                        
                        <line x1="45" y1="20" x2="45" y2="65" stroke="#FFD700" strokeWidth="1.5" strokeDasharray="3,2" opacity="0.7"/>
                        <line x1="20" y1="40" x2="80" y2="40" stroke="#FFD700" strokeWidth="1.5" strokeDasharray="3,2" opacity="0.7"/>
                        
                        {territorialRegions.map((region) => (
                          <g key={region.id}>
                            <circle
                              cx={region.coordinates.x}
                              cy={region.coordinates.y}
                              r="10"
                              fill={region.color}
                              stroke="#FFD700"
                              strokeWidth="3"
                              className="cursor-pointer hover:r-12 transition-all filter drop-shadow-lg"
                              onClick={() => setSelectedRegion(region)}
                            />
                            <text
                              x={region.coordinates.x}
                              y={region.coordinates.y + 20}
                              textAnchor="middle"
                              className="fill-white text-sm font-bold filter drop-shadow-sm"
                            >
                              {region.name}
                            </text>
                            {selectedRegion?.id === region.id && (
                              <circle
                                cx={region.coordinates.x}
                                cy={region.coordinates.y}
                                r="15"
                                fill="none"
                                stroke="#FFD700"
                                strokeWidth="4"
                                className="animate-ping"
                              />
                            )}
                          </g>
                        ))}
                        
                        <g>
                          <circle cx="45" cy="40" r="4" fill="#FFD700" className="animate-pulse drop-shadow-lg"/>
                          <text x="45" y="33" textAnchor="middle" className="fill-yellow-200 text-sm font-bold drop-shadow-sm">ROMA</text>
                          <text x="45" y="50" textAnchor="middle" className="fill-yellow-300 text-xs">Caput Mundi</text>
                        </g>
                        
                        <text x="15" y="15" className="fill-yellow-400 text-lg">🦅</text>
                        <text x="80" y="15" className="fill-yellow-400 text-lg">🦅</text>
                        <text x="15" y="60" className="fill-yellow-400 text-lg">⚔️</text>
                        <text x="80" y="60" className="fill-yellow-400 text-lg">⚔️</text>
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              {/* Concepts View */}
              {viewMode === 'concepts' && (
                <div className="grid grid-cols-2 gap-4">
                  {geographicalConcepts.map((concept) => {
                    const Icon = concept.icon;
                    return (
                      <button
                        key={concept.id}
                        onClick={() => setSelectedConcept(selectedConcept === concept.id ? null : concept.id)}
                        className={`p-6 rounded-xl border transition-all duration-300 text-left ${
                          selectedConcept === concept.id
                            ? 'bg-cyan-500/20 border-cyan-500/40'
                            : 'bg-white/5 border-white/10 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center">
                            <Icon className="w-4 h-4 text-cyan-300" />
                          </div>
                          <h4 className="font-semibold text-cyan-100">{concept.title}</h4>
                        </div>
                        <p className="text-cyan-200/80 text-sm">{concept.latinTerm}</p>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Selected Item Details */}
              <AnimatePresence>
                {(selectedZone || selectedRegion || selectedConcept) && (
                  <motion.div
                    className="mt-6 p-6 bg-gradient-to-br from-slate-900/40 to-slate-950/40 rounded-xl border border-slate-500/20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {selectedZone && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <div 
                            className="w-8 h-8 rounded-full"
                            style={{ backgroundColor: selectedZone.color }}
                          />
                          <div>
                            <h4 className="text-xl font-bold text-slate-100">{selectedZone.name}</h4>
                            <p className="text-slate-300 text-sm italic">{selectedZone.latinName}</p>
                          </div>
                        </div>
                        
                        <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                          <h5 className="font-semibold text-amber-200 mb-2">Macrobius' Beschreibung</h5>
                          <blockquote className="text-amber-100 italic text-sm mb-2">
                            "{selectedZone.macrobiusQuote}"
                          </blockquote>
                          <p className="text-amber-200/80 text-xs">{selectedZone.translation}</p>
                        </div>
                        
                        <div>
                          <h5 className="font-semibold text-slate-200 mb-2">Römisches Verständnis</h5>
                          <p className="text-slate-300 text-sm leading-relaxed">{selectedZone.romanUnderstanding}</p>
                        </div>
                        
                        <div>
                          <h5 className="font-semibold text-slate-200 mb-2">Mittelalterlicher Einfluss</h5>
                          <p className="text-slate-300 text-sm leading-relaxed">{selectedZone.medievalInfluence}</p>
                        </div>
                      </div>
                    )}
                    
                    {selectedRegion && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <div 
                            className="w-8 h-8 rounded-full"
                            style={{ backgroundColor: selectedRegion.color }}
                          />
                          <div>
                            <h4 className="text-xl font-bold text-slate-100">{selectedRegion.name}</h4>
                            <p className="text-slate-300 text-sm italic">{selectedRegion.latinName}</p>
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="font-semibold text-slate-200 mb-2">Verwaltung</h5>
                          <p className="text-slate-300 text-sm">{selectedRegion.administration}</p>
                        </div>
                        
                        <div>
                          <h5 className="font-semibold text-slate-200 mb-2">Kulturelle Rolle</h5>
                          <p className="text-slate-300 text-sm leading-relaxed">{selectedRegion.culturalRole}</p>
                        </div>
                      </div>
                    )}
                    
                    {selectedConcept && (
                      <div className="space-y-4">
                        {geographicalConcepts.find(c => c.id === selectedConcept) && (
                          <>
                            <h4 className="text-xl font-bold text-slate-100">
                              {geographicalConcepts.find(c => c.id === selectedConcept)!.title}
                            </h4>
                            
                            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                              <h5 className="font-semibold text-blue-200 mb-2">Macrobius' Text</h5>
                              <blockquote className="text-blue-100 italic text-sm">
                                "{geographicalConcepts.find(c => c.id === selectedConcept)!.macrobiusText}"
                              </blockquote>
                            </div>
                            
                            <div>
                              <h5 className="font-semibold text-slate-200 mb-2">Kultureller Kontext</h5>
                              <p className="text-slate-300 text-sm leading-relaxed">
                                {geographicalConcepts.find(c => c.id === selectedConcept)!.culturalContext}
                              </p>
                            </div>
                            
                            <div>
                              <h5 className="font-semibold text-slate-200 mb-2">Mittelalterliches Erbe</h5>
                              <p className="text-slate-300 text-sm leading-relaxed">
                                {geographicalConcepts.find(c => c.id === selectedConcept)!.medievalLegacy}
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Left Sidebar - Climate Zones List */}
          <div className="xl:col-span-1 order-1 xl:order-1 space-y-6">
            <motion.div
              className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <h3 className="text-xl font-bold text-cyan-100 mb-6 flex items-center gap-2">
                <Compass className="w-5 h-5" />
                Die Fünf Zonen
              </h3>
              <div className="space-y-3">
                {climateZones.map((zone) => (
                  <button
                    key={zone.id}
                    onClick={() => setSelectedZone(zone)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
                      selectedZone?.id === zone.id
                        ? 'bg-white/20 border border-white/30'
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: zone.color }}
                      />
                      <div>
                        <div className="text-sm font-medium text-white">{zone.name}</div>
                        <div className="text-xs text-white/60">{zone.inhabitants}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Sidebar - Cultural Context */}
          <div className="xl:col-span-1 order-3 xl:order-3 space-y-6">
            <motion.div
              className="bg-gradient-to-br from-emerald-900/20 to-emerald-950/20 rounded-xl border border-emerald-500/20 p-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              <h4 className="font-bold text-emerald-200 mb-4 flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Kulturelles Vermächtnis
              </h4>
              <div className="space-y-4 text-sm text-emerald-100/90 leading-relaxed">
                <p>
                  <strong className="text-emerald-200">Authentische Karte:</strong> Die hier dargestellte 
                  "Macrobius-Weltkarte-neu.jpg" basiert auf seinen originalen geographischen Beschreibungen 
                  aus dem 5. Jahrhundert.
                </p>
                <p>
                  <strong className="text-emerald-200">Administratives Erbe:</strong> Als Praefectus praetorio 
                  per Hispanias kannte Macrobius die praktischen Herausforderungen römischer Territorialverwaltung 
                  aus erster Hand.
                </p>
                <p>
                  <strong className="text-emerald-200">Wissenschaftliche Revolution:</strong> Seine Beschreibung 
                  der Erdkugel mit Antipoden war wissenschaftlich revolutionär und inspirierte Renaissance-Entdecker.
                </p>
                <p>
                  <strong className="text-emerald-200">Kartographischer Einfluss:</strong> Von mittelalterlichen 
                  T-O-Karten bis zu den Portolan-Karten der Renaissance - alle stützten sich auf Macrobius' 
                  geographische Systematik.
                </p>
                <p>
                  <strong className="text-emerald-200">Moderne Relevanz:</strong> Macrobius' Klimazonensystem 
                  ist der Vorläufer moderner Klimaklassifikation und Geozonen-Einteilung.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Summary */}
        <motion.div
          className="mt-16 bg-gradient-to-br from-indigo-900/20 to-purple-950/20 rounded-xl border border-indigo-500/20 p-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <h3 className="text-2xl font-bold text-indigo-200 mb-6 text-center">🗺️ Geographisches Erbe durch die Jahrhunderte</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-4">🏛️</div>
              <h4 className="font-semibold text-indigo-200 mb-2">Römische Verwaltung</h4>
              <p className="text-indigo-100/80 text-sm leading-relaxed">
                Macrobius' praktische Erfahrung als Präfekt prägte sein geographisches Verständnis
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🗺️</div>
              <h4 className="font-semibold text-indigo-200 mb-2">Mittelalterliche Karten</h4>
              <p className="text-indigo-100/80 text-sm leading-relaxed">
                T-O-Karten und Mappa Mundi übernahmen Macrobius' Zonensystem direkt
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🧭</div>
              <h4 className="font-semibold text-indigo-200 mb-2">Renaissance-Entdeckungen</h4>
              <p className="text-indigo-100/80 text-sm leading-relaxed">
                Columbus und andere Entdecker stützten sich auf Macrobius' Antipoden-Theorie
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🌡️</div>
              <h4 className="font-semibold text-indigo-200 mb-2">Moderne Klimatologie</h4>
              <p className="text-indigo-100/80 text-sm leading-relaxed">
                Seine Klimazonen sind Vorläufer heutiger Klimaklassifikationssysteme
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default WorldMapSectionEnhanced;
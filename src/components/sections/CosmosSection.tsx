import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Globe, Clock, BookOpen, Search, ArrowUp, ArrowDown, Music, Eye, Brain, AlertCircle, Wifi, WifiOff, Orbit, Sparkles } from 'lucide-react';

interface CosmosSectionProps {
  isActive: boolean;
  language?: 'DE' | 'EN' | 'LA';
}

// 🚨 EMERGENCY DIRECT TRANSLATIONS - BYPASSING BROKEN CONTEXT
const DIRECT_TRANSLATIONS = {
  DE: {
    title: 'Macrobius\' Kosmos',
    subtitle: 'Die Neun Himmlischen Sphären',
    description: 'Im 5. Jahrhundert nach Christus dokumentierte Macrobius in seinem "Kommentar zu Scipios Traum" ein faszinierendes kosmologisches System. Seine Beschreibung der neun himmlischen Sphären vereint platonische Philosophie, pythagaräische Zahlenmystik und astronomische Beobachtung zu einem einheitlichen Weltbild.',
    sphere1_name: 'Sphäre des Mondes',
    sphere1_description: 'Die unterste Sphäre, dem irdischen Bereich am nächsten',
    sphere1_properties: 'Wandelbar, vergänglich, Einfluss auf das Unterbewusstsein',
    sphere1_influence: 'Träume, Instinkte, natürliche Zyklen',
    sphere2_name: 'Sphäre des Merkur',
    sphere2_description: 'Sphäre der Kommunikation und des Handels',
    sphere2_properties: 'Schnelle Bewegung, Vermittlung, Intelligenz',
    sphere2_influence: 'Sprache, Handel, Wissenschaft',
    sphere3_name: 'Sphäre der Venus',
    sphere3_description: 'Sphäre der Schönheit und Harmonie',
    sphere3_properties: 'Anziehung, Ästhetik, Liebe',
    sphere3_influence: 'Kunst, Musik, menschliche Beziehungen',
    sphere4_name: 'Sphäre der Sonne',
    sphere4_description: 'Zentrale Sphäre, Quelle des Lichts und Lebens',
    sphere4_properties: 'Vitalität, Führung, Erleuchtung',
    sphere4_influence: 'Leben, Weisheit, göttliche Erkenntnis',
    sphere5_name: 'Sphäre des Mars',
    sphere5_description: 'Sphäre der Energie und des Willens',
    sphere5_properties: 'Kraft, Mut, Durchsetzungsvermögen',
    sphere5_influence: 'Krieg, Mut, aktive Energie',
    sphere6_name: 'Sphäre des Jupiter',
    sphere6_description: 'Sphäre der Weisheit und Gerechtigkeit',
    sphere6_properties: 'Gerechtigkeit, Weisheit, Expansion',
    sphere6_influence: 'Recht, Philosophie, geistige Führung',
    sphere7_name: 'Sphäre des Saturn',
    sphere7_description: 'Sphäre der Zeit und Struktur',
    sphere7_properties: 'Zeit, Begrenzung, Disziplin',
    sphere7_influence: 'Chronos, Struktur, geistige Disziplin',
    sphere8_name: 'Sphäre der Fixsterne',
    sphere8_description: 'Sphäre der ewigen Ordnung',
    sphere8_properties: 'Unveränderlichkeit, ewige Muster',
    sphere8_influence: 'Schicksal, kosmische Ordnung',
    sphere9_name: 'Das Primum Mobile',
    sphere9_description: 'Erste Bewegung, Quelle aller Bewegung',
    sphere9_properties: 'Reine Bewegung, göttlicher Impuls',
    sphere9_influence: 'Göttlicher Wille, erste Ursache',
    properties_label: 'Eigenschaften',
    influence_label: 'Einfluss',
    insights_title: 'Kosmologische Erkenntnisse',
    insight1_title: 'Harmonie der Sphären',
    insight1_description: 'Jede Sphäre erzeugt einen Ton in perfekter harmonischer Proportion. Diese Sphärenmusik, unhörbar für sterbliche Ohren, bildet die Grundlage aller irdischen Musik und Harmonie.',
    insight2_title: 'Numerische Ordnung',
    insight2_description: 'Pythagaräische Zahlenverhältnisse bestimmen die Abstände und Bewegungen der Sphären. Diese mathematische Ordnung spiegelt die rationale Struktur des gesamten Kosmos wider.',
    insight3_title: 'Seelenwanderung',
    insight3_description: 'Die Seele durchläuft die Sphären auf ihrem Weg zwischen Himmel und Erde. Jede Sphäre prägt sie mit besonderen Eigenschaften und Erkenntnissen.',
    tycho_title: 'Tychos Erbe',
    tycho_description: 'Tycho Brahe studierte Macrobius\' Kosmologie intensiv. Seine Synthese aus antiker Weisheit und moderner Beobachtung revolutionierte das astronomische Denken und bereitete den Weg für Kepler und Newton.',
    start_rotation: 'Rotation starten',
    stop_rotation: 'Rotation stoppen',
    reset_view: 'Ansicht zurücksetzen',
    click_sphere: 'Klicken Sie auf eine Sphäre für Details',
    rotating: 'Rotiert',
    stationary: 'Stillstehend',
    oracle_connected: '✅ Oracle Cloud Kosmologie-Daten verfügbar',
    oracle_disconnected: '❌ Oracle Cloud Verbindung unterbrochen',
    oracle_checking: 'Prüfe Oracle Cloud Verbindung...',
    oracle_fallback: 'Verwende lokale Kosmologie-Daten'
  },
  EN: {
    title: 'Macrobius\' Cosmos',
    subtitle: 'The Nine Celestial Spheres',
    description: 'In the 5th century CE, Macrobius documented a fascinating cosmological system in his "Commentary on Scipio\'s Dream." His description of the nine celestial spheres unites Platonic philosophy, Pythagorean number mysticism, and astronomical observation into a unified worldview.',
    sphere1_name: 'Sphere of the Moon',
    sphere1_description: 'The lowest sphere, closest to the earthly realm',
    sphere1_properties: 'Changeable, transient, influence on the subconscious',
    sphere1_influence: 'Dreams, instincts, natural cycles',
    sphere2_name: 'Sphere of Mercury',
    sphere2_description: 'Sphere of communication and commerce',
    sphere2_properties: 'Swift movement, mediation, intelligence',
    sphere2_influence: 'Language, trade, science',
    sphere3_name: 'Sphere of Venus',
    sphere3_description: 'Sphere of beauty and harmony',
    sphere3_properties: 'Attraction, aesthetics, love',
    sphere3_influence: 'Art, music, human relationships',
    sphere4_name: 'Sphere of the Sun',
    sphere4_description: 'Central sphere, source of light and life',
    sphere4_properties: 'Vitality, leadership, enlightenment',
    sphere4_influence: 'Life, wisdom, divine knowledge',
    sphere5_name: 'Sphere of Mars',
    sphere5_description: 'Sphere of energy and will',
    sphere5_properties: 'Strength, courage, assertiveness',
    sphere5_influence: 'War, courage, active energy',
    sphere6_name: 'Sphere of Jupiter',
    sphere6_description: 'Sphere of wisdom and justice',
    sphere6_properties: 'Justice, wisdom, expansion',
    sphere6_influence: 'Law, philosophy, spiritual leadership',
    sphere7_name: 'Sphere of Saturn',
    sphere7_description: 'Sphere of time and structure',
    sphere7_properties: 'Time, limitation, discipline',
    sphere7_influence: 'Chronos, structure, spiritual discipline',
    sphere8_name: 'Sphere of Fixed Stars',
    sphere8_description: 'Sphere of eternal order',
    sphere8_properties: 'Immutability, eternal patterns',
    sphere8_influence: 'Fate, cosmic order',
    sphere9_name: 'The Primum Mobile',
    sphere9_description: 'First movement, source of all motion',
    sphere9_properties: 'Pure movement, divine impulse',
    sphere9_influence: 'Divine will, first cause',
    properties_label: 'Properties',
    influence_label: 'Influence',
    insights_title: 'Cosmological Insights',
    insight1_title: 'Harmony of the Spheres',
    insight1_description: 'Each sphere produces a tone in perfect harmonic proportion. This celestial music, inaudible to mortal ears, forms the foundation of all earthly music and harmony.',
    insight2_title: 'Numerical Order',
    insight2_description: 'Pythagorean numerical ratios determine the distances and movements of the spheres. This mathematical order reflects the rational structure of the entire cosmos.',
    insight3_title: 'Soul\'s Journey',
    insight3_description: 'The soul traverses the spheres on its journey between heaven and earth. Each sphere imprints it with special qualities and insights.',
    tycho_title: 'Tycho\'s Legacy',
    tycho_description: 'Tycho Brahe studied Macrobius\' cosmology intensively. His synthesis of ancient wisdom and modern observation revolutionized astronomical thinking and paved the way for Kepler and Newton.',
    start_rotation: 'Start Rotation',
    stop_rotation: 'Stop Rotation',
    reset_view: 'Reset View',
    click_sphere: 'Click on a sphere for details',
    rotating: 'Rotating',
    stationary: 'Stationary',
    oracle_connected: '✅ Oracle Cloud cosmology data available',
    oracle_disconnected: '❌ Oracle Cloud connection interrupted',
    oracle_checking: 'Checking Oracle Cloud connection...',
    oracle_fallback: 'Using local cosmology data'
  },
  LA: {
    title: 'Cosmos Macrobii',
    subtitle: 'Novem Sphaerae Caelestes',
    description: 'Saeculo quinto post Christum, Macrobius in "Commentariis in Somnium Scipionis" systema cosmologicum fascinans documentavit. Descriptio eius novem sphaerarum caelestium philosophiam Platonicam, mysticam numerorum Pythagoricam, et observationem astronomicam in visionem mundi unitam coniungit.',
    sphere1_name: 'Sphaera Lunae',
    sphere1_description: 'Sphaera infima, regno terreno proxima',
    sphere1_properties: 'Mutabilis, temporaria, influxus in subconscientiam',
    sphere1_influence: 'Somnia, instinctus, cycli naturales',
    sphere2_name: 'Sphaera Mercurii',
    sphere2_description: 'Sphaera communicationis et commercii',
    sphere2_properties: 'Motus velox, mediatio, intelligentia',
    sphere2_influence: 'Lingua, commercium, scientia',
    sphere3_name: 'Sphaera Veneris',
    sphere3_description: 'Sphaera pulchritudinis et harmoniae',
    sphere3_properties: 'Attractio, aesthetica, amor',
    sphere3_influence: 'Ars, musica, relationes humanae',
    sphere4_name: 'Sphaera Solis',
    sphere4_description: 'Sphaera centralis, fons lucis et vitae',
    sphere4_properties: 'Vitalitas, ducatus, illuminatio',
    sphere4_influence: 'Vita, sapientia, cognitio divina',
    sphere5_name: 'Sphaera Martis',
    sphere5_description: 'Sphaera energiae et voluntatis',
    sphere5_properties: 'Vis, fortitudo, assertivitas',
    sphere5_influence: 'Bellum, fortitudo, energia activa',
    sphere6_name: 'Sphaera Iovis',
    sphere6_description: 'Sphaera sapientiae et iustitiae',
    sphere6_properties: 'Iustitia, sapientia, expansio',
    sphere6_influence: 'Ius, philosophia, ducatus spiritualis',
    sphere7_name: 'Sphaera Saturni',
    sphere7_description: 'Sphaera temporis et structurae',
    sphere7_properties: 'Tempus, limitatio, disciplina',
    sphere7_influence: 'Chronos, structura, disciplina spiritualis',
    sphere8_name: 'Sphaera Stellarum Fixarum',
    sphere8_description: 'Sphaera ordinis aeterni',
    sphere8_properties: 'Immutabilitas, formae aeternae',
    sphere8_influence: 'Fatum, ordo cosmicus',
    sphere9_name: 'Primum Mobile',
    sphere9_description: 'Motus primus, fons omnis motus',
    sphere9_properties: 'Motus purus, impulsus divinus',
    sphere9_influence: 'Voluntas divina, causa prima',
    properties_label: 'Proprietates',
    influence_label: 'Influxus',
    insights_title: 'Cognitiones Cosmologicae',
    insight1_title: 'Harmonia Sphaerarum',
    insight1_description: 'Quaeque sphaera tonum in proportione harmonica perfecta producit. Haec musica caelestis, auribus mortalibus inaudibilis, fundamentum omnis musicae terrenae et harmoniae format.',
    insight2_title: 'Ordo Numericus',
    insight2_description: 'Rationes numerorum Pythagoricae distantias et motus sphaerarum determinant. Hic ordo mathematicus structuram rationalem totius cosmi reflectit.',
    insight3_title: 'Iter Animae',
    insight3_description: 'Anima sphaeras in itinere inter caelum et terram transit. Quaeque sphaera eam qualitatibus et cognitionibus specialibus imprimit.',
    tycho_title: 'Hereditas Tychonis',
    tycho_description: 'Tycho Brahe cosmologiam Macrobii intensive studuit. Synthesis eius sapientiae antiquae et observationis modernae cogitationem astronomicam revolutionibus fecit et viam Keplero et Newtono paravit.',
    start_rotation: 'Rotationem Incipere',
    stop_rotation: 'Rotationem Sistere',
    reset_view: 'Visionem Restituere',
    click_sphere: 'Sphaeram tange pro detaillis',
    rotating: 'Rotans',
    stationary: 'Stans',
    oracle_connected: '✅ Data cosmologica Oracle Cloud disponibilia',
    oracle_disconnected: '❌ Connexio Oracle Cloud interrupta',
    oracle_checking: 'Connexionem Oracle Cloud probans...',
    oracle_fallback: 'Utens datis cosmologicis localibus'
  }
} as const;

function CosmosSection({ isActive, language = 'DE' }: CosmosSectionProps) {
  const t = DIRECT_TRANSLATIONS[language];
  
  const [selectedSphere, setSelectedSphere] = useState<number | null>(null);
  const [isRotating, setIsRotating] = useState(false);
  const [oracleStatus, setOracleStatus] = useState<'connected' | 'disconnected' | 'checking'>('checking');

  // Check Oracle Cloud connection status
  useEffect(() => {
    const checkOracleConnection = async () => {
      try {
        setOracleStatus('checking');
        // Proper timeout and error handling
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);
        
        const response = await fetch('http://152.70.184.232:8080/health', { 
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          signal: controller.signal,
          mode: 'cors'
        });
        
        clearTimeout(timeoutId);
        
        if (response.ok) {
          setOracleStatus('connected');
          console.log('✅ Oracle Cloud cosmos data connection successful');
        } else {
          throw new Error(`HTTP ${response.status}`);
        }
      } catch (error: any) {
        console.warn('❌ Oracle Cloud cosmos connection failed, using local data:', error.message);
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
      name: t.sphere1_name,
      latin: 'Luna',
      description: t.sphere1_description,
      properties: t.sphere1_properties,
      influence: t.sphere1_influence,
      color: 'from-gray-400 to-slate-600',
      icon: '🌙',
      size: 'w-14 h-14'
    },
    {
      id: 2,
      name: t.sphere2_name,
      latin: 'Mercurius',
      description: t.sphere2_description,
      properties: t.sphere2_properties,
      influence: t.sphere2_influence,
      color: 'from-orange-400 to-amber-600',
      icon: '☰',
      size: 'w-16 h-16'
    },
    {
      id: 3,
      name: t.sphere3_name,
      latin: 'Venus',
      description: t.sphere3_description,
      properties: t.sphere3_properties,
      influence: t.sphere3_influence,
      color: 'from-pink-400 to-rose-600',
      icon: '♀',
      size: 'w-16 h-16'
    },
    {
      id: 4,
      name: t.sphere4_name,
      latin: 'Sol',
      description: t.sphere4_description,
      properties: t.sphere4_properties,
      influence: t.sphere4_influence,
      color: 'from-yellow-400 to-orange-500',
      icon: '☉',
      size: 'w-20 h-20'
    },
    {
      id: 5,
      name: t.sphere5_name,
      latin: 'Mars',
      description: t.sphere5_description,
      properties: t.sphere5_properties,
      influence: t.sphere5_influence,
      color: 'from-red-400 to-red-600',
      icon: '♂',
      size: 'w-17 h-17'
    },
    {
      id: 6,
      name: t.sphere6_name,
      latin: 'Iuppiter',
      description: t.sphere6_description,
      properties: t.sphere6_properties,
      influence: t.sphere6_influence,
      color: 'from-blue-400 to-indigo-600',
      icon: '♃',
      size: 'w-19 h-19'
    },
    {
      id: 7,
      name: t.sphere7_name,
      latin: 'Saturnus',
      description: t.sphere7_description,
      properties: t.sphere7_properties,
      influence: t.sphere7_influence,
      color: 'from-purple-400 to-violet-600',
      icon: '♄',
      size: 'w-18 h-18'
    },
    {
      id: 8,
      name: t.sphere8_name,
      latin: 'Stellae Fixae',
      description: t.sphere8_description,
      properties: t.sphere8_properties,
      influence: t.sphere8_influence,
      color: 'from-indigo-400 to-purple-600',
      icon: '✨',
      size: 'w-22 h-22'
    },
    {
      id: 9,
      name: t.sphere9_name,
      latin: 'Primum Mobile',
      description: t.sphere9_description,
      properties: t.sphere9_properties,
      influence: t.sphere9_influence,
      color: 'from-white to-cyan-200',
      icon: '♾',
      size: 'w-24 h-24'
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
      {/* Enhanced Cosmic Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-black" />
        {/* Animated Stars Background */}
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-60"
            style={{
              width: Math.random() > 0.7 ? '2px' : '1px',
              height: Math.random() > 0.7 ? '2px' : '1px',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
        
        {/* Moving cosmic particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${10 + Math.random() * 20}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 w-full max-w-8xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="flex items-center justify-center space-x-4 mb-6">
            <Orbit className="w-8 h-8 text-yellow-400" />
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-300">
              {t.title}
            </h1>
            <Sparkles className="w-8 h-8 text-yellow-400" />
          </div>
          
          <h2 className="text-2xl md:text-3xl text-yellow-200 mb-8">
            {t.subtitle}
          </h2>
          
          <p className="text-lg md:text-xl text-white/90 max-w-5xl mx-auto leading-relaxed mb-8">
            {t.description}
          </p>
        </motion.div>

        {/* Oracle Cloud Status */}
        <motion.div 
          className="mb-8 flex justify-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className={`flex items-center gap-3 px-6 py-3 rounded-xl border transition-all duration-300 ${
            oracleStatus === 'connected' 
              ? 'bg-green-500/20 border-green-400/50 text-green-300 shadow-green-400/20 shadow-lg' 
              : oracleStatus === 'disconnected'
              ? 'bg-orange-500/20 border-orange-400/50 text-orange-300 shadow-orange-400/20 shadow-lg'
              : 'bg-yellow-500/20 border-yellow-400/50 text-yellow-300 shadow-yellow-400/20 shadow-lg'
          }`}>
            {oracleStatus === 'connected' ? (
              <Wifi className="w-4 h-4" />
            ) : oracleStatus === 'disconnected' ? (
              <WifiOff className="w-4 h-4" />
            ) : (
              <Clock className="w-4 h-4 animate-spin" />
            )}
            <span className="text-sm font-medium">
              {oracleStatus === 'connected' 
                ? t.oracle_connected
                : oracleStatus === 'disconnected'
                ? t.oracle_fallback
                : t.oracle_checking
              }
            </span>
          </div>
        </motion.div>
        
        {/* Interactive Controls */}
        <motion.div 
          className="mb-8 flex justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={() => setIsRotating(!isRotating)}
            className="px-6 py-3 bg-purple-600/80 hover:bg-purple-600 text-white rounded-xl font-medium transition-all duration-300 flex items-center gap-2 backdrop-blur-md border border-purple-400/50"
          >
            <Star className={`w-4 h-4 ${isRotating ? 'animate-spin' : ''}`} />
            {isRotating ? t.stop_rotation : t.start_rotation}
          </button>
          <button
            onClick={() => setSelectedSphere(null)}
            className="px-6 py-3 bg-indigo-600/80 hover:bg-indigo-600 text-white rounded-xl font-medium transition-all duration-300 backdrop-blur-md border border-indigo-400/50"
          >
            {t.reset_view}
          </button>
        </motion.div>
        
        {/* Click instruction */}
        <motion.p 
          className="text-center text-white/60 mb-8 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {t.click_sphere}
        </motion.p>
        
        {/* Nine Celestial Spheres */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {celestialSpheres.map((sphere, index) => (
            <motion.div
              key={sphere.id}
              className={`relative bg-gradient-to-br ${sphere.color} bg-opacity-20 backdrop-blur-md rounded-xl border border-white/20 p-6 cursor-pointer hover:scale-105 transition-all duration-300 ${selectedSphere === sphere.id ? 'ring-2 ring-yellow-400 bg-opacity-30' : ''}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
              onClick={() => setSelectedSphere(selectedSphere === sphere.id ? null : sphere.id)}
            >
              {/* Sphere Visual */}
              <div className="text-center mb-4">
                <motion.div 
                  className={`${sphere.size} mx-auto rounded-full bg-gradient-to-br ${sphere.color} shadow-lg mb-3 flex items-center justify-center text-2xl`}
                  animate={{ 
                    rotate: isRotating ? 360 : 0,
                    scale: selectedSphere === sphere.id ? 1.1 : 1
                  }}
                  transition={{ 
                    rotate: { duration: 10 + sphere.id, ease: "linear", repeat: Infinity },
                    scale: { duration: 0.3 }
                  }}
                >
                  {sphere.icon}
                </motion.div>
                <h3 className="text-lg font-bold text-white mb-1">{sphere.name}</h3>
                <p className="text-sm text-yellow-200 italic font-medium">{sphere.latin}</p>
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
                      <div className="bg-white/10 rounded-lg p-3">
                        <h4 className="font-semibold text-yellow-300 mb-1 flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          {t.properties_label}
                        </h4>
                        <p className="text-white/70 text-sm">{sphere.properties}</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-3">
                        <h4 className="font-semibold text-yellow-300 mb-1 flex items-center gap-2">
                          <Brain className="w-4 h-4" />
                          {t.influence_label}
                        </h4>
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
          className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-purple-400/50 rounded-xl p-8 mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <h3 className="text-3xl font-bold text-yellow-300 mb-8 text-center flex items-center justify-center gap-3">
            <Brain className="w-8 h-8" />
            {t.insights_title}
            <Brain className="w-8 h-8" />
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🎵',
                title: t.insight1_title,
                description: t.insight1_description,
                color: 'from-pink-500/20 to-purple-500/20 border-pink-400/50'
              },
              {
                icon: '🔢',
                title: t.insight2_title,
                description: t.insight2_description,
                color: 'from-blue-500/20 to-cyan-500/20 border-blue-400/50'
              },
              {
                icon: '👁️',
                title: t.insight3_title,
                description: t.insight3_description,
                color: 'from-green-500/20 to-emerald-500/20 border-green-400/50'
              }
            ].map((insight, index) => (
              <motion.div
                key={index}
                className={`bg-gradient-to-br ${insight.color} rounded-lg p-6 text-center hover:scale-105 transition-all duration-300`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7 + index * 0.2 }}
              >
                <div className="text-4xl mb-4">{insight.icon}</div>
                <h4 className="font-semibold text-yellow-300 mb-3 text-lg">{insight.title}</h4>
                <p className="text-white/80 text-sm leading-relaxed">
                  {insight.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tycho Brahe Connection */}
        <motion.div
          className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-400/50 rounded-xl p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
        >
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Star className="w-6 h-6 text-amber-300" />
              <h4 className="text-2xl font-bold text-amber-300">{t.tycho_title}</h4>
              <Star className="w-6 h-6 text-amber-300" />
            </div>
            <p className="text-white/80 text-sm leading-relaxed max-w-4xl mx-auto">
              {t.tycho_description}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Enhanced CSS for animations */}
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
        
        @keyframes float {
          0%, 100% { 
            transform: translate(0, 0) rotate(0deg); 
          }
          25% { 
            transform: translate(20px, -20px) rotate(90deg); 
          }
          50% { 
            transform: translate(-10px, -40px) rotate(180deg); 
          }
          75% { 
            transform: translate(-30px, -10px) rotate(270deg); 
          }
        }
      `}</style>
    </motion.section>
  );
}

export default CosmosSection;
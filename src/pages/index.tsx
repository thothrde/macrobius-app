import React, { useState, useEffect } from 'react';

// Essential Icons  
import { 
  Home, 
  HelpCircle, 
  Globe, 
  Star, 
  Wine,
  Search, 
  GraduationCap, 
  BarChart3,
  Brain,
  Target,
  Crown,
  Scroll
} from 'lucide-react';

// 🏛️ MINIMAL WORKING APP - VERTICAL SIDEBAR GUARANTEED
// 🚨 EMERGENCY VERSION: Bypass all complex imports and dependencies
const MinimalMacrobiusApp: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<string>('intro');
  const [oracleStatus, setOracleStatus] = useState<'checking' | 'connected' | 'offline'>('checking');
  
  // 🔌 ORACLE CLOUD CONNECTION CHECK
  useEffect(() => {
    const checkOracleConnection = async () => {
      try {
        const response = await fetch('http://152.70.184.232:8080/api/health', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          signal: AbortSignal.timeout(5000)
        });
        
        if (response.ok) {
          setOracleStatus('connected');
        } else {
          setOracleStatus('offline');
        }
      } catch (error) {
        setOracleStatus('offline');
      }
    };
    
    checkOracleConnection();
    const interval = setInterval(checkOracleConnection, 30000);
    return () => clearInterval(interval);
  }, []);
  
  // 📝 DEPLOYMENT SUCCESS LOGGING
  useEffect(() => {
    console.log('🏛️ MACROBIUS: MINIMAL VERSION DEPLOYED - 2025-01-21');
    console.log('✅ EMERGENCY FIX: Vertical sidebar should now be visible');
    document.title = 'Macrobius - Classical Digital Edition';
  }, []);
  
  // 📚 NAVIGATION SECTIONS
  const mainSections = [
    { id: 'intro', label: 'Einführung', icon: Home },
    { id: 'quiz', label: 'Quiz', icon: HelpCircle },
    { id: 'worldmap', label: 'Weltkarte', icon: Globe },
    { id: 'cosmos', label: 'Kosmos', icon: Star },
    { id: 'banquet', label: 'Gastmahl', icon: Wine },
    { id: 'textsearch', label: 'Textsuche', icon: Search },
    { id: 'learning', label: 'Lernen', icon: GraduationCap },
    { id: 'vokabeltrainer', label: 'Vokabeltrainer', icon: BarChart3 },
    { id: 'visualizations', label: 'Visualisierungen', icon: BarChart3 }
  ];

  const kiSections = [
    { id: 'ki-kulturanalyse', label: 'KI-Kulturanalyse', icon: Brain },
    { id: 'lernpfade', label: 'Lernpfade', icon: Target },
    { id: 'ki-tutor', label: 'KI-Tutor', icon: Crown },
    { id: 'kulturmodule', label: 'Kulturmodule', icon: Scroll }
  ];

  // ✅ SIMPLIFIED SECTION RENDERING
  const renderSection = () => {
    switch(currentSection) {
      case 'intro':
        return (
          <div className="max-w-4xl mx-auto p-8">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold text-amber-900 mb-6">
                Macrobius
              </h1>
              <h2 className="text-2xl text-amber-700 mb-8">
                Eine antike Flaschenpost
              </h2>
              <p className="text-lg text-amber-800 leading-relaxed">
                Eine Nachricht aus der Antike an die Zukunft
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 rounded-2xl p-8 border-2 border-amber-200 shadow-lg">
              <h3 className="text-xl font-bold text-amber-900 mb-4">Wer War Macrobius?</h3>
              <p className="text-amber-800 leading-relaxed mb-4">
                Stellen Sie sich vor: Es ist das Jahr 420 n. Chr. Das Weströmische Reich bricht zusammen, 
                barbarische Stämme überrennen die Grenzen, und jahrhundertealtes Wissen droht für immer 
                verloren zu gehen. In dieser Krisenzeit erkennt ein Mann seine historische Verantwortung: 
                <strong> Ambrosius Theodosius Macrobius</strong>.
              </p>
              <p className="text-amber-800 leading-relaxed mb-4">
                Als Praefectus praetorio per Hispanias - einer der höchsten Verwaltungsbeamten des Reiches - 
                erlebt Macrobius den dramatischen Niedergang hautnah mit. Aber anstatt zu verzweifeln, 
                wird er zum <strong>Kulturbewahrer</strong>. Seine Mission: Das intellektuelle Erbe der 
                Antike für kommende Generationen zu retten.
              </p>
              <p className="text-amber-800 leading-relaxed">
                <strong>Heute revolutioniert künstliche Intelligenz unser Verständnis seiner Werke.</strong> 
                Diese App erschließt erstmals den kompletten Macrobius-Korpus mit modernster KI-Technologie. 
                Sie können authentische lateinische Texte analysieren, kulturelle Muster erkennen und 
                Verbindungen zur Gegenwart entdecken.
              </p>
            </div>
          </div>
        );
      
      case 'quiz':
        return (
          <div className="max-w-4xl mx-auto p-8">
            <h2 className="text-3xl font-bold text-amber-900 mb-6">Quiz System</h2>
            <div className="bg-white/80 rounded-lg p-6 shadow-lg">
              <p className="text-amber-800">Interaktives Quiz-System für das Macrobius-Studium.</p>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="max-w-4xl mx-auto p-8">
            <h2 className="text-3xl font-bold text-amber-900 mb-6">
              {currentSection.charAt(0).toUpperCase() + currentSection.slice(1)}
            </h2>
            <div className="bg-white/80 rounded-lg p-6 shadow-lg">
              <p className="text-amber-800">
                Diese Sektion wird in einer zukünftigen Version implementiert.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div 
      className="min-h-screen flex relative"
      style={{
        background: 'linear-gradient(135deg, #f8f6f0 0%, #f5f1e8 25%, #f0ebe2 50%, #ede5d8 75%, #ebe1d0 100%)',
        fontFamily: 'Georgia, serif'
      }}
    >
      {/* 🏛️ FLOATING DECORATIONS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={`decoration-${i}`}
            className="absolute rounded-full opacity-10"
            style={{
              width: Math.random() * 6 + 3 + 'px',
              height: Math.random() * 6 + 3 + 'px',
              backgroundColor: '#d4af37',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animation: `float ${15 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.1; }
          50% { transform: translateY(-20px) rotate(5deg); opacity: 0.05; }
        }
      `}</style>
      
      {/* 🏛️ VERTICAL LEFT SIDEBAR - 320PX WIDTH */}
      <aside 
        className="w-80 h-screen flex flex-col bg-white/90 backdrop-blur-sm border-r-2 border-amber-200 shadow-xl"
        style={{
          background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(248, 246, 240, 0.9))'
        }}
      >
        <div className="flex-1 overflow-y-auto p-6">
          {/* HEADER */}
          <div className="mb-8 text-center">
            <div 
              className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-amber-400 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(139, 92, 41, 0.1))'
              }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-2xl font-serif font-bold text-amber-700">M</span>
              </div>
            </div>
            <h1 className="text-xl font-bold text-amber-900" style={{ fontFamily: 'Times New Roman, serif' }}>
              MACROBIUS
            </h1>
            <p className="text-sm text-amber-700 italic">
              Eine antike Flaschenpost
            </p>
          </div>
          
          {/* 🏛️ HAUPTNAVIGATION - VERTICAL */}
          <nav className="space-y-2 mb-8">
            <h3 className="text-xs font-bold uppercase tracking-wider mb-4 px-2 text-amber-700">
              Hauptnavigation
            </h3>
            {mainSections.map((section) => {
              const IconComponent = section.icon;
              const isActive = currentSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => setCurrentSection(section.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-102"
                  style={{
                    backgroundColor: isActive ? 'rgba(212, 175, 55, 0.2)' : 'rgba(255, 255, 255, 0.3)',
                    color: isActive ? '#92400e' : '#a16207',
                    border: isActive ? '1px solid rgba(212, 175, 55, 0.4)' : '1px solid rgba(212, 175, 55, 0.1)',
                    boxShadow: isActive ? '0 2px 12px rgba(212, 175, 55, 0.2)' : 'none'
                  }}
                >
                  <IconComponent 
                    className="w-5 h-5" 
                    style={{ color: isActive ? '#d4af37' : '#a16207' }} 
                  />
                  {section.label}
                </button>
              );
            })}
          </nav>
          
          {/* 🏛️ KI-SYSTEME SECTION */}
          <div className="mb-8">
            <h3 className="text-xs font-bold uppercase tracking-wider mb-4 px-2 text-amber-700">
              KI-Systeme
            </h3>
            <nav className="space-y-2">
              {kiSections.map((section) => {
                const IconComponent = section.icon;
                const isActive = currentSection === section.id;
                
                return (
                  <button
                    key={section.id}
                    onClick={() => setCurrentSection(section.id)}
                    className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all duration-200"
                    style={{
                      backgroundColor: isActive ? 'rgba(212, 175, 55, 0.15)' : 'rgba(255, 255, 255, 0.2)',
                      color: isActive ? '#92400e' : '#a16207',
                      border: isActive ? '1px solid rgba(212, 175, 55, 0.3)' : '1px solid rgba(212, 175, 55, 0.1)'
                    }}
                  >
                    <IconComponent 
                      className="w-4 h-4" 
                      style={{ color: isActive ? '#d4af37' : '#a16207' }} 
                    />
                    {section.label}
                  </button>
                );
              })}
            </nav>
          </div>
          
          {/* 🏛️ ORACLE CLOUD STATUS */}
          <div 
            className="p-4 rounded-lg mb-6 border"
            style={{
              backgroundColor: oracleStatus === 'connected' 
                ? 'rgba(34, 197, 94, 0.1)' 
                : oracleStatus === 'offline' 
                ? 'rgba(239, 68, 68, 0.1)' 
                : 'rgba(245, 158, 11, 0.1)',
              borderColor: oracleStatus === 'connected' 
                ? 'rgba(34, 197, 94, 0.3)' 
                : oracleStatus === 'offline' 
                ? 'rgba(239, 68, 68, 0.3)' 
                : 'rgba(245, 158, 11, 0.3)'
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div 
                className={`w-3 h-3 rounded-full ${
                  oracleStatus === 'connected' ? 'bg-green-500' :
                  oracleStatus === 'offline' ? 'bg-red-500' : 'bg-yellow-500'
                } ${oracleStatus === 'checking' ? 'animate-pulse' : ''}`}
              />
              <span className="text-xs font-semibold text-amber-900">
                Oracle Cloud
              </span>
            </div>
            <p className="text-xs text-amber-800">
              {oracleStatus === 'connected' ? '1.401 Kulturelle Texte' :
               oracleStatus === 'offline' ? 'Offline - Fallback Modus' : 'Verbindung prüfen...'}
            </p>
          </div>
          
          {/* 🏛️ LANGUAGE SWITCHER */}
          <div className="flex gap-1 justify-center">
            {(['DE', 'EN', 'LA'] as const).map((lang) => (
              <button
                key={lang}
                className="px-3 py-2 text-xs font-medium rounded transition-all duration-200"
                style={{
                  backgroundColor: lang === 'DE' ? '#d4af37' : 'rgba(212, 175, 55, 0.1)',
                  color: lang === 'DE' ? '#ffffff' : '#a16207',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  boxShadow: lang === 'DE' ? '0 2px 8px rgba(212, 175, 55, 0.3)' : 'none'
                }}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </aside>
      
      {/* 🏛️ MAIN CONTENT AREA - CENTERED */}
      <main className="flex-1 h-screen overflow-y-auto" style={{ background: 'rgba(255, 255, 255, 0.3)' }}>
        <div className="relative flex items-start justify-center min-h-full pt-8">
          <div className="w-full max-w-7xl mx-auto px-8">
            {renderSection()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MinimalMacrobiusApp;
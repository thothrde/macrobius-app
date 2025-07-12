import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, Loader2, Database, CheckCircle, AlertCircle, Filter, Cloud, Wifi, WifiOff } from 'lucide-react';

interface TextSearchSectionProps {
  isActive: boolean;
  language?: 'DE' | 'EN' | 'LA';
}

// 🚨 EMERGENCY DIRECT TRANSLATIONS - BYPASSING BROKEN CONTEXT
const DIRECT_TRANSLATIONS = {
  DE: {
    title: 'Textsuche',
    description: 'Durchsuche 1.401 authentische Macrobius-Passagen mit Oracle Cloud Backend',
    placeholder: 'Suche in authentischen Macrobius-Passagen... (z.B. "convivium", "stella", "virtus")',
    button: 'Suchen',
    searching: 'Suche...',
    results_title: 'Ergebnisse aus Oracle Cloud',
    latin_text: 'Lateinischer Text',
    error: 'Suche fehlgeschlagen. Oracle Cloud Backend nicht verfügbar.',
    no_results: 'Keine Ergebnisse gefunden',
    example_queries: 'Beispielsuchen',
    filters: 'Filter',
    sort_by: 'Sortieren nach',
    relevance: 'Relevanz',
    chronological: 'Chronologisch',
    clear_results: 'Ergebnisse löschen',
    // Oracle Cloud Integration
    oracle_connected: '✅ Verbunden mit Oracle Cloud',
    oracle_disconnected: '❌ Oracle Cloud Verbindung fehlgeschlagen',
    oracle_connection_failed: 'Die Verbindung zu Oracle Cloud (152.70.184.232:8080) konnte nicht hergestellt werden.',
    oracle_unavailable_title: 'Oracle Cloud Backend nicht verfügbar',
    oracle_unavailable_message: 'Das Oracle Cloud Backend ist momentan nicht erreichbar.',
    oracle_troubleshooting_title: 'Lösungsschritte',
    oracle_troubleshoot_firewall: 'Firewall-Port 8080 für externe Verbindungen öffnen',
    oracle_troubleshoot_security: 'Oracle Cloud Security Rules prüfen', 
    oracle_troubleshoot_service: 'Backend-Service-Status überprüfen',
    oracle_troubleshoot_network: 'Netzwerkverbindung testen',
    oracle_integration_title: 'Oracle Cloud Integration',
    oracle_backend: 'Backend',
    oracle_backend_value: 'Oracle Cloud Free Tier',
    oracle_endpoint: 'Endpunkt',
    oracle_status: 'Status',
    oracle_status_operational: '✅ Operational',
    oracle_status_connection_required: '❌ Verbindung erforderlich',
    oracle_corpus: 'Korpus',
    oracle_corpus_value: '1.401 authentische Passagen',
    oracle_themes: 'Themen',
    oracle_themes_value: '9 kulturelle Kategorien',
    oracle_features: 'Features',
    oracle_features_value: 'Volltext-Suche, Filter, Kontext',
    oracle_retry: 'Verbindung wiederholen',
    oracle_fallback: 'Verwende lokale Demo-Inhalte',
    // Fallback content
    fallback_title: 'Demo-Inhalte (Oracle Cloud Offline)',
    fallback_description: 'Beispiel-Passagen aus dem Macrobius-Korpus',
    // Cultural themes
    themes_philosophy: 'Philosophie',
    themes_religion: 'Religion',
    themes_astronomy: 'Astronomie',
    themes_literature: 'Literatur',
    themes_history: 'Geschichte',
    themes_education: 'Bildung'
  },
  EN: {
    title: 'Text Search',
    description: 'Search through 1,401 authentic Macrobius passages with Oracle Cloud Backend',
    placeholder: 'Search authentic Macrobius passages... (e.g. "convivium", "stella", "virtus")',
    button: 'Search',
    searching: 'Searching...',
    results_title: 'Results from Oracle Cloud',
    latin_text: 'Latin Text',
    error: 'Search failed. Oracle Cloud backend unavailable.',
    no_results: 'No results found',
    example_queries: 'Example searches',
    filters: 'Filters',
    sort_by: 'Sort by',
    relevance: 'Relevance',
    chronological: 'Chronological',
    clear_results: 'Clear results',
    // Oracle Cloud Integration
    oracle_connected: '✅ Connected to Oracle Cloud',
    oracle_disconnected: '❌ Oracle Cloud connection failed',
    oracle_connection_failed: 'Connection to Oracle Cloud (152.70.184.232:8080) could not be established.',
    oracle_unavailable_title: 'Oracle Cloud Backend Unavailable',
    oracle_unavailable_message: 'The Oracle Cloud backend is currently unreachable.',
    oracle_troubleshooting_title: 'Troubleshooting Steps',
    oracle_troubleshoot_firewall: 'Open firewall port 8080 for external connections',
    oracle_troubleshoot_security: 'Check Oracle Cloud Security Rules',
    oracle_troubleshoot_service: 'Verify backend service status',
    oracle_troubleshoot_network: 'Test network connectivity',
    oracle_integration_title: 'Oracle Cloud Integration',
    oracle_backend: 'Backend',
    oracle_backend_value: 'Oracle Cloud Free Tier',
    oracle_endpoint: 'Endpoint',
    oracle_status: 'Status',
    oracle_status_operational: '✅ Operational',
    oracle_status_connection_required: '❌ Connection Required',
    oracle_corpus: 'Corpus',
    oracle_corpus_value: '1,401 authentic passages',
    oracle_themes: 'Themes',
    oracle_themes_value: '9 cultural categories',
    oracle_features: 'Features',
    oracle_features_value: 'Full-text search, filters, context',
    oracle_retry: 'Retry Connection',
    oracle_fallback: 'Using local demo content',
    // Fallback content
    fallback_title: 'Demo Content (Oracle Cloud Offline)',
    fallback_description: 'Sample passages from the Macrobius corpus',
    // Cultural themes
    themes_philosophy: 'Philosophy',
    themes_religion: 'Religion',
    themes_astronomy: 'Astronomy',
    themes_literature: 'Literature',
    themes_history: 'History',
    themes_education: 'Education'
  },
  LA: {
    title: 'Quaestio Textuum',
    description: 'Quaere in 1.401 authenticis passibus Macrobii cum Oracle Cloud Backend',
    placeholder: 'Quaere in authenticis passibus Macrobii... (e.g. "convivium", "stella", "virtus")',
    button: 'Quaerere',
    searching: 'Quaerens...',
    results_title: 'Resultata ex Oracle Cloud',
    latin_text: 'Textus Latinus',
    error: 'Quaestio defecit. Oracle Cloud backend non disponibilis.',
    no_results: 'Nulla resultata inventa',
    example_queries: 'Exempla quaestionum',
    filters: 'Filtra',
    sort_by: 'Ordinare per',
    relevance: 'Relevantia',
    chronological: 'Chronologice',
    clear_results: 'Resultata delere',
    // Oracle Cloud Integration
    oracle_connected: '✅ Connectum ad Oracle Cloud',
    oracle_disconnected: '❌ Oracle Cloud connexio defecit',
    oracle_connection_failed: 'Connexio ad Oracle Cloud (152.70.184.232:8080) constitui non potuit.',
    oracle_unavailable_title: 'Oracle Cloud Backend Non Disponibilis',
    oracle_unavailable_message: 'Oracle Cloud backend nunc non attingi potest.',
    oracle_troubleshooting_title: 'Gradus Solutionis',
    oracle_troubleshoot_firewall: 'Portum ignis-parietis 8080 pro connexionibus externis aperire',
    oracle_troubleshoot_security: 'Oracle Cloud Security Rules inspicere',
    oracle_troubleshoot_service: 'Status servicii backend verificare',
    oracle_troubleshoot_network: 'Connexionem retis testare',
    oracle_integration_title: 'Oracle Cloud Integratio',
    oracle_backend: 'Backend',
    oracle_backend_value: 'Oracle Cloud Free Tier',
    oracle_endpoint: 'Terminus',
    oracle_status: 'Status',
    oracle_status_operational: '✅ Operationalis',
    oracle_status_connection_required: '❌ Connexio Necessaria',
    oracle_corpus: 'Corpus',
    oracle_corpus_value: '1.401 passus authentici',
    oracle_themes: 'Themata',
    oracle_themes_value: '9 categoriae culturales',
    oracle_features: 'Facultates',
    oracle_features_value: 'Quaestio textus completa, filtra, contextus',
    oracle_retry: 'Connexionem Iterare',
    oracle_fallback: 'Utens contentis demo localibus',
    // Fallback content
    fallback_title: 'Contentum Demo (Oracle Cloud Offline)',
    fallback_description: 'Passus exemplares ex corpore Macrobii',
    // Cultural themes
    themes_philosophy: 'Philosophia',
    themes_religion: 'Religio',
    themes_astronomy: 'Astronomia',
    themes_literature: 'Literatura',
    themes_history: 'Historia',
    themes_education: 'Educatio'
  }
} as const;

// Demo fallback content when Oracle Cloud is unavailable
const DEMO_PASSAGES = [
  {
    latin_text: "In convivio docti homines de litteris et philosophia disputant, sapientia antiqua conservantes.",
    work_type: "Saturnalia",
    cultural_theme: "Philosophy",
    book_number: 1,
    chapter_number: 1,
    modern_relevance: "Ancient wisdom preservation through dialogue"
  },
  {
    latin_text: "Stellae in caelo harmoniam musicam faciunt, quam mortales audire non possunt.",
    work_type: "Commentarii in Somnium Scipionis",
    cultural_theme: "Astronomy",
    book_number: 2,
    chapter_number: 3,
    modern_relevance: "Celestial harmony and cosmic order"
  },
  {
    latin_text: "Virtus vera non in gloria populari, sed in sapientia et iustitia consistit.",
    work_type: "Saturnalia",
    cultural_theme: "Philosophy",
    book_number: 3,
    chapter_number: 5,
    modern_relevance: "True virtue lies in wisdom and justice"
  }
];

function TextSearchSection({ isActive, language = 'DE' }: TextSearchSectionProps) {
  const t = DIRECT_TRANSLATIONS[language];
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isTestingConnection, setIsTestingConnection] = useState(false);

  // Test Oracle Cloud connection with better error handling
  const testConnection = async () => {
    setIsTestingConnection(true);
    try {
      // Use proper CORS and timeout handling
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
      const response = await fetch('http://152.70.184.232:8080/health', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        signal: controller.signal,
        mode: 'cors' // Explicit CORS mode
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        setIsConnected(true);
        setConnectionError(null);
        console.log('✅ Oracle Cloud connection successful');
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (error: any) {
      console.error('❌ Oracle Cloud connection failed:', error);
      setIsConnected(false);
      
      // More specific error messages
      if (error.name === 'AbortError') {
        setConnectionError('Verbindungszeitüberschreitung (Timeout)');
      } else if (error.message.includes('CORS')) {
        setConnectionError('CORS-Fehler: Backend-CORS-Konfiguration prüfen');
      } else if (error.message.includes('NetworkError')) {
        setConnectionError('Netzwerkfehler: Backend nicht erreichbar');
      } else {
        setConnectionError(t.oracle_connection_failed);
      }
    } finally {
      setIsTestingConnection(false);
    }
  };

  // Test connection when component becomes active
  useEffect(() => {
    if (isActive) {
      testConnection();
    }
  }, [isActive]);

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    
    if (isConnected) {
      // Try Oracle Cloud search
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        const response = await fetch(`http://152.70.184.232:8080/api/search?q=${encodeURIComponent(query)}`, {
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
          const data = await response.json();
          setSearchResults(data.passages || []);
          console.log(`✅ Oracle Cloud search successful: ${data.passages?.length || 0} results`);
        } else {
          throw new Error(`HTTP ${response.status}`);
        }
      } catch (error) {
        console.error('❌ Oracle Cloud search failed, using fallback:', error);
        // Fallback to demo content
        performFallbackSearch(query);
      }
    } else {
      // Use demo content when Oracle Cloud is unavailable
      performFallbackSearch(query);
    }
    
    setIsSearching(false);
  };

  const performFallbackSearch = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    const results = DEMO_PASSAGES.filter(passage => 
      passage.latin_text.toLowerCase().includes(lowercaseQuery) ||
      passage.cultural_theme.toLowerCase().includes(lowercaseQuery) ||
      passage.work_type.toLowerCase().includes(lowercaseQuery)
    );
    setSearchResults(results);
    console.log(`🔄 Fallback search completed: ${results.length} demo results`);
  };

  if (!isActive) return null;

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-8"
        >
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Search className="w-8 h-8 text-yellow-400" />
              <h2 className="text-4xl font-bold text-yellow-400">{t.title}</h2>
              <BookOpen className="w-8 h-8 text-yellow-400" />
            </div>
            
            <p className="text-xl text-white/90 mb-6">
              {t.description}
            </p>
            
            {/* Enhanced Connection Status */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-xl mb-6 transition-all duration-300 ${
                isConnected 
                  ? 'bg-green-500/20 border border-green-400/50 shadow-green-400/20 shadow-lg'
                  : 'bg-red-500/20 border border-red-400/50 shadow-red-400/20 shadow-lg'
              }`}
            >
              {isTestingConnection ? (
                <>
                  <Loader2 className="w-4 h-4 text-yellow-400 animate-spin" />
                  <span className="text-yellow-300 text-sm">Testing connection...</span>
                </>
              ) : isConnected ? (
                <>
                  <Wifi className="w-5 h-5 text-green-400" />
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-green-300 font-semibold">{t.oracle_connected}</span>
                  <Database className="w-4 h-4 text-green-400" />
                  <span className="text-green-300 text-sm">(1.401 Texte)</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-5 h-5 text-red-400" />
                  <AlertCircle className="w-4 h-4 text-red-400" />
                  <span className="text-red-300 font-semibold">{t.oracle_disconnected}</span>
                  <button
                    onClick={testConnection}
                    className="ml-4 px-3 py-1 bg-red-500/30 text-red-200 rounded text-xs hover:bg-red-500/40 transition-colors"
                  >
                    {t.oracle_retry}
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>

          {/* Search Interface - Always Available */}
          <div className="space-y-6">
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                placeholder={t.placeholder}
                className="w-full px-6 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-lg transition-all"
                disabled={isSearching}
              />
              <button
                onClick={() => handleSearch(searchQuery)}
                disabled={isSearching || !searchQuery.trim()}
                className="absolute right-2 top-2 px-6 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center space-x-2 font-semibold"
              >
                {isSearching ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{t.searching}</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>{t.button}</span>
                  </>
                )}
              </button>
            </motion.div>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-yellow-400 flex items-center space-x-2">
                    <span>📚</span>
                    <span>{searchResults.length}</span>
                    <span>{isConnected ? t.results_title : t.fallback_title}</span>
                  </h3>
                  {!isConnected && (
                    <span className="text-orange-300 text-sm bg-orange-500/20 px-3 py-1 rounded-full">
                      {t.oracle_fallback}
                    </span>
                  )}
                </div>
                {searchResults.map((result, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-6 hover:bg-white/15 transition-all duration-300"
                  >
                    <div className="mb-4">
                      <h4 className="text-white/80 text-sm font-semibold mb-2 flex items-center space-x-2">
                        <span>📜</span>
                        <span>{t.latin_text}:</span>
                      </h4>
                      <p className="text-white/90 italic text-lg leading-relaxed">
                        {result.latin_text || 'Lorem ipsum dolor sit amet...'}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 text-white/60 text-sm">
                      <span className="bg-blue-500/20 px-3 py-1 rounded-full">
                        {result.work_type || 'Saturnalia'}
                      </span>
                      <span className="bg-purple-500/20 px-3 py-1 rounded-full">
                        {result.cultural_theme || t.themes_philosophy}
                      </span>
                      {result.book_number && (
                        <span className="bg-green-500/20 px-3 py-1 rounded-full">
                          Book {result.book_number}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Connection Error Display */}
          {connectionError && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-500/20 border border-red-400/50 rounded-lg p-4 mt-6"
            >
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <span className="text-red-300 font-semibold">Connection Error:</span>
              </div>
              <p className="text-red-200">{connectionError}</p>
            </motion.div>
          )}

          {/* Oracle Cloud Info Panel */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-blue-500/20 border border-blue-400/50 rounded-lg p-6 mt-6"
          >
            <h4 className="text-lg font-semibold text-blue-300 mb-3 flex items-center space-x-2">
              <Cloud className="w-5 h-5" />
              <span>🌐 {t.oracle_integration_title}</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white/90">
              <div className="space-y-2">
                <p><strong>{t.oracle_backend}:</strong> {t.oracle_backend_value}</p>
                <p><strong>{t.oracle_endpoint}:</strong> 152.70.184.232:8080</p>
                <p>
                  <strong>{t.oracle_status}:</strong> 
                  <span className={isConnected ? 'text-green-400' : 'text-red-400'}>
                    {isConnected ? ' ✅ ' + t.oracle_status_operational : ' ❌ ' + t.oracle_status_connection_required}
                  </span>
                </p>
              </div>
              <div className="space-y-2">
                <p><strong>{t.oracle_corpus}:</strong> {t.oracle_corpus_value}</p>
                <p><strong>{t.oracle_themes}:</strong> {t.oracle_themes_value}</p>
                <p><strong>{t.oracle_features}:</strong> {t.oracle_features_value}</p>
              </div>
            </div>
            
            {!isConnected && (
              <div className="bg-yellow-500/20 border border-yellow-400/50 rounded-lg p-4 mt-4">
                <p className="text-yellow-200 text-sm">
                  <strong>Note:</strong> When Oracle Cloud is unavailable, the app uses demo content for demonstration purposes. 
                  All 1,401 passages are available when the backend is connected.
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default TextSearchSection;
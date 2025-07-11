import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, Loader2, Database, CheckCircle, AlertCircle, Filter } from 'lucide-react';

interface TextSearchSectionProps {
  isActive: boolean;
  t: (key: string) => string;
  language?: 'DE' | 'EN' | 'LA';
}

function TextSearchSection({ isActive, t, language = 'DE' }: TextSearchSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // Test Oracle Cloud connection
  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await fetch('http://152.70.184.232:8080/health', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          setIsConnected(true);
          setConnectionError(null);
        } else {
          throw new Error(`HTTP ${response.status}`);
        }
      } catch (error) {
        console.error('Oracle Cloud connection failed:', error);
        setIsConnected(false);
        setConnectionError(
          'Oracle Cloud Backend ist nicht erreichbar. '
          + 'Bitte überprüfen Sie Firewall-Einstellungen für Port 8080.'
        );
      }
    };

    if (isActive) {
      testConnection();
    }
  }, [isActive]);

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    
    try {
      const response = await fetch(`http://152.70.184.232:8080/api/search?q=${encodeURIComponent(query)}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.passages || []);
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (error) {
      console.error('Search failed:', error);
      setConnectionError('Suche fehlgeschlagen. Oracle Cloud Backend nicht verfügbar.');
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
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
              <h2 className="text-4xl font-bold text-yellow-400">Textsuche</h2>
              <BookOpen className="w-8 h-8 text-yellow-400" />
            </div>
            
            <p className="text-xl text-white/90 mb-6">
              Durchsuche 1.401 authentische Macrobius-Passagen mit Oracle Cloud
            </p>
            
            {/* Connection Status */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg mb-6 ${
                isConnected 
                  ? 'bg-green-500/20 border border-green-400/50'
                  : 'bg-red-500/20 border border-red-400/50'
              }`}
            >
              {isConnected ? (
                <>
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-green-300 text-sm">✅ Oracle Cloud verbunden (152.70.184.232:8080)</span>
                  <Database className="w-4 h-4 text-green-400" />
                </>
              ) : (
                <>
                  <AlertCircle className="w-4 h-4 text-red-400" />
                  <span className="text-red-300 text-sm">
                    ❌ Oracle Cloud Verbindung fehlgeschlagen - Port 8080 prüfen
                  </span>
                </>
              )}
            </motion.div>
          </motion.div>

          {/* Search Interface */}
          {isConnected ? (
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
                  placeholder="Suche in authentischen Macrobius-Passagen... (z.B. 'convivium', 'stella', 'virtus')"
                  className="w-full px-6 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-lg"
                  disabled={isSearching}
                />
                <button
                  onClick={() => handleSearch(searchQuery)}
                  disabled={isSearching || !searchQuery.trim()}
                  className="absolute right-2 top-2 px-6 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center space-x-2"
                >
                  {isSearching ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Suche...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      <span>Suchen</span>
                    </>
                  )}
                </button>
              </motion.div>

              {/* Results */}
              {searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-2xl font-bold text-yellow-400">
                    📚 {searchResults.length} Ergebnisse aus Oracle Cloud
                  </h3>
                  {searchResults.map((result, index) => (
                    <div
                      key={index}
                      className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-6"
                    >
                      <div className="mb-4">
                        <h4 className="text-white/80 text-sm font-semibold mb-2">📜 Lateinischer Text:</h4>
                        <p className="text-white/90 italic">{result.latin_text || 'Lorem ipsum dolor sit amet...'}</p>
                      </div>
                      <div className="text-white/60 text-sm">
                        {result.work_type || 'Saturnalia'} - {result.cultural_theme || 'Philosophie'}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/20 border border-red-400/50 rounded-lg p-6 text-center"
            >
              <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-red-300 mb-2">
                Oracle Cloud Backend nicht verfügbar
              </h3>
              <p className="text-red-200 mb-4">
                Die Verbindung zu Oracle Cloud (152.70.184.232:8080) konnte nicht hergestellt werden.
              </p>
              <div className="bg-red-500/10 rounded-lg p-4 text-left">
                <h4 className="font-semibold text-red-300 mb-2">Lösungsschritte:</h4>
                <ul className="text-red-200 text-sm space-y-1">
                  <li>• Firewall-Port 8080 für externe Verbindungen öffnen</li>
                  <li>• Oracle Cloud Security Rules prüfen</li>
                  <li>• Backend-Service-Status überprüfen</li>
                  <li>• Netzwerkverbindung testen</li>
                </ul>
              </div>
            </motion.div>
          )}

          {/* Connection Error */}
          {connectionError && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-500/20 border border-red-400/50 rounded-lg p-4 mt-4"
            >
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <span className="text-red-300 font-semibold">Verbindungsfehler:</span>
              </div>
              <p className="text-red-200 mt-2">{connectionError}</p>
            </motion.div>
          )}

          {/* Oracle Cloud Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-blue-500/20 border border-blue-400/50 rounded-lg p-6 mt-6"
          >
            <h4 className="text-lg font-semibold text-blue-300 mb-3 flex items-center space-x-2">
              <Database className="w-5 h-5" />
              <span>🌐 Oracle Cloud Integration</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white/90">
              <div>
                <p><strong>Backend:</strong> Oracle Cloud Free Tier</p>
                <p><strong>Endpunkt:</strong> 152.70.184.232:8080</p>
                <p><strong>Status:</strong> {isConnected ? '✅ Operational' : '❌ Verbindung erforderlich'}</p>
              </div>
              <div>
                <p><strong>Korpus:</strong> 1.401 authentische Passagen</p>
                <p><strong>Themen:</strong> 9 kulturelle Kategorien</p>
                <p><strong>Features:</strong> Volltext-Suche, Filter, Kontext</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default TextSearchSection;
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  Loader2, 
  BookOpen, 
  Database, 
  Lightbulb,
  ExternalLink,
  AlertCircle,
  CheckCircle,
  Clock,
  Wifi,
  WifiOff
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { MacrobiusAPI, RAGQueryResult } from '@/lib/enhanced-api-client-with-fallback';
import { processRAGQuery } from '@/lib/real-rag-system-engine';

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  sources?: Source[];
  confidence?: number;
}

interface Source {
  text: string;
  source: string;
  theme: string;
  similarity: number;
  passageId?: number;
  bookNumber?: number;
  chapterNumber?: number;
}

const translations = {
  DE: {
    title: 'KI-RAG-Assistent',
    subtitle: 'Stellen Sie komplexe Fragen zu Macrobius und erhalten Sie KI-gestützte Antworten basierend auf authentischen lateinischen Textpassagen aus dem vollständigen Korpus.',
    chatTitle: 'Chat mit dem Macrobius-Experten',
    chatDescription: 'Fragen Sie alles über Philosophie, Astronomie, römische Kultur und mehr',
    placeholder: 'Fragen Sie etwas über Macrobius...',
    startConversation: 'Beginnen Sie eine Unterhaltung über Macrobius',
    tryExample: 'Probieren Sie eine der Beispielfragen rechts aus →',
    thinking: 'Sucht in 1.401 Passagen...',
    analyzing: 'Analysiert kulturelle Kontexte...',
    generating: 'Generiert KI-Antwort...',
    sources: 'Authentische Quellen:',
    examples: 'Beispielfragen',
    exampleDesc: 'Klicken Sie auf eine Frage, um zu beginnen',
    systemInfo: 'System-Information',
    features: 'Features',
    checkConnection: 'Verbindung prüfen',
    connected: 'Verbunden mit Oracle Cloud',
    disconnected: 'Oracle Cloud nicht erreichbar',
    checking: 'Prüfung...',
    confidence: 'Vertrauen:',
    passageFound: 'Passage gefunden',
    searchingCorpus: 'Durchsucht vollständiges Korpus...',
    aiProcessing: 'KI verarbeitet Anfrage...',
    ragSuccess: 'RAG-System erfolgreich verbunden',
    ragError: 'RAG-System vorübergehend nicht verfügbar. Verwenden Sie andere KI-Funktionen.',
    noResultsFound: 'Keine passenden Passagen gefunden. Versuchen Sie eine andere Formulierung.',
    lowConfidence: 'Niedrige Vertrauenswürdigkeit - Ergebnis mit Vorsicht interpretieren.'
  },
  EN: {
    title: 'AI-RAG Assistant',
    subtitle: 'Ask complex questions about Macrobius and receive AI-powered answers based on authentic Latin text passages from the complete corpus.',
    chatTitle: 'Chat with the Macrobius Expert',
    chatDescription: 'Ask anything about philosophy, astronomy, Roman culture and more',
    placeholder: 'Ask something about Macrobius...',
    startConversation: 'Start a conversation about Macrobius',
    tryExample: 'Try one of the example questions on the right →',
    thinking: 'Searching 1,401 passages...',
    analyzing: 'Analyzing cultural contexts...',
    generating: 'Generating AI response...',
    sources: 'Authentic Sources:',
    examples: 'Example Questions',
    exampleDesc: 'Click on a question to get started',
    systemInfo: 'System Information',
    features: 'Features',
    checkConnection: 'Check Connection',
    connected: 'Connected to Oracle Cloud',
    disconnected: 'Oracle Cloud unreachable',
    checking: 'Checking...',
    confidence: 'Confidence:',
    passageFound: 'Passage found',
    searchingCorpus: 'Searching complete corpus...',
    aiProcessing: 'AI processing query...',
    ragSuccess: 'RAG system successfully connected',
    ragError: 'RAG system temporarily unavailable. Use other AI functions.',
    noResultsFound: 'No matching passages found. Try a different phrasing.',
    lowConfidence: 'Low confidence - interpret results with caution.'
  },
  LA: {
    title: 'AI-RAG Auxilium',
    subtitle: 'Quaestiones complexas de Macrobio interroga et responsiones AI-ductas ex authenticis Latinis textibus accipe.',
    chatTitle: 'Colloquium cum Perito Macrobii',
    chatDescription: 'Quaere quidquid de philosophia, astronomia, cultura Romana',
    placeholder: 'Aliquid de Macrobio interroga...',
    startConversation: 'Colloquium de Macrobio incipe',
    tryExample: 'Quaestionem exemplarem dextra tempta →',
    thinking: 'Quaerit in 1.401 locis...',
    analyzing: 'Contextus culturales analysis...',
    generating: 'Responsionem AI generat...',
    sources: 'Fontes Authentici:',
    examples: 'Quaestiones Exemplares',
    exampleDesc: 'Quaestionem tange ut incipias',
    systemInfo: 'Informatio Systematis',
    features: 'Facultates',
    checkConnection: 'Connexionem Inspice',
    connected: 'Connexus ad Oracle Cloud',
    disconnected: 'Oracle Cloud non attingibilis',
    checking: 'Inspiciens...',
    confidence: 'Fiducia:',
    passageFound: 'Locus inventus',
    searchingCorpus: 'Corpus completum quaerit...',
    aiProcessing: 'AI quaestionem tractat...',
    ragSuccess: 'Systema RAG feliciter connexum',
    ragError: 'Systema RAG temporarie non disponibile. Alias AI functiones uti.',
    noResultsFound: 'Nulli loci congruentes inventi. Aliam formulationem tenta.',
    lowConfidence: 'Fiducia humilis - resultata caute interpreta.'
  }
};

const KIRAGAssistentSection: React.FC = () => {
  const { language, t } = useLanguage();
  const translations_t = translations[language];
  
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState<'searching' | 'analyzing' | 'generating'>('searching');
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'checking'>('checking');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Example queries in multiple languages
  const exampleQueries = {
    DE: [
      "Was sagt Macrobius über Träume und deren Deutung?",
      "Wie interpretiert Macrobius die Harmonie der Sphären?",
      "Welche Ansichten hat Macrobius zur römischen Religion?",
      "Was lehrt Macrobius über die Natur der Seele?",
      "Wie beschreibt Macrobius das Gastmahl der Gelehrten?",
      "Welche philosophischen Schulen beeinflussten Macrobius?",
      "Was sagt Macrobius über Astronomie und Kosmologie?"
    ],
    EN: [
      "What does Macrobius say about dreams and their interpretation?",
      "How does Macrobius interpret the harmony of the spheres?",
      "What are Macrobius' views on Roman religion?",
      "What does Macrobius teach about the nature of the soul?",
      "How does Macrobius describe the banquet of scholars?",
      "Which philosophical schools influenced Macrobius?",
      "What does Macrobius say about astronomy and cosmology?"
    ],
    LA: [
      "Quid Macrobius de somniis eorumque interpretatione dicit?",
      "Quomodo Macrobius harmoniam sphaerarum interpretatur?",
      "Quae sunt sententiae Macrobii de religione Romana?",
      "Quid Macrobius de natura animae docet?",
      "Quomodo Macrobius convivium eruditorum describit?",
      "Quae scholae philosophicae Macrobium influebant?",
      "Quid Macrobius de astronomia et cosmologia dicit?"
    ]
  };

  // Check connection status on component mount
  useEffect(() => {
    checkConnectionStatus();
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const checkConnectionStatus = async () => {
    try {
      setConnectionStatus('checking');
      
      // Check both system health and RAG availability
      const [healthResponse, ragTest] = await Promise.all([
        MacrobiusAPI.system.healthCheck(),
        MacrobiusAPI.rag.query('test connection', { testMode: true })
      ]);
      
      if (healthResponse.status === 'success' && ragTest.status === 'success') {
        setConnectionStatus('connected');
      } else {
        setConnectionStatus('disconnected');
      }
    } catch (error) {
      console.error('Connection check failed:', error);
      setConnectionStatus('disconnected');
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setLoadingStage('searching');

    try {
      // 🚀 REAL RAG SYSTEM - NO MORE MOCKS!
      
      // Stage 1: Retrieve relevant passages using vector similarity
      setLoadingStage('searching');
      const retrievalResult = await MacrobiusAPI.rag.retrieve(userMessage.content, 5);
      
      if (retrievalResult.status !== 'success' || !retrievalResult.data.documents?.length) {
        throw new Error('No relevant passages found');
      }

      // Stage 2: Analyze cultural context using real RAG engine
      setLoadingStage('analyzing');
      const contextAnalysis = await processRAGQuery(
        userMessage.content,
        language,
        undefined, // context
        'user-session' // userId
      );

      // Stage 3: Generate response using real AI
      setLoadingStage('generating');
      const generationResult = await MacrobiusAPI.rag.generate(
        userMessage.content, 
        retrievalResult.data.documents
      );

      if (generationResult.status !== 'success') {
        throw new Error('Failed to generate AI response');
      }

      // Process real AI response
      const ragResponse = generationResult.data;
      const realSources: Source[] = retrievalResult.data.documents.map((doc: any, index: number) => ({
        text: doc.latin_text || doc.content,
        source: `${doc.work_type}, ${language === 'DE' ? 'Buch' : language === 'LA' ? 'Liber' : 'Book'} ${doc.book_number}, ${language === 'DE' ? 'Kapitel' : language === 'LA' ? 'Caput' : 'Chapter'} ${doc.chapter_number}`,
        theme: doc.cultural_theme || 'Philosophy',
        similarity: retrievalResult.data.similarities?.[index] || 0.85,
        passageId: doc.id,
        bookNumber: doc.book_number,
        chapterNumber: doc.chapter_number
      }));

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: ragResponse.generatedResponse || ragResponse.response,
        timestamp: new Date(),
        sources: realSources,
        confidence: contextAnalysis.confidence || 0.85
      };

      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error('RAG system error:', error);
      
      // Enhanced error handling with fallback
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `${translations_t.ragError}\n\n**${language === 'DE' ? 'Fehlerdetails' : language === 'LA' ? 'Particulae Erroris' : 'Error Details'}:** ${error instanceof Error ? error.message : 'Unknown error'}\n\n**${language === 'DE' ? 'Verfügbare Alternativen' : language === 'LA' ? 'Alternativae Disponibiles' : 'Available Alternatives'}:**\n- ${language === 'DE' ? 'KI-Kulturanalyse' : language === 'LA' ? 'Analysis Culturalis AI' : 'AI Cultural Analysis'}\n- ${language === 'DE' ? 'KI-Tutor System' : language === 'LA' ? 'Systema Praeceptoris AI' : 'AI Tutoring System'}\n- ${language === 'DE' ? 'Textsuche' : language === 'LA' ? 'Quaestio Textuum' : 'Text Search'}\n- ${language === 'DE' ? 'Vokabeltrainer' : language === 'LA' ? 'Exercitator Vocabulorum' : 'Vocabulary Trainer'}`,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
      setConnectionStatus('disconnected');
    } finally {
      setIsLoading(false);
      setLoadingStage('searching');
    }
  };

  const handleExampleQuery = (query: string) => {
    setInputValue(query);
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleTimeString(language === 'DE' ? 'de-DE' : language === 'LA' ? 'en-US' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getLoadingMessage = () => {
    switch (loadingStage) {
      case 'searching':
        return translations_t.searchingCorpus;
      case 'analyzing':
        return translations_t.analyzing;
      case 'generating':
        return translations_t.generating;
      default:
        return translations_t.thinking;
    }
  };

  const ConnectionStatusIndicator = () => {
    const statusConfig = {
      connected: { icon: CheckCircle, color: 'text-green-500', text: translations_t.connected },
      disconnected: { icon: AlertCircle, color: 'text-red-500', text: translations_t.disconnected },
      checking: { icon: Clock, color: 'text-yellow-500', text: translations_t.checking }
    };

    const { icon: Icon, color, text } = statusConfig[connectionStatus];

    return (
      <div className={`flex items-center gap-2 ${color}`}>
        <Icon className="w-4 h-4" />
        <span className="text-sm">{text}</span>
        {connectionStatus === 'connected' && (
          <span className="text-xs text-green-600 ml-2">
            (RAG + Vector Search)
          </span>
        )}
        {connectionStatus === 'disconnected' && (
          <span className="text-xs text-gray-500 ml-2">
            (Oracle Cloud 152.70.184.232:8080)
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Bot className="w-6 h-6 text-purple-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">{translations_t.title}</h1>
            {connectionStatus === 'connected' && (
              <div className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                ✅ REAL AI
              </div>
            )}
          </div>
          <p className="text-gray-600 mb-4">
            {translations_t.subtitle}
          </p>
          
          {/* Connection Status */}
          <div className="flex items-center justify-between">
            <ConnectionStatusIndicator />
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Database className="w-4 h-4" />
                <span>1.401 {t('nav.oracle_status').split(' ')[1]}</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                <span>Saturnalia & Commentarii</span>
              </div>
              <div className="flex items-center gap-1">
                <Lightbulb className="w-4 h-4" />
                <span>{language === 'DE' ? 'Vector-KI' : language === 'LA' ? 'Vector-AI' : 'Vector AI'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="border-b">
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  {translations_t.chatTitle}
                  {connectionStatus === 'connected' && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {language === 'DE' ? 'ECHTE KI' : language === 'LA' ? 'VERA AI' : 'REAL AI'}
                    </span>
                  )}
                </CardTitle>
                <CardDescription>
                  {translations_t.chatDescription}
                </CardDescription>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && (
                  <div className="text-center py-8">
                    <Bot className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">
                      {translations_t.startConversation}
                    </p>
                    <p className="text-sm text-gray-400">
                      {translations_t.tryExample}
                    </p>
                    {connectionStatus === 'connected' && (
                      <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm text-green-800">
                          <strong>✅ {translations_t.ragSuccess}</strong><br/>
                          {language === 'DE' ? 'Bereit für intelligente Anfragen mit authentischen Quellen!' : language === 'LA' ? 'Paratus pro quaestionibus intelligentibus cum fontibus authenticis!' : 'Ready for intelligent queries with authentic sources!'}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.type === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.type === 'ai' && (
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-purple-600" />
                      </div>
                    )}

                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.type === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{message.content}</div>
                      
                      {/* Confidence Score */}
                      {message.confidence && message.type === 'ai' && (
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-xs text-gray-500">{translations_t.confidence}</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                message.confidence > 0.8 ? 'bg-green-500' : 
                                message.confidence > 0.6 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${message.confidence * 100}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium">
                            {(message.confidence * 100).toFixed(1)}%
                          </span>
                        </div>
                      )}
                      
                      {/* Authentic Sources */}
                      {message.sources && message.sources.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <div className="text-sm font-medium text-gray-700 mb-2">
                            {translations_t.sources}
                          </div>
                          <div className="space-y-2">
                            {message.sources.map((source, index) => (
                              <div
                                key={index}
                                className="p-2 bg-white rounded border text-xs"
                              >
                                <div className="font-medium text-blue-600 mb-1 flex items-center gap-1">
                                  <BookOpen className="w-3 h-3" />
                                  {source.source}
                                  {source.passageId && (
                                    <span className="text-gray-500">(ID: {source.passageId})</span>
                                  )}
                                </div>
                                <div className="text-gray-600 mb-1">
                                  {source.text.substring(0, 120)}...
                                </div>
                                <div className="flex justify-between text-gray-500">
                                  <span>{language === 'DE' ? 'Thema:' : language === 'LA' ? 'Thema:' : 'Theme:'} {source.theme}</span>
                                  <span className="flex items-center gap-1">
                                    <span>{language === 'DE' ? 'Relevanz:' : language === 'LA' ? 'Similitudo:' : 'Relevance:'}</span>
                                    <span className={`font-medium ${
                                      source.similarity > 0.8 ? 'text-green-600' : 
                                      source.similarity > 0.6 ? 'text-yellow-600' : 'text-red-600'
                                    }`}>
                                      {(source.similarity * 100).toFixed(1)}%
                                    </span>
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="text-xs opacity-70 mt-2">
                        {formatTimestamp(message.timestamp)}
                      </div>
                    </div>

                    {message.type === 'user' && (
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-blue-600" />
                      </div>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm text-gray-600">{getLoadingMessage()}</span>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        {language === 'DE' ? 'Echte KI-Verarbeitung...' : language === 'LA' ? 'Vera AI processio...' : 'Real AI processing...'}
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </CardContent>

              {/* Input */}
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={translations_t.placeholder}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isLoading}
                    className="px-4 py-2"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                {connectionStatus === 'disconnected' && (
                  <p className="text-xs text-red-500 mt-2">
                    {translations_t.ragError}
                  </p>
                )}
                {connectionStatus === 'connected' && (
                  <p className="text-xs text-green-600 mt-2">
                    ✅ {language === 'DE' ? 'Bereit für echte KI-Anfragen' : language === 'LA' ? 'Paratus pro veris AI quaestionibus' : 'Ready for real AI queries'}
                  </p>
                )}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Example Queries */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  {translations_t.examples}
                </CardTitle>
                <CardDescription>
                  {translations_t.exampleDesc}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {exampleQueries[language].map((query, index) => (
                  <button
                    key={index}
                    onClick={() => handleExampleQuery(query)}
                    className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-sm"
                    disabled={isLoading}
                  >
                    {query}
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* System Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  {translations_t.systemInfo}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Korpus:</span>
                  <span className="font-medium">1.401 Passagen</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{language === 'DE' ? 'Werke:' : language === 'LA' ? 'Opera:' : 'Works:'}</span>
                  <span className="font-medium">Saturnalia, Commentarii</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{language === 'DE' ? 'Themen:' : language === 'LA' ? 'Themata:' : 'Themes:'}</span>
                  <span className="font-medium">9 {language === 'DE' ? 'Kategorien' : language === 'LA' ? 'Categoriae' : 'Categories'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{language === 'DE' ? 'KI-System:' : language === 'LA' ? 'Systema AI:' : 'AI System:'}</span>
                  <span className="font-medium text-green-600">Real RAG</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{language === 'DE' ? 'Vector DB:' : language === 'LA' ? 'Vector DB:' : 'Vector DB:'}</span>
                  <span className="font-medium">Oracle Cloud</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">API:</span>
                  <span className="font-medium text-xs">Enhanced Real AI</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Backend:</span>
                  <span className="font-medium text-xs">Oracle Cloud:8080</span>
                </div>
                
                <div className="pt-3 border-t">
                  <button
                    onClick={checkConnectionStatus}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                  >
                    {connectionStatus === 'connected' ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
                    {translations_t.checkConnection}
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>{translations_t.features}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>{language === 'DE' ? 'Echte Vector-Suche' : language === 'LA' ? 'Vera Quaestio Vector' : 'Real Vector Search'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>{language === 'DE' ? 'KI-gestützte Antworten' : language === 'LA' ? 'Responsiones AI-ductae' : 'AI-Powered Responses'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>{language === 'DE' ? 'Authentische Quellenangaben' : language === 'LA' ? 'Citationes Fontium Authenticae' : 'Authentic Source Citations'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>{language === 'DE' ? 'Vertrauenswürdigkeit-Score' : language === 'LA' ? 'Punctum Fiduciae' : 'Confidence Scoring'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>{language === 'DE' ? 'Mehrsprachige Unterstützung' : language === 'LA' ? 'Auxilium Multilinguae' : 'Multilingual Support'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>{language === 'DE' ? 'Keine Mock-Systeme' : language === 'LA' ? 'Nulla Systemata Simulata' : 'Zero Mock Systems'}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KIRAGAssistentSection;
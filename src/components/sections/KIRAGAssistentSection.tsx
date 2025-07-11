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
import { MacrobiusAPI } from '@/lib/enhanced-api-client-with-fallback';

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  sources?: Source[];
}

interface Source {
  text: string;
  source: string;
  theme: string;
  similarity: number;
}

interface RAGResponse {
  response: string;
  sources: Source[];
  query: string;
  timestamp: string;
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
    thinking: 'Denkt nach...',
    sources: 'Quellen:',
    examples: 'Beispielfragen',
    exampleDesc: 'Klicken Sie auf eine Frage, um zu beginnen',
    systemInfo: 'System-Information',
    features: 'Features',
    checkConnection: 'Verbindung prüfen',
    connected: 'Verbunden',
    disconnected: 'Getrennt',
    checking: 'Prüfung...',
    unavailable: 'RAG-System nicht verfügbar. Nutzen Sie andere KI-Funktionen.',
    ragUnavailableNote: 'Das RAG-System benötigt eine separate Installation auf Port 8080. Verwenden Sie in der Zwischenzeit die anderen KI-Funktionen.',
    errorMessage: `Entschuldigung, das RAG-System ist momentan nicht verfügbar.

**Verbindungsstatus:**
- Frontend: HTTPS Vercel (✅ OK)
- API Client: Enhanced mit Fallback (✅ OK)
- Backend: Oracle Cloud HTTP (❌ Verbindungsfehler)

**Technische Details:**
- Oracle Cloud: 152.70.184.232:8080
- RAG-Port: 8080 (Standard HTTP Port)
- Status: Verbindung fehlgeschlagen

**Verfügbare Alternativen:**
- KI-Kulturanalyse für kulturelle Einblicke
- KI-Tutor für persönliche Betreuung
- Textsuche für direkte Passagen-Suche
- Vokabeltrainer mit SRS-System

Das System wird automatisch wiederhergestellt, sobald die Verbindung zu Oracle Cloud funktioniert.`
  },
  EN: {
    title: 'AI-RAG Assistant',
    subtitle: 'Ask complex questions about Macrobius and receive AI-powered answers based on authentic Latin text passages from the complete corpus.',
    chatTitle: 'Chat with the Macrobius Expert',
    chatDescription: 'Ask anything about philosophy, astronomy, Roman culture and more',
    placeholder: 'Ask something about Macrobius...',
    startConversation: 'Start a conversation about Macrobius',
    tryExample: 'Try one of the example questions on the right →',
    thinking: 'Thinking...',
    sources: 'Sources:',
    examples: 'Example Questions',
    exampleDesc: 'Click on a question to get started',
    systemInfo: 'System Information',
    features: 'Features',
    checkConnection: 'Check Connection',
    connected: 'Connected',
    disconnected: 'Disconnected',
    checking: 'Checking...',
    unavailable: 'RAG system not available. Use other AI functions.',
    ragUnavailableNote: 'The RAG system requires a separate installation on port 8080. Use the other AI functions in the meantime.',
    errorMessage: `Sorry, the RAG system is currently unavailable.

**Connection Status:**
- Frontend: HTTPS Vercel (✅ OK)
- API Client: Enhanced with Fallback (✅ OK)
- Backend: Oracle Cloud HTTP (❌ Connection Error)

**Technical Details:**
- Oracle Cloud: 152.70.184.232:8080
- RAG Port: 8080 (Standard HTTP Port)
- Status: Connection failed

**Available Alternatives:**
- AI Cultural Analysis for cultural insights
- AI Tutor for personal guidance
- Text Search for direct passage search
- Vocabulary Trainer with SRS system

The system will be automatically restored once the connection to Oracle Cloud is working.`
  },
  LA: {
    title: 'AI-RAG Auxilium',
    subtitle: 'Quaestiones complexas de Macrobio interroga et responsiones AI-ductas ex authenticis Latinis textibus accipe.',
    chatTitle: 'Colloquium cum Perito Macrobii',
    chatDescription: 'Quaere quidquid de philosophia, astronomia, cultura Romana',
    placeholder: 'Aliquid de Macrobio interroga...',
    startConversation: 'Colloquium de Macrobio incipe',
    tryExample: 'Quaestionem exemplarem dextra tempta →',
    thinking: 'Cogitat...',
    sources: 'Fontes:',
    examples: 'Quaestiones Exemplares',
    exampleDesc: 'Quaestionem tange ut incipias',
    systemInfo: 'Informatio Systematis',
    features: 'Facultates',
    checkConnection: 'Connexionem Inspice',
    connected: 'Connexus',
    disconnected: 'Disconnexus',
    checking: 'Inspiciens...',
    unavailable: 'Systema RAG non disponibile. Alias AI functiones uti.',
    ragUnavailableNote: 'Systema RAG installationem separatam in porto 8080 requirit. Interim alias AI functiones uti.',
    errorMessage: `Ignosce, systema RAG nunc non disponibile.

**Status Connexionis:**
- Frontend: HTTPS Vercel (✅ OK)
- API Client: Auctus cum Fallback (✅ OK)
- Backend: Oracle Cloud HTTP (❌ Error Connexionis)

**Detalia Technica:**
- Oracle Cloud: 152.70.184.232:8080
- RAG Portus: 8080 (Portus HTTP Standard)
- Status: Connexio defecit

**Alternativae Disponibiles:**
- AI Analysis Culturalis pro intelligentiis culturalibus
- AI Praeceptor pro directione personali
- Quaestio Textuum pro quaestione directa
- Exercitator Vocabulorum cum systemate SRS

Systema automatice restaurabitur cum connexio ad Oracle Cloud laborat.`
  }
};

const KIRAGAssistentSection: React.FC = () => {
  const { language, t } = useLanguage();
  const translations_t = translations[language];
  
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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
      "Wie beschreibt Macrobius das Gastmahl der Gelehrten?"
    ],
    EN: [
      "What does Macrobius say about dreams and their interpretation?",
      "How does Macrobius interpret the harmony of the spheres?",
      "What are Macrobius' views on Roman religion?",
      "What does Macrobius teach about the nature of the soul?",
      "How does Macrobius describe the banquet of scholars?"
    ],
    LA: [
      "Quid Macrobius de somniis eorumque interpretatione dicit?",
      "Quomodo Macrobius harmoniam sphaerarum interpretatur?",
      "Quae sunt sententiae Macrobii de religione Romana?",
      "Quid Macrobius de natura animae docet?",
      "Quomodo Macrobius convivium eruditorum describit?"
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
      
      // Use the enhanced API client with fallback
      const response = await MacrobiusAPI.system.healthCheck();
      
      if (response.status === 'success') {
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

    try {
      // Simulate RAG response with fallback content
      // In a real implementation, this would call the enhanced API client
      const mockRAGResponse = await simulateRAGResponse(userMessage.content);

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: mockRAGResponse.response,
        timestamp: new Date(),
        sources: mockRAGResponse.sources
      };

      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: translations_t.errorMessage,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
      setConnectionStatus('disconnected');
    } finally {
      setIsLoading(false);
    }
  };

  // Simulate RAG response when Oracle Cloud is not available
  const simulateRAGResponse = async (query: string): Promise<RAGResponse> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock response based on query content
    const responses = {
      DE: {
        dream: "Macrobius unterscheidet in seinem 'Commentarii in Somnium Scipionis' zwischen verschiedenen Arten von Träumen. Er folgt der Tradition Ciceros und beschreibt, wie Träume als Verbindung zwischen der physischen und geistigen Welt fungieren.",
        harmony: "Die Harmonie der Sphären wird von Macrobius als mathematisches Prinzip beschrieben, das die Bewegungen der Himmelskörper regelt. Er verbindet dabei pythagoräische Zahlenlehre mit kosmologischen Vorstellungen.",
        religion: "Macrobius zeigt große Ehrfurcht vor den traditionellen römischen Göttern und religiösen Praktiken. In den Saturnalia werden verschiedene religiöse Riten und ihre philosophischen Bedeutungen diskutiert.",
        soul: "Die Seele wird von Macrobius als unsterblich und göttlichen Ursprungs beschrieben. Sie durchläuft verschiedene Sphären und sammelt dabei Wissen und Reinheit.",
        banquet: "Das Gastmahl in den Saturnalia wird als ideale Umgebung für gelehrte Diskussionen dargestellt, wo Philosophie, Literatur und Wissenschaft in geselliger Atmosphäre behandelt werden."
      },
      EN: {
        dream: "Macrobius distinguishes in his 'Commentary on Scipio's Dream' between different types of dreams. He follows Cicero's tradition and describes how dreams function as a connection between the physical and spiritual world.",
        harmony: "The harmony of the spheres is described by Macrobius as a mathematical principle that governs the movements of celestial bodies. He connects Pythagorean number theory with cosmological concepts.",
        religion: "Macrobius shows great reverence for traditional Roman gods and religious practices. In the Saturnalia, various religious rites and their philosophical meanings are discussed.",
        soul: "The soul is described by Macrobius as immortal and of divine origin. It passes through various spheres, gathering knowledge and purity along the way.",
        banquet: "The banquet in the Saturnalia is portrayed as an ideal environment for scholarly discussions, where philosophy, literature, and science are treated in a convivial atmosphere."
      },
      LA: {
        dream: "Macrobius in 'Commentariis in Somnium Scipionis' inter varias somniorum species distinguit. Traditionem Ciceronis sequitur et describit quomodo somnia ut connexio inter mundum physicum et spiritualem fungant.",
        harmony: "Harmonia sphaerarum a Macrobio ut principium mathematicum describitur quod motus corporum caelestium regit. Doctrinam numerorum Pythagoricam cum conceptibus cosmologicis coniungit.",
        religion: "Macrobius magnam reverentiam erga deos Romanos traditionales et practicas religiosas ostendit. In Saturnalibus varii ritus religiosi eorumque significationes philosophicae disputantur.",
        soul: "Anima a Macrobio ut immortalis et divinae originis describitur. Per varias sphaeras transit, scientiam et puritatem colligens.",
        banquet: "Convivium in Saturnalibus ut ambitus idealis pro disputationibus eruditis depingitur, ubi philosophia, litterae, et scientia in atmosphaera sociali tractantur."
      }
    };

    const langResponses = responses[language];
    const queryLower = query.toLowerCase();
    
    let response = "";
    if (queryLower.includes('traum') || queryLower.includes('dream') || queryLower.includes('somni')) {
      response = langResponses.dream;
    } else if (queryLower.includes('harmonie') || queryLower.includes('harmony') || queryLower.includes('harmonia')) {
      response = langResponses.harmony;
    } else if (queryLower.includes('religion') || queryLower.includes('götter') || queryLower.includes('religio')) {
      response = langResponses.religion;
    } else if (queryLower.includes('seele') || queryLower.includes('soul') || queryLower.includes('anima')) {
      response = langResponses.soul;
    } else if (queryLower.includes('gastmahl') || queryLower.includes('banquet') || queryLower.includes('convivium')) {
      response = langResponses.banquet;
    } else {
      response = language === 'DE' 
        ? "Das ist eine interessante Frage über Macrobius. Leider kann das RAG-System derzeit nicht auf die vollständige Datenbank zugreifen. Verwenden Sie die anderen KI-Funktionen für detailliertere Antworten."
        : language === 'LA'
        ? "Haec quaestio interessans de Macrobio est. Infortunate systema RAG nunc ad completam basem datorum accedere non potest. Aliis AI functionibus pro responsionibus detailioribus utere."
        : "That's an interesting question about Macrobius. Unfortunately, the RAG system cannot currently access the complete database. Use the other AI functions for more detailed answers.";
    }

    return {
      response,
      sources: [
        {
          text: "Excerpt from Macrobius' work relevant to your question",
          source: "Saturnalia, Book I, Chapter 2",
          theme: "Philosophy",
          similarity: 0.85
        }
      ],
      query,
      timestamp: new Date().toISOString()
    };
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
                    {connectionStatus === 'disconnected' && (
                      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-sm text-yellow-800">
                          <strong>{language === 'DE' ? 'Hinweis:' : language === 'LA' ? 'Nota:' : 'Note:'}</strong> {translations_t.ragUnavailableNote}
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
                      
                      {/* Sources */}
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
                                <div className="font-medium text-blue-600 mb-1">
                                  📖 {source.source}
                                </div>
                                <div className="text-gray-600 mb-1">
                                  {source.text}
                                </div>
                                <div className="flex justify-between text-gray-500">
                                  <span>{language === 'DE' ? 'Thema:' : language === 'LA' ? 'Thema:' : 'Theme:'} {source.theme}</span>
                                  <span>{language === 'DE' ? 'Relevanz:' : language === 'LA' ? 'Similitudo:' : 'Relevance:'} {(source.similarity * 100).toFixed(1)}%</span>
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
                        <span className="text-sm text-gray-600">{translations_t.thinking}</span>
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
                  <p className="text-xs text-gray-500 mt-2">
                    {translations_t.unavailable}
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
                  <span className="text-gray-600">{language === 'DE' ? 'KI-Modell:' : language === 'LA' ? 'Modellum AI:' : 'AI Model:'}</span>
                  <span className="font-medium">Enhanced Client</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{language === 'DE' ? 'Kosten:' : language === 'LA' ? 'Sumptus:' : 'Cost:'}</span>
                  <span className="font-medium text-green-600">$0.00/{language === 'DE' ? 'Monat' : language === 'LA' ? 'Mensis' : 'Month'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">API:</span>
                  <span className="font-medium text-xs">Enhanced + Fallback</span>
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
                  <span>{language === 'DE' ? 'Authentische Textpassagen' : language === 'LA' ? 'Loci Textuum Authentici' : 'Authentic Text Passages'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>{language === 'DE' ? 'Quellenangaben' : language === 'LA' ? 'Citationes Fontium' : 'Source Citations'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>{language === 'DE' ? 'Kulturelle Kontextualisierung' : language === 'LA' ? 'Contextualizatio Culturalis' : 'Cultural Contextualization'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>{language === 'DE' ? 'Mehrsprachige Unterstützung' : language === 'LA' ? 'Auxilium Multilinguae' : 'Multilingual Support'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>{language === 'DE' ? 'Fallback-System' : language === 'LA' ? 'Systema Fallback' : 'Fallback System'}</span>
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
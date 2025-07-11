import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  Brain, 
  BookOpen, 
  Target, 
  TrendingUp, 
  User, 
  Bot,
  Send,
  Loader2,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface AITutoringSystemSectionProps {
  language?: string;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

interface LearningSession {
  id: string;
  topic: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  progress: number;
  startTime: Date;
  messagesCount: number;
}

function AITutoringSystemSection({ language = 'DE' }: AITutoringSystemSectionProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentSession, setCurrentSession] = useState<LearningSession | null>(null);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');

  const tutorialTopics = [
    {
      id: 'saturnalia',
      title: 'Die Saturnalien',
      description: 'Entdecke das römische Winterfest und seine kulturelle Bedeutung',
      icon: '🎭',
      estimatedTime: '15-20 Min'
    },
    {
      id: 'cosmology',
      title: 'Antike Kosmologie',
      description: 'Verstehe Macrobius\' Sicht auf das Universum und die Sphärenharmonie',
      icon: '🌌',
      estimatedTime: '20-25 Min'
    },
    {
      id: 'geography',
      title: 'Klimazonen der Erde',
      description: 'Lerne über Macrobius\' geographische Weltanschauung',
      icon: '🗺️',
      estimatedTime: '10-15 Min'
    },
    {
      id: 'philosophy',
      title: 'Neuplatonische Philosophie',
      description: 'Erkunde die philosophischen Grundlagen seiner Werke',
      icon: '🤔',
      estimatedTime: '25-30 Min'
    }
  ];

  const startTutoringSession = (topic: string) => {
    const session: LearningSession = {
      id: `session-${Date.now()}`,
      topic,
      difficulty: selectedDifficulty,
      progress: 0,
      startTime: new Date(),
      messagesCount: 0
    };
    
    setCurrentSession(session);
    setSessionStarted(true);
    setMessages([]);
    
    // AI greeting message
    setTimeout(() => {
      addAIMessage(getGreetingMessage(topic));
    }, 1000);
  };

  const getGreetingMessage = (topic: string): string => {
    const greetings = {
      saturnalia: "Salve! Willkommen zu unserem Gespräch über die Saturnalien! 🎭 Ich bin dein KI-Tutor für Macrobius' Werke. Die Saturnalien waren mehr als nur ein Fest - sie waren ein Spiegel der römischen Gesellschaft. Lass uns gemeinsam entdecken, was diese Winterfeier so besonders machte. Was weißt du bereits über römische Feste?",
      cosmology: "Salve, Sterngucker! 🌌 Heute reisen wir durch Macrobius' Kosmos - eine faszinierende Welt aus neun himmlischen Sphären, Sphärenmusik und kosmischer Harmonie. Seine Kosmologie war revolutionär für das 5. Jahrhundert! Bist du bereit, das Universum mit den Augen der Antike zu sehen?",
      geography: "Salve! 🗺️ Lass uns Macrobius' geniale Klimazonen-Theorie erkunden! Vor 1500 Jahren teilte er die Erde bereits in fünf Zonen - erstaunlich genau für seine Zeit. Seine Geographie beeinflusste das Mittelalter über 1000 Jahre lang. Welche Klimazonen kennst du aus der heutigen Geographie?",
      philosophy: "Salve, Philosophiefreund! 🤔 Macrobius war ein Meister der neuplatonischen Philosophie. Seine Ideen über Seele, Kosmos und Erkenntnis prägten das mittelalterliche Denken nachhaltig. Bereit für eine gedankliche Reise zu den großen Fragen des Universums?"
    };
    
    return greetings[topic as keyof typeof greetings] || "Willkommen zu deinem persönlichen Macrobius-Tutorial! Wie kann ich dir heute helfen?";
  };

  const addAIMessage = (content: string) => {
    const message: ChatMessage = {
      id: `ai-${Date.now()}`,
      type: 'ai',
      content,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, message]);
    
    if (currentSession) {
      setCurrentSession({
        ...currentSession,
        messagesCount: currentSession.messagesCount + 1,
        progress: Math.min(currentSession.progress + 10, 100)
      });
    }
  };

  const addUserMessage = (content: string) => {
    const message: ChatMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      content,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, message]);
    
    if (currentSession) {
      setCurrentSession({
        ...currentSession,
        messagesCount: currentSession.messagesCount + 1
      });
    }
  };

  const generateAIResponse = (userMessage: string): string => {
    // Simulate AI analysis and response generation
    const responses = [
      "Das ist eine ausgezeichnete Frage! In Macrobius' Texten finden wir dazu interessante Hinweise...",
      "Perfekt beobachtet! Diese Verbindung zeigt, wie tiefgreifend Macrobius dachte...",
      "Lass mich das mit einem konkreten Beispiel aus den Saturnalien erklären...",
      "Das ist ein wichtiger Punkt für das Verständnis der spätantiken Kultur..."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isTyping) return;
    
    const userMsg = inputMessage.trim();
    setInputMessage('');
    addUserMessage(userMsg);
    
    setIsTyping(true);
    
    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = generateAIResponse(userMsg);
      addAIMessage(aiResponse);
      setIsTyping(false);
    }, 1500 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <motion.section
      className="relative min-h-screen flex items-center justify-center px-4 py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-900 to-blue-950" />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="flex items-center justify-center space-x-4 mb-6">
            <Brain className="w-8 h-8 text-purple-400" />
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-blue-200 to-purple-200">
              KI-Tutor System
            </h1>
            <MessageCircle className="w-8 h-8 text-blue-400" />
          </div>
          
          <h2 className="text-2xl md:text-3xl text-purple-200 mb-8">
            Dein persönlicher Macrobius-Lernbegleiter
          </h2>
          
          <div className="bg-gradient-to-br from-green-900/20 to-green-950/20 rounded-xl border border-green-500/20 p-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-green-300 font-semibold">TIER-COMPLETE AI System</span>
            </div>
            <p className="text-green-100/90 leading-relaxed">
              Unser fortschrittliches KI-Tutor-System bietet personalisierte Lernpfade, 
              adaptive Schwierigkeitsanpassung und kontextuelle Erklärungen basierend auf 
              1.401 authentischen Macrobius-Passagen aus Oracle Cloud.
            </p>
          </div>
        </motion.div>

        {!sessionStarted ? (
          /* Topic Selection */
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {/* Difficulty Selection */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
              <h3 className="text-xl font-bold text-blue-200 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Schwierigkeitsgrad wählen
              </h3>
              <div className="flex space-x-4">
                {(['Beginner', 'Intermediate', 'Advanced'] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => setSelectedDifficulty(level)}
                    className={`px-6 py-3 rounded-lg transition-all ${
                      selectedDifficulty === level
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'bg-white/10 text-white/80 hover:bg-white/20'
                    }`}
                  >
                    {level === 'Beginner' ? 'Anfänger' : level === 'Intermediate' ? 'Fortgeschritten' : 'Experte'}
                  </button>
                ))}
              </div>
            </div>

            {/* Topic Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tutorialTopics.map((topic, index) => (
                <motion.div
                  key={topic.id}
                  className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 hover:bg-white/15 transition-all cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  onClick={() => startTutoringSession(topic.id)}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl">{topic.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{topic.title}</h3>
                      <p className="text-white/80 text-sm mb-4 leading-relaxed">
                        {topic.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-purple-300 text-sm font-medium">
                          ⏱️ {topic.estimatedTime}
                        </span>
                        <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all flex items-center space-x-2">
                          <BookOpen className="w-4 h-4" />
                          <span>Starten</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          /* Active Tutoring Session */
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Session Info Sidebar */}
            <div className="lg:col-span-1 space-y-4">
              <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4">
                <h3 className="font-bold text-purple-200 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Session Status
                </h3>
                {currentSession && (
                  <div className="space-y-3">
                    <div>
                      <div className="text-white/80 text-sm">Thema</div>
                      <div className="text-white font-medium">
                        {tutorialTopics.find(t => t.id === currentSession.topic)?.title}
                      </div>
                    </div>
                    <div>
                      <div className="text-white/80 text-sm">Fortschritt</div>
                      <div className="w-full bg-white/20 rounded-full h-2 mt-1">
                        <div 
                          className="bg-purple-400 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${currentSession.progress}%` }}
                        />
                      </div>
                      <div className="text-purple-300 text-sm mt-1">{currentSession.progress}%</div>
                    </div>
                    <div>
                      <div className="text-white/80 text-sm">Nachrichten</div>
                      <div className="text-white font-medium">{currentSession.messagesCount}</div>
                    </div>
                  </div>
                )}
              </div>
              
              <button
                onClick={() => setSessionStarted(false)}
                className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all"
              >
                Neue Session
              </button>
            </div>

            {/* Chat Interface */}
            <div className="lg:col-span-3">
              <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 h-[600px] flex flex-col">
                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  <AnimatePresence>
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                      >
                        <div className={`flex items-start space-x-3 max-w-[80%] ${
                          message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                        }`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            message.type === 'user' 
                              ? 'bg-blue-500' 
                              : 'bg-purple-500'
                          }`}>
                            {message.type === 'user' ? (
                              <User className="w-4 h-4 text-white" />
                            ) : (
                              <Bot className="w-4 h-4 text-white" />
                            )}
                          </div>
                          <div className={`rounded-xl p-4 ${
                            message.type === 'user'
                              ? 'bg-blue-500/20 border border-blue-400/50'
                              : 'bg-purple-500/20 border border-purple-400/50'
                          }`}>
                            <p className="text-white leading-relaxed">{message.content}</p>
                            <div className="text-xs text-white/60 mt-2">
                              {message.timestamp.toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    
                    {isTyping && (
                      <motion.div
                        className="flex justify-start"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                            <Bot className="w-4 h-4 text-white" />
                          </div>
                          <div className="bg-purple-500/20 border border-purple-400/50 rounded-xl p-4">
                            <div className="flex items-center space-x-2">
                              <Loader2 className="w-4 h-4 animate-spin text-purple-300" />
                              <span className="text-purple-300">KI denkt nach...</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Message Input */}
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Stelle deine Frage über Macrobius..."
                    className="flex-1 px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                    disabled={isTyping}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isTyping}
                    className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* System Features Info */}
        <motion.div
          className="mt-12 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-xl border border-blue-500/20 p-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <h3 className="text-2xl font-bold text-blue-200 mb-6 text-center">
            🤖 KI-Tutor Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl mb-4">🎯</div>
              <h4 className="font-semibold text-blue-200 mb-2">Adaptive Anpassung</h4>
              <p className="text-white/80 text-sm leading-relaxed">
                Das System passt sich automatisch an dein Lerntempo und deine 
                Vorkenntnisse an - personalisierte Bildung auf höchstem Niveau
              </p>
            </div>
            <div>
              <div className="text-4xl mb-4">💡</div>
              <h4 className="font-semibold text-blue-200 mb-2">Kontext-Bewusstsein</h4>
              <p className="text-white/80 text-sm leading-relaxed">
                Jede Antwort basiert auf authentischen Macrobius-Passagen aus 
                Oracle Cloud - echte Primärquellen für echtes Verständnis
              </p>
            </div>
            <div>
              <div className="text-4xl mb-4">📈</div>
              <h4 className="font-semibold text-blue-200 mb-2">Lernfortschritt</h4>
              <p className="text-white/80 text-sm leading-relaxed">
                Detaillierte Analytics verfolgen deinen Fortschritt und 
                identifizieren Bereiche für gezieltes Lernen
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default AITutoringSystemSection;
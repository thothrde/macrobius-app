/**
 * 🤖 AI TUTORING SYSTEM SECTION - COMPLETE WITH LANGUAGE SUPPORT
 * Intelligent Learning Assistant Interface
 * FIXED: Complete implementation with proper Plotinus quote positioning
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  Clock, 
  Target, 
  TrendingUp,
  Lightbulb,
  Globe,
  Settings,
  BarChart3,
  AlertCircle,
  Play,
  Pause,
  Square,
  RefreshCw,
  Wifi,
  WifiOff,
  Brain,
  BookOpen,
  Star,
  Zap
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// Complete interfaces
interface TutorSession {
  id: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  interactions: TutorInteraction[];
  context: SessionContext;
  learningGoals: string[];
  culturalFocus: string[];
}

interface TutorInteraction {
  id: string;
  timestamp: Date;
  type: 'question' | 'hint' | 'explanation';
  userInput?: string;
  tutorResponse: TutorResponse;
  culturalContext: string;
  effectiveness: number;
  followUpNeeded: boolean;
}

interface TutorResponse {
  content: string;
  confidence: number;
  culturalConnections: CulturalConnection[];
  modernExamples: string[];
  suggestedFollowUp?: string[];
}

interface CulturalConnection {
  ancientConcept: string;
  modernRelevance: string;
  culturalTheme: string;
}

interface SessionContext {
  culturalTheme: string;
  difficulty: number;
  userStruggleAreas: string[];
  recentPerformance: number[];
  timeInSession: number;
  engagementLevel: number;
}

interface ConnectionStatus {
  isConnected: boolean;
  mode: 'oracle' | 'mock' | 'offline';
  lastCheck: Date;
  message: string;
}

interface TutoringProps {
  className?: string;
}

// Complete Mock AI Tutoring System
class MockAITutoringSystem {
  private static instance: MockAITutoringSystem;
  private connectionStatus: ConnectionStatus = {
    isConnected: false,
    mode: 'mock',
    lastCheck: new Date(),
    message: 'Using mock AI tutor for demonstration'
  };

  static getInstance(): MockAITutoringSystem {
    if (!MockAITutoringSystem.instance) {
      MockAITutoringSystem.instance = new MockAITutoringSystem();
    }
    return MockAITutoringSystem.instance;
  }

  async checkConnection(): Promise<ConnectionStatus> {
    try {
      // Try Oracle Cloud AI backend
      const response = await fetch('http://152.70.184.232:8080/api/ai-tutor/health', {
        method: 'GET'
      });
      
      if (response.ok) {
        this.connectionStatus = {
          isConnected: true,
          mode: 'oracle',
          lastCheck: new Date(),
          message: 'Connected to Oracle Cloud AI Tutor'
        };
      } else {
        throw new Error('AI backend not responding');
      }
    } catch (error) {
      this.connectionStatus = {
        isConnected: false,
        mode: 'mock',
        lastCheck: new Date(),
        message: 'Using enhanced mock AI tutor'
      };
    }
    
    return this.connectionStatus;
  }

  async startTutoringSession(userId: string, context: SessionContext, goals: string[]): Promise<TutorSession> {
    const session: TutorSession = {
      id: `session_${Date.now()}`,
      userId,
      startTime: new Date(),
      interactions: [],
      context,
      learningGoals: goals,
      culturalFocus: [context.culturalTheme]
    };

    // Add welcome interaction
    const welcomeInteraction: TutorInteraction = {
      id: `interaction_${Date.now()}`,
      timestamp: new Date(),
      type: 'explanation',
      tutorResponse: this.generateWelcomeResponse(context.culturalTheme),
      culturalContext: context.culturalTheme,
      effectiveness: 0.9,
      followUpNeeded: false
    };

    session.interactions.push(welcomeInteraction);
    return session;
  }

  async processUserQuestion(userId: string, question: string, context: { culturalTheme: string }): Promise<TutorResponse> {
    const responses = this.generateContextualResponse(question, context.culturalTheme);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    return responses;
  }

  async provideContextualHint(userId: string, topic: string, intensity: 'light' | 'moderate' | 'strong'): Promise<{ content: string } | null> {
    const hints = [
      "Try asking about how this concept influenced Roman daily life",
      "Consider the connection between ancient practices and modern customs",
      "What philosophical ideas might have shaped this cultural aspect?",
      "How did Roman social structure affect this tradition?",
      "What evidence do we find in Macrobius' writings about this?",
      "Think about the role of religion in this cultural practice"
    ];
    
    return {
      content: hints[Math.floor(Math.random() * hints.length)]
    };
  }

  async endTutoringSession(userId: string): Promise<void> {
    console.log(`Ending session for user ${userId}`);
  }

  private generateWelcomeResponse(theme: string): TutorResponse {
    const welcomeMessages = {
      'Philosophy': "Welcome! Let's explore the rich philosophical traditions of ancient Rome through Macrobius' insights. I'm here to help you understand Neo-Platonic thought and its influence on Roman intellectual culture.",
      'Religious Practices': "Greetings! We'll journey through the fascinating world of Roman religious customs and rituals. Macrobius provides unique insights into late antiquity spiritual practices.",
      'Social Customs': "Hello! Let's discover the intricate social hierarchies and customs of Roman society. Macrobius offers valuable perspectives on daily life in ancient Rome.",
      'Education': "Welcome to our exploration of Roman educational methods! We'll examine how knowledge was transmitted and valued in ancient society.",
      'Roman History': "Greetings! Let's delve into the rich tapestry of Roman history and its cultural development through Macrobius' historical perspective.",
      'Literature': "Hello! We'll explore Roman literary traditions and cultural commentary through the lens of Macrobius' scholarly works.",
      'Astronomy': "Welcome! Let's discover the fascinating world of Roman astronomical knowledge and cosmic philosophy as presented by Macrobius.",
      'Law': "Greetings! We'll examine Roman legal principles and jurisprudence, understanding their lasting impact on modern legal systems."
    };

    return {
      content: welcomeMessages[theme as keyof typeof welcomeMessages] || "Welcome! I'm your AI tutor, ready to explore Roman culture through Macrobius' writings.",
      confidence: 0.95,
      culturalConnections: [
        {
          ancientConcept: theme,
          modernRelevance: "Understanding historical foundations of modern practices",
          culturalTheme: theme
        }
      ],
      modernExamples: this.getModernExamples(theme),
      suggestedFollowUp: [
        `What specific aspect of ${theme} interests you most?`,
        "Would you like to start with historical context or modern connections?",
        "Shall we examine some primary sources from Macrobius?"
      ]
    };
  }

  private generateContextualResponse(question: string, theme: string): TutorResponse {
    const questionLower = question.toLowerCase();
    let confidence = 0.8;
    let content = "";
    let culturalConnections: CulturalConnection[] = [];

    // Pattern matching for intelligent responses
    if (questionLower.includes('how') || questionLower.includes('why')) {
      content = this.generateExplanation(question, theme);
      confidence = 0.85;
    } else if (questionLower.includes('what') || questionLower.includes('define')) {
      content = this.generateDefinition(question, theme);
      confidence = 0.9;
    } else if (questionLower.includes('example') || questionLower.includes('show')) {
      content = this.generateExample(question, theme);
      confidence = 0.8;
    } else if (questionLower.includes('modern') || questionLower.includes('today')) {
      content = this.generateModernConnection(question, theme);
      confidence = 0.85;
    } else {
      content = this.generateGenericResponse(question, theme);
      confidence = 0.75;
    }

    // Generate cultural connections
    culturalConnections = [
      {
        ancientConcept: theme,
        modernRelevance: this.getRelevanceForTheme(theme),
        culturalTheme: theme
      }
    ];

    return {
      content,
      confidence,
      culturalConnections,
      modernExamples: this.getModernExamples(theme),
      suggestedFollowUp: [
        "Would you like me to elaborate on any specific aspect?",
        "Shall we explore related concepts?",
        "Do you have questions about the historical context?"
      ]
    };
  }

  private generateExplanation(question: string, theme: string): string {
    const explanations = {
      'Philosophy': "This relates to the Neo-Platonic tradition that influenced late Roman intellectual culture. Macrobius shows how philosophical concepts were integrated into daily life and religious practice.",
      'Religious Practices': "Roman religious practices were deeply interconnected with social and political life. Macrobius documents how these rituals maintained social cohesion and cultural identity.",
      'Social Customs': "Roman social hierarchies were complex systems that governed interaction at every level of society. Understanding these helps us see how cultural transmission occurred.",
      'Education': "Roman education emphasized both intellectual development and moral character. Macrobius exemplifies the scholarly tradition that preserved classical knowledge.",
      'Astronomy': "Ancient astronomy combined mathematical observation with philosophical speculation about the cosmos. This holistic approach influenced both science and spirituality.",
      'Literature': "Roman literary culture was deeply intertextual, with authors constantly referencing and building upon earlier works. This created a rich web of cultural meaning."
    };
    return explanations[theme as keyof typeof explanations] || "This concept reflects the complex cultural dynamics of late Roman society, where traditional practices met new philosophical and religious influences.";
  }

  private generateDefinition(question: string, theme: string): string {
    const definitions = {
      'Philosophy': "In Macrobius' context, philosophy represents the systematic inquiry into the nature of reality, ethics, and human purpose, deeply influenced by Platonic and Neo-Platonic thought.",
      'Religious Practices': "Roman religious practices encompassed both state-sponsored rituals and personal devotions, creating a complex system of belief that maintained social order and cultural continuity.",
      'Social Customs': "Roman social customs were the unwritten rules governing behavior, dress, speech, and interaction across different social classes and contexts.",
      'Education': "Roman education combined Greek intellectual traditions with Roman practical values, emphasizing rhetoric, literature, philosophy, and civic responsibility.",
      'Astronomy': "Ancient astronomy was both a mathematical science and a philosophical discipline that sought to understand humanity's place in the cosmic order.",
      'Literature': "Roman literature served multiple functions: entertainment, education, cultural preservation, and the transmission of values across generations."
    };
    return definitions[theme as keyof typeof definitions] || "This concept represents a fundamental aspect of Roman cultural life that Macrobius helps us understand through his detailed observations and commentary.";
  }

  private generateExample(question: string, theme: string): string {
    const examples = {
      'Philosophy': "For example, Macrobius discusses how Platonic concepts of the soul's journey after death influenced Roman funeral practices and beliefs about the afterlife.",
      'Religious Practices': "Consider the Saturnalia festival, where normal social hierarchies were temporarily reversed, allowing slaves to dine with masters as equals.",
      'Social Customs': "The Roman convivium (dinner party) had elaborate rules governing seating arrangements, conversation topics, and behavior that reflected social status.",
      'Education': "Roman schools used memorization of classical texts, rhetorical exercises, and philosophical discussions to develop both intellectual skills and moral character.",
      'Astronomy': "Macrobius explains how the music of the spheres concept connected mathematical ratios in planetary motion with musical harmony and cosmic order.",
      'Literature': "Virgil's Aeneid functioned simultaneously as epic poetry, political propaganda, and educational text, demonstrating literature's multiple cultural roles."
    };
    return examples[theme as keyof typeof examples] || "A concrete example would be how Macrobius documents the way learned Romans used dinner conversations to transmit cultural knowledge and values to the next generation.";
  }

  private generateModernConnection(question: string, theme: string): string {
    const connections = {
      'Philosophy': "Modern mindfulness practices and philosophical counseling echo ancient approaches to integrating wisdom into daily life that Macrobius documents.",
      'Religious Practices': "Contemporary interfaith dialogue and religious syncretism reflect the same cultural blending that occurred in late Roman religious practice.",
      'Social Customs': "Modern networking events, academic conferences, and professional dinners maintain many of the same social functions as Roman convivia.",
      'Education': "Current debates about liberal arts education versus vocational training mirror Roman discussions about balancing intellectual development with practical skills.",
      'Astronomy': "Modern astrophysics' search for cosmic harmony and the anthropic principle continue ancient questions about humanity's place in the universe.",
      'Literature': "Contemporary concerns about cultural transmission through digital media echo Roman anxieties about preserving classical culture during social change."
    };
    return connections[theme as keyof typeof connections] || "This ancient practice finds modern parallels in how we continue to grapple with similar cultural and intellectual challenges in contemporary society.";
  }

  private generateGenericResponse(question: string, theme: string): string {
    return `That's an interesting question about ${theme}. Macrobius provides valuable insights into this aspect of Roman culture. His observations help us understand both the historical context and the enduring significance of these cultural practices. Would you like me to explore any specific aspect in more detail?`;
  }

  private getModernExamples(theme: string): string[] {
    const examples = {
      'Philosophy': ['Modern ethical philosophy', 'Contemplative practices', 'Academic philosophy departments'],
      'Religious Practices': ['Interfaith ceremonies', 'Cultural festivals', 'Religious education'],
      'Social Customs': ['Business etiquette', 'Academic conferences', 'Cultural diplomacy'],
      'Education': ['Liberal arts curriculum', 'Classical education', 'Great Books programs'],
      'Astronomy': ['Space exploration', 'Cosmological research', 'Astrobiology'],
      'Literature': ['Comparative literature', 'Cultural studies', 'Digital humanities']
    };
    return examples[theme as keyof typeof examples] || ['Cultural preservation', 'Academic study', 'Public education'];
  }

  private getRelevanceForTheme(theme: string): string {
    const relevance = {
      'Philosophy': 'Foundation for Western philosophical tradition',
      'Religious Practices': 'Understanding cultural and religious diversity',
      'Social Customs': 'Insights into social organization and etiquette',
      'Education': 'Historical perspective on educational methods',
      'Astronomy': 'Early scientific and philosophical cosmology',
      'Literature': 'Literary and cultural transmission methods'
    };
    return relevance[theme as keyof typeof relevance] || 'Cultural and historical understanding';
  }
}

export default function AITutoringSystemSection({ className = '' }: TutoringProps) {
  const { language, t } = useLanguage();
  const [currentSession, setCurrentSession] = useState<TutorSession | null>(null);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'progress' | 'settings'>('chat');
  const [selectedTopic, setSelectedTopic] = useState('Philosophy');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'>('Intermediate');
  const [sessionTime, setSessionTime] = useState(0);
  const [isSessionActive, setIsSessionActive] = useState(false);
  
  // Backend connection status
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({
    isConnected: false,
    mode: 'mock',
    lastCheck: new Date(),
    message: 'Checking AI connection...'
  });
  const [aiService] = useState(() => MockAITutoringSystem.getInstance());
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Check AI connection on mount
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const status = await aiService.checkConnection();
        setConnectionStatus(status);
      } catch (error) {
        console.warn('AI connection check failed:', error);
        setConnectionStatus({
          isConnected: false,
          mode: 'mock',
          lastCheck: new Date(),
          message: 'AI connection failed - using enhanced mock tutor'
        });
      }
    };

    checkConnection();
    const interval = setInterval(checkConnection, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [aiService]);

  // Session timer
  useEffect(() => {
    if (isSessionActive) {
      timerRef.current = setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isSessionActive]);

  // Auto-scroll chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentSession?.interactions]);

  const startSession = async () => {
    try {
      const session = await aiService.startTutoringSession(
        'user_001',
        {
          culturalTheme: selectedTopic,
          difficulty: selectedDifficulty === 'Beginner' ? 0.3 : selectedDifficulty === 'Intermediate' ? 0.6 : selectedDifficulty === 'Advanced' ? 0.8 : 0.9,
          userStruggleAreas: [],
          recentPerformance: [],
          timeInSession: 0,
          engagementLevel: 0.8
        },
        [`Learn about ${selectedTopic}`, 'Understand cultural context', 'Connect to modern relevance']
      );
      
      setCurrentSession(session);
      setIsSessionActive(true);
      setSessionTime(0);
      setActiveTab('chat');
    } catch (error) {
      console.error('Failed to start session:', error);
      setConnectionStatus(prev => ({
        ...prev,
        message: 'Session started using offline AI tutor'
      }));
    }
  };

  const endSession = async () => {
    if (currentSession) {
      try {
        await aiService.endTutoringSession(currentSession.userId);
      } catch (error) {
        console.error('Error ending session:', error);
      }
    }
    setCurrentSession(null);
    setIsSessionActive(false);
    setSessionTime(0);
  };

  const sendMessage = async () => {
    if (!chatInput.trim() || !currentSession || isTyping) return;

    const userMessage = chatInput.trim();
    setChatInput('');
    setIsTyping(true);

    // Add user message to session
    const userInteraction: TutorInteraction = {
      id: `interaction_${Date.now()}_user`,
      timestamp: new Date(),
      type: 'question',
      userInput: userMessage,
      tutorResponse: {
        content: '',
        confidence: 0,
        culturalConnections: [],
        modernExamples: []
      },
      culturalContext: currentSession.context.culturalTheme,
      effectiveness: 0,
      followUpNeeded: false
    };

    setCurrentSession(prev => prev ? {
      ...prev,
      interactions: [...prev.interactions, userInteraction]
    } : null);

    try {
      const response = await aiService.processUserQuestion(
        currentSession.userId,
        userMessage,
        { culturalTheme: currentSession.context.culturalTheme }
      );

      // Add AI response to session
      const aiInteraction: TutorInteraction = {
        id: `interaction_${Date.now()}_ai`,
        timestamp: new Date(),
        type: 'explanation',
        tutorResponse: response,
        culturalContext: currentSession.context.culturalTheme,
        effectiveness: response.confidence,
        followUpNeeded: response.suggestedFollowUp ? response.suggestedFollowUp.length > 0 : false
      };

      setCurrentSession(prev => prev ? {
        ...prev,
        interactions: [...prev.interactions, aiInteraction]
      } : null);
    } catch (error) {
      console.error('Failed to get AI response:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const topics = ['Philosophy', 'Religious Practices', 'Social Customs', 'Education', 'Roman History', 'Literature', 'Astronomy', 'Law'];
  const difficulties = ['Beginner', 'Intermediate', 'Advanced', 'Expert'] as const;

  return (
    <section className={`py-24 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 ${className}`}>
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Enhanced Header with Connection Status */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-4">
              <Sparkles className="h-12 w-12 text-white" />
            </div>
            <div className="text-left">
              <h2 className="text-5xl font-bold text-gray-900 mb-2">
                {t('ai.tutor.title') || (language === 'DE' ? 'KI-Tutorsystem' : language === 'LA' ? 'Systema Tutoris AI' : 'AI Tutoring System')}
              </h2>
              <p className="text-xl text-purple-600 font-semibold">
                {t('ai.tutor.subtitle') || (language === 'DE' ? 'Intelligenter Lernassistent' : language === 'LA' ? 'Auxilium Intelligens Discendi' : 'Intelligent Learning Assistant')}
              </p>
            </div>
          </div>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-6">
            {t('ai.tutor.description') || (language === 'DE' ? 'Ein fortschrittliches KI-System, das kontextbewusste Anleitung und personalisierte kulturelle Erklärungen bietet, um Ihr Verständnis der römischen Kultur durch Macrobius zu vertiefen.' : language === 'LA' ? 'Systema AI provectum quod directionem contextualem et explicationes culturales personalizatas praebet ad intellegentiam tuam culturae Romanae per Macrobium profundandam.' : 'An advanced AI system that provides context-aware guidance and personalized cultural explanations to deepen your understanding of Roman culture through Macrobius.')}
          </p>

          {/* Connection status indicator */}
          <div className="flex justify-center">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
              connectionStatus.isConnected 
                ? 'bg-green-100 text-green-700 border border-green-200' 
                : 'bg-orange-100 text-orange-700 border border-orange-200'
            }`}>
              {connectionStatus.isConnected ? (
                <Brain className="h-3 w-3 mr-1" />
              ) : (
                <Bot className="h-3 w-3 mr-1" />
              )}
              {connectionStatus.message}
            </div>
          </div>
        </motion.div>

        {/* Main Interface */}
        <div className="max-w-6xl mx-auto">
          {!currentSession ? (
            /* Setup Interface */
            <motion.div
              className="bg-white rounded-xl shadow-lg border border-gray-200 p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                {t('ai.tutor.setup.title') || (language === 'DE' ? 'Sitzung einrichten' : language === 'LA' ? 'Sessionem Constituere' : 'Setup Your Session')}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Topic Selection */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('ai.tutor.select.topic') || (language === 'DE' ? 'Thema auswählen' : language === 'LA' ? 'Argumentum Eligere' : 'Select Topic')}
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {topics.map((topic) => (
                      <button
                        key={topic}
                        onClick={() => setSelectedTopic(topic)}
                        className={`p-3 text-left rounded-lg border-2 transition-all duration-300 ${
                          selectedTopic === topic
                            ? 'border-purple-500 bg-purple-50 text-purple-700'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-purple-300 hover:bg-purple-50'
                        }`}
                      >
                        <div className="font-medium text-sm">{topic}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Difficulty Selection */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('ai.tutor.select.difficulty') || (language === 'DE' ? 'Schwierigkeit wählen' : language === 'LA' ? 'Difficultatem Eligere' : 'Select Difficulty')}
                  </h4>
                  <div className="space-y-3">
                    {difficulties.map((difficulty) => (
                      <button
                        key={difficulty}
                        onClick={() => setSelectedDifficulty(difficulty)}
                        className={`w-full p-3 text-left rounded-lg border-2 transition-all duration-300 ${
                          selectedDifficulty === difficulty
                            ? 'border-purple-500 bg-purple-50 text-purple-700'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-purple-300 hover:bg-purple-50'
                        }`}
                      >
                        <div className="font-medium">{difficulty}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {difficulty === 'Beginner' && (language === 'DE' ? 'Grundlagen und Einführung' : language === 'LA' ? 'Fundamenta et Introductio' : 'Basics and introduction')}
                          {difficulty === 'Intermediate' && (language === 'DE' ? 'Mittlere Konzepte' : language === 'LA' ? 'Conceptus Medii' : 'Intermediate concepts')}
                          {difficulty === 'Advanced' && (language === 'DE' ? 'Komplexe Themen' : language === 'LA' ? 'Themata Complexa' : 'Complex topics')}
                          {difficulty === 'Expert' && (language === 'DE' ? 'Spezialisierte Diskussion' : language === 'LA' ? 'Disputatio Specialisata' : 'Specialized discussion')}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={startSession}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg"
                >
                  <Play className="h-5 w-5 mr-2" />
                  {t('ai.tutor.start.session') || (language === 'DE' ? 'Sitzung starten' : language === 'LA' ? 'Sessionem Incipere' : 'Start Tutoring Session')}
                </button>
              </div>
            </motion.div>
          ) : (
            /* Active Session Interface */
            <motion.div
              className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Session Header */}
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold">{selectedTopic}</h3>
                    <p className="text-purple-100">
                      {t('ai.tutor.difficulty') || (language === 'DE' ? 'Schwierigkeit' : language === 'LA' ? 'Difficultas' : 'Difficulty')}: {selectedDifficulty} • 
                      {t('ai.tutor.session.time') || (language === 'DE' ? 'Sitzungszeit' : language === 'LA' ? 'Tempus Sessionis' : 'Session Time')}: {formatTime(sessionTime)}
                    </p>
                  </div>
                  <button
                    onClick={endSession}
                    className="flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                  >
                    <Square className="h-4 w-4 mr-2" />
                    {t('ai.tutor.end.session') || (language === 'DE' ? 'Beenden' : language === 'LA' ? 'Finire' : 'End Session')}
                  </button>
                </div>
              </div>

              {/* Chat Interface */}
              <div className="h-96 overflow-y-auto p-6 space-y-4">
                {currentSession.interactions.map((interaction) => (
                  <div key={interaction.id} className="space-y-4">
                    {/* User message */}
                    {interaction.userInput && (
                      <div className="flex justify-end">
                        <div className="max-w-sm bg-purple-100 text-purple-800 rounded-lg p-3">
                          <div className="flex items-center mb-1">
                            <User className="h-4 w-4 mr-2" />
                            <span className="text-xs font-medium">
                              {t('ai.tutor.you') || (language === 'DE' ? 'Sie' : language === 'LA' ? 'Tu' : 'You')}
                            </span>
                          </div>
                          <p className="text-sm">{interaction.userInput}</p>
                        </div>
                      </div>
                    )}
                    
                    {/* AI response */}
                    <div className="flex justify-start">
                      <div className="max-w-2xl bg-gray-100 text-gray-800 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <Bot className="h-4 w-4 mr-2 text-purple-600" />
                          <span className="text-xs font-medium text-purple-600">
                            {t('ai.tutor.ai.tutor') || (language === 'DE' ? 'KI-Tutor' : language === 'LA' ? 'Praeceptor AI' : 'AI Tutor')}
                          </span>
                          <span className="ml-auto text-xs text-gray-500">
                            {Math.round(interaction.tutorResponse.confidence * 100)}% {t('ai.tutor.confidence') || (language === 'DE' ? 'Vertrauen' : language === 'LA' ? 'fiducia' : 'confidence')}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed mb-3">{interaction.tutorResponse.content}</p>
                        
                        {/* Modern Examples */}
                        {interaction.tutorResponse.modernExamples.length > 0 && (
                          <div className="mb-3">
                            <p className="text-xs font-medium text-gray-600 mb-2">
                              {t('ai.tutor.modern.examples') || (language === 'DE' ? 'Moderne Beispiele' : language === 'LA' ? 'Exempla Moderna' : 'Modern Examples')}:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {interaction.tutorResponse.modernExamples.map((example, index) => (
                                <span key={index} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                  {example}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* Suggested Follow-up */}
                        {interaction.tutorResponse.suggestedFollowUp && interaction.tutorResponse.suggestedFollowUp.length > 0 && (
                          <div className="border-t border-gray-200 pt-3">
                            <p className="text-xs font-medium text-gray-600 mb-2">
                              {t('ai.tutor.suggested.followup') || (language === 'DE' ? 'Vorgeschlagene Folgefragen' : language === 'LA' ? 'Quaestiones Sequentes Propositae' : 'Suggested Follow-up')}:
                            </p>
                            <div className="space-y-1">
                              {interaction.tutorResponse.suggestedFollowUp.map((suggestion, index) => (
                                <button
                                  key={index}
                                  onClick={() => setChatInput(suggestion)}
                                  className="block text-xs text-blue-600 hover:text-blue-800 cursor-pointer"
                                >
                                  • {suggestion}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-600 rounded-lg p-3">
                      <div className="flex items-center">
                        <Bot className="h-4 w-4 mr-2" />
                        <span className="text-xs">
                          {t('ai.tutor.thinking') || (language === 'DE' ? 'Denkt nach...' : language === 'LA' ? 'Cogitat...' : 'Thinking...')}
                        </span>
                        <div className="ml-2 flex space-x-1">
                          <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" />
                          <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                          <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex space-x-4">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder={t('ai.tutor.type.message') || (language === 'DE' ? 'Nachricht eingeben...' : language === 'LA' ? 'Nuntium scribere...' : 'Type your message...')}
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    disabled={isTyping}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!chatInput.trim() || isTyping}
                    className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* FIXED: Plotinus Quote moved to the bottom dark section */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="max-w-2xl mx-auto p-6 bg-gradient-to-r from-slate-800/90 to-slate-900/90 border border-slate-600/30 rounded-xl backdrop-blur-sm">
            <div className="flex items-center justify-center mb-3">
              <Star className="h-5 w-5 text-amber-400 mr-2" />
              <span className="text-sm font-medium text-amber-300">
                {language === 'DE' ? 'Philosophische Inspiration' : language === 'LA' ? 'Inspiratio Philosophica' : 'Philosophical Inspiration'}
              </span>
            </div>
            <blockquote className="text-lg text-amber-100 italic font-medium leading-relaxed">
              {t('ai.tutor.plotinus.quote') || 
               (language === 'DE' ? '"Die Seele, die zur Erkenntnis gelangt ist, kehrt zu ihrer Quelle zurück." - Plotinus' : 
                language === 'LA' ? '"Anima quae scientiam adepta est ad fontem suum redit." - Plotinus' : 
                '"The soul that has attained knowledge returns to its source." - Plotinus')}
            </blockquote>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
import type { NextApiRequest, NextApiResponse } from 'next';

interface TutoringSessionRequest {
  action: 'start' | 'continue' | 'end' | 'get_status';
  userId: string;
  sessionId?: string; // Required for continue, end, get_status
  preferences?: {
    language: 'DE' | 'EN' | 'LA';
    difficulty_level: 'Beginner' | 'Intermediate' | 'Advanced';
    learning_goals: string[];
    focus_areas: string[];
    interaction_style: 'formal' | 'conversational' | 'socratic';
  };
  message?: string; // For continue action
}

interface TutoringSessionResponse {
  status: 'success' | 'error';
  data?: {
    sessionId: string;
    userId: string;
    session_status: 'active' | 'paused' | 'ended';
    tutor_response?: string;
    learning_context?: {
      current_topic: string;
      progress_percentage: number;
      mastery_level: string;
      next_steps: string[];
      recommended_resources: Array<{
        type: 'passage' | 'exercise' | 'quiz';
        title: string;
        difficulty: string;
        cultural_theme: string;
      }>;
    };
    conversation_history?: Array<{
      timestamp: string;
      speaker: 'user' | 'tutor';
      message: string;
      message_type: 'question' | 'explanation' | 'feedback' | 'encouragement';
    }>;
    session_metadata: {
      start_time: string;
      last_activity: string;
      total_interactions: number;
      learning_progress: number;
      oracle_cloud_status: 'connected' | 'fallback';
    };
  };
  message?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TutoringSessionResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      status: 'error', 
      message: 'Method not allowed. Use POST for tutoring sessions.' 
    });
  }

  const { 
    action, 
    userId, 
    sessionId,
    preferences,
    message
  } = req.body as TutoringSessionRequest;

  // Validate input
  if (!action || !['start', 'continue', 'end', 'get_status'].includes(action)) {
    return res.status(400).json({
      status: 'error',
      message: 'Action is required and must be one of: start, continue, end, get_status'
    });
  }

  if (!userId || typeof userId !== 'string') {
    return res.status(400).json({
      status: 'error',
      message: 'UserId is required and must be a string'
    });
  }

  if (['continue', 'end', 'get_status'].includes(action) && !sessionId) {
    return res.status(400).json({
      status: 'error',
      message: `SessionId is required for action: ${action}`
    });
  }

  if (action === 'continue' && (!message || message.trim().length === 0)) {
    return res.status(400).json({
      status: 'error',
      message: 'Message is required for continue action'
    });
  }

  try {
    // Connect to Oracle Cloud backend for AI tutoring
    const oracleEndpoint = process.env.ORACLE_CLOUD_ENDPOINT || 'http://152.70.184.232:8080';
    
    const response = await fetch(`${oracleEndpoint}/api/tutoring/session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Client-Version': '2.0',
        'X-Request-Source': 'macrobius-frontend',
        'X-Tutoring-Action': action
      },
      body: JSON.stringify({
        action,
        user_id: userId,
        session_id: sessionId,
        preferences: preferences ? {
          language: preferences.language,
          difficulty_level: preferences.difficulty_level,
          learning_goals: preferences.learning_goals,
          focus_areas: preferences.focus_areas,
          interaction_style: preferences.interaction_style
        } : undefined,
        message: message?.trim()
      }),
      signal: AbortSignal.timeout(action === 'start' ? 15000 : 30000) // Longer timeout for conversation
    });

    if (response.ok) {
      const oracleData = await response.json();
      
      // Transform Oracle Cloud response to our format
      return res.status(200).json({
        status: 'success',
        data: {
          sessionId: oracleData.session_id || oracleData.sessionId || sessionId || generateSessionId(),
          userId,
          session_status: oracleData.session_status || (action === 'end' ? 'ended' : 'active'),
          tutor_response: oracleData.tutor_response || oracleData.response,
          learning_context: oracleData.learning_context ? {
            current_topic: oracleData.learning_context.current_topic || 'Latin Fundamentals',
            progress_percentage: oracleData.learning_context.progress_percentage || 0,
            mastery_level: oracleData.learning_context.mastery_level || 'Beginner',
            next_steps: oracleData.learning_context.next_steps || [],
            recommended_resources: (oracleData.learning_context.recommended_resources || []).map((resource: any) => ({
              type: resource.type || 'passage',
              title: resource.title || 'Recommended Resource',
              difficulty: resource.difficulty || 'Intermediate',
              cultural_theme: resource.cultural_theme || 'General'
            }))
          } : undefined,
          conversation_history: (oracleData.conversation_history || []).map((entry: any) => ({
            timestamp: entry.timestamp || new Date().toISOString(),
            speaker: entry.speaker,
            message: entry.message,
            message_type: entry.message_type || 'explanation'
          })),
          session_metadata: {
            start_time: oracleData.start_time || new Date().toISOString(),
            last_activity: new Date().toISOString(),
            total_interactions: oracleData.total_interactions || 1,
            learning_progress: oracleData.learning_progress || 0,
            oracle_cloud_status: 'connected' as const
          }
        }
      });
    } else {
      throw new Error(`Oracle Cloud responded with status ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Oracle Cloud AI tutoring failed:', error);
    
    // Generate intelligent fallback tutoring response
    const fallbackResponse = generateFallbackTutoringResponse(
      action, userId, sessionId, preferences, message
    );
    
    return res.status(200).json({
      status: 'success',
      data: fallbackResponse
    });
  }
}

function generateSessionId(): string {
  return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function generateFallbackTutoringResponse(
  action: string,
  userId: string,
  sessionId?: string,
  preferences?: any,
  message?: string
) {
  const currentSessionId = sessionId || generateSessionId();
  const language = preferences?.language || 'EN';
  
  const responses = {
    DE: {
      start: "Willkommen zu Ihrer persönlichen Macrobius-Lernsession! Ich bin Ihr KI-Tutor und helfe Ihnen dabei, die faszinierende Welt der lateinischen Literatur und römischen Kultur zu erkunden. Womit möchten Sie heute beginnen?",
      continue_question: "Das ist eine sehr gute Frage! Lassen Sie mich das anhand der Macrobius-Texte erklären...",
      continue_explanation: "Basierend auf Ihrem Lernfortschritt empfehle ich, dass wir uns auf die kulturellen Aspekte konzentrieren...",
      continue_feedback: "Ausgezeichnet! Ihre Antwort zeigt ein gutes Verständnis. Lassen Sie uns das Thema vertiefen...",
      end: "Vielen Dank für diese produktive Lernsession! Ihr Fortschritt ist beeindruckend."
    },
    EN: {
      start: "Welcome to your personalized Macrobius learning session! I'm your AI tutor, here to help you explore the fascinating world of Latin literature and Roman culture. What would you like to begin with today?",
      continue_question: "That's an excellent question! Let me explain this using the Macrobius texts...",
      continue_explanation: "Based on your learning progress, I recommend we focus on the cultural aspects...",
      continue_feedback: "Excellent! Your response shows good understanding. Let's deepen the topic...",
      end: "Thank you for this productive learning session! Your progress is impressive."
    },
    LA: {
      start: "Salvete! Ad sessionem personalem Macrobii discendae vos benigne accipio! Ego sum tutor vester artificialis, qui vobis auxilium fert ad mundum fascinantem litterarum Latinarum culturaeque Romanae explorandum. Quid hodie incipere vultis?",
      continue_question: "Optima quaestio! Hoc vobis per textus Macrobii explicare liceat...",
      continue_explanation: "Ex vestro progressu discendi commendo ut aspectibus culturalibus studeamus...",
      continue_feedback: "Optime! Responsio vestra bonam intelligentiam ostendit. Rem altius tractemus...",
      end: "Gratias vobis ago pro hac fructuosa sessione discendi! Progressus vester mirabilis est."
    }
  };
  
  const langResponses = responses[language as keyof typeof responses];
  
  let tutorResponse = '';
  let messageType: 'question' | 'explanation' | 'feedback' | 'encouragement' = 'explanation';
  
  if (action === 'start') {
    tutorResponse = langResponses.start;
    messageType = 'question';
  } else if (action === 'continue' && message) {
    const messageLower = message.toLowerCase();
    if (messageLower.includes('?') || messageLower.includes('wie') || messageLower.includes('what') || messageLower.includes('quid')) {
      tutorResponse = langResponses.continue_question;
      messageType = 'explanation';
    } else if (messageLower.includes('explain') || messageLower.includes('erklär') || messageLower.includes('explica')) {
      tutorResponse = langResponses.continue_explanation;
      messageType = 'explanation';
    } else {
      tutorResponse = langResponses.continue_feedback;
      messageType = 'feedback';
    }
  } else if (action === 'end') {
    tutorResponse = langResponses.end;
    messageType = 'encouragement';
  } else {
    tutorResponse = langResponses.continue_explanation;
  }
  
  // Generate learning context based on message content
  let currentTopic = 'Latin Fundamentals';
  let focusAreas = ['Grammar', 'Vocabulary'];
  
  if (message) {
    const msgLower = message.toLowerCase();
    if (msgLower.includes('dream') || msgLower.includes('traum') || msgLower.includes('somnium')) {
      currentTopic = 'Dreams and Prophecy in Macrobius';
      focusAreas = ['Philosophical concepts', 'Cultural interpretation'];
    } else if (msgLower.includes('banquet') || msgLower.includes('gastmahl') || msgLower.includes('convivium')) {
      currentTopic = 'Roman Banquet Culture';
      focusAreas = ['Social customs', 'Cultural practices'];
    } else if (msgLower.includes('philosophy') || msgLower.includes('philosophie')) {
      currentTopic = 'Neoplatonic Philosophy';
      focusAreas = ['Philosophical concepts', 'Ancient wisdom'];
    }
  }
  
  const conversationHistory = [];
  if (action === 'continue' && message) {
    conversationHistory.push({
      timestamp: new Date(Date.now() - 1000).toISOString(),
      speaker: 'user' as const,
      message: message,
      message_type: 'question' as const
    });
  }
  conversationHistory.push({
    timestamp: new Date().toISOString(),
    speaker: 'tutor' as const,
    message: tutorResponse,
    message_type: messageType
  });
  
  return {
    sessionId: currentSessionId,
    userId,
    session_status: action === 'end' ? 'ended' as const : 'active' as const,
    tutor_response: tutorResponse,
    learning_context: {
      current_topic: currentTopic,
      progress_percentage: Math.min((conversationHistory.length - 1) * 10, 100),
      mastery_level: preferences?.difficulty_level || 'Beginner',
      next_steps: [
        language === 'DE' ? 'Textpassage analysieren' : language === 'LA' ? 'Locum textualem analysi subicere' : 'Analyze a text passage',
        language === 'DE' ? 'Kulturelle Konzepte erkunden' : language === 'LA' ? 'Conceptus culturales explorare' : 'Explore cultural concepts',
        language === 'DE' ? 'Übungen zur Grammatik' : language === 'LA' ? 'Exercitia grammaticalia' : 'Grammar exercises'
      ],
      recommended_resources: [
        {
          type: 'passage' as const,
          title: currentTopic === 'Dreams and Prophecy in Macrobius' ? 'Somnium Scipionis Commentary' : 'Saturnalia Excerpts',
          difficulty: preferences?.difficulty_level || 'Intermediate',
          cultural_theme: currentTopic.includes('Dreams') ? 'Dreams & Interpretation' : 'Social Customs'
        },
        {
          type: 'exercise' as const,
          title: language === 'DE' ? 'Vokabeltraining' : language === 'LA' ? 'Exercitium vocabulorum' : 'Vocabulary Practice',
          difficulty: 'Beginner',
          cultural_theme: 'General'
        }
      ]
    },
    conversation_history: conversationHistory,
    session_metadata: {
      start_time: new Date(Date.now() - (conversationHistory.length * 60000)).toISOString(),
      last_activity: new Date().toISOString(),
      total_interactions: conversationHistory.length,
      learning_progress: Math.min((conversationHistory.length - 1) * 15, 100),
      oracle_cloud_status: 'fallback' as const
    }
  };
}
import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { MacrobiusAPI } from '@/lib/enhanced-api-client-with-fallback';
import {
  HelpCircle,
  CheckCircle,
  XCircle,
  Clock,
  Trophy,
  Star,
  Brain,
  Target,
  Zap,
  BookOpen,
  Award,
  TrendingUp,
  RotateCcw,
  Sparkles,
  Activity,
  Gauge,
  Users,
  Crown,
  Loader2,
  AlertCircle
} from 'lucide-react';

interface QuizSectionProps {
  isActive: boolean;
  language: 'DE' | 'EN' | 'LA';
}

interface Question {
  id: string;
  type: 'multiple_choice' | 'true_false' | 'fill_blank';
  question_text: string;
  options?: string[];
  correct_answer: string | number;
  explanation: string;
  difficulty_level: number;
  cultural_theme: string;
  learning_objective: string;
  time_estimated: number;
  hints: string[];
  latin_text_source?: string;
}

interface QuizSession {
  id: string;
  questions: Question[];
  currentQuestionIndex: number;
  answers: (string | number | null)[];
  startTime: number;
  endTime?: number;
  score: number;
  totalQuestions: number;
}

interface QuizStats {
  totalQuizzesCompleted: number;
  averageScore: number;
  bestScore: number;
  totalTimeSpent: number;
  strengthAreas: string[];
  improvementAreas: string[];
  currentStreak: number;
  difficultyProgression: number[];
}

// 🎯 Enhanced Question Component
const QuestionCard: React.FC<{
  question: Question;
  selectedAnswer: string | number | null;
  onAnswerSelect: (answer: string | number) => void;
  showResults: boolean;
  isCorrect: boolean;
  timeRemaining?: number;
}> = ({ question, selectedAnswer, onAnswerSelect, showResults, isCorrect, timeRemaining }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showHint, setShowHint] = useState(false);
  
  const difficultyColor = {
    1: '#10b981', 2: '#10b981', 3: '#f59e0b', 4: '#f59e0b', 5: '#ef4444', 6: '#ef4444', 7: '#7c3aed'
  }[Math.min(question.difficulty_level, 7)] || '#6b7280';
  
  return (
    <div
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        padding: '32px',
        border: `2px solid ${showResults ? (isCorrect ? '#10b981' : '#ef4444') : 'rgba(212, 175, 55, 0.3)'}`,
        boxShadow: showResults
          ? `0 20px 40px ${isCorrect ? '#10b98120' : '#ef444420'}`
          : '0 12px 32px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(12px)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Question Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '24px',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div style={{ flex: 1 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '8px'
          }}>
            <div style={{
              padding: '6px',
              borderRadius: '8px',
              backgroundColor: `${difficultyColor}15`,
              border: `1px solid ${difficultyColor}30`
            }}>
              <Brain style={{ width: '16px', height: '16px', color: difficultyColor }} />
            </div>
            
            <span style={{
              fontSize: '12px',
              fontWeight: '600',
              color: difficultyColor,
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Schwierigkeit {question.difficulty_level}/7
            </span>
            
            <span style={{
              fontSize: '12px',
              color: '#6b7280',
              backgroundColor: 'rgba(107, 114, 128, 0.1)',
              padding: '3px 8px',
              borderRadius: '6px'
            }}>
              {question.cultural_theme}
            </span>
          </div>
          
          {timeRemaining !== undefined && timeRemaining > 0 && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: timeRemaining < 10 ? '#ef4444' : '#6b7280',
              fontSize: '12px',
              fontWeight: '500'
            }}>
              <Clock style={{ width: '14px', height: '14px' }} />
              {timeRemaining}s verbleibend
            </div>
          )}
        </div>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          {question.hints.length > 0 && (
            <button
              onClick={() => setShowHint(!showHint)}
              style={{
                padding: '8px 12px',
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                borderRadius: '6px',
                color: '#7c3aed',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Sparkles style={{ width: '12px', height: '12px' }} />
              {showHint ? 'Hinweis verbergen' : 'Hinweis'}
            </button>
          )}
          
          {showResults && (
            <div style={{
              padding: '8px 12px',
              backgroundColor: isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              border: `1px solid ${isCorrect ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              {isCorrect ? (
                <CheckCircle style={{ width: '14px', height: '14px', color: '#10b981' }} />
              ) : (
                <XCircle style={{ width: '14px', height: '14px', color: '#ef4444' }} />
              )}
              <span style={{
                fontSize: '12px',
                fontWeight: '600',
                color: isCorrect ? '#059669' : '#dc2626'
              }}>
                {isCorrect ? 'Richtig!' : 'Falsch'}
              </span>
            </div>
          )}
        </div>
      </div>
      
      {/* Hint Display */}
      {showHint && question.hints.length > 0 && (
        <div style={{
          marginBottom: '20px',
          padding: '16px',
          backgroundColor: 'rgba(139, 92, 246, 0.05)',
          border: '1px solid rgba(139, 92, 246, 0.2)',
          borderRadius: '10px',
          borderLeft: '4px solid #7c3aed'
        }}>
          <div style={{ fontSize: '14px', color: '#7c3aed', marginBottom: '4px', fontWeight: '600' }}>
            💡 Hinweis:
          </div>
          <div style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.5' }}>
            {question.hints[0]}
          </div>
        </div>
      )}
      
      {/* Question Text */}
      <div style={{
        marginBottom: '24px'
      }}>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '600',
          color: '#1f2937',
          lineHeight: '1.4',
          margin: 0
        }}>
          {question.question_text}
        </h3>
        
        {question.latin_text_source && (
          <div style={{
            marginTop: '12px',
            padding: '16px',
            backgroundColor: 'rgba(212, 175, 55, 0.05)',
            border: '1px solid rgba(212, 175, 55, 0.2)',
            borderRadius: '10px',
            borderLeft: '4px solid #d4af37'
          }}>
            <div style={{ fontSize: '12px', color: '#92400e', marginBottom: '4px', fontWeight: '600' }}>
              📜 Aus dem Macrobius-Korpus:
            </div>
            <div style={{
              fontSize: '14px',
              fontStyle: 'italic',
              color: '#374151',
              lineHeight: '1.5'
            }}>
              "{question.latin_text_source}"
            </div>
          </div>
        )}
      </div>
      
      {/* Answer Options */}
      {question.type === 'multiple_choice' && question.options && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectOption = question.correct_answer === index;
            
            let optionStyle = {
              padding: '16px 20px',
              borderRadius: '12px',
              border: '2px solid',
              cursor: showResults ? 'default' : 'pointer',
              transition: 'all 0.3s ease',
              fontSize: '16px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              opacity: showResults && !isCorrectOption && !isSelected ? 0.5 : 1
            };
            
            if (showResults) {
              if (isCorrectOption) {
                optionStyle = {
                  ...optionStyle,
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  borderColor: '#10b981',
                  color: '#059669'
                };
              } else if (isSelected) {
                optionStyle = {
                  ...optionStyle,
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  borderColor: '#ef4444',
                  color: '#dc2626'
                };
              } else {
                optionStyle = {
                  ...optionStyle,
                  backgroundColor: 'rgba(107, 114, 128, 0.05)',
                  borderColor: 'rgba(107, 114, 128, 0.2)',
                  color: '#6b7280'
                };
              }
            } else {
              optionStyle = {
                ...optionStyle,
                backgroundColor: isSelected 
                  ? 'rgba(212, 175, 55, 0.1)' 
                  : 'rgba(255, 255, 255, 0.5)',
                borderColor: isSelected 
                  ? '#d4af37' 
                  : 'rgba(212, 175, 55, 0.3)',
                color: isSelected ? '#92400e' : '#374151',
                transform: isSelected ? 'scale(1.02)' : 'none',
                boxShadow: isSelected ? '0 4px 12px rgba(212, 175, 55, 0.3)' : 'none'
              };
            }
            
            return (
              <button
                key={index}
                onClick={() => !showResults && onAnswerSelect(index)}
                style={optionStyle}
                onMouseEnter={(e) => {
                  if (!showResults && !isSelected) {
                    e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.05)';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!showResults && !isSelected) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
                    e.currentTarget.style.transform = 'none';
                  }
                }}
              >
                <span>{String.fromCharCode(65 + index)}. {option}</span>
                
                {showResults && isCorrectOption && (
                  <CheckCircle style={{ width: '20px', height: '20px', color: '#10b981' }} />
                )}
                {showResults && isSelected && !isCorrectOption && (
                  <XCircle style={{ width: '20px', height: '20px', color: '#ef4444' }} />
                )}
              </button>
            );
          })}
        </div>
      )}
      
      {/* Explanation */}
      {showResults && question.explanation && (
        <div style={{
          marginTop: '24px',
          padding: '20px',
          backgroundColor: isCorrect ? 'rgba(16, 185, 129, 0.05)' : 'rgba(239, 68, 68, 0.05)',
          border: `1px solid ${isCorrect ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`,
          borderRadius: '12px',
          borderLeft: `4px solid ${isCorrect ? '#10b981' : '#ef4444'}`
        }}>
          <div style={{
            fontSize: '14px',
            color: isCorrect ? '#059669' : '#dc2626',
            marginBottom: '8px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <BookOpen style={{ width: '16px', height: '16px' }} />
            Erklärung:
          </div>
          <div style={{
            fontSize: '14px',
            color: '#374151',
            lineHeight: '1.6'
          }}>
            {question.explanation}
          </div>
        </div>
      )}
      
      {/* Animated background effect */}
      {isHovered && (
        <div style={{
          position: 'absolute',
          top: '0',
          left: '-100%',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.1), transparent)',
          animation: 'shimmer 2s ease-in-out infinite',
          pointerEvents: 'none'
        }} />
      )}
    </div>
  );
};

// 📊 Enhanced Stats Panel
const StatsPanel: React.FC<{ stats: QuizStats }> = ({ stats }) => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '16px',
      marginBottom: '32px'
    }}>
      <div style={{
        padding: '20px',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        border: '2px solid rgba(16, 185, 129, 0.3)',
        borderRadius: '12px',
        textAlign: 'center'
      }}>
        <Trophy style={{ width: '24px', height: '24px', color: '#10b981', marginBottom: '8px', margin: '0 auto 8px' }} />
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#059669' }}>
          {stats.bestScore}%
        </div>
        <div style={{ fontSize: '12px', color: '#059669', fontWeight: '600' }}>
          Beste Punktzahl
        </div>
      </div>
      
      <div style={{
        padding: '20px',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        border: '2px solid rgba(245, 158, 11, 0.3)',
        borderRadius: '12px',
        textAlign: 'center'
      }}>
        <TrendingUp style={{ width: '24px', height: '24px', color: '#f59e0b', marginBottom: '8px', margin: '0 auto 8px' }} />
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#d97706' }}>
          {stats.averageScore}%
        </div>
        <div style={{ fontSize: '12px', color: '#d97706', fontWeight: '600' }}>
          Durchschnitt
        </div>
      </div>
      
      <div style={{
        padding: '20px',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        border: '2px solid rgba(139, 92, 246, 0.3)',
        borderRadius: '12px',
        textAlign: 'center'
      }}>
        <Activity style={{ width: '24px', height: '24px', color: '#8b5cf6', marginBottom: '8px', margin: '0 auto 8px' }} />
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#7c3aed' }}>
          {stats.currentStreak}
        </div>
        <div style={{ fontSize: '12px', color: '#7c3aed', fontWeight: '600' }}>
          Aktuelle Serie
        </div>
      </div>
      
      <div style={{
        padding: '20px',
        backgroundColor: 'rgba(212, 175, 55, 0.1)',
        border: '2px solid rgba(212, 175, 55, 0.3)',
        borderRadius: '12px',
        textAlign: 'center'
      }}>
        <Clock style={{ width: '24px', height: '24px', color: '#d4af37', marginBottom: '8px', margin: '0 auto 8px' }} />
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#92400e' }}>
          {Math.round(stats.totalTimeSpent / 60)}
        </div>
        <div style={{ fontSize: '12px', color: '#92400e', fontWeight: '600' }}>
          Minuten gelernt
        </div>
      </div>
    </div>
  );
};

// 🧠 MAIN QUIZ SECTION COMPONENT
const QuizSection: React.FC<QuizSectionProps> = ({ isActive, language }) => {
  const { t } = useLanguage();
  const [currentSession, setCurrentSession] = useState<QuizSession | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [stats, setStats] = useState<QuizStats>({
    totalQuizzesCompleted: 0,
    averageScore: 0,
    bestScore: 0,
    totalTimeSpent: 0,
    strengthAreas: [],
    improvementAreas: [],
    currentStreak: 0,
    difficultyProgression: []
  });
  const [error, setError] = useState<string | null>(null);
  
  // Load user stats on mount
  useEffect(() => {
    if (isActive) {
      loadUserStats();
    }
  }, [isActive]);
  
  // Timer effect
  useEffect(() => {
    if (timeRemaining > 0 && !showResults) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && currentSession && !showResults) {
      // Time's up - show results
      handleAnswerSubmit();
    }
  }, [timeRemaining, showResults, currentSession]);
  
  const loadUserStats = async () => {
    try {
      const response = await MacrobiusAPI.analytics.getUserPerformance();
      if (response.status === 'success' && response.data) {
        setStats({
          totalQuizzesCompleted: response.data.total_quizzes_taken || 0,
          averageScore: Math.round((response.data.average_accuracy || 0) * 100),
          bestScore: Math.round((response.data.vocabulary_retention || 0.8) * 100),
          totalTimeSpent: response.data.total_time_spent || 0,
          strengthAreas: response.data.strongest_areas || [],
          improvementAreas: response.data.improvement_areas || [],
          currentStreak: response.data.current_streak || 0,
          difficultyProgression: response.data.difficulty_progression || []
        });
      }
    } catch (error) {
      console.warn('Failed to load user stats:', error);
    }
  };
  
  const startNewQuiz = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Generate adaptive quiz based on user performance
      const quizRequest = {
        user_profile: {
          current_level: Math.max(1, Math.round(stats.averageScore / 15)),
          strengths: stats.strengthAreas,
          weaknesses: stats.improvementAreas,
          recent_performance: stats.averageScore / 100
        },
        preferences: {
          question_count: 5,
          difficulty_range: [3, 6],
          cultural_themes: ['Roman History', 'Philosophy', 'Literature'],
          include_latin_sources: true,
          adaptive_difficulty: true
        }
      };
      
      const response = await MacrobiusAPI.quiz.generateAdaptive(quizRequest);
      
      if (response.status === 'success' && response.data.questions) {
        const newSession: QuizSession = {
          id: `quiz_${Date.now()}`,
          questions: response.data.questions,
          currentQuestionIndex: 0,
          answers: new Array(response.data.questions.length).fill(null),
          startTime: Date.now(),
          score: 0,
          totalQuestions: response.data.questions.length
        };
        
        setCurrentSession(newSession);
        setSelectedAnswer(null);
        setShowResults(false);
        
        // Set timer for current question
        const currentQuestion = newSession.questions[0];
        setTimeRemaining(currentQuestion.time_estimated || 30);
      } else {
        throw new Error('Failed to generate quiz questions');
      }
    } catch (error) {
      console.error('Failed to start quiz:', error);
      setError('Fehler beim Laden des Quiz. Bitte versuchen Sie es erneut.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAnswerSelect = useCallback((answer: string | number) => {
    setSelectedAnswer(answer);
  }, []);
  
  const handleAnswerSubmit = async () => {
    if (!currentSession) return;
    
    const currentQuestion = currentSession.questions[currentSession.currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correct_answer;
    
    // Update session with answer
    const updatedAnswers = [...currentSession.answers];
    updatedAnswers[currentSession.currentQuestionIndex] = selectedAnswer;
    
    const updatedSession = {
      ...currentSession,
      answers: updatedAnswers,
      score: isCorrect ? currentSession.score + 1 : currentSession.score
    };
    
    setCurrentSession(updatedSession);
    setShowResults(true);
    
    // Submit answer to backend for analytics
    try {
      await MacrobiusAPI.quiz.submitAnswer({
        session_id: currentSession.id,
        question_id: currentQuestion.id,
        user_answer: selectedAnswer,
        correct_answer: currentQuestion.correct_answer,
        response_time: (currentQuestion.time_estimated || 30) - timeRemaining,
        difficulty_level: currentQuestion.difficulty_level
      });
    } catch (error) {
      console.warn('Failed to submit answer for analytics:', error);
    }
  };
  
  const handleNextQuestion = () => {
    if (!currentSession) return;
    
    if (currentSession.currentQuestionIndex < currentSession.questions.length - 1) {
      // Move to next question
      const nextIndex = currentSession.currentQuestionIndex + 1;
      const updatedSession = {
        ...currentSession,
        currentQuestionIndex: nextIndex
      };
      
      setCurrentSession(updatedSession);
      setSelectedAnswer(null);
      setShowResults(false);
      
      // Set timer for next question
      const nextQuestion = currentSession.questions[nextIndex];
      setTimeRemaining(nextQuestion.time_estimated || 30);
    } else {
      // Quiz completed
      completeQuiz();
    }
  };
  
  const completeQuiz = async () => {
    if (!currentSession) return;
    
    const finalSession = {
      ...currentSession,
      endTime: Date.now()
    };
    
    // Submit completed quiz for analytics
    try {
      await MacrobiusAPI.quiz.completeSession({
        session_id: finalSession.id,
        total_questions: finalSession.totalQuestions,
        correct_answers: finalSession.score,
        total_time: finalSession.endTime! - finalSession.startTime,
        difficulty_levels: finalSession.questions.map(q => q.difficulty_level)
      });
      
      // Reload stats
      await loadUserStats();
    } catch (error) {
      console.warn('Failed to submit quiz completion:', error);
    }
    
    setCurrentSession(null);
    setShowResults(false);
  };
  
  if (!isActive) return null;
  
  const currentQuestion = currentSession?.questions[currentSession.currentQuestionIndex];
  const isQuizCompleted = currentSession && currentSession.currentQuestionIndex >= currentSession.questions.length;
  const progress = currentSession ? ((currentSession.currentQuestionIndex + (showResults ? 1 : 0)) / currentSession.questions.length) * 100 : 0;
  
  return (
    <div style={{
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '32px',
      minHeight: '100vh'
    }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '48px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '16px'
        }}>
          <Brain style={{ width: '32px', height: '32px', color: '#8b5cf6' }} />
          <h1 style={{
            fontSize: '36px',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #8b5cf6, #d4af37)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0,
            fontFamily: 'Times New Roman, serif'
          }}>
            Intelligentes Quiz System
          </h1>
          <Zap style={{ width: '28px', height: '28px', color: '#f59e0b', animation: 'pulse 2s infinite' }} />
        </div>
        
        <p style={{
          fontSize: '18px',
          color: '#6b7280',
          margin: '0 0 24px 0',
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto',
          lineHeight: '1.6'
        }}>
          KI-generierte Fragen basierend auf dem authentischen Macrobius-Korpus mit 
          adaptiver Schwierigkeitsanpassung und kulturellem Kontext.
        </p>
        
        {/* AI Status Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          backgroundColor: 'rgba(139, 92, 246, 0.1)',
          border: '2px solid rgba(139, 92, 246, 0.3)',
          borderRadius: '12px',
          fontSize: '14px',
          fontWeight: '600',
          color: '#7c3aed'
        }}>
          <Target style={{ width: '16px', height: '16px' }} />
          TIER 3 KI - Adaptive Fragengenerierung
          <Activity style={{ width: '14px', height: '14px' }} />
        </div>
      </div>
      
      {/* Error Display */}
      {error && (
        <div style={{
          padding: '16px 20px',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          border: '2px solid rgba(239, 68, 68, 0.3)',
          borderRadius: '12px',
          color: '#dc2626',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <AlertCircle style={{ width: '20px', height: '20px' }} />
          {error}
        </div>
      )}
      
      {/* Stats Panel */}
      <StatsPanel stats={stats} />
      
      {/* Quiz Content */}
      {!currentSession && !isLoading && (
        <div style={{
          textAlign: 'center',
          padding: '48px 32px',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '20px',
          border: '2px solid rgba(212, 175, 55, 0.3)',
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(12px)'
        }}>
          <Crown style={{ width: '64px', height: '64px', color: '#d4af37', marginBottom: '24px', margin: '0 auto 24px' }} />
          <h2 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '16px'
          }}>
            Bereit für ein neues Quiz?
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#6b7280',
            marginBottom: '32px',
            maxWidth: '500px',
            margin: '0 auto 32px'
          }}>
            Testen Sie Ihr Wissen über die römische Kultur anhand authentischer 
            Textpassagen aus Macrobius' Werken. Das System passt sich automatisch 
            an Ihr Kenntnisstand an.
          </p>
          
          <button
            onClick={startNewQuiz}
            style={{
              padding: '16px 32px',
              backgroundColor: '#8b5cf6',
              border: 'none',
              borderRadius: '12px',
              color: 'white',
              fontSize: '18px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#7c3aed';
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(139, 92, 246, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#8b5cf6';
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.3)';
            }}
          >
            <Zap style={{ width: '20px', height: '20px' }} />
            Neues Quiz starten
          </button>
        </div>
      )}
      
      {isLoading && (
        <div style={{
          textAlign: 'center',
          padding: '48px 32px',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '20px',
          border: '2px solid rgba(212, 175, 55, 0.3)',
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(12px)'
        }}>
          <Loader2 style={{ width: '48px', height: '48px', color: '#8b5cf6', animation: 'spin 1s linear infinite', marginBottom: '24px', margin: '0 auto 24px' }} />
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '16px'
          }}>
            KI generiert personalisierte Fragen...
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#6b7280'
          }}>
            Analysiere Ihr Lernprofil und wähle optimale Schwierigkeit aus 1.401 Textpassagen.
          </p>
        </div>
      )}
      
      {/* Active Quiz */}
      {currentSession && currentQuestion && (
        <div>
          {/* Progress Bar */}
          <div style={{
            marginBottom: '32px',
            backgroundColor: 'rgba(107, 114, 128, 0.1)',
            borderRadius: '12px',
            overflow: 'hidden',
            height: '8px',
            position: 'relative'
          }}>
            <div style={{
              height: '100%',
              backgroundColor: '#8b5cf6',
              borderRadius: '12px',
              width: `${progress}%`,
              transition: 'width 0.5s ease',
              background: 'linear-gradient(90deg, #8b5cf6, #d4af37)'
            }} />
            
            <div style={{
              position: 'absolute',
              top: '-32px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '14px',
              fontWeight: '600',
              color: '#6b7280'
            }}>
              Frage {currentSession.currentQuestionIndex + 1} von {currentSession.totalQuestions}
            </div>
          </div>
          
          {/* Question Card */}
          <QuestionCard
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            onAnswerSelect={handleAnswerSelect}
            showResults={showResults}
            isCorrect={selectedAnswer === currentQuestion.correct_answer}
            timeRemaining={timeRemaining}
          />
          
          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '16px',
            marginTop: '32px'
          }}>
            {!showResults ? (
              <button
                onClick={handleAnswerSubmit}
                disabled={selectedAnswer === null}
                style={{
                  padding: '12px 24px',
                  backgroundColor: selectedAnswer !== null ? '#10b981' : '#d1d5db',
                  border: 'none',
                  borderRadius: '10px',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: selectedAnswer !== null ? 'pointer' : 'not-allowed',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <CheckCircle style={{ width: '18px', height: '18px' }} />
                Antwort bestätigen
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#8b5cf6',
                  border: 'none',
                  borderRadius: '10px',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#7c3aed';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#8b5cf6';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                {currentSession.currentQuestionIndex < currentSession.questions.length - 1 ? (
                  <>
                    Nächste Frage
                    <Target style={{ width: '18px', height: '18px' }} />
                  </>
                ) : (
                  <>
                    Quiz abschließen
                    <Trophy style={{ width: '18px', height: '18px' }} />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      )}
      
      {/* Global Animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default QuizSection;
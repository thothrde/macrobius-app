import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, CheckCircle, XCircle, RotateCcw, Trophy } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface QuizSectionProps {
  isActive: boolean;
  language?: string;
}

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

function QuizSection({ isActive, language = 'DE' }: QuizSectionProps) {
  const { t } = useLanguage();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const questions: QuizQuestion[] = [
    {
      id: 1,
      question: t('quiz.question1'),
      options: [
        t('quiz.question1_option1'),
        t('quiz.question1_option2'),
        t('quiz.question1_option3'),
        t('quiz.question1_option4')
      ],
      correct: 0,
      explanation: t('quiz.question1_explanation'),
      difficulty: 'easy',
      category: t('quiz.category_works')
    },
    {
      id: 2,
      question: t('quiz.question2'),
      options: [
        t('quiz.question2_option1'),
        t('quiz.question2_option2'), 
        t('quiz.question2_option3'),
        t('quiz.question2_option4')
      ],
      correct: 1,
      explanation: t('quiz.question2_explanation'),
      difficulty: 'medium',
      category: t('quiz.category_geography')
    },
    {
      id: 3,
      question: t('quiz.question3'),
      options: [
        t('quiz.question3_option1'),
        t('quiz.question3_option2'),
        t('quiz.question3_option3'),
        t('quiz.question3_option4')
      ],
      correct: 1,
      explanation: t('quiz.question3_explanation'),
      difficulty: 'hard',
      category: t('quiz.category_cosmology')
    },
    {
      id: 4,
      question: t('quiz.question4'),
      options: [
        t('quiz.question4_option1'),
        t('quiz.question4_option2'),
        t('quiz.question4_option3'),
        t('quiz.question4_option4')
      ],
      correct: 2,
      explanation: t('quiz.question4_explanation'),
      difficulty: 'medium',
      category: t('quiz.category_renaissance')
    },
    {
      id: 5,
      question: t('quiz.question5'),
      options: [
        t('quiz.question5_option1'),
        t('quiz.question5_option2'),
        t('quiz.question5_option3'),
        t('quiz.question5_option4')
      ],
      correct: 2,
      explanation: t('quiz.question5_explanation'),
      difficulty: 'easy',
      category: t('quiz.category_biography')
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    if (answerIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizComplete(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return t('quiz.score_excellent');
    if (percentage >= 60) return t('quiz.score_good');
    if (percentage >= 40) return t('quiz.score_ok');
    return t('quiz.score_improve');
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return t('quiz.difficulty_easy');
      case 'medium': return t('quiz.difficulty_medium');
      case 'hard': return t('quiz.difficulty_hard');
      default: return difficulty;
    }
  };

  if (!isActive) return null;

  return (
    <motion.section
      className="relative min-h-screen flex items-center justify-center px-4 py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900" />
      
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="flex items-center justify-center space-x-4 mb-6">
            <Brain className="w-8 h-8 text-purple-400" />
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-100 to-purple-200">
              {t('quiz.title')}
            </h1>
            <Trophy className="w-8 h-8 text-yellow-400" />
          </div>
          
          <h2 className="text-2xl md:text-3xl text-purple-200 mb-8">
            {t('quiz.subtitle')}
          </h2>
        </motion.div>

        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {!quizComplete ? (
            <>
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-purple-300">
                    {t('quiz.question_progress').replace('{current}', (currentQuestion + 1).toString()).replace('{total}', questions.length.toString())}
                  </span>
                  <span className="text-purple-300">
                    {t('quiz.score_display').replace('{score}', score.toString()).replace('{total}', questions.length.toString())}
                  </span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <motion.div
                    className="bg-purple-400 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Question */}
              <motion.div
                key={currentQuestion}
                className="mb-8"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    questions[currentQuestion].difficulty === 'easy' ? 'bg-green-500/20 text-green-300' :
                    questions[currentQuestion].difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-red-500/20 text-red-300'
                  }`}>
                    {getDifficultyLabel(questions[currentQuestion].difficulty)}
                  </span>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium">
                    {questions[currentQuestion].category}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-6">
                  {questions[currentQuestion].question}
                </h3>
                
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => {
                    const isCorrect = index === questions[currentQuestion].correct;
                    const isSelected = selectedAnswer === index;
                    
                    let buttonClass = "w-full p-4 rounded-lg border text-left transition-all duration-300 ";
                    
                    if (!showResult) {
                      buttonClass += "bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/40";
                    } else {
                      if (isSelected && isCorrect) {
                        buttonClass += "bg-green-500/20 border-green-400/50 text-green-300";
                      } else if (isSelected && !isCorrect) {
                        buttonClass += "bg-red-500/20 border-red-400/50 text-red-300";
                      } else if (isCorrect) {
                        buttonClass += "bg-green-500/20 border-green-400/50 text-green-300";
                      } else {
                        buttonClass += "bg-white/5 border-white/10 text-white/60";
                      }
                    }
                    
                    return (
                      <motion.button
                        key={index}
                        className={buttonClass}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showResult}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-center justify-between">
                          <span>{option}</span>
                          {showResult && (
                            <span>
                              {isSelected && isCorrect && <CheckCircle className="w-5 h-5 text-green-400" />}
                              {isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-400" />}
                              {!isSelected && isCorrect && <CheckCircle className="w-5 h-5 text-green-400" />}
                            </span>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>

              {/* Explanation */}
              <AnimatePresence>
                {showResult && (
                  <motion.div
                    className="mb-8 p-6 bg-blue-500/20 border border-blue-400/50 rounded-lg"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <h4 className="font-semibold text-blue-300 mb-3">
                      {selectedAnswer === questions[currentQuestion].correct ? t('quiz.answer_correct') : t('quiz.answer_incorrect')}
                    </h4>
                    <p className="text-blue-200 leading-relaxed">
                      {questions[currentQuestion].explanation}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Next Button */}
              {showResult && (
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <button
                    onClick={nextQuestion}
                    className="px-8 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all font-semibold"
                  >
                    {currentQuestion < questions.length - 1 ? t('quiz.next_question') : t('quiz.finish_quiz')}
                  </button>
                </motion.div>
              )}
            </>
          ) : (
            /* Quiz Complete */
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-6xl mb-6">🎆</div>
              <h3 className="text-3xl font-bold text-yellow-400 mb-4">
                {t('quiz.complete_title')}
              </h3>
              <div className="text-6xl font-bold text-white mb-4">
                {score}/{questions.length}
              </div>
              <p className="text-xl text-purple-200 mb-8">
                {getScoreMessage()}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-400">
                    {Math.round((score / questions.length) * 100)}%
                  </div>
                  <div className="text-white/80">{t('quiz.success_rate')}</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-400">{score}</div>
                  <div className="text-white/80">{t('quiz.correct_answers')}</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold text-purple-400">{questions.length}</div>
                  <div className="text-white/80">{t('quiz.total_questions')}</div>
                </div>
              </div>
              
              <button
                onClick={resetQuiz}
                className="px-8 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all font-semibold flex items-center gap-2 mx-auto"
              >
                <RotateCcw className="w-5 h-5" />
                {t('quiz.repeat_quiz')}
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
}

export default QuizSection;
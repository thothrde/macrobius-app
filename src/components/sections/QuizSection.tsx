import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, RotateCcw, Trophy, BookOpen, Star } from 'lucide-react';

interface QuizSectionProps {
  isActive: boolean;
  language?: 'DE' | 'EN' | 'LA';
}

// 🚨 EMERGENCY DIRECT TRANSLATIONS - BYPASSING BROKEN CONTEXT
const DIRECT_TRANSLATIONS = {
  DE: {
    title: 'Macrobius Quiz',
    subtitle: 'Testen Sie Ihr Wissen über den antiken Gelehrten',
    question_progress: 'Frage {current} von {total}',
    score_display: 'Score: {score}/{total}',
    difficulty_easy: 'Einfach',
    difficulty_medium: 'Mittel',
    difficulty_hard: 'Schwer',
    answer_correct: '✓ Richtig!',
    answer_incorrect: '✗ Falsch!',
    next_question: 'Nächste Frage',
    finish_quiz: 'Quiz beenden',
    complete_title: 'Quiz abgeschlossen!',
    success_rate: 'Erfolgsquote',
    correct_answers: 'Richtige Antworten',
    total_questions: 'Gesamtfragen',
    repeat_quiz: 'Quiz wiederholen',
    start_quiz: 'Quiz starten',
    // Score Messages
    score_excellent: '🎆 Ausgezeichnet! Sie sind ein Macrobius-Experte!',
    score_good: '😊 Sehr gut! Sie kennen sich gut mit Macrobius aus.',
    score_ok: '📚 Nicht schlecht! Es lohnt sich, mehr über Macrobius zu lernen.',
    score_improve: '📜 Noch Raum für Verbesserung. Entdecken Sie mehr über Macrobius!',
    // Quiz Questions
    question1: 'Welche zwei Hauptwerke schrieb Macrobius?',
    question1_option1: 'Saturnalia und Commentarii in Somnium Scipionis',
    question1_option2: 'De Re Publica und De Officiis',
    question1_option3: 'Metamorphosen und Ars Amatoria',
    question1_option4: 'Confessiones und De Civitate Dei',
    question1_explanation: 'Macrobius\' zwei Hauptwerke sind die "Saturnalia" (Gespräche während der Saturnalien) und die "Commentarii in Somnium Scipionis" (Kommentar zu Scipios Traum).',
    
    question2: 'Wie viele Klimazonen beschrieb Macrobius?',
    question2_option1: 'Drei',
    question2_option2: 'Fünf',
    question2_option3: 'Sieben',
    question2_option4: 'Neun',
    question2_explanation: 'Macrobius teilte die Erde in fünf Klimazonen: zwei kalte Polarzonen, zwei gemäßigte Zonen und eine heiße Äquatorzone.',
    
    question3: 'Was bedeutet "Sphärenharmonie" in Macrobius\' Kosmologie?',
    question3_option1: 'Die Planeten bewegen sich zufällig',
    question3_option2: 'Die Himmelskörper erzeugen durch ihre Bewegung Musik',
    question3_option3: 'Die Sterne sind stumm',
    question3_option4: 'Nur die Sonne macht Geräusche',
    question3_explanation: 'Nach Macrobius erzeugen die Planetenbewegungen eine kosmische Musik - die Sphärenharmonie -, die nur reine Seelen hören können.',
    
    question4: 'In welchem Jahrhundert lebte Macrobius?',
    question4_option1: '4. Jahrhundert',
    question4_option2: '5. Jahrhundert',
    question4_option3: '6. Jahrhundert',
    question4_option4: '7. Jahrhundert',
    question4_explanation: 'Macrobius Ambrosius Theodosius lebte im 5. Jahrhundert n. Chr. (ca. 385-430), zur Zeit des untergehenden Weströmischen Reiches.',
    
    question5: 'Was war Macrobius\' wichtigster Beitrag zur Erhaltung antiker Kultur?',
    question5_option1: 'Er schrieb Gedichte',
    question5_option2: 'Er bewahrte Wissen in dialogischer Form',
    question5_option3: 'Er baute Bibliotheken',
    question5_option4: 'Er lehrte an Universitäten',
    question5_explanation: 'Macrobius bewahrte das Wissen der Antike, indem er es in unterhaltsamen Dialogformen präsentierte, die über Jahrhunderte überlebten.'
  },
  EN: {
    title: 'Macrobius Quiz',
    subtitle: 'Test Your Knowledge About the Ancient Scholar',
    question_progress: 'Question {current} of {total}',
    score_display: 'Score: {score}/{total}',
    difficulty_easy: 'Easy',
    difficulty_medium: 'Medium',
    difficulty_hard: 'Hard',
    answer_correct: '✓ Correct!',
    answer_incorrect: '✗ Incorrect!',
    next_question: 'Next Question',
    finish_quiz: 'Finish Quiz',
    complete_title: 'Quiz Complete!',
    success_rate: 'Success Rate',
    correct_answers: 'Correct Answers',
    total_questions: 'Total Questions',
    repeat_quiz: 'Repeat Quiz',
    start_quiz: 'Start Quiz',
    // Score Messages
    score_excellent: '🎆 Excellent! You are a Macrobius expert!',
    score_good: '😊 Very good! You know Macrobius well.',
    score_ok: '📚 Not bad! It\'s worth learning more about Macrobius.',
    score_improve: '📜 Room for improvement. Discover more about Macrobius!',
    // Quiz Questions
    question1: 'Which two major works did Macrobius write?',
    question1_option1: 'Saturnalia and Commentary on Scipio\'s Dream',
    question1_option2: 'De Re Publica and De Officiis',
    question1_option3: 'Metamorphoses and Ars Amatoria',
    question1_option4: 'Confessions and City of God',
    question1_explanation: 'Macrobius\' two major works are the "Saturnalia" (conversations during the Saturnalia festival) and the "Commentary on Scipio\'s Dream".',
    
    question2: 'How many climate zones did Macrobius describe?',
    question2_option1: 'Three',
    question2_option2: 'Five',
    question2_option3: 'Seven',
    question2_option4: 'Nine',
    question2_explanation: 'Macrobius divided the Earth into five climate zones: two cold polar zones, two temperate zones, and one hot equatorial zone.',
    
    question3: 'What does "Music of the Spheres" mean in Macrobius\' cosmology?',
    question3_option1: 'Planets move randomly',
    question3_option2: 'Celestial bodies create music through their movement',
    question3_option3: 'Stars are silent',
    question3_option4: 'Only the sun makes sounds',
    question3_explanation: 'According to Macrobius, planetary movements create cosmic music - the harmony of the spheres - that only pure souls can hear.',
    
    question4: 'In which century did Macrobius live?',
    question4_option1: '4th century',
    question4_option2: '5th century',
    question4_option3: '6th century',
    question4_option4: '7th century',
    question4_explanation: 'Macrobius Ambrosius Theodosius lived in the 5th century CE (ca. 385-430), during the time of the declining Western Roman Empire.',
    
    question5: 'What was Macrobius\' most important contribution to preserving ancient culture?',
    question5_option1: 'He wrote poetry',
    question5_option2: 'He preserved knowledge in dialogue form',
    question5_option3: 'He built libraries',
    question5_option4: 'He taught at universities',
    question5_explanation: 'Macrobius preserved ancient knowledge by presenting it in entertaining dialogue forms that survived for centuries.'
  },
  LA: {
    title: 'Quaestiones Macrobii',
    subtitle: 'Scientiam Tuam De Erudito Antiquo Proba',
    question_progress: 'Quaestio {current} ex {total}',
    score_display: 'Numerus: {score}/{total}',
    difficulty_easy: 'Facilis',
    difficulty_medium: 'Medius',
    difficulty_hard: 'Difficilis',
    answer_correct: '✓ Rectum!',
    answer_incorrect: '✗ Falsum!',
    next_question: 'Quaestio Sequens',
    finish_quiz: 'Quaestiones Finire',
    complete_title: 'Quaestiones Completae!',
    success_rate: 'Ratio Successus',
    correct_answers: 'Responsiones Rectae',
    total_questions: 'Quaestiones Totae',
    repeat_quiz: 'Quaestiones Iterare',
    start_quiz: 'Quaestiones Incipere',
    // Score Messages
    score_excellent: '🎆 Excellens! Tu es peritus Macrobii!',
    score_good: '😊 Valde bene! Macrobium bene nosti.',
    score_ok: '📚 Non male! Operae pretium est plus de Macrobio discere.',
    score_improve: '📜 Locus emendationis. Plura de Macrobio inveni!',
    // Quiz Questions
    question1: 'Quae duo opera praecipua Macrobius scripsit?',
    question1_option1: 'Saturnalia et Commentarii in Somnium Scipionis',
    question1_option2: 'De Re Publica et De Officiis',
    question1_option3: 'Metamorphoses et Ars Amatoria',
    question1_option4: 'Confessiones et De Civitate Dei',
    question1_explanation: 'Duo opera praecipua Macrobii sunt "Saturnalia" (colloquia tempore Saturnalium) et "Commentarii in Somnium Scipionis".',
    
    question2: 'Quot zonas climatis Macrobius descripsit?',
    question2_option1: 'Tres',
    question2_option2: 'Quinque',
    question2_option3: 'Septem',
    question2_option4: 'Novem',
    question2_explanation: 'Macrobius terram in quinque zonas climatis divisit: duas zonas frigidas polares, duas temperatas, et unam torridam aequatorialem.',
    
    question3: 'Quid significat "Harmonia Sphaerarum" in cosmologia Macrobii?',
    question3_option1: 'Planetae casu moventur',
    question3_option2: 'Corpora caelestia per motum musicam creant',
    question3_option3: 'Stellae silent',
    question3_option4: 'Solum sol sonos facit',
    question3_explanation: 'Secundum Macrobium, motus planetarum musicam cosmicam creant - harmoniam sphaerarum - quam solae animae purae audire possunt.',
    
    question4: 'Quo saeculo Macrobius vixit?',
    question4_option1: 'Saeculo quarto',
    question4_option2: 'Saeculo quinto',
    question4_option3: 'Saeculo sexto',
    question4_option4: 'Saeculo septimo',
    question4_explanation: 'Macrobius Ambrosius Theodosius saeculo quinto post Christum vixit (ca. 385-430), tempore Imperii Romani Occidentalis declinantis.',
    
    question5: 'Quid fuit contributio Macrobii maxima ad culturam antiquam conservandam?',
    question5_option1: 'Carmina scripsit',
    question5_option2: 'Scientiam in forma dialogorum conservavit',
    question5_option3: 'Bibliothecas aedificavit',
    question5_option4: 'In universitatibus docuit',
    question5_explanation: 'Macrobius scientiam antiquam conservavit eam in formis dialogorum delectabilibus praesens quae per saecula supervixerunt.'
  }
} as const;

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

function QuizSection({ isActive, language = 'DE' }: QuizSectionProps) {
  const t = DIRECT_TRANSLATIONS[language];
  
  // Generate questions based on current language
  const questions: Question[] = [
    {
      id: 1,
      question: t.question1,
      options: [t.question1_option1, t.question1_option2, t.question1_option3, t.question1_option4],
      correctAnswer: 0,
      explanation: t.question1_explanation,
      difficulty: 'easy'
    },
    {
      id: 2,
      question: t.question2,
      options: [t.question2_option1, t.question2_option2, t.question2_option3, t.question2_option4],
      correctAnswer: 1,
      explanation: t.question2_explanation,
      difficulty: 'medium'
    },
    {
      id: 3,
      question: t.question3,
      options: [t.question3_option1, t.question3_option2, t.question3_option3, t.question3_option4],
      correctAnswer: 1,
      explanation: t.question3_explanation,
      difficulty: 'hard'
    },
    {
      id: 4,
      question: t.question4,
      options: [t.question4_option1, t.question4_option2, t.question4_option3, t.question4_option4],
      correctAnswer: 1,
      explanation: t.question4_explanation,
      difficulty: 'easy'
    },
    {
      id: 5,
      question: t.question5,
      options: [t.question5_option1, t.question5_option2, t.question5_option3, t.question5_option4],
      correctAnswer: 1,
      explanation: t.question5_explanation,
      difficulty: 'medium'
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return; // Prevent changing answer
    
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    
    // Update user answers
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setUserAnswers(newAnswers);
    
    // Update score if correct
    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizCompleted(false);
    setQuizStarted(false);
    setUserAnswers(new Array(questions.length).fill(null));
  };

  const startQuiz = () => {
    setQuizStarted(true);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return t.score_excellent;
    if (percentage >= 60) return t.score_good;
    if (percentage >= 40) return t.score_ok;
    return t.score_improve;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400 bg-green-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'hard': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  if (!isActive) return null;

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-8"
        >
          {!quizStarted ? (
            // Quiz Introduction
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <div className="flex items-center justify-center space-x-3 mb-6">
                <BookOpen className="w-8 h-8 text-yellow-400" />
                <h2 className="text-4xl font-bold text-yellow-400">{t.title}</h2>
                <Star className="w-8 h-8 text-yellow-400" />
              </div>
              
              <p className="text-xl text-white/90 mb-8">
                {t.subtitle}
              </p>
              
              <div className="bg-blue-500/20 border border-blue-400/50 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold text-blue-300 mb-4">
                  📋 Quiz Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white/80">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">{questions.length}</div>
                    <div className="text-sm">{t.total_questions}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">3</div>
                    <div className="text-sm">Difficulty Levels</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">5</div>
                    <div className="text-sm">Minutes</div>
                  </div>
                </div>
              </div>
              
              <button
                onClick={startQuiz}
                className="px-8 py-4 bg-yellow-400 text-black rounded-xl font-semibold text-lg hover:bg-yellow-500 transition-all transform hover:scale-105"
              >
                🚀 {t.start_quiz}
              </button>
            </motion.div>
          ) : !quizCompleted ? (
            // Quiz Questions
            <div>
              {/* Progress and Score */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-4">
                  <span className="text-white/80">
                    {t.question_progress.replace('{current}', (currentQuestion + 1).toString()).replace('{total}', questions.length.toString())}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(questions[currentQuestion].difficulty)}`}>
                    {t[`difficulty_${questions[currentQuestion].difficulty}` as keyof typeof t]}
                  </span>
                </div>
                <span className="text-yellow-400 font-semibold">
                  {t.score_display.replace('{score}', score.toString()).replace('{total}', questions.length.toString())}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-white/20 rounded-full h-2 mb-8">
                <div 
                  className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>

              {/* Question */}
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-8"
              >
                <h3 className="text-2xl font-bold text-white mb-6">
                  {questions[currentQuestion].question}
                </h3>

                {/* Answer Options */}
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => {
                    let buttonClass = 'w-full p-4 rounded-lg border-2 text-left transition-all hover:bg-white/10';
                    
                    if (selectedAnswer === null) {
                      buttonClass += ' border-white/30 text-white/90 hover:border-yellow-400';
                    } else {
                      if (index === questions[currentQuestion].correctAnswer) {
                        buttonClass += ' border-green-400 bg-green-500/20 text-green-300';
                      } else if (index === selectedAnswer) {
                        buttonClass += ' border-red-400 bg-red-500/20 text-red-300';
                      } else {
                        buttonClass += ' border-white/20 text-white/60';
                      }
                    }

                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        className={buttonClass}
                        disabled={selectedAnswer !== null}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-bold">
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span>{option}</span>
                          {selectedAnswer !== null && index === questions[currentQuestion].correctAnswer && (
                            <CheckCircle className="w-5 h-5 text-green-400 ml-auto" />
                          )}
                          {selectedAnswer === index && index !== questions[currentQuestion].correctAnswer && (
                            <XCircle className="w-5 h-5 text-red-400 ml-auto" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>

              {/* Explanation */}
              <AnimatePresence>
                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6"
                  >
                    <div className={`p-4 rounded-lg border-2 ${
                      selectedAnswer === questions[currentQuestion].correctAnswer 
                        ? 'border-green-400 bg-green-500/20'
                        : 'border-red-400 bg-red-500/20'
                    }`}>
                      <div className="flex items-center space-x-2 mb-2">
                        {selectedAnswer === questions[currentQuestion].correctAnswer ? (
                          <>
                            <CheckCircle className="w-5 h-5 text-green-400" />
                            <span className="font-semibold text-green-300">{t.answer_correct}</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-5 h-5 text-red-400" />
                            <span className="font-semibold text-red-300">{t.answer_incorrect}</span>
                          </>
                        )}
                      </div>
                      <p className="text-white/90">
                        {questions[currentQuestion].explanation}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Next Button */}
              {showExplanation && (
                <div className="text-center">
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-3 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-500 transition-all"
                  >
                    {currentQuestion < questions.length - 1 ? t.next_question : t.finish_quiz}
                  </button>
                </div>
              )}
            </div>
          ) : (
            // Quiz Results
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="flex items-center justify-center space-x-3 mb-6">
                <Trophy className="w-8 h-8 text-yellow-400" />
                <h2 className="text-4xl font-bold text-yellow-400">{t.complete_title}</h2>
                <Trophy className="w-8 h-8 text-yellow-400" />
              </div>
              
              <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-400/50 rounded-xl p-8 mb-8">
                <div className="text-6xl font-bold text-yellow-400 mb-4">
                  {score}/{questions.length}
                </div>
                <div className="text-2xl text-white/90 mb-4">
                  {Math.round((score / questions.length) * 100)}% {t.success_rate}
                </div>
                <p className="text-lg text-white/80">
                  {getScoreMessage()}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-green-500/20 border border-green-400/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-400">{score}</div>
                  <div className="text-green-300">{t.correct_answers}</div>
                </div>
                <div className="bg-red-500/20 border border-red-400/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-red-400">{questions.length - score}</div>
                  <div className="text-red-300">Incorrect</div>
                </div>
                <div className="bg-blue-500/20 border border-blue-400/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-400">{questions.length}</div>
                  <div className="text-blue-300">{t.total_questions}</div>
                </div>
              </div>
              
              <button
                onClick={resetQuiz}
                className="px-8 py-4 bg-yellow-400 text-black rounded-xl font-semibold text-lg hover:bg-yellow-500 transition-all transform hover:scale-105 flex items-center space-x-2 mx-auto"
              >
                <RotateCcw className="w-5 h-5" />
                <span>{t.repeat_quiz}</span>
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default QuizSection;
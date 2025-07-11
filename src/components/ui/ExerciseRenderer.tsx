'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from './button';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Badge } from './badge';
import { Progress } from './progress';
import {
  Clock,
  HelpCircle,
  CheckCircle,
  XCircle,
  Lightbulb,
  Timer,
  Award,
  Target
} from 'lucide-react';

interface GrammarExercise {
  id: string;
  type: 'fill_blank' | 'identify' | 'transform' | 'multiple_choice' | 'pattern_recognition';
  passage_source: string;
  original_text: string;
  blanked_text?: string;
  question: string;
  answers: string[];
  correct_answer: string | number;
  explanation: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  cultural_context?: string;
}

interface ExerciseRendererProps {
  exercise: GrammarExercise;
  onSubmit: (answerIndex: number, timeSpent: number) => void;
  onHint: () => void;
  hints: string[];
}

export default function ExerciseRenderer({ exercise, onSubmit, onHint, hints }: ExerciseRendererProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [startTime] = useState(Date.now());
  const [showHints, setShowHints] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    setSubmitted(true);
    onSubmit(selectedAnswer, timeSpent);
  };

  const handleHint = () => {
    onHint();
    setShowHints(true);
  };

  const getDifficultyColor = () => {
    switch (exercise.difficulty) {
      case 'beginner': return 'bg-green-100 text-green-700 border-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Exercise Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Badge className={getDifficultyColor()}>
            {exercise.difficulty}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {exercise.type.replace('_', ' ')}
          </Badge>
          {exercise.passage_source && (
            <Badge variant="outline" className="text-xs">
              {exercise.passage_source}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-white/70">
          <div className="flex items-center space-x-1">
            <Timer className="w-4 h-4" />
            <span>{Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleHint}
            className="text-white/70 hover:text-white"
          >
            <HelpCircle className="w-4 h-4 mr-1" />
            Hint
          </Button>
        </div>
      </div>

      {/* Latin Text Display */}
      <Card className="bg-black/20 border border-gold/30">
        <CardContent className="p-4">
          <div className="text-center mb-4">
            <h3 className="text-lg font-medium text-white mb-2">Latin Text</h3>
            <div className="text-xl text-gold font-serif italic leading-relaxed">
              {exercise.blanked_text || exercise.original_text}
            </div>
          </div>
          
          {exercise.cultural_context && (
            <div className="mt-4 p-3 bg-blue-900/20 rounded border border-blue-400/30">
              <p className="text-sm text-blue-300 font-medium mb-1">Cultural Context:</p>
              <p className="text-xs text-white/80">{exercise.cultural_context}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Question */}
      <Card className="bg-white/10 border border-white/20">
        <CardContent className="p-4">
          <h4 className="text-lg font-medium text-white mb-4">{exercise.question}</h4>
          
          {/* Answer Options */}
          <div className="space-y-3">
            {exercise.answers.map((answer, index) => (
              <button
                key={index}
                onClick={() => !submitted && setSelectedAnswer(index)}
                disabled={submitted}
                className={`w-full p-3 text-left rounded-lg border-2 transition-all duration-300 ${
                  selectedAnswer === index
                    ? 'border-gold bg-gold/20 text-white'
                    : 'border-white/30 bg-white/5 text-white/80 hover:border-gold/50 hover:bg-white/10'
                } ${submitted ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                    selectedAnswer === index
                      ? 'border-gold bg-gold text-black'
                      : 'border-white/50 text-white/70'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="font-medium">{answer}</span>
                </div>
              </button>
            ))}
          </div>
          
          {/* Submit Button */}
          <div className="mt-6 text-center">
            <Button
              onClick={handleSubmit}
              disabled={selectedAnswer === null || submitted}
              className="bg-gold hover:bg-gold/80 text-black px-8 py-2 font-medium"
            >
              {submitted ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Submitted
                </>
              ) : (
                <>
                  <Target className="w-4 h-4 mr-2" />
                  Submit Answer
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Hints Section */}
      {showHints && hints.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-400/30">
            <CardHeader>
              <CardTitle className="text-blue-300 flex items-center text-sm">
                <Lightbulb className="w-4 h-4 mr-2" />
                Hints
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-2">
                {hints.map((hint, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-5 h-5 rounded-full bg-blue-400/20 flex items-center justify-center mt-0.5">
                      <span className="text-xs text-blue-300 font-medium">{index + 1}</span>
                    </div>
                    <p className="text-sm text-white/80">{hint}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Explanation (shown after submission) */}
      {submitted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-400/30">
            <CardHeader>
              <CardTitle className="text-green-300 flex items-center text-sm">
                <Award className="w-4 h-4 mr-2" />
                Explanation
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-white/90 leading-relaxed">{exercise.explanation}</p>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
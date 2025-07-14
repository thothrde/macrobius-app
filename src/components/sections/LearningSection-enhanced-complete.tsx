import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

// Import Enhanced Components (FIXED IMPORTS)
import QuizSection from './QuizSection';
import VocabularyTrainerSection from './VocabularyTrainer-CORPUS-EXPANSION-COMPLETE';
import GrammarExplainerSection from './GrammarExplainer-TIER1-COMPLETE';
import MacrobiusTextProcessor from './MacrobiusTextProcessor-TIER2-COMPLETE';
import PersonalizedLearningPaths from './PersonalizedLearningPaths-COMPLETE';
import AITutoringSystemSection from './AITutoringSystemSection-COMPLETE';
import AICulturalAnalysisSection from './AICulturalAnalysisSection';

// Import UI Icons
import { 
  BookOpen, 
  Target, 
  Users, 
  TrendingUp, 
  MessageCircle, 
  Brain,
  Sparkles,
  GraduationCap,
  Zap
} from 'lucide-react';

// Define the expected language type for components
type ComponentLanguage = 'DE' | 'EN' | 'LA';

interface LearningToolProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const LearningTool: React.FC<LearningToolProps> = ({ title, description, icon, isActive, onClick }) => (
  <Card 
    className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
      isActive ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
    }`}
    onClick={onClick}
  >
    <CardHeader className="pb-3">
      <CardTitle className="flex items-center gap-3 text-lg">
        {icon}
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-gray-600 text-sm">{description}</p>
    </CardContent>
  </Card>
);

const LearningSection: React.FC = () => {
  const { language } = useLanguage();
  const [activeComponent, setActiveComponent] = useState<string | null>(null);

  const translations = {
    de: {
      title: "Lernen",
      subtitle: "Entdecke die Welt des Macrobius mit unseren fortgeschrittenen Lernwerkzeugen",
      tools: {
        quiz: {
          title: "Interaktives Quiz",
          description: "Teste dein Wissen über Macrobius mit adaptiven Quizfragen"
        },
        vocabulary: {
          title: "Vokabeltrainer",
          description: "Erweitere deinen lateinischen Wortschatz mit unserem intelligenten Spaced-Repetition-System"
        },
        grammar: {
          title: "Grammatik-Erklärer",
          description: "Verstehe komplexe lateinische Grammatikstrukturen mit KI-gestützten Erklärungen"
        },
        textProcessor: {
          title: "Textanalyse",
          description: "Analysiere Macrobius-Texte mit fortgeschrittenen semantischen Suchwerkzeugen"
        },
        personalizedPaths: {
          title: "Personalisierte Lernpfade",
          description: "Individuelle Lernrouten basierend auf deinen Fortschritten und Zielen"
        },
        aiTutoring: {
          title: "KI-Tutor",
          description: "Persönlicher KI-Assistent für individuelles Lernen und Unterstützung"
        },
        culturalAnalysis: {
          title: "Kulturanalyse",
          description: "Entdecke die kulturellen Zusammenhänge und moderne Relevanz antiker Texte"
        }
      },
      backToOverview: "Zurück zur Übersicht"
    },
    en: {
      title: "Learning",
      subtitle: "Discover the world of Macrobius with our advanced learning tools",
      tools: {
        quiz: {
          title: "Interactive Quiz",
          description: "Test your knowledge of Macrobius with adaptive quiz questions"
        },
        vocabulary: {
          title: "Vocabulary Trainer",
          description: "Expand your Latin vocabulary with our intelligent spaced repetition system"
        },
        grammar: {
          title: "Grammar Explainer",
          description: "Understand complex Latin grammatical structures with AI-powered explanations"
        },
        textProcessor: {
          title: "Text Analysis",
          description: "Analyze Macrobius texts with advanced semantic search tools"
        },
        personalizedPaths: {
          title: "Personalized Learning Paths",
          description: "Individual learning routes based on your progress and goals"
        },
        aiTutoring: {
          title: "AI Tutor",
          description: "Personal AI assistant for individual learning and support"
        },
        culturalAnalysis: {
          title: "Cultural Analysis",
          description: "Discover cultural connections and modern relevance of ancient texts"
        }
      },
      backToOverview: "Back to Overview"
    },
    la: {
      title: "Discere",
      subtitle: "Mundum Macrobii cum instrumentis eruditionis provectis explora",
      tools: {
        quiz: {
          title: "Certamen Interactivum",
          description: "Scientiam tuam de Macrobio cum quaestionibus adaptativis proba"
        },
        vocabulary: {
          title: "Vocabularii Exercitator",
          description: "Vocabularium Latinum cum systemate repetitionis intelligenti auge"
        },
        grammar: {
          title: "Grammaticae Explanator",
          description: "Structuras grammaticas Latinas complexas cum explanationibus ab IA adiutis intellege"
        },
        textProcessor: {
          title: "Textus Analyzator",
          description: "Textus Macrobii cum instrumentis quaestionis semanticae provectis analyza"
        },
        personalizedPaths: {
          title: "Semitae Discendi Personales",
          description: "Viae individuales discendi ex progressu et propositis tuis"
        },
        aiTutoring: {
          title: "Tutor IA",
          description: "Adiutor personalis IA pro discendo et auxilio individuali"
        },
        culturalAnalysis: {
          title: "Analysis Culturalis",
          description: "Nexus culturales et significationem modernam textuum antiquorum inveni"
        }
      },
      backToOverview: "Ad Conspectum Redire"
    }
  };

  const currentTranslations = translations[language as keyof typeof translations];

  const learningTools = [
    {
      id: 'quiz',
      title: currentTranslations.tools.quiz.title,
      description: currentTranslations.tools.quiz.description,
      icon: <Target className="w-6 h-6 text-blue-500" />,
      component: QuizSection
    },
    {
      id: 'vocabulary',
      title: currentTranslations.tools.vocabulary.title,
      description: currentTranslations.tools.vocabulary.description,
      icon: <BookOpen className="w-6 h-6 text-green-500" />,
      component: VocabularyTrainerSection
    },
    {
      id: 'grammar',
      title: currentTranslations.tools.grammar.title,
      description: currentTranslations.tools.grammar.description,
      icon: <Brain className="w-6 h-6 text-purple-500" />,
      component: GrammarExplainerSection
    },
    {
      id: 'textProcessor',
      title: currentTranslations.tools.textProcessor.title,
      description: currentTranslations.tools.textProcessor.description,
      icon: <Sparkles className="w-6 h-6 text-orange-500" />,
      component: MacrobiusTextProcessor
    },
    {
      id: 'personalizedPaths',
      title: currentTranslations.tools.personalizedPaths.title,
      description: currentTranslations.tools.personalizedPaths.description,
      icon: <TrendingUp className="w-6 h-6 text-red-500" />,
      component: PersonalizedLearningPaths
    },
    {
      id: 'aiTutoring',
      title: currentTranslations.tools.aiTutoring.title,
      description: currentTranslations.tools.aiTutoring.description,
      icon: <MessageCircle className="w-6 h-6 text-indigo-500" />,
      component: AITutoringSystemSection
    },
    {
      id: 'culturalAnalysis',
      title: currentTranslations.tools.culturalAnalysis.title,
      description: currentTranslations.tools.culturalAnalysis.description,
      icon: <GraduationCap className="w-6 h-6 text-teal-500" />,
      component: AICulturalAnalysisSection
    }
  ];

  const handleToolClick = (toolId: string) => {
    setActiveComponent(toolId);
  };

  const handleBackToOverview = () => {
    setActiveComponent(null);
  };

  // Render specific component if active
  if (activeComponent) {
    const activeTool = learningTools.find(tool => tool.id === activeComponent);
    if (activeTool) {
      const ActiveComponent = activeTool.component;
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <Button 
                onClick={handleBackToOverview}
                variant="outline"
                className="mb-4"
              >
                <Zap className="w-4 h-4 mr-2" />
                {currentTranslations.backToOverview}
              </Button>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {activeTool.title}
              </h1>
              <p className="text-gray-600">{activeTool.description}</p>
            </div>
            <ActiveComponent language={language as ComponentLanguage} />
          </div>
        </div>
      );
    }
  }

  // Render main learning tools overview
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {currentTranslations.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            {currentTranslations.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {learningTools.map((tool) => (
            <LearningTool
              key={tool.id}
              title={tool.title}
              description={tool.description}
              icon={tool.icon}
              isActive={activeComponent === tool.id}
              onClick={() => handleToolClick(tool.id)}
            />
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <GraduationCap className="w-16 h-16 text-blue-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {language === 'DE' ? 'Intelligente Lernumgebung' : 
               language === 'EN' ? 'Intelligent Learning Environment' : 
               'Ambitus Discendi Intelligens'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {language === 'DE' ? 
                'Nutze modernste KI-Technologie, um die Welt des Macrobius zu erschließen. Unsere Lernwerkzeuge passen sich an deine Fortschritte an und bieten personalisierte Lernerfahrungen.' :
               language === 'EN' ? 
                'Use cutting-edge AI technology to unlock the world of Macrobius. Our learning tools adapt to your progress and offer personalized learning experiences.' :
                'Technologia IA recentissima utere ad mundum Macrobii reserandum. Instrumenta nostra discendi progressui tuo se accommodant et experientia discendi personales offerunt.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningSection;
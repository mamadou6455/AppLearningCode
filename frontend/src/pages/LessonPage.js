import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { programmingLanguages, lessons, updateLessonProgress } from '../mock';
import { ArrowLeft, ArrowRight, CheckCircle, BookOpen, Clock, Trophy } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const LessonPage = ({ userProgress, updateProgress }) => {
  const { languageId, lessonId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [lessonCompleted, setLessonCompleted] = useState(false);
  
  const language = programmingLanguages.find(l => l.id === languageId);
  const courseLessons = lessons[languageId] || [];
  const currentLesson = courseLessons.find(l => l.id === parseInt(lessonId));
  const currentLessonIndex = courseLessons.findIndex(l => l.id === parseInt(lessonId));
  const nextLesson = courseLessons[currentLessonIndex + 1];

  useEffect(() => {
    const isCompleted = userProgress?.completedLessons?.includes(`${languageId}_${lessonId}`) || false;
    setLessonCompleted(isCompleted);
  }, [userProgress, languageId, lessonId]);

  if (!language || !currentLesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Leçon non trouvée</h2>
          <Link to={`/course/${languageId}`}>
            <Button>Retour au cours</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleCompleteLesson = () => {
    if (!lessonCompleted) {
      const newProgress = updateLessonProgress(languageId, parseInt(lessonId));
      updateProgress(newProgress);
      setLessonCompleted(true);
      
      toast({
        title: "Leçon terminée ! 🎉",
        description: `Vous avez gagné 10 points. Total: ${newProgress.totalPoints} points`,
      });
    }
  };

  const handleQuizNavigation = () => {
    navigate(`/course/${languageId}/lesson/${lessonId}/quiz`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <Link to={`/course/${languageId}`}>
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Retour au cours
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 ${language.color} rounded-lg flex items-center justify-center text-lg`}>
                  {language.icon}
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-gray-900">{language.name}</h1>
                  <p className="text-sm text-gray-600">Leçon {currentLessonIndex + 1}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {lessonCompleted && (
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Terminée
                </Badge>
              )}
              <div className="text-sm text-gray-600 flex items-center space-x-1">
                <Trophy className="w-4 h-4" />
                <span>{userProgress?.totalPoints || 0} pts</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* En-tête de la leçon */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl text-gray-900 mb-2">
                  {currentLesson.title}
                </CardTitle>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{currentLesson.duration} minutes</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BookOpen className="w-4 h-4" />
                    <span>Leçon {currentLessonIndex + 1} sur {courseLessons.length}</span>
                  </div>
                </div>
              </div>
              <div className={`w-16 h-16 ${language.color} rounded-xl flex items-center justify-center text-3xl`}>
                {language.icon}
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Contenu de la leçon */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardContent className="py-8">
            <div 
              className="prose prose-lg max-w-none
                prose-headings:text-gray-900 prose-headings:font-bold
                prose-p:text-gray-700 prose-p:leading-relaxed
                prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded
                prose-pre:bg-gray-900 prose-pre:text-white prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
                prose-ul:text-gray-700 prose-li:text-gray-700
                prose-strong:text-gray-900"
              dangerouslySetInnerHTML={{ __html: currentLesson.content }}
            />
          </CardContent>
        </Card>

        {/* Actions de fin de leçon */}
        <Card className="border-0 shadow-lg">
          <CardContent className="py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="text-center sm:text-left">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {lessonCompleted ? 'Leçon terminée !' : 'Terminer cette leçon'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {lessonCompleted 
                    ? 'Passez au quiz pour tester vos connaissances'
                    : 'Marquez cette leçon comme terminée pour débloquer la suite'
                  }
                </p>
              </div>
              
              <div className="flex space-x-3">
                {!lessonCompleted && (
                  <Button onClick={handleCompleteLesson} className="min-w-[140px]">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Terminer la leçon
                  </Button>
                )}
                
                <Button 
                  onClick={handleQuizNavigation}
                  variant={lessonCompleted ? "default" : "outline"}
                  className="min-w-[120px]"
                  disabled={!lessonCompleted}
                >
                  Faire le quiz
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
            
            {/* Navigation vers la leçon suivante */}
            {lessonCompleted && nextLesson && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">Prochaine leçon</h4>
                    <p className="text-gray-600 text-sm">{nextLesson.title}</p>
                  </div>
                  <Link to={`/course/${languageId}/lesson/${nextLesson.id}`}>
                    <Button variant="outline">
                      Leçon suivante
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LessonPage;
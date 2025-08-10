import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { programmingLanguages, lessons } from '../mock';
import { ArrowLeft, BookOpen, Clock, CheckCircle, Circle, Play } from 'lucide-react';

const CoursePage = ({ userProgress }) => {
  const { languageId } = useParams();
  const language = programmingLanguages.find(l => l.id === languageId);
  const courseLessons = lessons[languageId] || [];
  
  if (!language) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Cours non trouvé</h2>
          <Link to="/">
            <Button>Retour à l'accueil</Button>
          </Link>
        </div>
      </div>
    );
  }

  const isLessonCompleted = (lessonId) => {
    return userProgress?.completedLessons?.includes(`${languageId}_${lessonId}`) || false;
  };

  const getLanguageProgress = () => {
    const progress = userProgress?.languageProgress?.[languageId];
    if (!progress) return 0;
    return Math.round((progress.completed / progress.total) * 100);
  };

  const completedCount = courseLessons.filter(lesson => isLessonCompleted(lesson.id)).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Retour
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 ${language.color} rounded-lg flex items-center justify-center text-2xl`}>
                  {language.icon}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{language.name}</h1>
                  <p className="text-gray-600">{language.description}</p>
                </div>
              </div>
            </div>
            <Link to="/dashboard">
              <Button variant="outline" size="sm">Tableau de bord</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progression du cours */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Progression du cours</CardTitle>
                <CardDescription>
                  {completedCount} leçon{completedCount > 1 ? 's' : ''} terminée{completedCount > 1 ? 's' : ''} sur {courseLessons.length}
                </CardDescription>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">{getLanguageProgress()}%</div>
                <div className="text-sm text-gray-600">Terminé</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={getLanguageProgress()} className="h-3 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{courseLessons.length}</div>
                <div className="text-sm text-gray-600">Leçons totales</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{completedCount}</div>
                <div className="text-sm text-gray-600">Terminées</div>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{language.estimatedTime}</div>
                <div className="text-sm text-gray-600">Durée estimée</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Liste des leçons */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Leçons du cours</h2>
          
          {courseLessons.length > 0 ? (
            courseLessons.map((lesson, index) => {
              const isCompleted = isLessonCompleted(lesson.id);
              const isAccessible = index === 0 || isLessonCompleted(courseLessons[index - 1]?.id);
              
              return (
                <Card 
                  key={lesson.id} 
                  className={`transition-all duration-300 hover:shadow-lg border-0 shadow-md ${
                    isCompleted ? 'bg-green-50 border-l-4 border-l-green-500' : 
                    isAccessible ? 'hover:-translate-y-1' : 'opacity-60'
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`flex-shrink-0 ${
                          isCompleted ? 'text-green-600' : 
                          isAccessible ? 'text-blue-600' : 'text-gray-400'
                        }`}>
                          {isCompleted ? (
                            <CheckCircle className="w-8 h-8" />
                          ) : (
                            <Circle className="w-8 h-8" />
                          )}
                        </div>
                        <div>
                          <CardTitle className={`text-lg ${
                            isAccessible ? 'text-gray-900' : 'text-gray-500'
                          }`}>
                            Leçon {index + 1}: {lesson.title}
                          </CardTitle>
                          <CardDescription className="flex items-center space-x-4 mt-1">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{lesson.duration} min</span>
                            </div>
                            {isCompleted && (
                              <Badge className="bg-green-100 text-green-800">Terminée</Badge>
                            )}
                          </CardDescription>
                        </div>
                      </div>
                      
                      {isAccessible && (
                        <Link to={`/course/${languageId}/lesson/${lesson.id}`}>
                          <Button 
                            variant={isCompleted ? "outline" : "default"}
                            className="min-w-[120px]"
                          >
                            <Play className="w-4 h-4 mr-2" />
                            {isCompleted ? 'Revoir' : 'Commencer'}
                          </Button>
                        </Link>
                      )}
                      
                      {!isAccessible && (
                        <Button disabled variant="outline" className="min-w-[120px]">
                          Verrouillé
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                </Card>
              );
            })
          ) : (
            <Card className="border-0 shadow-lg">
              <CardContent className="py-12 text-center">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Leçons en cours de préparation
                </h3>
                <p className="text-gray-600">
                  Les leçons pour {language.name} seront bientôt disponibles. 
                  Revenez nous voir prochainement !
                </p>
                <Link to="/" className="inline-block mt-4">
                  <Button>Découvrir d'autres cours</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { programmingLanguages } from '../mock';
import { BookOpen, Clock, Trophy, User, TrendingUp } from 'lucide-react';

const HomePage = ({ userProgress }) => {
  const getLanguageProgress = (languageId) => {
    const progress = userProgress?.languageProgress?.[languageId];
    if (!progress) return 0;
    return Math.round((progress.completed / progress.total) * 100);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Débutant': return 'bg-green-100 text-green-800';
      case 'Intermédiaire': return 'bg-yellow-100 text-yellow-800';
      case 'Avancé': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header avec navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">CodeLearning</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Trophy className="w-4 h-4" />
                <span>{userProgress?.totalPoints || 0} points</span>
              </div>
              <Link to="/dashboard">
                <Button variant="outline" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  Tableau de bord
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Section Hero */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Apprenez à 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> coder</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Maîtrisez les langages de programmation essentiels avec des cours interactifs, 
            des quiz et un système de progression motivant.
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600 mb-8">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <span>Cours théoriques détaillés</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span>Système de progression</span>
            </div>
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-yellow-600" />
              <span>Badges et certificats</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section des langages */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Choisissez votre langage
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Des langages essentiels du web aux technologies backend, 
              découvrez tous les outils pour devenir développeur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programmingLanguages.map((language) => {
              const progress = getLanguageProgress(language.id);
              
              return (
                <Card key={language.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
                  <CardHeader className="pb-4">
                    <div className={`w-full h-32 ${language.color} rounded-lg flex items-center justify-center mb-4 text-4xl transition-transform group-hover:scale-105`}>
                      {language.icon}
                    </div>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl text-gray-900">{language.name}</CardTitle>
                        <CardDescription className="text-gray-600 mt-1">
                          {language.description}
                        </CardDescription>
                      </div>
                      <Badge className={getDifficultyColor(language.difficulty)}>
                        {language.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <BookOpen className="w-4 h-4" />
                          <span>{language.totalLessons} leçons</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>{language.estimatedTime}</span>
                        </div>
                      </div>
                      
                      {progress > 0 && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Progression</span>
                            <span className="font-medium text-blue-600">{progress}%</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                      )}
                      
                      <Link to={`/course/${language.id}`} className="block">
                        <Button className="w-full group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                          {progress > 0 ? 'Continuer' : 'Commencer'}
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold">CodeLearning</h3>
          </div>
          <p className="text-gray-400 mb-8">
            Votre plateforme pour apprendre la programmation de manière interactive et progressive.
          </p>
          <div className="text-sm text-gray-500">
            © 2024 CodeLearning. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { programmingLanguages, badges } from '../mock';
import { 
  ArrowLeft, 
  Trophy, 
  Target, 
  Calendar, 
  BookOpen, 
  Award, 
  TrendingUp,
  Star,
  Clock,
  CheckCircle2
} from 'lucide-react';

const DashboardPage = ({ userProgress }) => {
  const totalLessonsCompleted = userProgress?.completedLessons?.length || 0;
  const totalQuizzesCompleted = Object.keys(userProgress?.quizScores || {}).length;
  const earnedBadges = userProgress?.earnedBadges || [];
  const totalPoints = userProgress?.totalPoints || 0;

  // Calculer les statistiques par langage
  const languageStats = programmingLanguages.map(lang => {
    const progress = userProgress?.languageProgress?.[lang.id] || { completed: 0, total: lang.totalLessons };
    const completedLessons = progress.completed;
    const percentage = Math.round((completedLessons / progress.total) * 100);
    
    // Calculer les quiz pour ce langage
    const languageQuizzes = Object.entries(userProgress?.quizScores || {})
      .filter(([key]) => key.startsWith(lang.id))
      .map(([, score]) => score);
    
    const averageQuizScore = languageQuizzes.length > 0 
      ? Math.round(languageQuizzes.reduce((acc, score) => acc + score.percentage, 0) / languageQuizzes.length)
      : 0;

    return {
      ...lang,
      completedLessons,
      percentage,
      quizzesCompleted: languageQuizzes.length,
      averageQuizScore
    };
  });

  // Badges disponibles vs obtenus
  const availableBadges = badges.map(badge => ({
    ...badge,
    earned: earnedBadges.includes(badge.id)
  }));

  // Statistiques récentes
  const recentActivity = [
    ...userProgress?.completedLessons?.slice(-5).map(lesson => {
      const [langId, lessonId] = lesson.split('_');
      const lang = programmingLanguages.find(l => l.id === langId);
      return {
        type: 'lesson',
        title: `Leçon ${lessonId} terminée`,
        subtitle: lang?.name || 'Langage inconnu',
        icon: BookOpen,
        color: 'text-blue-600'
      };
    }) || [],
    ...Object.entries(userProgress?.quizScores || {}).slice(-3).map(([key, score]) => {
      const [langId] = key.split('_');
      const lang = programmingLanguages.find(l => l.id === langId);
      return {
        type: 'quiz',
        title: `Quiz réussi à ${score.percentage}%`,
        subtitle: lang?.name || 'Langage inconnu',
        icon: Target,
        color: score.percentage >= 80 ? 'text-green-600' : 'text-yellow-600'
      };
    })
  ].slice(-8);

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
                  Retour à l'accueil
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
                <p className="text-gray-600">Votre progression d'apprentissage</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{totalPoints}</div>
                <div className="text-xs text-gray-600">Points totaux</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistiques générales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Leçons terminées</p>
                  <p className="text-3xl font-bold text-gray-900">{totalLessonsCompleted}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Quiz réussis</p>
                  <p className="text-3xl font-bold text-gray-900">{totalQuizzesCompleted}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Badges obtenus</p>
                  <p className="text-3xl font-bold text-gray-900">{earnedBadges.length}</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-full">
                  <Award className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Points totaux</p>
                  <p className="text-3xl font-bold text-gray-900">{totalPoints}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Progression par langage */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Progression par langage</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {languageStats.map(lang => (
                  <div key={lang.id} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 ${lang.color} rounded-lg flex items-center justify-center text-xl`}>
                          {lang.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{lang.name}</h4>
                          <p className="text-sm text-gray-600">
                            {lang.completedLessons}/{lang.totalLessons} leçons
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900">{lang.percentage}%</div>
                        {lang.quizzesCompleted > 0 && (
                          <div className="text-sm text-gray-600">
                            Quiz: {lang.averageQuizScore}% moy.
                          </div>
                        )}
                      </div>
                    </div>
                    <Progress value={lang.percentage} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{lang.difficulty}</span>
                      {lang.completedLessons > 0 && (
                        <Link 
                          to={`/course/${lang.id}`}
                          className="text-blue-600 hover:underline"
                        >
                          Continuer →
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Activité récente */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>Activité récente</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recentActivity.length > 0 ? (
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => {
                      const Icon = activity.icon;
                      return (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div className={`p-2 bg-white rounded-full ${activity.color}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{activity.title}</p>
                            <p className="text-sm text-gray-600">{activity.subtitle}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>Aucune activité récente</p>
                    <p className="text-sm">Commencez une leçon pour voir votre progression !</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Badges */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5" />
                  <span>Badges obtenus</span>
                </CardTitle>
                <CardDescription>
                  {earnedBadges.length} sur {badges.length} badges débloqués
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {availableBadges.map(badge => (
                  <div 
                    key={badge.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg border ${
                      badge.earned 
                        ? 'bg-yellow-50 border-yellow-200' 
                        : 'bg-gray-50 border-gray-200 opacity-60'
                    }`}
                  >
                    <div className={`text-2xl ${badge.earned ? '' : 'grayscale'}`}>
                      {badge.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-semibold ${badge.earned ? 'text-gray-900' : 'text-gray-500'}`}>
                        {badge.name}
                      </h4>
                      <p className={`text-sm ${badge.earned ? 'text-gray-600' : 'text-gray-400'}`}>
                        {badge.description}
                      </p>
                    </div>
                    {badge.earned && (
                      <CheckCircle2 className="w-5 h-5 text-yellow-600" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Actions rapides */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Actions rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/" className="block">
                  <Button className="w-full justify-start">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Choisir un cours
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start" disabled>
                  <Award className="w-4 h-4 mr-2" />
                  Voir certificats (Prochainement)
                </Button>
                <Button variant="outline" className="w-full justify-start" disabled>
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Statistiques détaillées (Prochainement)
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
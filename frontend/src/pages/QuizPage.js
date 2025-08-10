import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { programmingLanguages, quizzes, updateQuizScore } from '../mock';
import { ArrowLeft, CheckCircle, XCircle, RefreshCw, Trophy, Target } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const QuizPage = ({ userProgress, updateProgress }) => {
  const { languageId, lessonId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  const language = programmingLanguages.find(l => l.id === languageId);
  const lessonQuizzes = quizzes[languageId]?.filter(q => q.lessonId === parseInt(lessonId)) || [];
  const currentQuestion = lessonQuizzes[currentQuestionIndex];
  
  useEffect(() => {
    const quizKey = `${languageId}_${lessonId}`;
    const existingScore = userProgress?.quizScores?.[quizKey];
    setQuizCompleted(!!existingScore);
  }, [userProgress, languageId, lessonId]);

  if (!language || lessonQuizzes.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <Card className="max-w-md border-0 shadow-lg">
          <CardContent className="py-12 text-center">
            <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Quiz non disponible</h2>
            <p className="text-gray-600 mb-6">
              Aucun quiz n'est disponible pour cette leçon pour le moment.
            </p>
            <Link to={`/course/${languageId}`}>
              <Button>Retour au cours</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: answerIndex
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < lessonQuizzes.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleCompleteQuiz();
    }
  };

  const handleCompleteQuiz = () => {
    const score = lessonQuizzes.reduce((acc, question, index) => {
      return selectedAnswers[index] === question.correctAnswer ? acc + 1 : acc;
    }, 0);
    
    const newProgress = updateQuizScore(languageId, parseInt(lessonId), score, lessonQuizzes.length);
    updateProgress(newProgress);
    setShowResults(true);
    
    const percentage = Math.round((score / lessonQuizzes.length) * 100);
    toast({
      title: `Quiz terminé ! ${percentage}% de réussite`,
      description: `Score: ${score}/${lessonQuizzes.length} - ${score === lessonQuizzes.length ? 'Parfait !' : 'Continuez comme ça !'}`,
    });
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadgeColor = (percentage) => {
    if (percentage >= 80) return 'bg-green-100 text-green-800';
    if (percentage >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  if (showResults) {
    const score = lessonQuizzes.reduce((acc, question, index) => {
      return selectedAnswers[index] === question.correctAnswer ? acc + 1 : acc;
    }, 0);
    const percentage = Math.round((score / lessonQuizzes.length) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <Link to={`/course/${languageId}`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour au cours
              </Button>
            </Link>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 py-8">
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center pb-4">
              <div className={`w-20 h-20 ${language.color} rounded-full flex items-center justify-center text-4xl mx-auto mb-4`}>
                {percentage >= 80 ? '🎉' : percentage >= 60 ? '👏' : '💪'}
              </div>
              <CardTitle className="text-3xl text-gray-900 mb-2">
                Quiz terminé !
              </CardTitle>
              <div className="flex justify-center">
                <Badge className={getScoreBadgeColor(percentage)}>
                  {percentage >= 80 ? 'Excellent' : percentage >= 60 ? 'Bien' : 'À améliorer'}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-8">
              <div className="text-center">
                <div className={`text-6xl font-bold ${getScoreColor(percentage)} mb-2`}>
                  {percentage}%
                </div>
                <p className="text-gray-600 text-lg">
                  {score} bonne{score > 1 ? 's' : ''} réponse{score > 1 ? 's' : ''} sur {lessonQuizzes.length}
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 text-center mb-6">
                  Révision des questions
                </h3>
                
                {lessonQuizzes.map((question, index) => {
                  const userAnswer = selectedAnswers[index];
                  const isCorrect = userAnswer === question.correctAnswer;
                  
                  return (
                    <Card key={question.id} className={`border-l-4 ${isCorrect ? 'border-l-green-500 bg-green-50' : 'border-l-red-500 bg-red-50'}`}>
                      <CardContent className="py-4">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 mt-1">
                            {isCorrect ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-600" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-2">
                              Question {index + 1}: {question.question}
                            </h4>
                            <div className="space-y-2">
                              {question.options.map((option, optionIndex) => (
                                <div 
                                  key={optionIndex}
                                  className={`p-2 rounded text-sm ${
                                    optionIndex === question.correctAnswer 
                                      ? 'bg-green-100 text-green-800 font-medium' 
                                      : optionIndex === userAnswer && !isCorrect
                                      ? 'bg-red-100 text-red-800'
                                      : 'text-gray-600'
                                  }`}
                                >
                                  {option}
                                  {optionIndex === question.correctAnswer && (
                                    <span className="ml-2">✓ Bonne réponse</span>
                                  )}
                                  {optionIndex === userAnswer && !isCorrect && (
                                    <span className="ml-2">✗ Votre réponse</span>
                                  )}
                                </div>
                              ))}
                            </div>
                            <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                              <p className="text-sm text-blue-800">
                                <strong>Explication :</strong> {question.explanation}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <div className="flex justify-center space-x-4 pt-6">
                <Button onClick={handleRetakeQuiz} variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refaire le quiz
                </Button>
                <Link to={`/course/${languageId}`}>
                  <Button>
                    Continuer le cours
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to={`/course/${languageId}/lesson/${lessonId}`}>
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Retour à la leçon
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 ${language.color} rounded-lg flex items-center justify-center text-lg`}>
                  {language.icon}
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-gray-900">Quiz {language.name}</h1>
                  <p className="text-sm text-gray-600">Leçon {lessonId}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Trophy className="w-4 h-4" />
              <span>{userProgress?.totalPoints || 0} pts</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progression */}
        <Card className="mb-6 border-0 shadow-lg">
          <CardContent className="py-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">
                Question {currentQuestionIndex + 1} sur {lessonQuizzes.length}
              </span>
              <span className="text-sm text-gray-600">
                {Math.round(((currentQuestionIndex + 1) / lessonQuizzes.length) * 100)}%
              </span>
            </div>
            <Progress 
              value={((currentQuestionIndex + 1) / lessonQuizzes.length) * 100} 
              className="h-2" 
            />
          </CardContent>
        </Card>

        {/* Question actuelle */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">
              {currentQuestion.question}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                  selectedAnswers[currentQuestionIndex] === index
                    ? 'border-blue-500 bg-blue-50 text-blue-900'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswers[currentQuestionIndex] === index
                      ? 'border-blue-500 bg-blue-500 text-white'
                      : 'border-gray-300'
                  }`}>
                    {selectedAnswers[currentQuestionIndex] === index && (
                      <CheckCircle className="w-4 h-4" />
                    )}
                  </div>
                  <span className="font-medium">{option}</span>
                </div>
              </button>
            ))}
            
            <div className="flex justify-between items-center pt-6">
              <div className="text-sm text-gray-600">
                {Object.keys(selectedAnswers).length > currentQuestionIndex 
                  ? 'Réponse sélectionnée' 
                  : 'Choisissez une réponse'
                }
              </div>
              
              <Button
                onClick={handleNextQuestion}
                disabled={selectedAnswers[currentQuestionIndex] === undefined}
                className="min-w-[120px]"
              >
                {currentQuestionIndex === lessonQuizzes.length - 1 ? 'Terminer' : 'Question suivante'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuizPage;
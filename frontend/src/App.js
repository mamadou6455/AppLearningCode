import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import HomePage from "./pages/HomePage";
import CoursePage from "./pages/CoursePage";
import LessonPage from "./pages/LessonPage";
import QuizPage from "./pages/QuizPage";
import DashboardPage from "./pages/DashboardPage";
import { getUserProgress } from "./mock";

function App() {
  const [userProgress, setUserProgress] = useState(null);

  useEffect(() => {
    const progress = getUserProgress();
    setUserProgress(progress);
  }, []);

  const updateProgress = (newProgress) => {
    setUserProgress(newProgress);
  };

  if (!userProgress) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="App min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage userProgress={userProgress} />} />
          <Route 
            path="/course/:languageId" 
            element={<CoursePage userProgress={userProgress} updateProgress={updateProgress} />} 
          />
          <Route 
            path="/course/:languageId/lesson/:lessonId" 
            element={<LessonPage userProgress={userProgress} updateProgress={updateProgress} />} 
          />
          <Route 
            path="/course/:languageId/lesson/:lessonId/quiz" 
            element={<QuizPage userProgress={userProgress} updateProgress={updateProgress} />} 
          />
          <Route 
            path="/dashboard" 
            element={<DashboardPage userProgress={userProgress} />} 
          />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
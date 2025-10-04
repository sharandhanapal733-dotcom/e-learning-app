import { useState, useEffect } from 'react';

export const useCourseProgress = (courseId) => {
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem(`courseProgress_${courseId}`);
    return saved ? JSON.parse(saved) : {
      completedLessons: [],
      quizScores: {},
      currentModule: 0,
      currentLesson: 0,
      lastAccessed: new Date().toISOString()
    };
  });

  useEffect(() => {
    localStorage.setItem(`courseProgress_${courseId}`, JSON.stringify(progress));
  }, [progress, courseId]);

  const markLessonCompleted = (lessonId) => {
    setProgress(prev => ({
      ...prev,
      completedLessons: [...new Set([...prev.completedLessons, lessonId])],
      lastAccessed: new Date().toISOString()
    }));
  };

  const setQuizScore = (quizId, score) => {
    setProgress(prev => ({
      ...prev,
      quizScores: { ...prev.quizScores, [quizId]: score },
      lastAccessed: new Date().toISOString()
    }));
  };

  const setCurrentPosition = (moduleIndex, lessonIndex) => {
    setProgress(prev => ({
      ...prev,
      currentModule: moduleIndex,
      currentLesson: lessonIndex,
      lastAccessed: new Date().toISOString()
    }));
  };

  const calculateOverallProgress = (courseData) => {
    const totalLessons = courseData.modules.reduce(
      (total, module) => total + module.lessons.length, 0
    );
    const completed = progress.completedLessons.length;
    return totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0;
  };

  const isModuleCompleted = (module) => {
    const lessonsCompleted = module.lessons.every(lesson => 
      progress.completedLessons.includes(lesson.id)
    );
    const quizPassed = progress.quizScores[module.quiz.id] >= module.quiz.passingScore;
    return lessonsCompleted && quizPassed;
  };

  const resetProgress = () => {
    setProgress({
      completedLessons: [],
      quizScores: {},
      currentModule: 0,
      currentLesson: 0,
      lastAccessed: new Date().toISOString()
    });
  };

  // Get the last accessed position
  const getLastPosition = () => {
    return {
      module: progress.currentModule,
      lesson: progress.currentLesson
    };
  };

  return {
    progress,
    markLessonCompleted,
    setQuizScore,
    setCurrentPosition,
    calculateOverallProgress,
    isModuleCompleted,
    resetProgress,
    getLastPosition
  };
};
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { GlobalStyle, createThemedComponents } from './styles/GlobalStyles';
import { useCourseProgress } from './hooks/useCourseProgress';
import { coursesData } from './data/courseData';
import CoursesOverview from './components/Courses/CoursesOverview';
import CourseOverview from './components/Course/CourseOverview';
import LessonView from './components/Lesson/LessonView';
import QuizComponent from './components/Quiz/QuizComponent';
import Certificate from './components/Certificate/Certificate';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import AuthModal from './components/Auth/AuthModal';
import UserMenu from './components/User/UserMenu';
import UserProfile from './components/User/UserProfile';
import './App.css';

// Main app component
function AppContent() {
  const [currentCourse, setCurrentCourse] = useState(coursesData[0]);
  const [showCoursesOverview, setShowCoursesOverview] = useState(true);
  const [currentView, setCurrentView] = useState(() => {
    const saved = localStorage.getItem('currentView');
    return saved || 'overview';
  });
  const [currentModule, setCurrentModule] = useState(() => {
    const saved = localStorage.getItem('currentModule');
    return saved ? parseInt(saved) : 0;
  });
  const [currentLesson, setCurrentLesson] = useState(() => {
    const saved = localStorage.getItem('currentLesson');
    return saved ? parseInt(saved) : 0;
  });
  const [showCertificate, setShowCertificate] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const { currentUser, loading } = useAuth();
  const progress = useCourseProgress(currentUser ? `user_${currentUser.id}_course_${currentCourse.id}` : 'anonymous');
  const theme = useTheme();
  const { Container, Card, Button, ProgressBar } = createThemedComponents(theme.colors);

  // Save current state to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized && !showCoursesOverview) {
      localStorage.setItem('currentView', currentView);
      localStorage.setItem('currentModule', currentModule.toString());
      localStorage.setItem('currentLesson', currentLesson.toString());
    }
  }, [currentView, currentModule, currentLesson, isInitialized, showCoursesOverview]);

  // Initialize app with saved state
  useEffect(() => {
    if (!loading) {
      // Validate saved positions
      const isValidModule = currentModule < currentCourse.modules.length;
      const isValidLesson = isValidModule && currentLesson < currentCourse.modules[currentModule]?.lessons.length;
      
      // If saved positions are invalid, reset to overview
      if (!isValidModule || !isValidLesson) {
        setCurrentView('overview');
        setCurrentModule(0);
        setCurrentLesson(0);
      }
      
      setIsInitialized(true);
    }
  }, [loading, currentModule, currentLesson, currentCourse]);

  // Show loading while checking auth
  if (loading || !isInitialized) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: theme.colors.background,
        color: theme.colors.text,
        flexDirection: 'column',
        gap: '20px'
      }}>
        <div className="loading-spinner"></div>
        <p style={{ color: theme.colors.textSecondary }}>Loading your learning journey...</p>
      </div>
    );
  }

  const handleSelectCourse = (course) => {
    setCurrentCourse(course);
    setShowCoursesOverview(false);
    setCurrentView('overview');
    setCurrentModule(0);
    setCurrentLesson(0);
  };

  const handleBackToCourses = () => {
    setShowCoursesOverview(true);
    setCurrentView('overview');
  };

  const startCourse = () => {
    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }
    setCurrentView('lesson');
    // Use the current saved position
    setCurrentModule(progress.progress.currentModule);
    setCurrentLesson(progress.progress.currentLesson);
  };

  const navigateToLesson = (moduleIndex, lessonIndex) => {
    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }
    setCurrentModule(moduleIndex);
    setCurrentLesson(lessonIndex);
    setCurrentView('lesson');
    progress.setCurrentPosition(moduleIndex, lessonIndex);
  };

  const handleLessonComplete = () => {
    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }
    const lesson = currentCourse.modules[currentModule].lessons[currentLesson];
    progress.markLessonCompleted(lesson.id);
    
    if (currentLesson < currentCourse.modules[currentModule].lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
      progress.setCurrentPosition(currentModule, currentLesson + 1);
    } else {
      setCurrentView('quiz');
    }
  };

  const handleNextLesson = () => {
    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }
    if (currentLesson < currentCourse.modules[currentModule].lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
      progress.setCurrentPosition(currentModule, currentLesson + 1);
    } else {
      setCurrentView('quiz');
    }
  };

  const handlePreviousLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
      progress.setCurrentPosition(currentModule, currentLesson - 1);
    }
  };

  const handleQuizComplete = (score) => {
    const module = currentCourse.modules[currentModule];
    progress.setQuizScore(module.quiz.id, score);
    
    if (currentModule < currentCourse.modules.length - 1) {
      setCurrentModule(currentModule + 1);
      setCurrentLesson(0);
      setCurrentView('lesson');
      progress.setCurrentPosition(currentModule + 1, 0);
    } else {
      setShowCertificate(true);
    }
  };

  const handleBackToLessons = () => {
    setCurrentView('lesson');
  };

  const handleResetProgress = () => {
    progress.resetProgress();
    setCurrentModule(0);
    setCurrentLesson(0);
    setCurrentView('overview');
    // Clear saved state
    localStorage.removeItem('currentView');
    localStorage.removeItem('currentModule');
    localStorage.removeItem('currentLesson');
  };

  const continueFromLastPosition = () => {
    setCurrentView('lesson');
    // Use the saved progress position
    setCurrentModule(progress.progress.currentModule);
    setCurrentLesson(progress.progress.currentLesson);
  };

  const goToOverview = () => {
    setCurrentView('overview');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'overview':
        return (
          <CourseOverview 
            course={currentCourse} 
            progress={progress}
            onStartCourse={startCourse}
            onResetProgress={handleResetProgress}
            onContinue={continueFromLastPosition}
            onBackToCourses={handleBackToCourses}
            themedComponents={{ Card, Button, ProgressBar }}
            currentUser={currentUser}
          />
        );

      case 'lesson':
        const module = currentCourse.modules[currentModule];
        if (!module) {
          // Fallback if module doesn't exist
          setCurrentView('overview');
          setCurrentModule(0);
          setCurrentLesson(0);
          return null;
        }
        
        const lesson = module.lessons[currentLesson];
        if (!lesson) {
          // Fallback if lesson doesn't exist
          setCurrentView('overview');
          setCurrentModule(0);
          setCurrentLesson(0);
          return null;
        }
        
        const hasPrevious = currentLesson > 0;
        
        return (
          <LessonView
            lesson={lesson}
            isCompleted={progress.progress.completedLessons.includes(lesson.id)}
            onComplete={handleLessonComplete}
            onNext={handleNextLesson}
            onPrevious={handlePreviousLesson}
            hasPrevious={hasPrevious}
            onBackToOverview={goToOverview}
            themedComponents={{ Card, Button }}
            currentUser={currentUser}
            currentPosition={{ module: currentModule + 1, lesson: currentLesson + 1 }}
            totalLessons={module.lessons.length}
          />
        );

      case 'quiz':
        const currentModuleData = currentCourse.modules[currentModule];
        if (!currentModuleData) {
          setCurrentView('overview');
          return null;
        }
        
        return (
          <QuizComponent
            quiz={currentModuleData.quiz}
            moduleTitle={currentModuleData.title}
            onComplete={handleQuizComplete}
            onBackToLessons={handleBackToLessons}
            onBackToOverview={goToOverview}
            themedComponents={{ Card, Button }}
            currentUser={currentUser}
          />
        );

      default:
        return null;
    }
  };

  return (
    <>
      <GlobalStyle theme={theme.colors} />
      <ThemeToggle />
      
      {/* Header with Auth */}
      <header style={{
        background: theme.colors.cardBackground,
        borderBottom: `1px solid ${theme.colors.border}`,
        padding: '15px 0',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <Container>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <h1 
                style={{ 
                  color: theme.colors.text, 
                  margin: 0,
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  cursor: 'pointer'
                }} 
                onClick={handleBackToCourses}
              >
                NSS LearningPlatform
              </h1>
              
              {!showCoursesOverview && (
                <div style={{
                  padding: '6px 15px',
                  background: theme.colors.primary,
                  color: 'white',
                  borderRadius: '15px',
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                  {currentCourse.title}
                </div>
              )}
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              {currentUser ? (
                <>
                  <UserMenu onProfileClick={() => setShowProfile(true)} />
                </>
              ) : (
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Button 
                    onClick={() => setShowAuthModal(true)}
                    style={{
                      background: 'transparent',
                      border: `2px solid ${theme.colors.primary}`,
                      color: theme.colors.primary
                    }}
                  >
                    Sign In
                  </Button>
                  <Button 
                    primary 
                    onClick={() => setShowAuthModal(true)}
                  >
                    Get Started
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Container>
      </header>

      <Container style={{ paddingTop: '40px', paddingBottom: '40px', minHeight: '100vh' }}>
        {/* Show Courses Overview or Course Content */}
        {showCoursesOverview ? (
          <CoursesOverview 
            onSelectCourse={handleSelectCourse}
            themedComponents={{ Card, Button }}
            currentUser={currentUser}
          />
        ) : (
          <>
            {/* Current Position Indicator (shown when not on overview) */}
            {currentView !== 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  background: theme.colors.cardBackground,
                  border: `1px solid ${theme.colors.border}`,
                  padding: '12px 20px',
                  borderRadius: '10px',
                  marginBottom: '20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '10px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    background: theme.colors.primary,
                    borderRadius: '50%',
                    animation: 'pulse 2s infinite'
                  }}></div>
                  <span style={{ fontWeight: '600', color: theme.colors.text }}>
                    {currentView === 'lesson' ? 
                      `Module ${currentModule + 1}, Lesson ${currentLesson + 1}` : 
                      'Quiz'
                    }
                  </span>
                  <span style={{ opacity: 0.7, fontSize: '14px' }}>
                    • {currentCourse.title}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <Button 
                    onClick={goToOverview}
                    style={{
                      background: 'transparent',
                      border: `1px solid ${theme.colors.border}`,
                      color: theme.colors.text,
                      padding: '6px 12px',
                      fontSize: '14px'
                    }}
                  >
                    ← Course Overview
                  </Button>
                  <Button 
                    onClick={handleBackToCourses}
                    style={{
                      background: 'transparent',
                      border: `1px solid ${theme.colors.primary}`,
                      color: theme.colors.primary,
                      padding: '6px 12px',
                      fontSize: '14px'
                    }}
                  >
                    ← All Courses
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Welcome message for logged-in users */}
            {currentUser && currentView === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  background: `linear-gradient(135deg, ${theme.colors.primary}20, ${theme.colors.primary}10)`,
                  color: theme.colors.text,
                  padding: '25px',
                  borderRadius: '15px',
                  marginBottom: '30px',
                  border: `1px solid ${theme.colors.primary}30`
                }}
              >
                <h2 style={{ margin: '0 0 10px 0', fontSize: '1.8rem' }}>
                  {progress.progress.currentModule > 0 || progress.progress.currentLesson > 0 ? 
                    `Welcome back, ${currentUser.name}! 👋` : 
                    `Hello, ${currentUser.name}! 👋`
                  }
                </h2>
                <p style={{ margin: 0, opacity: 0.9, fontSize: '1.1rem' }}>
                  {progress.progress.currentModule > 0 || progress.progress.currentLesson > 0 ? 
                    `Continue your learning journey from where you left off` :
                    `Ready to start learning ${currentCourse.title}!`
                  }
                </p>
              </motion.div>
            )}

            {/* Login prompt for anonymous users */}
            {!currentUser && !showCoursesOverview && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  background: theme.colors.cardBackground,
                  border: `2px solid ${theme.colors.primary}`,
                  padding: '25px',
                  borderRadius: '15px',
                  marginBottom: '30px',
                  textAlign: 'center'
                }}
              >
                <h3 style={{ color: theme.colors.text, marginBottom: '10px' }}>
                  🚀 Unlock Your Learning Potential
                </h3>
                <p style={{ color: theme.colors.textSecondary, marginBottom: '20px' }}>
                  Sign in to save your progress, track your achievements, and personalize your learning experience!
                </p>
                <Button primary onClick={() => setShowAuthModal(true)}>
                  Sign In to Continue Learning
                </Button>
              </motion.div>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={currentView}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderCurrentView()}
              </motion.div>
            </AnimatePresence>

            {/* Module Navigation (shown when in lesson or quiz) */}
            {currentView !== 'overview' && (
              <div style={{ marginTop: '20px' }}>
                <h3 style={{ color: theme.colors.text, marginBottom: '15px' }}>Course Progress</h3>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: `repeat(${currentCourse.modules.length}, 1fr)`,
                  gap: '10px',
                  marginTop: '10px'
                }}>
                  {currentCourse.modules.map((module, index) => {
                    const isCompleted = progress.isModuleCompleted(module);
                    const isCurrent = index === currentModule;
                    
                    return (
                      <div key={module.id} style={{ textAlign: 'center' }}>
                        <div
                          onClick={() => navigateToLesson(index, 0)}
                          style={{
                            background: isCurrent ? theme.colors.primary : 
                                       isCompleted ? '#28a745' : theme.colors.border,
                            color: isCurrent || isCompleted ? 'white' : theme.colors.textSecondary,
                            padding: '10px',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            fontSize: '14px',
                            fontWeight: '500'
                          }}
                        >
                          Module {index + 1}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </Container>

      {showCertificate && (
        <Certificate 
          course={currentCourse}
          progress={progress}
          onClose={() => setShowCertificate(false)}
          themedComponents={{ Card, Button }}
          currentUser={currentUser}
        />
      )}

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />

      {/* User Profile Modal */}
      <UserProfile 
        isOpen={showProfile} 
        onClose={() => setShowProfile(false)} 
      />

      {/* Footer */}
      <footer style={{
        background: theme.colors.cardBackground,
        borderTop: `1px solid ${theme.colors.border}`,
        padding: '30px 0',
        marginTop: '50px'
      }}>
        <Container>
          <div style={{ 
            textAlign: 'center', 
            color: theme.colors.textSecondary,
            fontSize: '14px'
          }}>
            <p>© 2025 NSS LearningPlatform - Interactive E-Learning Platform</p>
            <p>****************************************************************</p>
          </div>
        </Container>
      </footer>
    </>
  );
}

// Wrap the app with providers
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiAward, FiArrowRight, FiArrowLeft, FiUser } from 'react-icons/fi';

const QuizComponent = ({ 
  quiz, 
  onComplete, 
  moduleTitle, 
  onBackToLessons, 
  onBackToOverview,  // Add this prop
  themedComponents, 
  currentUser 
}) => {
  const { Card, Button } = themedComponents;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const calculateScore = () => {
    const correctAnswers = quiz.questions.filter(
      (question, index) => selectedAnswers[question.id] === question.correctAnswer
    ).length;
    
    const calculatedScore = (correctAnswers / quiz.questions.length) * 100;
    setScore(calculatedScore);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const isPassed = score >= quiz.passingScore;

  if (showResults) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              style={{
                width: '80px',
                height: '80px',
                background: isPassed ? '#d4edda' : '#f8d7da',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}
            >
              <FiAward size={40} color={isPassed ? '#155724' : '#721c24'} />
            </motion.div>
            
            <h2 style={{ marginBottom: '10px' }}>{isPassed ? 'Congratulations!' : 'Quiz Completed'}</h2>
            <p style={{ fontSize: '18px', margin: '10px 0' }}>
              Your score: <strong>{score.toFixed(1)}%</strong>
            </p>
            <p style={{ 
              color: isPassed ? '#155724' : '#721c24',
              marginBottom: '30px',
              padding: '10px',
              background: isPassed ? '#d4edda' : '#f8d7da',
              borderRadius: '5px',
              fontWeight: '600'
            }}>
              {isPassed 
                ? `You passed the quiz! Minimum required: ${quiz.passingScore}%`
                : `You need ${quiz.passingScore}% to pass. Try again!`
              }
            </p>
            
            {currentUser && (
              <div style={{
                background: 'rgba(102, 126, 234, 0.1)',
                padding: '10px',
                borderRadius: '8px',
                marginBottom: '20px',
                fontSize: '14px'
              }}>
                <FiUser size={16} style={{ display: 'inline', marginRight: '5px' }} />
                Completed by: {currentUser.name}
              </div>
            )}
            
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button onClick={resetQuiz}>
                Try Again
              </Button>
              {isPassed ? (
                <Button primary onClick={() => onComplete(score)}>
                  Continue to Next Module
                  <FiArrowRight style={{ marginLeft: '8px' }} />
                </Button>
              ) : (
                <Button onClick={onBackToLessons}>
                  Back to Lessons
                </Button>
              )}
            </div>
          </div>
        </Card>
      </motion.div>
    );
  }

  const question = quiz.questions[currentQuestion];
  const isLastQuestion = currentQuestion === quiz.questions.length - 1;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <div style={{ marginBottom: '25px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '5px' }}>{quiz.title}</h2>
          <p style={{ color: 'inherit', opacity: 0.8 }}>Module: {moduleTitle}</p>
          {currentUser && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              marginTop: '5px',
              fontSize: '14px',
              opacity: 0.8
            }}>
              <FiUser size={14} />
              {currentUser.name}
            </div>
          )}
        </div>

        <div style={{ marginBottom: '30px' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            marginBottom: '10px',
            fontSize: '14px'
          }}>
            <span>Question {currentQuestion + 1} of {quiz.questions.length}</span>
            <span>{Math.round(((currentQuestion + 1) / quiz.questions.length) * 100)}% Complete</span>
          </div>
          <div style={{
            width: '100%',
            height: '6px',
            background: '#e0e0e0',
            borderRadius: '3px'
          }}>
            <div style={{
              width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%`,
              height: '100%',
              background: '#667eea',
              borderRadius: '3px',
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ marginBottom: '20px', fontSize: '1.2rem' }}>{question.question}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {question.options.map((option, index) => (
              <label key={index} style={{
                display: 'flex',
                alignItems: 'center',
                padding: '15px 20px',
                border: `2px solid ${
                  selectedAnswers[question.id] === index ? '#667eea' : '#e0e0e0'
                }`,
                borderRadius: '10px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                background: selectedAnswers[question.id] === index ? 'rgba(102, 126, 234, 0.1)' : 'transparent'
              }}>
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  checked={selectedAnswers[question.id] === index}
                  onChange={() => handleAnswerSelect(question.id, index)}
                  style={{ marginRight: '15px', transform: 'scale(1.2)' }}
                />
                <span style={{ fontSize: '1rem' }}>{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <Button 
            onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
            disabled={currentQuestion === 0}
          >
            <FiArrowLeft style={{ marginRight: '8px' }} />
            Previous
          </Button>
          
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {/* ADD THIS OVERVIEW BUTTON */}
            <Button onClick={onBackToOverview}>
              ← Overview
            </Button>
            
            <Button onClick={onBackToLessons}>
              Back to Lessons
            </Button>
            
            {isLastQuestion ? (
              <Button 
                primary 
                onClick={calculateScore}
                disabled={selectedAnswers[question.id] === undefined}
              >
                <FiCheck style={{ marginRight: '8px' }} />
                Submit Quiz
              </Button>
            ) : (
              <Button 
                primary 
                onClick={() => setCurrentQuestion(prev => prev + 1)}
                disabled={selectedAnswers[question.id] === undefined}
              >
                Next Question
                <FiArrowRight style={{ marginLeft: '8px' }} />
              </Button>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default QuizComponent;
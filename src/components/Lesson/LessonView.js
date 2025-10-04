import React from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiVideo, FiBook, FiArrowRight, FiArrowLeft, FiUser, FiYoutube, FiFilm, FiBarChart2 } from 'react-icons/fi';
import VideoPlayer from '../Video/VideoPlayer';

const LessonView = ({ 
  lesson, 
  isCompleted, 
  onComplete, 
  onNext, 
  onPrevious, 
  hasPrevious,
  onBackToOverview, 
  themedComponents, 
  currentUser,
  currentPosition,
  totalLessons 
}) => {
  const { Card, Button } = themedComponents;

  // Get video platform icon
  const getVideoIcon = () => {
    switch (lesson.videoType) {
      case 'youtube':
        return <FiYoutube color="#FF0000" />;
      case 'vimeo':
        return <FiFilm color="#1ab7ea" />;
      default:
        return <FiVideo color="#667eea" />;
    }
  };

  // Get video platform name
  const getVideoPlatform = () => {
    switch (lesson.videoType) {
      case 'youtube':
        return 'YouTube';
      case 'vimeo':
        return 'Vimeo';
      default:
        return 'Video';
    }
  };

  const lessonProgress = currentPosition && totalLessons ? 
    Math.round((currentPosition.lesson / totalLessons) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        {/* Lesson Progress Indicator */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
          padding: '15px 20px',
          borderRadius: '10px',
          marginBottom: '25px',
          border: '1px solid rgba(102, 126, 234, 0.2)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: `${lessonProgress}%`,
            height: '100%',
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2))',
            transition: 'width 0.5s ease'
          }}></div>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            position: 'relative',
            zIndex: 1,
            flexWrap: 'wrap',
            gap: '10px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FiBarChart2 color="#667eea" />
              <span style={{ fontWeight: '600', color: '#667eea' }}>
                Module {currentPosition?.module || 1} • Lesson {currentPosition?.lesson || 1} of {totalLessons || '?'}
              </span>
            </div>
            <div style={{ 
              background: 'rgba(255, 255, 255, 0.9)', 
              padding: '5px 12px', 
              borderRadius: '15px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#667eea'
            }}>
              {lessonProgress}% through module
            </div>
          </div>
        </div>

        {/* Lesson Header */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '10px', 
          marginBottom: '20px', 
          flexWrap: 'wrap',
          paddingBottom: '15px',
          borderBottom: '1px solid rgba(0,0,0,0.1)'
        }}>
          {lesson.type === 'video' ? getVideoIcon() : <FiBook color="#667eea" />}
          <h2 style={{ fontSize: '1.5rem', margin: 0, flex: 1 }}>{lesson.title}</h2>
          <span style={{ 
            background: lesson.type === 'video' ? 
                       (lesson.videoType === 'youtube' ? '#FF0000' : 
                        lesson.videoType === 'vimeo' ? '#1ab7ea' : '#667eea') : '#667eea', 
            color: 'white', 
            padding: '6px 14px', 
            borderRadius: '15px', 
            fontSize: '14px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            {lesson.type === 'video' ? getVideoPlatform() : 'Reading'} • {lesson.duration}
          </span>
        </div>

        {/* User Info */}
        {currentUser && (
          <div style={{
            background: 'rgba(102, 126, 234, 0.1)',
            padding: '12px 16px',
            borderRadius: '8px',
            marginBottom: '25px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '14px',
            borderLeft: '4px solid #667eea'
          }}>
            <FiUser size={16} color="#667eea" />
            <div>
              <strong>{currentUser.name}</strong> ({currentUser.role}) • Continue your learning journey
            </div>
          </div>
        )}

        {/* Video Player */}
        {lesson.type === 'video' && lesson.videoUrl && (
          <VideoPlayer 
            videoUrl={lesson.videoUrl}
            videoType={lesson.videoType}
            title={lesson.title}
          />
        )}

        {/* Demo Video Placeholder */}
        {lesson.type === 'video' && (!lesson.videoUrl || lesson.videoUrl === "https://example.com/video1") && (
          <div style={{ 
            background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)', 
            borderRadius: '10px', 
            padding: '40px 30px',
            marginBottom: '25px',
            textAlign: 'center',
            border: '2px dashed #dee2e6',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '15px',
              right: '15px',
              background: '#6c757d',
              color: 'white',
              padding: '2px 8px',
              borderRadius: '10px',
              fontSize: '10px',
              fontWeight: '600'
            }}>
              Demo
            </div>
            
            <FiVideo size={48} color="#6c757d" style={{ marginBottom: '15px' }} />
            <h3 style={{ color: '#6c757d', marginBottom: '10px' }}>Video Content Placeholder</h3>
            <p style={{ color: '#6c757d', marginBottom: '20px' }}>
              In a real application, this would display the actual video content for:
            </p>
            <div style={{ 
              background: 'rgba(255, 255, 255, 0.8)', 
              padding: '15px', 
              borderRadius: '8px',
              fontSize: '14px',
              textAlign: 'left',
              maxWidth: '400px',
              margin: '0 auto'
            }}>
              <div style={{ marginBottom: '8px' }}>
                <strong>Lesson:</strong> {lesson.title}
              </div>
              <div style={{ marginBottom: '8px' }}>
                <strong>Video Type:</strong> {lesson.videoType || 'direct'}
              </div>
              <div>
                <strong>Demo URL:</strong> {lesson.videoUrl || 'Not specified'}
              </div>
            </div>
          </div>
        )}

        {/* Lesson Content */}
        <div style={{ 
          background: 'rgba(0,0,0,0.02)',
          padding: '25px', 
          borderRadius: '10px',
          marginBottom: '25px',
          lineHeight: '1.7',
          fontSize: '1.1rem',
          border: '1px solid rgba(0,0,0,0.05)'
        }}>
          {lesson.content}
        </div>

        {/* Video Description for Video Lessons */}
        {lesson.type === 'video' && (
          <div style={{
            background: 'rgba(102, 126, 234, 0.05)',
            padding: '18px 22px',
            borderRadius: '8px',
            marginBottom: '25px',
            borderLeft: '4px solid #667eea'
          }}>
            <h4 style={{ margin: '0 0 12px 0', color: '#667eea', display: 'flex', alignItems: 'center', gap: '8px' }}>
              🎥 Video Lesson
            </h4>
            <p style={{ margin: 0, fontSize: '14px', opacity: 0.8, lineHeight: '1.6' }}>
              Watch the video above to learn about <strong>{lesson.title.toLowerCase()}</strong>. 
              {lesson.videoType === 'youtube' && ' This video is hosted on YouTube.'}
              {lesson.videoType === 'vimeo' && ' This video is hosted on Vimeo.'}
              {' Take your time to understand the concepts before moving to the next lesson.'}
            </p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div style={{ 
    display: 'flex', 
    gap: '10px', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    flexWrap: 'wrap',
    paddingTop: '20px',
    borderTop: '1px solid rgba(0,0,0,0.1)'
  }}>
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
      {hasPrevious && (
        <Button onClick={onPrevious}>
          <FiArrowLeft style={{ marginRight: '8px' }} />
          Previous Lesson
        </Button>
      )}
      <Button onClick={onBackToOverview}>
        ← Overview
      </Button>
    </div>
    
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
      {!isCompleted && (
        <Button primary onClick={onComplete}>
          <FiCheck style={{ marginRight: '8px' }} />
          Mark as Complete
        </Button>
      )}
      <Button onClick={onNext}>
        {isCompleted ? 'Next Lesson' : 'Skip for Now'}
        <FiArrowRight style={{ marginLeft: '8px' }} />
      </Button>
    </div>
  </div>

        {/* Completion Status */}
        {isCompleted && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            style={{
              background: 'linear-gradient(135deg, #d4edda, #c3e6cb)',
              color: '#155724',
              padding: '18px',
              borderRadius: '8px',
              marginTop: '20px',
              textAlign: 'center',
              border: '1px solid #c3e6cb',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}
          >
            <div style={{
              width: '24px',
              height: '24px',
              background: '#28a745',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '14px'
            }}>
              ✓
            </div>
            Lesson Completed - Ready to proceed to the next lesson!
          </motion.div>
        )}

        {/* Lesson Tips */}
        <div style={{
          marginTop: '25px',
          padding: '18px',
          background: 'rgba(255, 193, 7, 0.1)',
          borderRadius: '8px',
          border: '1px solid rgba(255, 193, 7, 0.3)',
          fontSize: '14px'
        }}>
          <strong style={{ color: '#856404', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            💡 Learning Tips
          </strong>
          <ul style={{ margin: '10px 0 0 20px', padding: 0, lineHeight: '1.6' }}>
            {lesson.type === 'video' ? (
              <>
                <li>Adjust playback speed if the content is too fast or slow</li>
                <li>Take notes while watching to reinforce learning</li>
                <li>Re-watch sections you find challenging</li>
                {lesson.videoType === 'youtube' && <li>Use YouTube captions for better understanding</li>}
                <li>Pause and practice concepts as you learn them</li>
              </>
            ) : (
              <>
                <li>Read carefully and take your time with each concept</li>
                <li>Take notes on key points and examples</li>
                <li>Try to apply what you learn with small exercises</li>
                <li>Review previous lessons if you need a refresher</li>
              </>
            )}
          </ul>
        </div>

        {/* Progress Summary */}
        <div style={{
          marginTop: '20px',
          padding: '15px',
          background: 'rgba(108, 117, 125, 0.05)',
          borderRadius: '8px',
          fontSize: '12px',
          color: '#6c757d',
          textAlign: 'center'
        }}>
          You are {lessonProgress}% through this module • 
          Lesson {currentPosition?.lesson || 1} of {totalLessons || '?'} • 
          {isCompleted ? ' Completed ✓' : ' In Progress...'}
        </div>
      </Card>
    </motion.div>
  );
};

export default LessonView;
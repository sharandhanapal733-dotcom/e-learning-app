import React from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiBarChart2, FiPlay, FiRefreshCw, FiBook, FiUser, FiArrowRight } from 'react-icons/fi';

const CourseOverview = ({ course, progress, onStartCourse, onResetProgress, onContinue, themedComponents, currentUser }) => {
  const { Card, Button, ProgressBar } = themedComponents;
  const overallProgress = progress.calculateOverallProgress(course);

  const hasProgress = progress.progress.currentModule > 0 || progress.progress.currentLesson > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <img 
            src={course.image} 
            alt={course.title}
            style={{
              width: '200px',
              height: '150px',
              borderRadius: '15px',
              objectFit: 'cover',
              flexShrink: 0
            }}
          />
          <div style={{ flex: 1, minWidth: '300px' }}>
            <h1 style={{ marginBottom: '10px', color: 'inherit', fontSize: '2rem' }}>{course.title}</h1>
            <p style={{ color: 'inherit', opacity: 0.8, marginBottom: '20px', fontSize: '1.1rem' }}>{course.description}</p>
            
            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', opacity: 0.8 }}>
                <FiClock />
                <span>{course.duration}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', opacity: 0.8 }}>
                <FiBarChart2 />
                <span>{course.level}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', opacity: 0.8 }}>
                <FiBook />
                <span>{course.modules.length} modules</span>
              </div>
              {currentUser && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', opacity: 0.8 }}>
                  <FiUser />
                  <span>{currentUser.role}</span>
                </div>
              )}
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span>Course Progress</span>
                <span>{overallProgress}%</span>
              </div>
              <ProgressBar progress={overallProgress} />
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
              {hasProgress ? (
                <>
                  <Button primary onClick={onContinue}>
                    <FiArrowRight style={{ marginRight: '8px' }} />
                    Continue Learning
                  </Button>
                  <Button onClick={onStartCourse}>
                    <FiPlay style={{ marginRight: '8px' }} />
                    Start from Beginning
                  </Button>
                </>
              ) : (
                <Button primary onClick={onStartCourse}>
                  <FiPlay style={{ marginRight: '8px' }} />
                  Start Course
                </Button>
              )}
              
              {overallProgress > 0 && (
                <Button onClick={onResetProgress}>
                  <FiRefreshCw style={{ marginRight: '8px' }} />
                  Reset Progress
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Continue Progress Section */}
        {currentUser && hasProgress && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
            padding: '20px',
            borderRadius: '10px',
            marginTop: '30px',
            border: '1px solid rgba(102, 126, 234, 0.2)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: '-50px',
              right: '-50px',
              width: '100px',
              height: '100px',
              background: 'rgba(102, 126, 234, 0.1)',
              borderRadius: '50%'
            }}></div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '20px'
              }}>
                🎯
              </div>
              <div>
                <h3 style={{ color: '#667eea', margin: '0 0 5px 0' }}>Continue Your Journey</h3>
                <p style={{ margin: 0, opacity: 0.8, fontSize: '14px' }}>
                  Pick up where you left off and continue your learning progress
                </p>
              </div>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.5)',
              padding: '15px',
              borderRadius: '8px',
              marginBottom: '15px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <div style={{ fontSize: '14px', opacity: 0.8 }}>Current Position</div>
                  <div style={{ fontWeight: '600', color: '#667eea' }}>
                    Module {progress.progress.currentModule + 1} • Lesson {progress.progress.currentLesson + 1}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '14px', opacity: 0.8 }}>Completed Lessons</div>
                  <div style={{ fontWeight: '600', color: '#28a745' }}>
                    {progress.progress.completedLessons.length} lessons
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '14px', opacity: 0.8 }}>Last Active</div>
                  <div style={{ fontWeight: '600', color: 'inherit', fontSize: '12px' }}>
                    {progress.progress.lastAccessed ? 
                      new Date(progress.progress.lastAccessed).toLocaleDateString() : 
                      'Today'
                    }
                  </div>
                </div>
              </div>
            </div>

            <Button primary onClick={onContinue} style={{ width: '100%', justifyContent: 'center' }}>
              <FiArrowRight style={{ marginRight: '8px' }} />
              Continue from Module {progress.progress.currentModule + 1}, Lesson {progress.progress.currentLesson + 1}
            </Button>
          </div>
        )}

        {/* Modules Overview */}
        <div style={{ marginTop: '40px' }}>
          <h2 style={{ marginBottom: '20px' }}>Course Modules</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {course.modules.map((module, index) => {
              const isCompleted = progress.isModuleCompleted(module);
              const isCurrent = index === progress.progress.currentModule;
              const moduleProgress = Math.round(
                (module.lessons.filter(lesson => 
                  progress.progress.completedLessons.includes(lesson.id)
                ).length / module.lessons.length) * 100
              );

              return (
                <div 
                  key={module.id} 
                  style={{
                    padding: '20px',
                    border: '2px solid',
                    borderColor: isCurrent ? '#667eea' : 
                                isCompleted ? '#28a745' : '#e0e0e0',
                    borderRadius: '10px',
                    background: isCurrent ? 'rgba(102, 126, 234, 0.05)' : 
                               isCompleted ? 'rgba(40, 167, 69, 0.05)' : 'rgba(0,0,0,0.02)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onClick={() => {
                    if (currentUser) {
                      onStartCourse();
                      // This would typically navigate to the specific module
                    } else {
                      // Show auth modal or handle unauthorized
                    }
                  }}
                >
                  {/* Current Module Indicator */}
                  {isCurrent && (
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      background: '#667eea',
                      color: 'white',
                      padding: '2px 8px',
                      borderRadius: '10px',
                      fontSize: '10px',
                      fontWeight: '600',
                      textTransform: 'uppercase'
                    }}>
                      Current
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '10px' }}>
                    <h3 style={{ 
                      color: isCurrent ? '#667eea' : 
                            isCompleted ? '#28a745' : 'inherit', 
                      margin: 0 
                    }}>
                      {index + 1}. {module.title}
                      {isCompleted && ' ✓'}
                    </h3>
                    <span style={{ 
                      background: isCurrent ? '#667eea' : 
                                 isCompleted ? '#28a745' : '#6c757d',
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: '15px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {module.lessons.length} lessons
                    </span>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ flex: 1, height: '6px', background: '#e0e0e0', borderRadius: '3px' }}>
                      <div style={{ 
                        width: `${moduleProgress}%`, 
                        height: '100%', 
                        background: isCurrent ? '#667eea' : 
                                   isCompleted ? '#28a745' : '#6c757d',
                        borderRadius: '3px',
                        transition: 'width 0.5s ease'
                      }} />
                    </div>
                    <span style={{ 
                      fontSize: '14px', 
                      color: 'inherit', 
                      opacity: 0.8, 
                      minWidth: '40px',
                      fontWeight: '600'
                    }}>
                      {moduleProgress}%
                    </span>
                  </div>

                  {/* Lesson completion breakdown */}
                  <div style={{ 
                    display: 'flex', 
                    gap: '5px', 
                    marginTop: '10px',
                    flexWrap: 'wrap'
                  }}>
                    {module.lessons.map((lesson, lessonIndex) => {
                      const isLessonCompleted = progress.progress.completedLessons.includes(lesson.id);
                      const isCurrentLesson = isCurrent && lessonIndex === progress.progress.currentLesson;
                      
                      return (
                        <div
                          key={lesson.id}
                          style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            background: isCurrentLesson ? '#667eea' :
                                      isLessonCompleted ? '#28a745' : '#e0e0e0',
                            border: isCurrentLesson ? '2px solid #667eea' : 'none',
                            transition: 'all 0.3s ease'
                          }}
                          title={`Lesson ${lessonIndex + 1}: ${lesson.title} - ${isLessonCompleted ? 'Completed' : 'Not started'}`}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Stats */}
        {currentUser && (
          <div style={{ 
            marginTop: '40px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
              padding: '20px',
              borderRadius: '10px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea' }}>
                {overallProgress}%
              </div>
              <div style={{ fontSize: '14px', opacity: 0.8 }}>Overall Progress</div>
            </div>
            
            <div style={{
              background: 'linear-gradient(135deg, rgba(40, 167, 69, 0.1), rgba(40, 167, 69, 0.05))',
              padding: '20px',
              borderRadius: '10px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#28a745' }}>
                {progress.progress.completedLessons.length}
              </div>
              <div style={{ fontSize: '14px', opacity: 0.8 }}>Lessons Completed</div>
            </div>
            
            <div style={{
              background: 'linear-gradient(135deg, rgba(255, 193, 7, 0.1), rgba(255, 193, 7, 0.05))',
              padding: '20px',
              borderRadius: '10px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ffc107' }}>
                {Object.keys(progress.progress.quizScores).length}
              </div>
              <div style={{ fontSize: '14px', opacity: 0.8 }}>Quizzes Taken</div>
            </div>
          </div>
        )}
      </Card>
    </motion.div>
  );
};

export default CourseOverview;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiShare2, FiX, FiUser, FiAward, FiFileText } from 'react-icons/fi';
import { generateCertificatePDF, generateSimpleCertificatePDF } from '../../utils/pdfGenerator';

const Certificate = ({ course, progress, onClose, themedComponents, currentUser }) => {
  const { Card, Button } = themedComponents;
  const [generatingPDF, setGeneratingPDF] = useState(false);
  
  const completionDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const overallProgress = progress.calculateOverallProgress(course);

  const handleDownload = async (useSimple = false) => {
    setGeneratingPDF(true);
    
    try {
      const certificateData = {
        studentName: currentUser?.name || 'Course Participant',
        courseTitle: course.title,
        completionDate: completionDate,
        score: overallProgress,
        courseLevel: course.level,
        studentId: currentUser?.id ? currentUser.id.toString().padStart(6, '0') : '000001'
      };

      let pdf;
      
      if (useSimple) {
        // Use simple PDF generation (faster, no dependencies)
        pdf = generateSimpleCertificatePDF(certificateData);
      } else {
        // Use advanced PDF generation with html2canvas
        pdf = await generateCertificatePDF(certificateData);
      }

      // Save the PDF
      pdf.save(`Certificate-${course.title}-${currentUser?.name || 'Participant'}.pdf`);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again or use the simple version.');
    } finally {
      setGeneratingPDF(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `I completed ${course.title}!`,
        text: `Check out my achievement in completing ${course.title} with ${overallProgress}% proficiency!`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`I completed ${course.title} with ${overallProgress}% proficiency!`);
      alert('Certificate message copied to clipboard!');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px'
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '600px', width: '100%' }}
      >
        <Card style={{ padding: '10px', position: 'relative' }}>
          <button 
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '15px',
              right: '15px',
              background: 'rgba(0,0,0,0.1)',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10,
              color: 'inherit',
              fontSize: '20px'
            }}
          >
            <FiX />
          </button>

          <div style={{ 
            border: '15px solid #f4d03f',
            padding: '40px',
            textAlign: 'center',
            background: 'linear-gradient(45deg, #fff, #f9f9f9)',
            position: 'relative',
            color: '#2c3e50'
          }}>
            {/* Decorative elements */}
            <div style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              right: '20px',
              bottom: '20px',
              border: '2px solid #f4d03f',
              pointerEvents: 'none'
            }} />
            
            <FiAward size={60} color="#f4d03f" style={{ marginBottom: '20px' }} />
            
            <h1 style={{ 
              fontSize: '2.5rem', 
              marginBottom: '20px',
              fontFamily: 'Georgia, serif',
              fontWeight: 'bold'
            }}>
              Certificate of Completion
            </h1>
            
            <p style={{ marginBottom: '30px', fontSize: '1.1rem', opacity: 0.8 }}>
              This is to certify that
            </p>
            
            <h2 style={{ 
              fontSize: '2rem', 
              marginBottom: '30px',
              borderBottom: '3px solid #f4d03f',
              paddingBottom: '15px',
              display: 'inline-block'
            }}>
              {currentUser ? currentUser.name : 'Course Participant'}
            </h2>
            
            <p style={{ marginBottom: '15px', fontSize: '1.1rem', opacity: 0.8 }}>
              has successfully completed the course
            </p>
            
            <h3 style={{ 
              color: '#667eea', 
              fontSize: '1.8rem', 
              marginBottom: '25px',
              fontWeight: '600'
            }}>
              {course.title}
            </h3>
            
            <p style={{ marginBottom: '30px', fontSize: '1rem', opacity: 0.8 }}>
              with an overall proficiency score of {overallProgress}%
            </p>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              marginTop: '40px',
              fontSize: '1rem',
              opacity: 0.8,
              borderTop: '2px solid #bdc3c7',
              paddingTop: '20px',
              flexWrap: 'wrap',
              gap: '20px'
            }}>
              <div>
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Date Completed</div>
                <div>{completionDate}</div>
              </div>
              
              <div>
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Course Level</div>
                <div>{course.level}</div>
              </div>

              {currentUser && (
                <div>
                  <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Student ID</div>
                  <div>#{(currentUser.id || 1).toString().padStart(6, '0')}</div>
                </div>
              )}
            </div>
          </div>

          {/* Download Options */}
          <div style={{ 
            background: 'rgba(102, 126, 234, 0.1)',
            padding: '20px',
            borderRadius: '10px',
            marginTop: '20px'
          }}>
            <h4 style={{ margin: '0 0 15px 0', color: '#667eea' }}>
              <FiFileText style={{ marginRight: '10px' }} />
              Download Certificate
            </h4>
            
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button 
                primary 
                onClick={() => handleDownload(false)}
                disabled={generatingPDF}
                style={{ minWidth: '140px' }}
              >
                {generatingPDF ? (
                  <>
                    <div className="loading-spinner" style={{ 
                      width: '16px', 
                      height: '16px', 
                      borderWidth: '2px',
                      display: 'inline-block',
                      marginRight: '8px'
                    }}></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <FiDownload style={{ marginRight: '8px' }} />
                    High Quality PDF
                  </>
                )}
              </Button>
              
              <Button 
                onClick={() => handleDownload(true)}
                disabled={generatingPDF}
                style={{ minWidth: '140px' }}
              >
                <FiFileText style={{ marginRight: '8px' }} />
                Simple PDF
              </Button>
            </div>
            
            <p style={{ 
              fontSize: '12px', 
              color: '#666', 
              marginTop: '10px',
              textAlign: 'center'
            }}>
              High Quality: Better visuals but slower | Simple: Faster generation
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px', flexWrap: 'wrap' }}>
            <Button onClick={handleShare}>
              <FiShare2 style={{ marginRight: '8px' }} />
              Share Achievement
            </Button>
            <Button onClick={onClose}>Close Certificate</Button>
          </div>

          {currentUser && (
            <div style={{
              textAlign: 'center',
              marginTop: '20px',
              padding: '10px',
              background: 'rgba(102, 126, 234, 0.1)',
              borderRadius: '8px',
              fontSize: '14px'
            }}>
              <FiUser size={16} style={{ display: 'inline', marginRight: '5px' }} />
              Awarded to: {currentUser.name} ({currentUser.email})
            </div>
          )}
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Certificate;
import React from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiBarChart2, FiBook, FiSearch, FiFilter } from 'react-icons/fi';
import { coursesData } from '../../data/courseData';

const CoursesOverview = ({ onSelectCourse, themedComponents, currentUser }) => {
  const { Card, Button } = themedComponents;
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');

  // Get unique categories
  const categories = ['all', ...new Set(coursesData.map(course => course.category))];

  // Filter courses based on search and category
  const filteredCourses = coursesData.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category) => {
    const colors = {
      'web': '#667eea',
      'programming': '#ed64a6',
      'database': '#38b2ac',
      'cs-fundamentals': '#f56565'
    };
    return colors[category] || '#718096';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'web': '🌐',
      'programming': '💻',
      'database': '🗄️',
      'cs-fundamentals': '🧠'
    };
    return icons[category] || '📚';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ marginBottom: '10px', color: 'inherit', fontSize: '2.5rem' }}>
            Explore Our Courses
          </h1>
          <p style={{ color: 'inherit', opacity: 0.8, fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
            Choose from our comprehensive collection of programming and technology courses
          </p>
        </div>

        {/* Search and Filter */}
        <div style={{ 
          display: 'flex', 
          gap: '15px', 
          marginBottom: '30px',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '250px' }}>
            <FiSearch style={{
              position: 'absolute',
              left: '15px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'inherit',
              opacity: 0.6
            }} />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 12px 12px 45px',
                border: '2px solid rgba(0,0,0,0.1)',
                borderRadius: '10px',
                background: 'inherit',
                color: 'inherit',
                fontSize: '16px'
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <FiFilter style={{ opacity: 0.6 }} />
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={{
                  padding: '8px 16px',
                  background: selectedCategory === category ? getCategoryColor(category) : 'transparent',
                  color: selectedCategory === category ? 'white' : 'inherit',
                  border: `2px solid ${getCategoryColor(category)}`,
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  textTransform: 'capitalize'
                }}
              >
                {category === 'all' ? 'All' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '25px',
          marginTop: '30px'
        }}>
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              style={{
                background: 'inherit',
                border: '2px solid rgba(0,0,0,0.1)',
                borderRadius: '15px',
                padding: '25px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
              onClick={() => onSelectCourse(course)}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-5px)';
                e.target.style.boxShadow = '0 15px 30px rgba(0,0,0,0.1)';
                e.target.style.borderColor = getCategoryColor(course.category);
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
                e.target.style.borderColor = 'rgba(0,0,0,0.1)';
              }}
            >
              {/* Category Badge */}
              <div style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: getCategoryColor(course.category),
                color: 'white',
                padding: '4px 12px',
                borderRadius: '15px',
                fontSize: '12px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}>
                {getCategoryIcon(course.category)} {course.category}
              </div>

              {/* Course Image */}
              <img 
                src={course.image} 
                alt={course.title}
                style={{
                  width: '100%',
                  height: '150px',
                  objectFit: 'cover',
                  borderRadius: '10px',
                  marginBottom: '15px'
                }}
              />

              {/* Course Info */}
              <h3 style={{ 
                marginBottom: '10px', 
                color: 'inherit',
                fontSize: '1.3rem'
              }}>
                {course.title}
              </h3>

              <p style={{ 
                color: 'inherit', 
                opacity: 0.8, 
                marginBottom: '15px',
                fontSize: '14px',
                lineHeight: '1.5'
              }}>
                {course.description}
              </p>

              {/* Course Meta */}
              <div style={{ 
                display: 'flex', 
                gap: '15px', 
                marginBottom: '20px',
                fontSize: '14px',
                opacity: 0.7
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <FiClock />
                  <span>{course.duration}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <FiBarChart2 />
                  <span>{course.level}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <FiBook />
                  <span>{course.modules.length} modules</span>
                </div>
              </div>

              {/* Action Button */}
              <Button 
                primary 
                style={{ 
                  width: '100%',
                  justifyContent: 'center'
                }}
              >
                Start Learning
              </Button>
            </motion.div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredCourses.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '60px 20px',
            color: 'inherit',
            opacity: 0.7
          }}>
            <FiSearch size={48} style={{ marginBottom: '20px', opacity: 0.5 }} />
            <h3>No courses found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Stats */}
        <div style={{ 
          marginTop: '50px',
          padding: '30px',
          background: 'rgba(0,0,0,0.02)',
          borderRadius: '15px',
          textAlign: 'center'
        }}>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '20px'
          }}>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea' }}>
                {coursesData.length}+
              </div>
              <div>Courses</div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ed64a6' }}>
                {new Set(coursesData.map(c => c.category)).size}+
              </div>
              <div>Categories</div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#38b2ac' }}>
                {coursesData.reduce((total, course) => total + course.modules.length, 0)}+
              </div>
              <div>Modules</div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f56565' }}>
                {coursesData.reduce((total, course) => total + course.modules.reduce((sum, mod) => sum + mod.lessons.length, 0), 0)}+
              </div>
              <div>Lessons</div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default CoursesOverview;
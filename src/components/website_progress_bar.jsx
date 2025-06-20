import React, { useState, useEffect } from 'react';

const WebsiteProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / totalHeight;
      setScrollProgress(Math.max(0, Math.min(1, progress)));
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    handleScroll(); // Initialize on mount
    handleResize(); // Initialize on mount

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const styles = {
    progressIndicator: {
      position: 'fixed',
      top: '50%',
      right: isMobile ? '1rem' : '2rem',
      transform: 'translateY(-50%)',
      zIndex: 9999, // Very high z-index to appear over everything
      background: 'rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(10px)',
      borderRadius: '10px',
      padding: '1rem 0.5rem',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease'
    },
    progressBar: {
      width: '4px',
      height: isMobile ? '150px' : '200px',
      background: 'rgba(255, 255, 255, 0.3)',
      borderRadius: '2px',
      position: 'relative',
      overflow: 'hidden'
    },
    progressFill: {
      width: '100%',
      height: `${scrollProgress * 100}%`,
      background: 'linear-gradient(to bottom, #F07167, #FED9B7)',
      borderRadius: '2px',
      transition: 'height 0.1s ease-out'
    },
    progressText: {
      fontSize: '10px',
      color: 'rgba(255, 255, 255, 0.8)',
      textAlign: 'center',
      marginTop: '0.5rem',
      fontWeight: '500',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }
  };

  return (
    <div style={styles.progressIndicator}>
      <div style={styles.progressBar}>
        <div style={styles.progressFill} />
      </div>
      <div style={styles.progressText}>
        {Math.round(scrollProgress * 100)}%
      </div>
    </div>
  );
};

export default WebsiteProgressBar;
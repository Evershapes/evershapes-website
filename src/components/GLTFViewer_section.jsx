import React, { useState, useEffect, useRef } from 'react';
import { useSpring, animated, config } from 'react-spring';
import GLTFViewer from './GLTFViewer_simple';

const GLTFSection = ({ 
  config = {}, 
  background = 'radial-gradient(ellipse 100% 50% at center, #00AFB9 0%, #00AFB9 55%, #FDFCDC 60%)',
  overlayText = "Interactive 3D Experience"
}) => {
  const [scrollY, setScrollY] = useState(0);
  const [sectionTop, setSectionTop] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [deviceType, setDeviceType] = useState('desktop');
  const sectionRef = useRef(null);

  // Device detection function
  const detectDeviceType = (width) => {
    if (width < 768) return 'mobile';
    if (width >= 768 && width < 1200) return 'tablet';
    return 'desktop';
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const updateDimensions = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      setDimensions({
        width: newWidth,
        height: newHeight
      });

      setDeviceType(detectDeviceType(newWidth));

      if (sectionRef.current) {
        setSectionTop(sectionRef.current.offsetTop);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateDimensions);
    updateDimensions();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  // Calculate scroll progress through this section
  const sectionHeight = window.innerHeight * 1.5;
  const scrollProgress = Math.max(0, Math.min(1, (scrollY - sectionTop) / sectionHeight));

  // Responsive breakpoints
  const isMobile = dimensions.width < 768;
  const isTablet = dimensions.width >= 768 && dimensions.width < 1200;
  const isDesktop = dimensions.width >= 1200;

  // Responsive helper function
  const getResponsiveValue = (mobile, tablet, desktop) => {
    if (isMobile) return mobile;
    if (isTablet) return tablet;
    return desktop;
  };

  // Simple fade-in animation for the viewer - appears immediately when scrolling starts
  const viewerSpring = useSpring({
    opacity: scrollProgress > 0.001 ? 1 : 0,
    transform: `translateY(${scrollProgress > 0.01 ? 0 : 20}px)`,
    config: config.gentle,
  });

  // Text overlay animation - only visible when scrolled 2/3 through the section
  const textSpring = useSpring({
    opacity: scrollProgress > 0.33 ? 1 : 0,
    config: { tension: 200, friction: 25 },
  });

  // Dynamic font size based on screen dimensions and text length
  const getFontSize = () => {
    const baseSize = Math.min(dimensions.width, dimensions.height) * 0.08;
    const textLength = overlayText.length;
    
    // Adjust size based on text length
    let adjustedSize = baseSize;
    if (textLength > 30) adjustedSize *= 0.8;
    if (textLength > 50) adjustedSize *= 0.7;
    if (textLength > 70) adjustedSize *= 0.6;
    
    // Apply device-specific constraints
    const minSize = isMobile ? 24 : isTablet ? 32 : 40;
    const maxSize = isMobile ? 48 : isTablet ? 72 : 96;
    
    return Math.max(minSize, Math.min(maxSize, adjustedSize));
  };

  const styles = {
    section: {
      height: getResponsiveValue('100vh', '100vh', '120vh'),
      position: 'relative',
      overflow: 'hidden',
      background: background
    },
    contentContainer: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 1,
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: getResponsiveValue('1rem', '1.5rem', '2rem')
    },
    viewerContainer: {
      width: '100vw',
      height: '100vh',
      position: 'relative',
      overflow: 'hidden',
    },
    textOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 10,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      pointerEvents: 'none',
      padding: getResponsiveValue('1rem', '2rem', '3rem'),
    },
    overlayText: {
      fontSize: `${getFontSize()}px`,
      fontWeight: '700',
      color: '#ffffff',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      lineHeight: '1.1',
      letterSpacing: '-0.02em',
      margin: 0,
      textAlign: 'center',
      maxWidth: '90%',
    }
  };

  return (
    <section ref={sectionRef} style={styles.section}>
      <animated.div style={{ ...styles.viewerContainer, ...viewerSpring }}>
        <GLTFViewer config={{
          ...config
        }} />
      </animated.div>
      
      {overlayText && (
        <animated.div style={{ ...styles.textOverlay, ...textSpring }}>
          <h1 style={styles.overlayText}>
            {overlayText}
          </h1>
        </animated.div>
      )}
    </section>
  );
};

export default GLTFSection;
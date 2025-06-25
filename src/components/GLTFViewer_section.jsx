import React, { useState, useEffect, useRef } from 'react';
import { useSpring, animated, config } from 'react-spring';
import GLTFViewer from './GLTFViewer_simple';

const GLTFSection = () => {
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

  // Simple fade-in animation for the viewer
  const viewerSpring = useSpring({
    opacity: scrollProgress > 0.1 ? 1 : 0,
    transform: `translateY(${scrollProgress > 0.1 ? 0 : 20}px)`,
    config: config.gentle,
  });

  const styles = {
    section: {
      height: getResponsiveValue('100vh', '100vh', '120vh'),
      position: 'relative',
      overflow: 'hidden',
      background: 'radial-gradient(ellipse 60% 30% at center, #00AFB9 0%, #00AFB9 55%, #FDFCDC 60%)'
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
    }
  };

  return (
    <section ref={sectionRef} style={styles.section}>
      <animated.div style={{ ...styles.viewerContainer, ...viewerSpring }}>
        <GLTFViewer config={{
          modelPath: '/scene/evershapes_scene2.gltf',
          cameraAngle: 30,
          cameraDistance: 4,
          autoRotateSpeed: 0.005,
          modelRotation: 90,
          modelScale: getResponsiveValue(3, 4, 5)
        }} />
      </animated.div>
    </section>
  );
};

export default GLTFSection;
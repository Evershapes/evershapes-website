import React, { useState, useEffect, useRef } from 'react';
import { useSpring, animated, config } from 'react-spring';
import GLTFViewer from './GLTFViewer_simple';

const Cliff_Back = () => {
  const [scrollY, setScrollY] = useState(0);
  const [sectionTop, setSectionTop] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [deviceType, setDeviceType] = useState('desktop');
  const sectionRef = useRef(null);

  // Direct paths to cliff images
  const cliffBackUrl = '/images/Cliff_Back_Part_Bis.png';
  const cliffMiddleUrl = '/images/Cliff_Middle_Part_Bis.png';
  const cliffFrontUrl = '/images/Cliff_Front_Part.png';

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
  const sectionHeight = window.innerHeight * 2.0;
  const scrollProgress = Math.max(0, Math.min(1, (scrollY - sectionTop) / sectionHeight));

  // Calculate background darkness based on scroll progress
  const backgroundOpacity = 0.3 + (scrollProgress * 0.7);

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

  // Parallax calculations
  const backParallaxOffset = scrollProgress * getResponsiveValue(900, 1800, 1000);
  const middleParallaxOffset = scrollProgress * getResponsiveValue(2400, 2400, 400);
  const frontParallaxOffset = -scrollProgress * -600;

  // React-spring animations
  const backCliffSpring = useSpring({
    transform: `translateY(${backParallaxOffset}px)`,
    config: config.slow,
  });

  const middleCliffSpring = useSpring({
    transform: `translateY(${middleParallaxOffset}px)`,
    config: config.slow,
  });

  const frontCliffSpring = useSpring({
    transform: `translateY(${frontParallaxOffset}px)`,
    config: config.slow,
  });

  // Scroll hint animation
  const scrollHintSpring = useSpring({
    opacity: Math.max(0, 1 - scrollProgress * 3),
    config: config.gentle,
  });

  // Function to render the appropriate GLTF viewer
  const renderGLTFViewer = () => {
    if (isMobile || isTablet) {
      return <GLTFViewer config={{
        cameraAngle: 30,
        cameraDistance: 6,
        autoRotateSpeed: 0.005,
        modelRotation: 90, 
        modelScale: 5
      }} />;
    } else {
      return <GLTFViewer config={{
        modelPath: '/scene/evershapes_scene1.gltf',
        cameraAngle: 30,
        cameraDistance: 6,
        autoRotateSpeed: 0.005,
        modelRotation: 90, 
        modelScale: 5
      }} />;
    }
  };

  const styles = {
    // Main section with proper z-index management
    parallaxSection: {
      height: getResponsiveValue('130vh', '130vh', '200vh'),
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(to bottom, #FDFCDC 0%, #FED9B7 80%, #FDFCDC 100%)',
      zIndex: 1, // Base z-index for the section
    },
    // Wrapper to extend the visual effect beyond section boundaries
    cliffExtension: {
      position: 'absolute',
      bottom: '-50vh', // Extend beyond the section
      left: 0,
      width: '100%',
      height: '50vh',
      zIndex: 50, // High enough to appear above team section
      pointerEvents: 'none',
      overflow: 'visible',
    },
    backgroundOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: '#000',
      opacity: backgroundOpacity,
      transition: 'opacity 0.1s ease-out',
      zIndex: 2
    },
    // Cliff overlays with proper z-index hierarchy
    cliffBackOverlay: {
      position: 'absolute',
      top: '100px',
      left: getResponsiveValue('-10%', '-7%', '0%'),
      width: getResponsiveValue('120%', '115%', '100%'),
      height: getResponsiveValue('400px', '650px', '918px'),
      backgroundImage: `url(${cliffBackUrl})`,
      backgroundSize: '100% 100%',
      backgroundPosition: 'center top',
      backgroundRepeat: 'no-repeat',
      zIndex: 3,
      pointerEvents: 'none',
      opacity: 1,
      transition: 'opacity 0.5s ease-in-out'
    },
    cliffMiddleOverlay: {
      position: 'absolute',
      top: 0,
      left: getResponsiveValue('-10%', '-7%', '0%'),
      width: getResponsiveValue('120%', '115%', '100%'),
      height: getResponsiveValue('450px', '700px', '978px'),
      backgroundImage: `url(${cliffMiddleUrl})`,
      backgroundSize: '100% 100%',
      backgroundPosition: 'center top',
      backgroundRepeat: 'no-repeat',
      zIndex: 4,
      pointerEvents: 'none',
      opacity: 1,
      transition: 'opacity 0.5s ease-in-out'
    },
    cliffFrontOverlay: {
      position: 'absolute',
      top: getResponsiveValue('200px', '300px', '400px'),
      left: getResponsiveValue('-10%', '-7%', '0%'),
      width: getResponsiveValue('120%', '115%', '100%'),
      height: getResponsiveValue('150vh', '150vh', '250vh'), // Extended height
      backgroundImage: `url(${cliffFrontUrl})`,
      backgroundSize: '100% 100%',
      backgroundPosition: 'center top',
      backgroundRepeat: 'no-repeat',
      zIndex: 5,
      pointerEvents: 'none',
      opacity: 1,
      transition: 'opacity 0.5s ease-in-out'
    },
    // Extended cliff that appears over team section
    cliffFrontExtended: {
      position: 'absolute',
      top: getResponsiveValue('200px', '300px', '400px'),
      left: getResponsiveValue('-10%', '-7%', '0%'),
      width: getResponsiveValue('120%', '115%', '100%'),
      height: getResponsiveValue('200vh', '200vh', '300vh'), // Very tall to cover team section
      backgroundImage: `url(${cliffFrontUrl})`,
      backgroundSize: '100% 100%',
      backgroundPosition: 'center top',
      backgroundRepeat: 'no-repeat',
      zIndex: 51, // Higher than cliffExtension
      pointerEvents: 'none',
      opacity: 1,
      transition: 'opacity 0.5s ease-in-out'
    },
    contentContainer: {
      position: 'absolute',
      top: getResponsiveValue('50vh', '50vh', '100vh'),
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 6,
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: getResponsiveValue('1rem', '1.5rem', '2rem')
    },
    chessboardContainer: {
      width: getResponsiveValue('100vw', '100vw', '100vw'),
      height: getResponsiveValue('100vh', '80vh', '100vh'),
      position: 'relative',
      overflow: 'hidden',
    },
    scrollHint: {
      position: 'absolute',
      bottom: '3rem',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 7,
      color: 'white',
      textAlign: 'center',
      textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
    },
    bounceIcon: {
      width: getResponsiveValue('24px', '28px', '30px'),
      height: getResponsiveValue('24px', '28px', '30px'),
      animation: 'bounce 2s infinite'
    },
    bottomGradient: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '10vh',
      background: 'linear-gradient(to bottom, transparent 0%, hsla(58, 89.20%, 92.70%, 0.50) 50%, #FDFCDC 80%, #FDFCDC 100%)',
      zIndex: 8,
      pointerEvents: 'none'
    }
  };

  return (
    <div>
      <style jsx>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }

        @media (max-width: 768px) {
          .floating-content {
            margin: 1rem;
            padding: 2rem;
          }
          
          .floating-content h2 {
            font-size: 2rem;
          }
        }
      `}</style>

      <section ref={sectionRef} style={styles.parallaxSection}>
        {/* Background overlay */}
        

        {/* Three layered cliff overlays with react-spring parallax */}
        <animated.div style={{ ...styles.cliffBackOverlay, ...backCliffSpring }} />
        <animated.div style={{ ...styles.cliffMiddleOverlay, ...middleCliffSpring }} />
        <animated.div style={{ ...styles.cliffFrontOverlay, ...frontCliffSpring }} />

        {/* Main content */}
        <div style={styles.contentContainer}>
          <div style={styles.chessboardContainer}>
            {renderGLTFViewer()}
          </div>
        </div>

        {/* Bottom gradient */}
        <div style={styles.bottomGradient} />

        {/* Extended cliff section that appears above team section */}
        <div style={styles.cliffExtension }>
          <animated.div style={{ ...styles.cliffFrontExtended, ...frontCliffSpring }} />
        </div>
      </section>
    </div>
  );
};

export default Cliff_Back;
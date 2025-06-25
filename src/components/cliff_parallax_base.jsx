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

  // GLTF Viewer configurations for different devices
  const getGLTFConfig = () => {
    const baseConfig = {
      cameraAngle: 30,
      autoRotateSpeed: 0.005,
      modelRotation: 90,
      modelScale: 5
    };

    if (isMobile) {
      return {
        ...baseConfig,
        cameraDistance: 8, // Further back for mobile
        modelScale: 4, // Slightly smaller for mobile
        // Mobile-specific model path if needed
        // modelPath: '/scene/evershapes_scene1_mobile.gltf',
      };
    } else if (isTablet) {
      return {
        ...baseConfig,
        cameraDistance: 7, // Medium distance for tablet
        modelScale: 4.5, // Medium size for tablet
        // Tablet-specific model path if needed
        // modelPath: '/scene/evershapes_scene1_tablet.gltf',
      };
    } else {
      return {
        ...baseConfig,
        modelPath: '/scene/evershapes_scene1.gltf',
        cameraDistance: 6, // Default distance for desktop
        modelScale: 5, // Full size for desktop
      };
    }
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

      // Update device type when dimensions change
      setDeviceType(detectDeviceType(newWidth));

      if (sectionRef.current) {
        setSectionTop(sectionRef.current.offsetTop);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateDimensions);
    updateDimensions(); // Initial call

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

  // Hard limits that make sense for your cliff sizes
  const backParallaxOffset = Math.min(
    scrollProgress * getResponsiveValue(900, 2500, 2600),
    getResponsiveValue(200, 450, 1050) // Much smaller limits
  );

  const middleParallaxOffset = Math.min(
    scrollProgress * getResponsiveValue(4000, 5000, 3500),
    getResponsiveValue(600, 900, 1600) // Reasonable limits
  );

  const frontParallaxOffset = Math.min(
    scrollProgress * getResponsiveValue(800, 3000, 3200),
    getResponsiveValue(150, 200, 100) // Conservative limits
  );

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

  const styles = {
    parallaxSection: {
      height: getResponsiveValue('130vh', '130vh', '200vh'),
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(to bottom, #FDFCDC 0%, #FED9B7 80%, #FDFCDC 100%)'
    },
    backgroundOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: '#000',
      opacity: 0,
      transition: 'opacity 0.1s ease-out',
      zIndex: 1
    },
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
      zIndex: 2,
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
      zIndex: 3,
      pointerEvents: 'none',
      opacity: 1,
      transition: 'opacity 0.5s ease-in-out'
    },
    cliffFrontOverlay: {
      position: 'absolute',
      top: getResponsiveValue('200px', '300px', '400px'),
      left: getResponsiveValue('-10%', '-7%', '0%'),
      width: getResponsiveValue('120%', '115%', '100%'),
      height: getResponsiveValue('100vh', '100vh', '200vh'),
      backgroundImage: `url(${cliffFrontUrl})`,
      backgroundSize: '100% 100%',
      backgroundPosition: 'center top',
      backgroundRepeat: 'no-repeat',
      zIndex: 4,
      pointerEvents: 'none',
      opacity: 1,
      transition: 'opacity 0.5s ease-in-out'
    },
    contentContainer: {
      position: 'absolute',
      top: getResponsiveValue('50vh', '50vh', '100vh'),
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 0, // Increased z-index to ensure GLTF viewer is above cliffs
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
      zIndex: 0,
      overflow: 'hidden',
    },
    scrollHint: {
      position: 'absolute',
      bottom: '3rem',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 6,
      color: 'white',
      textAlign: 'center',
      textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
    },
    depthLayer: {
      position: 'absolute',
      width: '100%',
      height: '120%',
      background: 'transparent',
      zIndex: 1,
      transition: 'all 0.1s ease-out'
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
      background: 'linear-gradient(to bottom, transparent 0%,hsla(58, 89.20%, 92.70%, 0.50) 50%,#FDFCDC 80%, #FDFCDC 100%)',
      zIndex: 10,
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
        {/* Background overlay that darkens on scroll */}
        <div style={styles.backgroundOverlay} />

        {/* Depth layer for extra visual effect */}
        <div style={styles.depthLayer} />

        {/* Three layered cliff overlays with react-spring parallax */}
        <animated.div style={{ ...styles.cliffBackOverlay, ...backCliffSpring }} />
        <animated.div style={{ ...styles.cliffMiddleOverlay, ...middleCliffSpring }} />
        <animated.div style={{ ...styles.cliffFrontOverlay, ...frontCliffSpring }} />

        {/* Main content */}
        <div style={styles.contentContainer}>
          {/* GLTF Viewer with device-specific configuration */}
          <div style={styles.chessboardContainer}>
            <GLTFViewer
              config={getGLTFConfig()}
              key={deviceType} // Force re-render when device type changes
            />
          </div>
        </div>

        {/* Bottom gradient section */}
        <div style={styles.bottomGradient} />
      </section>
    </div>
  );
};

export default Cliff_Back;
import React, { useState, useEffect, useRef } from 'react';
import { useSpring, animated, config } from 'react-spring';
import GLTFViewer from './GLTFViewer_simple'; // Add this import

// Separate TextBox Column Component
const TextBoxColumn = ({ scrollProgress }) => {
  const styles = {
    floatingContent: {
      background: 'rgba(255, 255, 255, 0.98)',
      backdropFilter: 'blur(20px)',
      borderRadius: '20px',
      padding: '2.5rem',
      margin: '1rem 0',
      maxWidth: '500px',
      textAlign: 'center',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
      transform: `translateY(${-scrollProgress * 15}px)`,
      opacity: Math.max(0.9, 1 - scrollProgress * 0.2),
      transition: 'all 0.1s ease-out',
      border: '2px solid rgba(255, 255, 255, 0.8)'
    },
    floatingContentH2: {
      fontSize: '2.5rem',
      color: '#2c3e50',
      marginBottom: '1rem',
      fontWeight: 'bold'
    },
    floatingContentP: {
      fontSize: '1.2rem',
      color: '#34495e',
      lineHeight: 1.6,
      marginBottom: '1.5rem'
    }
  };

  return (
    <>
      <div style={styles.floatingContent}>
        <h2 style={styles.floatingContentH2}>Journey Through the Canyon</h2>
        <p style={styles.floatingContentP}>
          As you descend deeper into this mystical canyon, the world above begins to fade away.
          The ancient cliffs tell stories of millennia past, while shadows dance between the rocky walls.
        </p>
        <p style={styles.floatingContentP}>
          Experience the depth and mystery as light gradually gives way to the depths below.
          This is where adventure begins and ordinary ends.
        </p>
      </div>

      <div style={styles.floatingContent}>
        <h2 style={styles.floatingContentH2}>Discover Hidden Depths</h2>
        <p style={styles.floatingContentP}>
          Each step down reveals new wonders. The canyon walls stretch endlessly upward,
          creating a natural cathedral of stone and time.
        </p>
        <p style={styles.floatingContentP}>
          Let the parallax guide your journey as reality shifts with every scroll.
          The deeper you go, the more the mystery unfolds.
        </p>
      </div>
    </>
  );
};

const Cliff_Back = () => {
  const [scrollY, setScrollY] = useState(0);
  const [sectionTop, setSectionTop] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [deviceType, setDeviceType] = useState('desktop'); // New state for device type
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

  // Your exact parallax calculations
  const backParallaxOffset = scrollProgress * getResponsiveValue('900', '1800', '1000');
  const middleParallaxOffset = scrollProgress * getResponsiveValue('2400', '2400', '400');
  const frontParallaxOffset = -scrollProgress * -600;

  // React-spring animations using your exact parallax values
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
    // Use mobile viewer for both mobile and tablet, desktop viewer for desktop
    if (isMobile || isTablet) {
      return <GLTFViewer config={{
        cameraAngle: 30,
        cameraDistance: 6,
        autoRotateSpeed: 0.005,
        modelRotation: 90, 
        modelScale: 5
      }}
      />;
    } else {
      return <GLTFViewer config={{
        modelPath: '/scene/evershapes_scene1.gltf',
        cameraAngle: 30,
        cameraDistance: 6,
        autoRotateSpeed: 0.005,
        modelRotation: 90, 
        modelScale: 5
      }}
      />;
    }
  };

  const styles = {
    parallaxSection: {
      height: getResponsiveValue('130vh', '130vh', '200vh'),
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(to bottom, #FDFCDC 0%, #FED9B7 100%)'
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
      zIndex: 1,
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: getResponsiveValue('1rem', '1.5rem', '2rem')
    },
    chessboardContainer: {
      width: getResponsiveValue('110vw', '110vw', '100vw'),
      height: getResponsiveValue('100vh', '80vh', '100vh'),
      position: 'relative',
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
          {/* Conditional 3D GLTF Viewer based on device type */}
          <div style={styles.chessboardContainer}>
            {renderGLTFViewer()}
          </div>
        </div>

        {/* Scroll hint with react-spring animation */}
        <animated.div style={{ ...styles.scrollHint, ...scrollHintSpring }}>
          <div>Scroll to explore</div>
          <svg viewBox="0 0 24 24" fill="currentColor" style={styles.bounceIcon}>
            <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
          </svg>
        </animated.div>
      </section>
    </div>
  );
};

export default Cliff_Back;
export { TextBoxColumn };
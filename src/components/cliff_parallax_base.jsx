import React, { useState, useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import GLTFViewer from './GLTFViewer_rotate';
import GLTFSection from './GLTFViewer_section';

const Cliff_Back = () => {
  const [scrollY, setScrollY] = useState(0);
  const [sectionTop, setSectionTop] = useState(0);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const sectionRef = useRef(null);

  // Direct paths to cliff images
  const cliffBackUrl = '/images/Cliff_Back_Part.webp';
  const cliffMiddleUrl = '/images/Cliff_Middle_Part.webp';
  const cliffFrontUrl = '/images/Cliff_Front_Part.webp';

  // Standard CSS media query breakpoints
  const breakpoints = {
    xs: 0,     // Extra small devices
    sm: 576,   // Small devices (landscape phones)
    md: 768,   // Medium devices (tablets)
    lg: 992,   // Large devices (desktops)
    xl: 1200,  // Extra large devices (large desktops)
    xxl: 1400  // Extra extra large devices
  };

  // Device detection based on standard breakpoints
  const getDeviceType = () => {
    const width = viewport.width;
    if (width >= breakpoints.xxl) return 'xxl';
    if (width >= breakpoints.xl) return 'xl';
    if (width >= breakpoints.lg) return 'lg';
    if (width >= breakpoints.md) return 'md';
    if (width >= breakpoints.sm) return 'sm';
    return 'xs';
  };

  const deviceType = getDeviceType();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const updateViewport = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      setViewport({
        width: newWidth,
        height: newHeight
      });

      if (sectionRef.current) {
        setSectionTop(sectionRef.current.offsetTop);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateViewport);
    updateViewport();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateViewport);
    };
  }, []);

  /*
  // DEBUGGING: Log device type and viewport dimensions
  useEffect(() => {
    console.log(`🖥️ Device Type: ${deviceType.toUpperCase()} (${viewport.width}x${viewport.height})`);
  }, [deviceType, viewport.width, viewport.height]);
  */

  // Calculate scroll progress through this section
  const sectionHeight = window.innerHeight * 2.0;
  const rawScrollProgress = Math.max(0, Math.min(1, (scrollY - sectionTop) / sectionHeight));

  // Responsive values based on device type
  const responsive = {
    // Section height
    sectionHeight: () => {
      switch (deviceType) {
        case 'xs': return '120vh';
        case 'sm': return '145vh';
        case 'md': return '170vh';
        case 'lg': return '200vh';
        case 'xl': return '170vh';
        case 'xxl': return '200vh';
        default: return '100vh';
      }
    },

    // RESPONSIVE HARD STOP THRESHOLDS
    parallaxStopThreshold: () => {
      switch (deviceType) {
        case 'xs': return 0.10;
        case 'sm': return 0.10;
        case 'md': return 0.11;
        case 'lg': return 0.50;
        case 'xl': return 0.25;
        case 'xxl': return 0.4;
        default: return 0.7;
      }
    },

    // Cliff positioning and sizing
    cliffLeft: () => {
      switch (deviceType) {
        case 'xs': return '-15%';
        case 'sm': return '0%';
        case 'md': return '-8%';
        case 'lg':
        case 'xl':
        case 'xxl': return '0%';
        default: return '0%';
      }
    },

    cliffWidth: () => {
      switch (deviceType) {
        case 'xs': return '130%';
        case 'sm': return '100%';
        case 'md': return '115%';
        case 'lg':
        case 'xl': 
        case 'xxl': return '100%';
        default: return '100%';
      }
    },

    // Back cliff dimensions
    backCliffHeight: () => {
      switch (deviceType) {
        case 'xs': return '50vh';
        case 'sm': return '30vh';
        case 'md': return '40vh';
        case 'lg': return '50vh';
        case 'xl': return '60vh';
        case 'xxl': return '70vh';
        default: return '40vh';
      }
    },

    // Middle cliff dimensions
    middleCliffHeight: () => {
      switch (deviceType) {
        case 'xs': return '35vh';
        case 'sm': return '40vh';
        case 'md': return '50vh';
        case 'lg': return '60vh';
        case 'xl': return '70vh';
        case 'xxl': return '80vh';
        default: return '50vh';
      }
    },

    // Front cliff dimensions
    frontCliffHeight: () => {
      switch (deviceType) {
        case 'xs': return '80vh';
        case 'sm': return '90vh';
        case 'md': return '100vh';
        case 'lg': return '120vh';
        case 'xl': return '140vh';
        case 'xxl': return '160vh';
        default: return '100vh';
      }
    },

    frontCliffTop: () => {
      switch (deviceType) {
        case 'xs': return '15vh';
        case 'sm': return '18vh';
        case 'md': return '20vh';
        case 'lg': return '25vh';
        case 'xl': return '30vh';
        case 'xxl': return '35vh';
        default: return '20vh';
      }
    },

    // Content positioning
    contentTop: () => {
      switch (deviceType) {
        case 'xs': return '35vh';
        case 'sm': return '40vh';
        case 'md': return '55vh';
        case 'lg': return '100vh';
        case 'xl': return '65vh';
        case 'xxl': return '100vh';
        default: return '50vh';
      }
    },

    contentHeight: () => {
      switch (deviceType) {
        case 'xs': return '80vh';
        case 'sm': return '100vh';
        case 'md': return '100vh';
        case 'lg': return '100vh';
        case 'xl': return '100vh';
        case 'xxl': return '100vh';
        default: return '75vh';
      }
    },

    // Parallax multipliers - now using viewport-relative values with hard stops
    backParallax: () => {
      switch (deviceType) {
        case 'xs': return viewport.height * 0.4;
        case 'sm': return viewport.height * 0.3;
        case 'md': return viewport.height * 0.4;
        case 'lg': return viewport.height * 0.85;
        case 'xl': return viewport.height * 0.4;
        case 'xxl': return viewport.height * 0.7;
        default: return viewport.height * 0.4;
      }
    },

    middleParallax: () => {
      switch (deviceType) {
        case 'xs': return viewport.height * 0.65;
        case 'sm': return viewport.height * 0.5;
        case 'md': return viewport.height * 0.6;
        case 'lg': return viewport.height * 0.7;
        case 'xl': return viewport.height * 0.8;
        case 'xxl': return viewport.height * 1.2;
        default: return viewport.height * 0.6;
      }
    },

    frontParallax: () => {
      switch (deviceType) {
        case 'xs': return viewport.height * 0.25;
        case 'sm': return viewport.height * 0.3;
        case 'md': return viewport.height * 0.35;
        case 'lg': return viewport.height * 0.4;
        case 'xl': return viewport.height * 0.45;
        case 'xxl': return viewport.height * 0.5;
        default: return viewport.height * 0.35;
      }
    },

    padding: () => {
      switch (deviceType) {
        case 'xs': return '0.5rem';
        case 'sm': return '1rem';
        case 'md': return '1.5rem';
        case 'lg': return '2rem';
        case 'xl':
        case 'xxl': return '2.5rem';
        default: return '1rem';
      }
    },

    textOffsetMultiplier: () => {
      switch (deviceType) {
        case 'xs': return 5;
        case 'sm': return 8;
        case 'md': return 8;
        case 'lg': return 4;
        case 'xl': return 4;
        case 'xxl': return 2;
        default: return 3;
      }
    }
  };

  // RESPONSIVE hard stop configuration
  const parallaxStopThreshold = responsive.parallaxStopThreshold();

  // Calculate adjusted scroll progress with RESPONSIVE hard stop
  const scrollProgress = rawScrollProgress <= parallaxStopThreshold
    ? rawScrollProgress / parallaxStopThreshold
    : 1;

  // Check if we should move parallax (RESPONSIVE check)
  const shouldMoveParallax = rawScrollProgress <= parallaxStopThreshold;

  // GLTF config based on device capabilities
  const getGLTFConfig = () => {
    const baseConfig = {
      cameraAngle: 30,
      autoRotateSpeed: 0.005,
      modelRotation: 90,
      modelPath: '/scene/evershapes_scene1.gltf'
    };

    switch (deviceType) {
      case 'xs':
        return {
          ...baseConfig,
          cameraDistance: 5,
          modelScale: 3,
        };

      case 'sm':
        return {
          ...baseConfig,
          cameraDistance: 5.8,
          modelScale: 5,
        };

      case 'md':
        return {
          ...baseConfig,
          cameraDistance: 7,
          modelScale: 6,
        };

      case 'lg':
        return {
          ...baseConfig,
          cameraDistance: 5,
          modelScale: 4.5,
        };

      case 'xl':
        return {
          ...baseConfig,
          cameraDistance: 5,
          modelScale: 5,
        };

      case 'xxl':
        return {
          ...baseConfig,
          cameraDistance: 9,
          modelScale: 8,
          autoRotateSpeed: 0.003,
        };

      default:
        return {
          ...baseConfig,
          cameraDistance: 7,
          modelScale: 4,
        };
    }
  };

  // Parallax calculations with RESPONSIVE hard stops
  const backParallaxOffset = shouldMoveParallax
    ? scrollProgress * responsive.backParallax()
    : responsive.backParallax();

  const middleParallaxOffset = shouldMoveParallax
    ? scrollProgress * responsive.middleParallax()
    : responsive.middleParallax();

  const frontParallaxOffset = shouldMoveParallax
    ? scrollProgress * responsive.frontParallax()
    : responsive.frontParallax();

  // React-spring animations with optimized config for smooth parallax
  const backCliffSpring = useSpring({
    to: { transform: `translateY(${backParallaxOffset}px)` },
    config: {
      tension: 280,    // Higher tension for responsiveness
      friction: 120,   // Higher friction to reduce overshoot
      mass: 1,         // Lower mass for lighter feel
      clamp: true      // Prevents overshoot
    },
    immediate: false   // Allow smooth transitions
  });

  const middleCliffSpring = useSpring({
    to: { transform: `translateY(${middleParallaxOffset}px)` },
    config: {
      tension: 280,
      friction: 120,
      mass: 1,
      clamp: true
    },
    immediate: false
  });

  const frontCliffSpring = useSpring({
    to: { transform: `translateY(${frontParallaxOffset}px)` },
    config: {
      tension: 280,
      friction: 120,
      mass: 1,
      clamp: true
    },
    immediate: false
  });

  const styles = {
    parallaxSection: {
      height: responsive.sectionHeight(),
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(to bottom, #FDFCDC 0%, #FED9B7 80%, #FDFCDC 100%)',
      zIndex: 1,
    },
    cliffBackOverlay: {
      position: 'absolute',
      top: '8vh',
      left: responsive.cliffLeft(),
      width: responsive.cliffWidth(),
      height: responsive.backCliffHeight(),
      backgroundImage: `url(${cliffBackUrl})`,
      backgroundSize: '100% 100%',
      backgroundPosition: 'center top',
      backgroundRepeat: 'no-repeat',
      zIndex: 2,
      pointerEvents: 'none',
      willChange: 'transform', // Optimize for animations
    },
    cliffMiddleOverlay: {
      position: 'absolute',
      top: 0,
      left: responsive.cliffLeft(),
      width: responsive.cliffWidth(),
      height: responsive.middleCliffHeight(),
      backgroundImage: `url(${cliffMiddleUrl})`,
      backgroundSize: '100% 100%',
      backgroundPosition: 'center top',
      backgroundRepeat: 'no-repeat',
      zIndex: 3,
      pointerEvents: 'none',
      willChange: 'transform',
    },
    cliffFrontOverlay: {
      position: 'absolute',
      top: responsive.frontCliffTop(),
      left: responsive.cliffLeft(),
      width: responsive.cliffWidth(),
      height: responsive.frontCliffHeight(),
      backgroundImage: `url(${cliffFrontUrl})`,
      backgroundSize: '100% 100%',
      backgroundPosition: 'center top',
      backgroundRepeat: 'no-repeat',
      zIndex: 4,
      pointerEvents: 'none',
      willChange: 'transform',
    },
    contentContainer: {
      position: 'absolute',
      top: responsive.contentTop(),
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 0,
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: responsive.padding()
    },
    chessboardContainer: {
      width: '100vw',
      height: responsive.contentHeight(),
      position: 'relative',
      overflow: 'hidden',
    },
    bottomGradient: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '10vh',
      background: 'linear-gradient(to bottom, transparent 0%, hsla(58, 89.20%, 92.70%, 0.50) 50%, #FDFCDC 80%, #FDFCDC 100%)',
      zIndex: 6,
      pointerEvents: 'none'
    }
  };

  return (
    <section ref={sectionRef} style={styles.parallaxSection}>
      {/* Three layered cliff overlays with optimized react-spring parallax */}
      <animated.div style={{ ...styles.cliffBackOverlay, ...backCliffSpring }} />
      <animated.div style={{ ...styles.cliffMiddleOverlay, ...middleCliffSpring }} />
      <animated.div style={{ ...styles.cliffFrontOverlay, ...frontCliffSpring }} />

      {/* Main content */}
      <div style={styles.contentContainer}>
        <div style={styles.chessboardContainer}>
          <GLTFSection
          textOffsetMultiplier={responsive.textOffsetMultiplier()}
            sectionId="parallax-section"
            config={getGLTFConfig()}
            key={`${deviceType}`}
            overlayText="Begin your Adventure"
          />
        </div>
      </div>

      {/* Bottom gradient */}
      <div style={styles.bottomGradient} />
    </section>
  );
};

export default Cliff_Back;
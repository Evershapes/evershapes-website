import React, { useState, useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import GLTFViewer from './GLTFViewer_rotate';
import useInView from './useInView';
import useModelLoader from './useModelLoader';

const GLTFSection = ({ 
  config = {}, 
  backgroundColor = 'transparent',
  ellipseGradient = 'transparent',
  overlayText = ""
}) => {
  const [scrollY, setScrollY] = useState(0);
  const [sectionTop, setSectionTop] = useState(0);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const sectionRef = useRef(null);

  // Standard intersection observer for visibility
  const { ref: inViewRef, isInView, hasBeenInView } = useInView({
    threshold: 0.1,
    rootMargin: '200px', // Start loading 200px before section is visible
    triggerOnce: false
  });

  // Standard model loading hook
  const { model, loading, error, progressPercent } = useModelLoader(
    config.modelPath,
    hasBeenInView // Only start loading when section has been in view
  );

  // Standard CSS media query breakpoints
  const breakpoints = {
    xs: 0, sm: 576, md: 768, lg: 992, xl: 1200, xxl: 1400
  };

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

  // Standard scroll and resize handlers
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

  // Calculate scroll progress through this section
  const sectionHeight = window.innerHeight * 1.5;
  const scrollProgress = Math.max(0, Math.min(1, (scrollY - sectionTop) / sectionHeight));

  // Responsive configuration
  const responsive = {
    sectionHeight: () => {
      switch (deviceType) {
        case 'xs': return '100vh';
        case 'sm': return '100vh';
        case 'md': return '100vh';
        case 'lg': return '120vh';
        case 'xl': return '120vh';
        case 'xxl': return '140vh';
        default: return '100vh';   
      }
    },

    ellipseDimensions: () => {
      const isLandscape = viewport.width > viewport.height;
      let ellipseWidth, ellipseHeight;
      
      switch (deviceType) {
        case 'xs':
          if (isLandscape) {
            ellipseWidth = '140vw';
            ellipseHeight = '40vh';
          } else {
            ellipseWidth = '200vw';
            ellipseHeight = '60vh';
          }
          break;
        case 'sm':
          if (isLandscape) {
            ellipseWidth = '130vw';
            ellipseHeight = '50vh';
          } else {
            ellipseWidth = '200vw';
            ellipseHeight = '60vh';
          }
          break;
        case 'md':
          if (isLandscape) {
            ellipseWidth = '130vw';
            ellipseHeight = '70vh';
          } else {
            ellipseWidth = '130vw';
            ellipseHeight = '60vh';
          }
          break;
        case 'lg':
          if (isLandscape) {
            ellipseWidth = '100vw';
            ellipseHeight = '60vh';
          } else {
            ellipseWidth = '100vw';
            ellipseHeight = '55vh';
          }
          break;
        case 'xl':
          if (isLandscape) {
            ellipseWidth = '90vw';
            ellipseHeight = '50vh';
          } else {
            ellipseWidth = '90vw';
            ellipseHeight = '45vh';
          }
          break;
        case 'xxl':
          if (isLandscape) {
            ellipseWidth = '90vw';
            ellipseHeight = '45vh';
          } else {
            ellipseWidth = '90vw';
            ellipseHeight = '40vh';
          }
          break;
        default:
          if (isLandscape) {
            ellipseWidth = '100vw';
            ellipseHeight = '60vh';
          } else {
            ellipseWidth = '100vw';
            ellipseHeight = '55vh';
          }
      }
      
      return { width: ellipseWidth, height: ellipseHeight };
    },

    fontSize: () => {
      const baseSize = Math.min(viewport.width, viewport.height) * 0.08;
      const textLength = overlayText.length;
      
      const deviceMultipliers = {
        xs: 0.8, sm: 0.9, md: 1.0, lg: 1.1, xl: 1.2, xxl: 1.3
      };

      let adjustedSize = baseSize * (deviceMultipliers[deviceType] || 1.0);
      
      if (textLength > 30) adjustedSize *= 0.8;
      if (textLength > 50) adjustedSize *= 0.7;
      if (textLength > 70) adjustedSize *= 0.6;
      
      const constraints = {
        xs: { min: 20, max: 36 }, sm: { min: 24, max: 42 }, md: { min: 28, max: 52 },
        lg: { min: 32, max: 64 }, xl: { min: 36, max: 76 }, xxl: { min: 40, max: 88 }
      };

      const { min, max } = constraints[deviceType] || constraints.md;
      return Math.max(min, Math.min(max, adjustedSize));
    },

    padding: () => {
      switch (deviceType) {
        case 'xs': return '0.75rem';
        case 'sm': return '1rem';
        case 'md': return '1.5rem';
        case 'lg': return '2rem';
        case 'xl': return '2.5rem';
        case 'xxl': return '3rem';
        default: return '1rem';
      }
    },

    textAnimationThreshold: () => {
      switch (deviceType) {
        case 'xs': return 0.2;
        case 'sm': return 0.25;
        case 'md': return 0.3;
        case 'lg': return 0.33;
        case 'xl': return 0.35;
        case 'xxl': return 0.4;
        default: return 0.33;
      }
    }
  };

  const ellipseDimensions = responsive.ellipseDimensions();
  const fontSize = responsive.fontSize();
  const textThreshold = responsive.textAnimationThreshold();

  // Standard spring animations
  const viewerSpring = useSpring({
    opacity: scrollProgress > 0.001 ? 1 : 0,
    transform: `translateY(${scrollProgress > 0.01 ? 0 : 20}px)`,
    config: {
      tension: 280,
      friction: 120,
      mass: 1,
      clamp: true
    },
  });

  const ellipseSpring = useSpring({
    opacity: scrollProgress > 0.001 ? 1 : 0,
    transform: `translate(-50%, -50%) scale(${scrollProgress > 0.01 ? 1 : 0.8})`,
    config: {
      tension: 280,
      friction: 120,
      mass: 1,
      clamp: true
    },
  });

  const textSpring = useSpring({
    opacity: scrollProgress > 0.001 ? 1 : 0,
    transform: `translateY(${scrollProgress > textThreshold ? 0 : 10}px)`,
    config: {
      tension: 200,
      friction: 25,
      clamp: true
    },
  });

  // Combine refs for intersection observer and section ref
  const combinedRef = (node) => {
    sectionRef.current = node;
    inViewRef.current = node;
  };

  const styles = {
    section: {
      height: responsive.sectionHeight(),
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: backgroundColor
    },
    ellipseBackground: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: ellipseDimensions.width,
      height: ellipseDimensions.height,
      borderRadius: '50%',
      backgroundImage: ellipseGradient,
      zIndex: 0,
      willChange: 'transform, opacity',
      WebkitBorderRadius: '50%',
      MozBorderRadius: '50%',
    },
    viewerContainer: {
      width: '100vw',
      height: '100vh',
      position: 'relative',
      overflow: 'hidden',
      zIndex: 2,
      willChange: 'transform, opacity',
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
      padding: responsive.padding(),
    },
    overlayText: {
      fontSize: `${fontSize}px`,
      fontWeight: '700',
      color: '#F07167',
      fontFamily: 'BriceSemiBold',
      lineHeight: '1.1',
      letterSpacing: '-0.02em',
      margin: 0,
      textAlign: 'center',
      maxWidth: '90%',
      textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      willChange: 'transform, opacity',
    },
    loadingOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 5,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(253, 252, 220, 0.9)',
      pointerEvents: 'none'
    },
    loadingText: {
      color: '#F07167',
      fontSize: '1.2rem',
      fontWeight: '600',
      marginBottom: '1rem',
      fontFamily: 'BriceSemiBold'
    },
    progressBar: {
      width: '200px',
      height: '4px',
      backgroundColor: 'rgba(240, 113, 103, 0.3)',
      borderRadius: '2px',
      overflow: 'hidden'
    },
    progressFill: {
      height: '100%',
      backgroundColor: '#F07167',
      borderRadius: '2px',
      transition: 'width 0.3s ease',
      width: `${progressPercent}%`
    }
  };

  return (
    <section ref={combinedRef} style={styles.section}>
      {/* Elliptical background layer */}
      <animated.div 
        style={{ 
          ...styles.ellipseBackground, 
          ...ellipseSpring 
        }} 
      />
      
      {/* GLTF Viewer - render when model is loaded */}
      {model && (
        <animated.div style={{ ...styles.viewerContainer, ...viewerSpring }}>
          <GLTFViewer 
            config={{
              ...config,
              preloadedModel: model,
              shouldRender: isInView // Only render when in view for performance
            }}
          />
        </animated.div>
      )}
      
      {/* Loading overlay - show when loading */}
      {loading && (
        <div style={styles.loadingOverlay}>
          <div style={styles.loadingText}>
            Loading 3D Experience...
          </div>
          <div style={styles.progressBar}>
            <div style={styles.progressFill} />
          </div>
        </div>
      )}
      
      {/* Error state */}
      {error && (
        <div style={styles.loadingOverlay}>
          <div style={styles.loadingText}>
            Unable to load 3D model
          </div>
          <div style={{ fontSize: '0.9rem', color: '#999', marginTop: '0.5rem' }}>
            {error}
          </div>
        </div>
      )}
      
      {/* Text overlay */}
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
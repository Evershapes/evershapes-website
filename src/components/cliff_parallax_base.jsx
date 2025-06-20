import React, { useState, useEffect, useRef } from 'react';

// Separate TextBox Column Component
const TextBoxColumn = ({ scrollProgress }) => {
  const styles = {
    floatingContent: {
      background: 'rgba(255, 255, 255, 0.98)',
      backdropFilter: 'blur(20px)',
      borderRadius: '20px',
      padding: '2.5rem',
      margin: '1rem 0',
      maxWidth: '500px', // Slightly narrower to fit in cliff center
      textAlign: 'center',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
      transform: `translateY(${-scrollProgress * 15}px)`, // Less movement so text stays in center
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
  const sectionRef = useRef(null);

  // Direct path to cliff image
  const cliffImageUrl = '/images/Cliff_front.png';

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const updateSectionTop = () => {
      if (sectionRef.current) {
        setSectionTop(sectionRef.current.offsetTop);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateSectionTop);
    updateSectionTop();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateSectionTop);
    };
  }, []);

  // Calculate scroll progress through this section
  const sectionHeight = window.innerHeight * 2.0; // 200vh
  const scrollProgress = Math.max(0, Math.min(1, (scrollY - sectionTop) / sectionHeight));
  
  // Calculate background darkness based on scroll progress
  const backgroundOpacity = 0.3 + (scrollProgress * 0.7); // From 30% to 100% dark
  
  // Calculate parallax offset for the cliff image (inverted with 27x effect)
  const parallaxOffset = -scrollProgress * 2160; // 27x stronger inverse parallax movement

  const styles = {
    parallaxSection: {
      height: '200vh',
      position: 'relative',
      overflow: 'hidden', // Ensures cliff doesn't spill outside section
      background: 'linear-gradient(to bottom, #FDFCDC 0%, #FED9B7 50%, #F07167 100%)'
    },
    backgroundOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: '#000',
      opacity: 0, // Removed darkening effect
      transition: 'opacity 0.1s ease-out',
      zIndex: 1
    },
    cliffOverlay: {
      position: 'absolute', // Changed from fixed to absolute
      top: 0,
      left: 0,
      width: '100%',
      height: '300vh', // Height to accommodate parallax movement + section height
      backgroundImage: `url(${cliffImageUrl})`,
      backgroundSize: '100vw auto', // Scale to viewport width, maintain aspect ratio
      backgroundPosition: 'center top',
      backgroundRepeat: 'no-repeat',
      transform: `translateY(${parallaxOffset}px)`,
      zIndex: 4, // Above content
      pointerEvents: 'none',
      opacity: 1,
      transition: 'opacity 0.5s ease-in-out'
    },
    contentContainer: {
      position: 'relative',
      zIndex: 3,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: '2rem',
      paddingTop: '30vh', // Start content higher so it's visible through cliff center
      gap: '3rem'
    },
    scrollHint: {
      position: 'absolute',
      bottom: '3rem',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 3,
      color: 'white',
      textAlign: 'center',
      opacity: Math.max(0, 1 - scrollProgress * 3),
      transition: 'opacity 0.3s ease-out',
      textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
    },
    depthLayer: {
      position: 'absolute',
      width: '100%',
      height: '120%',
      background: 'transparent', // Removed radial gradient shadow
      zIndex: 1,
      transition: 'all 0.1s ease-out'
    },
    bounceIcon: {
      width: '30px',
      height: '30px',
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
        
        {/* Fixed cliff overlay with parallax */}
        <div style={styles.cliffOverlay} />
        
        {/* Main content */}
        <div style={styles.contentContainer}>
          <TextBoxColumn scrollProgress={scrollProgress} />
        </div>
        
        {/* Progress indicator */}
        <div style={styles.progressIndicator}>
          <div style={styles.progressBar}>
            <div style={styles.progressFill} />
          </div>
        </div>
        
        {/* Scroll hint */}
        <div style={styles.scrollHint}>
          <div>Scroll to explore</div>
          <svg viewBox="0 0 24 24" fill="currentColor" style={styles.bounceIcon}>
            <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
          </svg>
        </div>
      </section>
    </div>
  );
};

export default Cliff_Back;
export { TextBoxColumn,  };   
import React, { useEffect, useRef, useState, useCallback } from 'react';

const Horizontal_Scroller = ({ text = "Evershapes\u00A0" }) => {
  const tagReelRef = useRef(null);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

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
  const getDeviceType = useCallback(() => {
    const width = viewport.width;
    if (width >= breakpoints.xxl) return 'xxl';
    if (width >= breakpoints.xl) return 'xl';
    if (width >= breakpoints.lg) return 'lg';
    if (width >= breakpoints.md) return 'md';
    if (width >= breakpoints.sm) return 'sm';
    return 'xs';
  }, [viewport.width]);

  const deviceType = getDeviceType();

  useEffect(() => {
    const updateViewport = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);
    
    return () => {
      window.removeEventListener('resize', updateViewport);
    };
  }, []);

  /*
  // Debug device type changes
  useEffect(() => {
    console.log(`📜 Text Scroller - Device Type: ${deviceType.toUpperCase()} (${viewport.width}x${viewport.height})`);
  }, [deviceType, viewport.width, viewport.height]);
  */

  // Responsive values based on device type
  const responsive = {
    // Container dimensions
    containerMinHeight: () => {
      switch (deviceType) {
        case 'xs': return '6vh';
        case 'sm': return '7vh';
        case 'md': return '8vh';
        case 'lg': return '9vh';
        case 'xl': return '10vh';
        case 'xxl': return '11vh';
        default: return '8vh';
      }
    },

    containerMaxHeight: () => {
      switch (deviceType) {
        case 'xs': return '8vh';
        case 'sm': return '9vh';
        case 'md': return '10vh';
        case 'lg': return '11vh';
        case 'xl': return '12vh';
        case 'xxl': return '13vh';
        default: return '10vh';
      }
    },

    contentHeight: () => {
      switch (deviceType) {
        case 'xs': return '8vh';
        case 'sm': return '9vh';
        case 'md': return '10vh';
        case 'lg': return '11vh';
        case 'xl': return '12vh';
        case 'xxl': return '13vh';
        default: return '10vh';
      }
    },

    contentPadding: () => {
      switch (deviceType) {
        case 'xs': return '1vh';
        case 'sm': return '1.2vh';
        case 'md': return '1.5vh';
        case 'lg': return '1.8vh';
        case 'xl': return '2vh';
        case 'xxl': return '2.2vh';
        default: return '1.5vh';
      }
    },

    // Typography
    fontSize: () => {
      switch (deviceType) {
        case 'xs': return '3.5vh';
        case 'sm': return '4vh';
        case 'md': return '4.5vh';
        case 'lg': return '5vh';
        case 'xl': return '5.5vh';
        case 'xxl': return '6vh';
        default: return '4.5vh';
      }
    },

    // Animation timing
    animationDuration: () => {
      switch (deviceType) {
        case 'xs': return 8;
        case 'sm': return 7;
        case 'md': return 6;
        case 'lg': return 5;
        case 'xl': return 4;
        case 'xxl': return 3;
        default: return 5;
      }
    },

    // Item spacing
    itemPadding: () => {
      switch (deviceType) {
        case 'xs': return '0.5vh 0';
        case 'sm': return '0.6vh 0';
        case 'md': return '0.8vh 0';
        case 'lg': return '1vh 0';
        case 'xl': return '1.2vh 0';
        case 'xxl': return '1.5vh 0';
        default: return '0.8vh 0';
      }
    }
  };

  // Check if mobile layout should be used
  const isMobile = deviceType === 'xs' || deviceType === 'sm';

  useEffect(() => {
    const intervals = [];
    
    const animateRows = () => {
      const rows = tagReelRef.current?.querySelectorAll(".sliding-text-row");
      
      rows?.forEach((e, i) => {
        let row_width = e.getBoundingClientRect().width;
        let row_item_width = e.children[0].getBoundingClientRect().width;
        let initial_offset = ((2 * row_item_width) / row_width) * 100 * -1;
        let x_translation = initial_offset * -1;
        
        let duration = responsive.animationDuration() * (i + 1);
        
        // Create the animation manually
        const animate = () => {
          // Reset to start position immediately
          e.style.transition = 'none';
          e.style.transform = `translateX(${initial_offset}%)`;
          
          // Force reflow
          e.offsetHeight;
          
          // Start animation to end position
          requestAnimationFrame(() => {
            e.style.transition = `transform ${duration}s linear`;
            e.style.transform = 'translateX(0%)';
          });
        };
        
        // Start first animation
        animate();
        
        // Set interval for infinite repeat
        const intervalId = setInterval(() => {
          animate();
        }, duration * 1000);
        
        intervals.push(intervalId);
      });
    };

    // Small delay to ensure elements are rendered and viewport is set
    const timer = setTimeout(animateRows, 200);
    
    return () => {
      clearTimeout(timer);
      intervals.forEach(interval => clearInterval(interval));
    };
  }, [deviceType, responsive]); // Re-run when device type changes

  // Dynamic styles based on device type
  const dynamicStyles = {
    slidingTextContainer: {
      position: 'relative',
      maxHeight: responsive.containerMaxHeight(),
      minHeight: responsive.containerMinHeight(),
      overflow: 'hidden'
    },
    
    slidingTextContent: {
      paddingTop: responsive.contentPadding(),
      height: responsive.contentHeight(),
      background: '#0081A7',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    
    slidingTextItems: {
      overflow: 'hidden',
      cursor: 'default',
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center'
    },
    
    slidingTextRow: {
      display: 'flex',
      position: 'relative',
      textAlign: 'center',
      whiteSpace: 'nowrap',
      width: '100%',
      alignItems: 'center'
    },
    
    slidingTextItem: {
      color: '#FDFCDC',
      position: 'relative',
      lineHeight: '100%',
      fontSize: responsive.fontSize(),
      flex: '0 0 33%',
      padding: responsive.itemPadding(),
      textTransform: 'uppercase',
      fontWeight: '900',
      fontFamily: 'BriceBoldSemiExpanded, Arial, sans-serif',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    
    slidingTextItemStroke: {
      position: 'relative',
      lineHeight: '100%',
      fontSize: responsive.fontSize(),
      flex: '0 0 33%',
      padding: responsive.itemPadding(),
      textTransform: 'uppercase',
      fontWeight: '900',
      color: '#00AFB9',
      textShadow: 'none',
      fontFamily: 'BriceBoldSemiExpanded, Arial, sans-serif',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    
    slidingTextSpan: {
      position: 'relative',
      display: 'inline-block',
      zIndex: 1
    }
  };

  return (
    <div>
      <section style={dynamicStyles.slidingTextContainer} ref={tagReelRef}>
        <div style={dynamicStyles.slidingTextContent}>
          <div style={dynamicStyles.slidingTextItems} role="marquee">
            <div style={dynamicStyles.slidingTextRow} className="sliding-text-row">
              <div style={dynamicStyles.slidingTextItem}>
                <span style={dynamicStyles.slidingTextSpan}>{text}</span>
              </div>
              <div style={dynamicStyles.slidingTextItemStroke}>
                <span style={dynamicStyles.slidingTextSpan}>{text}</span>
              </div>
              <div style={dynamicStyles.slidingTextItem}>
                <span style={dynamicStyles.slidingTextSpan}>{text}</span>
              </div>
              <div style={dynamicStyles.slidingTextItemStroke}>
                <span style={dynamicStyles.slidingTextSpan}>{text}</span>
              </div>
              <div style={dynamicStyles.slidingTextItem}>
                <span style={dynamicStyles.slidingTextSpan}>{text}</span>
              </div>
              <div style={dynamicStyles.slidingTextItemStroke}>
                <span style={dynamicStyles.slidingTextSpan}>{text}</span>
              </div>
              <div style={dynamicStyles.slidingTextItem}>
                <span style={dynamicStyles.slidingTextSpan}>{text}</span>
              </div>
              <div style={dynamicStyles.slidingTextItemStroke}>
                <span style={dynamicStyles.slidingTextSpan}>{text}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Horizontal_Scroller;
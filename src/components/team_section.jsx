import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSpring, animated, config } from 'react-spring';
import storyBoardsViewData from '../content/story-boards.json';
import RouteBackground from "../assets/routebackground.svg";

const TeamSection = () => {
    const [scrollY, setScrollY] = useState(0);
    const [sectionTop, setSectionTop] = useState(0);
    const [viewport, setViewport] = useState({ width: 0, height: 0 });
    const sectionRef = useRef(null);

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

    // Debug device type changes
    useEffect(() => {
        console.log(`👥 Team Section - Device Type: ${deviceType.toUpperCase()} (${viewport.width}x${viewport.height})`);
    }, [deviceType, viewport.width, viewport.height]);

    // Calculate scroll progress through this section
    const sectionHeight = window.innerHeight * 5; // Adjusted for taller section
    const scrollProgress = Math.max(0, Math.min(1, (scrollY - sectionTop) / sectionHeight));

    // NEW: Function to get responsive position from JSON
    const getResponsivePosition = useCallback((storyBoard) => {
        // Get position for current device type, fallback to 'md' if not found
        const positionData = storyBoard.position[deviceType] || storyBoard.position['md'] || storyBoard.position;
        
        // Handle legacy format (single position object)
        if (positionData.top && positionData.side) {
            return positionData;
        }
        
        // Fallback to first available position
        const firstKey = Object.keys(storyBoard.position)[0];
        return storyBoard.position[firstKey] || { top: '50vh', side: 'left' };
    }, [deviceType]);

    // Responsive values based on device type (dimensions only, positioning from JSON)
    const responsive = {
        // Section dimensions
        sectionHeight: () => {
            switch (deviceType) {
                case 'xs': return '470vh';
                case 'sm': return '470vh';
                case 'md': return '410vh';
                case 'lg': return '400vh';
                case 'xl': return '410vh';
                case 'xxl': return '410vh';
                default: return '410vh';
            }
        },

        // Road container
        roadWidth: () => {
            switch (deviceType) {
                case 'xs': return '100vw';
                case 'sm': return '130vw';
                case 'md': return '100vw';
                case 'lg': return '100vw';
                case 'xl': return '100vw';
                case 'xxl': return '100vw';
                default: return '100vw';
            }
        },

        roadTop: () => {
            switch (deviceType) {
                case 'xs': return '8vh';
                case 'sm': return '8vh';
                case 'md': return '8vh';
                case 'lg': return '8vh';
                case 'xl': return '8vh';
                case 'xxl': return '8vh';
                default: return '8vh';
            }
        },

        // Story board dimensions
        storyBoardMaxWidth: () => {
            switch (deviceType) {
                case 'xs': return '280px';
                case 'sm': return '320px';
                case 'md': return '360px';
                case 'lg': return '420px';
                case 'xl': return '480px';
                case 'xxl': return '540px';
                default: return '360px';
            }
        },

        storyBoardPadding: () => {
            switch (deviceType) {
                case 'xs': return '1vh';
                case 'sm': return '1vh';
                case 'md': return '1vh';
                case 'lg': return '1vh';
                case 'xl': return '1vh';
                case 'xxl': return '1vh';
                default: return '1vh';
            }
        },

        storyBoardBorderRadius: () => {
            switch (deviceType) {
                case 'xs': return '20px';
                case 'sm': return '25px';
                case 'md': return '30px';
                case 'lg': return '30px';
                case 'xl': return '30px';
                case 'xxl': return '35px';
                default: return '30px';
            }
        },

        // Story board positioning margins (used when side is specified)
        storyBoardLeftMargin: () => {
            switch (deviceType) {
                case 'xs': return '3%';
                case 'sm': return '4%';
                case 'md': return '5%';
                case 'lg': return '8%';
                case 'xl': return '9%';
                case 'xxl': return '10%';
                default: return '5%';
            }
        },

        storyBoardRightMargin: () => {
            switch (deviceType) {
                case 'xs': return '3%';
                case 'sm': return '4%';
                case 'md': return '5%';
                case 'lg': return '8%';
                case 'xl': return '9%';
                case 'xxl': return '10%';
                default: return '5%';
            }
        },

        // Typography
        storyTitleSize: () => {
            switch (deviceType) {
                case 'xs': return '1.4rem';
                case 'sm': return '1.6rem';
                case 'md': return '1.8rem';
                case 'lg': return '2rem';
                case 'xl': return '2.2rem';
                case 'xxl': return '2.4rem';
                default: return '1.8rem';
            }
        },

        storyDescriptionSize: () => {
            switch (deviceType) {
                case 'xs': return '0.9rem';
                case 'sm': return '1rem';
                case 'md': return '1.1rem';
                case 'lg': return '1.2rem';
                case 'xl': return '1.3rem';
                case 'xxl': return '1.4rem';
                default: return '1.1rem';
            }
        },

        storyTitleMargin: () => {
            switch (deviceType) {
                case 'xs': return '0.8rem';
                case 'sm': return '1rem';
                case 'md': return '1.2rem';
                case 'lg': return '1.4rem';
                case 'xl': return '1.6rem';
                case 'xxl': return '1.8rem';
                default: return '1.2rem';
            }
        },

        storyDescriptionMargin: () => {
            switch (deviceType) {
                case 'xs': return '1rem';
                case 'sm': return '1.2rem';
                case 'md': return '1.4rem';
                case 'lg': return '1.6rem';
                case 'xl': return '1.8rem';
                case 'xxl': return '2rem';
                default: return '1.4rem';
            }
        },

        // Image dimensions
        imageWidth: () => {
            const aspectRatio = viewport.width / viewport.height;
            const baseWidth = (() => {
                switch (deviceType) {
                    case 'xs': return 300;
                    case 'sm': return 400;
                    case 'md': return 300;
                    case 'lg': return 350;
                    case 'xl': return 400;
                    case 'xxl': return 450;
                    default: return 300;
                }
            })();

            if (aspectRatio > 1.5) {
                return baseWidth * 1.2;
            } else if (aspectRatio < 0.8) {
                return baseWidth * 1;
            } else {
                return baseWidth;
            }
        },

        imageHeight: () => {
            const aspectRatio = viewport.width / viewport.height;
            const baseHeight = (() => {
                switch (deviceType) {
                    case 'xs': return 150;
                    case 'sm': return 250;
                    case 'md': return 300;
                    case 'lg': return 350;
                    case 'xl': return 400;
                    case 'xxl': return 450;
                    default: return 300;
                }
            })();

            if (aspectRatio > 1.5) {
                return baseHeight * 0.8;
            } else if (aspectRatio < 0.8) {
                return baseHeight * 1;
            } else {
                return baseHeight * 0.75;
            }
        },

        imageBorderRadius: () => {
            switch (deviceType) {
                case 'xs': return '8px';
                case 'sm': return '10px';
                case 'md': return '12px';
                case 'lg': return '14px';
                case 'xl': return '16px';
                case 'xxl': return '18px';
                default: return '12px';
            }
        },

        // Title container
        titleContainerPadding: () => {
            switch (deviceType) {
                case 'xs': return '1.5rem';
                case 'sm': return '1.8rem';
                case 'md': return '2rem';
                case 'lg': return '2.5rem';
                case 'xl': return '2.8rem';
                case 'xxl': return '3rem';
                default: return '2rem';
            }
        },

        mainTitleSize: () => {
            switch (deviceType) {
                case 'xs': return '2rem';
                case 'sm': return '2.3rem';
                case 'md': return '2.5rem';
                case 'lg': return '3.5rem';
                case 'xl': return '4rem';
                case 'xxl': return '4.5rem';
                default: return '2.5rem';
            }
        },

        subtitleSize: () => {
            switch (deviceType) {
                case 'xs': return '0.9rem';
                case 'sm': return '0.95rem';
                case 'md': return '1rem';
                case 'lg': return '1.2rem';
                case 'xl': return '1.3rem';
                case 'xxl': return '1.4rem';
                default: return '1rem';
            }
        }
    };

    // Parallax calculations - only background and side content move
    const backgroundOffset = scrollProgress * 400; // Background moves slowly
    const sideContentOffset = scrollProgress * 800; // Side content moves at medium speed
    // Road stays completely static within the section

    // React-spring animations
    const backgroundSpring = useSpring({
        transform: `translateY(${backgroundOffset}px)`,
        config: config.slow,
    });
  
    const styles = {
        // Wrapper pour gérer les transitions entre sections
        sectionWrapper: {
            position: 'relative',
            background: 'transparent',
            zIndex: 1, // Lower z-index than cliff section
        },
        teamSection: {
            height: responsive.sectionHeight(),
            position: 'relative',
            overflow: 'hidden',
            background: '#FDFCDC', // Couleur uniforme sans dégradé
            zIndex: 1, // Lower z-index than cliff section
        },
        backgroundLayer: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '120%', // Slightly taller for parallax
            background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\' viewBox=\'0 0 100 100\'%3E%3Cg fill-opacity=\'0.03\'%3E%3Cpolygon fill=\'%23000\' points=\'50 0 60 40 100 50 60 60 50 100 40 60 0 50 40 40\'/%3E%3C/g%3E%3C/svg%3E")',
            zIndex: 1
        },
        // Road container - ABSOLUTE position within section, stays put
        roadContainer: {
            position: 'absolute', // Absolute within the section
            top: responsive.roadTop(),
            left: '50%',
            transform: 'translateX(-50%)', // Only center horizontally
            width: responsive.roadWidth(),
            height: '100%', // Reduce height to prevent clipping (8vh top + 8vh bottom)
            zIndex: 2,
            pointerEvents: 'none', // Allow clicks to pass through
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        // SVG styling
        roadSvg: {
            width: '100%',
            height: '100%',
            display: 'block',
            filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))',
            objectFit: 'cover'
        },
        sideContent: {
            position: 'absolute',
            top: 0,
            width: '100%',
            height: '100%',
            zIndex: 4,
            pointerEvents: 'none'
        },
        // Story board styles - completely integrated with background
        storyBoard: {
            position: 'absolute',
            maxWidth: responsive.storyBoardMaxWidth(),
            pointerEvents: 'auto',
            cursor: 'pointer',
            padding: responsive.storyBoardPadding(),
            background: '#F07167',
            borderRadius: responsive.storyBoardBorderRadius(),
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        },
        // Story board content styles
        storyTitle: {
            fontSize: responsive.storyTitleSize(),
            color: '#FED9B7',
            marginBottom: responsive.storyTitleMargin(),
            fontWeight: 'bold',
            lineHeight: 1.2,
            paddingTop: '2vh',
        },
        storyDescription: {
            fontSize: responsive.storyDescriptionSize(),
            color: '#FDFCDC',
            lineHeight: 1.6,
            marginBottom: responsive.storyDescriptionMargin()
        },
        storyImage: {
            width: responsive.imageWidth() + 'px',
            height: responsive.imageHeight() + 'px',
            objectFit: 'cover',
            borderRadius: responsive.imageBorderRadius(),
            filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3))',
            marginBottom: responsive.storyDescriptionMargin()
        },
        titleContainer: {
            position: 'absolute',
            top: '5vh',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 15, // Higher than fade overlay (10)
            textAlign: 'center',
            background: 'transparent',
            backdropFilter: 'blur(10px)',
            padding: responsive.titleContainerPadding(),
            borderRadius: '50px',
            boxShadow: '0 20px 40px rgba(5, 5, 5, 0.1)',
        },
        mainTitle: {
            fontSize: responsive.mainTitleSize(),
            color: '#F07167',
            marginBottom: '1rem',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
        },
        subtitle: {
            fontSize: responsive.subtitleSize(),
            color: '#F07167',
            opacity: 0.8,
            maxWidth: '500px',
            lineHeight: 1.6
        },
        // Overlay de fade supplémentaire pour un effet plus doux
        fadeOverlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `
                linear-gradient(to bottom, 
                    rgba(253, 252, 220, 0.9) 0%, 
                    rgba(253, 252, 220, 0.6) 3%, 
                    transparent 8%, 
                    transparent 92%, 
                    rgba(253, 252, 220, 0.6) 97%, 
                    rgba(253, 252, 220, 0.9) 100%
                )
            `,
            zIndex: 10,
            pointerEvents: 'none',
        }
    };

    // Function to render story board content based on category
    const renderStoryBoardContent = (storyBoard) => {
        switch (storyBoard.category) {
            case 'title-description':
                return (
                    <>
                        {storyBoard.title && (
                            <h3 className="BriceBold" style={styles.storyTitle}>
                                {storyBoard.title}
                            </h3>
                        )}
                        {storyBoard.description && (
                            <p className="BriceLightSemiExpanded" style={styles.storyDescription}>
                                {storyBoard.description}
                            </p>
                        )}
                    </>
                );

            case 'image-only':
                return storyBoard.image && (
                    <img
                        src={storyBoard.image}
                        alt="Story visual"
                        style={styles.storyImage}
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                );

            case 'title-image-description':
                return (
                    <>
                        {storyBoard.title && (
                            <h3 className="BriceBold" style={styles.storyTitle}>
                                {storyBoard.title}
                            </h3>
                        )}
                        {storyBoard.image && (
                            <img
                                src={storyBoard.image}
                                alt={storyBoard.title || "Story visual"}
                                style={styles.storyImage}
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                        )}
                        {storyBoard.description && (
                            <p className="BriceLightSemiExpanded" style={styles.storyDescription}>
                                {storyBoard.description}
                            </p>
                        )}
                    </>
                );

            default:
                return null;
        }
    };

    return (
        <div id="team" style={styles.sectionWrapper}>
            <section ref={sectionRef} style={styles.teamSection}>
                {/* Background layer with slow parallax */}
                <animated.div style={{ ...styles.backgroundLayer, ...backgroundSpring }} />

                {/* Road SVG - FIXED within the section, no movement */}
                <div style={styles.roadContainer}>
                    <img style={styles.roadSvg} src={RouteBackground} alt="Background Overlay of the Team Section, depicting a route under the text blocks" />
                </div>


                {/* Side content with story boards - UPDATED to use JSON positioning */}
                <animated.div style={{ ...styles.sideContent }}>
                    {storyBoardsViewData.storyBoards.map((storyBoard, index) => {
                        // Get responsive position from JSON
                        const position = getResponsivePosition(storyBoard);
                        
                        return (
                            <div
                                key={storyBoard.id}
                                style={{
                                    ...styles.storyBoard,
                                    // Use JSON positioning with responsive margins
                                    top: position.top,
                                    ...(position.side === 'left' 
                                        ? { left: responsive.storyBoardLeftMargin() }
                                        : { right: responsive.storyBoardRightMargin() }
                                    ),
                                    animationDelay: `${index * 0.2}s`
                                }}
                                className="story-board"
                            >
                                {renderStoryBoardContent(storyBoard)}
                            </div>
                        );
                    })}

                </animated.div>

                {/* Overlay de fade pour transitions extra douces */}
                <div style={styles.fadeOverlay} />

                {/* Title - ABOVE the fade overlay */}
                <div style={styles.titleContainer}>
                    <h1 className="BriceBoldSemiExpanded" style={styles.mainTitle}>
                        Our Story
                    </h1>
                    <p className="BriceRegular" style={styles.subtitle}>
                        Find out more about us.
                    </p>
                </div>

            </section>
        </div>
    );
};

export default TeamSection;
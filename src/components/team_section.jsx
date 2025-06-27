import React, { useState, useEffect, useRef } from 'react';
import { useSpring, animated, config } from 'react-spring';
import storyBoardsData from '../content/story-boards.json';

const TeamSection = () => {
    const [scrollY, setScrollY] = useState(0);
    const [sectionTop, setSectionTop] = useState(0);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
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
    const getDeviceType = () => {
        const width = dimensions.width;
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

        const updateDimensions = () => {
            const newWidth = window.innerWidth;
            const newHeight = window.innerHeight;

            setDimensions({
                width: newWidth,
                height: newHeight
            });

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
    const sectionHeight = window.innerHeight * 5; // Adjusted for taller section
    const scrollProgress = Math.max(0, Math.min(1, (scrollY - sectionTop) / sectionHeight));

    // Responsive helper function using standard breakpoints
    const getResponsiveValue = (xs, sm, md, lg, xl, xxl) => {
        switch(deviceType) {
            case 'xs': return xs;
            case 'sm': return sm;
            case 'md': return md;
            case 'lg': return lg;
            case 'xl': return xl;
            case 'xxl': return xxl;
            default: return md;
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

    const sideContentSpring = useSpring({
        transform: `translateY(${sideContentOffset}px)`,
        config: config.slow,
    });

    // Scroll hint animation
    const scrollHintSpring = useSpring({
        opacity: Math.max(0, 1 - scrollProgress * 2),
        config: config.gentle,
    });

    // Get aspect ratio for responsive images
    const getImageAspectRatio = () => {
        const width = dimensions.width;
        const height = dimensions.height;
        return width / height;
    };

    // Calculate responsive image dimensions
    const getImageDimensions = () => {
        const aspectRatio = getImageAspectRatio();
        const baseWidth = getResponsiveValue(200, 250, 300, 350, 400, 450);
        
        if (aspectRatio > 1.5) {
            // Wide screen - make images wider
            return {
                width: baseWidth * 1.2,
                height: baseWidth * 0.8
            };
        } else if (aspectRatio < 0.8) {
            // Tall screen - make images taller
            return {
                width: baseWidth * 0.8,
                height: baseWidth * 1.2
            };
        } else {
            // Standard aspect ratio
            return {
                width: baseWidth,
                height: baseWidth * 0.75
            };
        }
    };

    const styles = {
        // Wrapper pour gérer les transitions entre sections
        sectionWrapper: {
            position: 'relative',
            background: 'transparent',
            zIndex: 1, // Lower z-index than cliff section
        },
        teamSection: {
            height: '500vh', // Much taller section for scrolling
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
            top: '8vh', // Add some top margin to prevent clipping
            left: '50%',
            transform: 'translateX(-50%)', // Only center horizontally
            width: getResponsiveValue('150px', '180px', '200px', '300px', '350px', '400px'), // Made wider
            height: 'calc(100% - 16vh)', // Reduce height to prevent clipping (8vh top + 8vh bottom)
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
            maxWidth: getResponsiveValue('280px', '320px', '360px', '420px', '480px', '540px'),
            pointerEvents: 'auto',
            cursor: 'pointer',
        },
        storyBoardLeft: {
            left: getResponsiveValue('3%', '4%', '5%', '8%', '9%', '10%'),
        },
        storyBoardRight: {
            right: getResponsiveValue('3%', '4%', '5%', '8%', '9%', '10%'),
        },
        // Story board content styles
        storyTitle: {
            fontSize: getResponsiveValue('1.4rem', '1.6rem', '1.8rem', '2rem', '2.2rem', '2.4rem'),
            color: '#000000', // Black text for visibility
            marginBottom: getResponsiveValue('0.8rem', '1rem', '1.2rem', '1.4rem', '1.6rem', '1.8rem'),
            fontWeight: 'bold',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)', // Subtle white shadow for visibility
            lineHeight: 1.2
        },
        storyDescription: {
            fontSize: getResponsiveValue('0.9rem', '1rem', '1.1rem', '1.2rem', '1.3rem', '1.4rem'),
            color: '#000000', // Black text for visibility
            lineHeight: 1.6,
            textShadow: '1px 1px 2px rgba(255, 255, 255, 0.6)', // Subtle white shadow for visibility
            marginBottom: getResponsiveValue('1rem', '1.2rem', '1.4rem', '1.6rem', '1.8rem', '2rem')
        },
        storyImage: {
            width: getImageDimensions().width + 'px',
            height: getImageDimensions().height + 'px',
            objectFit: 'cover',
            borderRadius: getResponsiveValue('8px', '10px', '12px', '14px', '16px', '18px'),
            filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3))', // Subtle shadow for depth
            marginBottom: getResponsiveValue('1rem', '1.2rem', '1.4rem', '1.6rem', '1.8rem', '2rem')
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
            padding: getResponsiveValue('1.5rem', '1.8rem', '2rem', '2.5rem', '2.8rem', '3rem'),
            borderRadius: '50px',
            boxShadow: '0 20px 40px rgba(5, 5, 5, 0.1)',
            
        },
        mainTitle: {
            fontSize: getResponsiveValue('2rem', '2.3rem', '2.5rem', '3.5rem', '4rem', '4.5rem'),
            color: '#F07167',
            marginBottom: '1rem',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
        },
        subtitle: {
            fontSize: getResponsiveValue('0.9rem', '0.95rem', '1rem', '1.2rem', '1.3rem', '1.4rem'),
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
                            <p className="BriceLightSemiCondensed" style={styles.storyDescription}>
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
                            <p className="BriceRegular" style={styles.storyDescription}>
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
            <style jsx>{`
                @media (max-width: 768px) {
                    .story-board {
                        margin: 0 1rem;
                    }
                }
            `}</style>

            <section ref={sectionRef} style={styles.teamSection}>
                {/* Background layer with slow parallax */}
                <animated.div style={{ ...styles.backgroundLayer, ...backgroundSpring }} />

                {/* Road SVG - FIXED within the section, no movement */}
                <div style={styles.roadContainer}>
                    {/* Using inline SVG - replace with your actual chemin.svg content */}
                    <svg
                        style={styles.roadSvg}
                        viewBox="0 0 100 320"
                        preserveAspectRatio="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* Replace this path with the actual path from your chemin.svg */}
                        <path
                            d="M50 0 Q30 30 50 60 Q70 90 50 120 Q30 150 50 180 Q70 210 50 240 Q30 270 50 300"
                            stroke="#FFFFFF"
                            strokeWidth="20"
                            fill="none"
                            filter="drop-shadow(2px 2px 4px rgba(0,0,0,0.2))"
                        />
                    </svg>
                </div>

                {/* Side content with story boards - medium parallax speed */}
                <animated.div style={{ ...styles.sideContent, ...sideContentSpring }}>
                    {storyBoardsData.storyBoards.map((storyBoard, index) => (
                        <div
                            key={storyBoard.id}
                            style={{
                                ...styles.storyBoard,
                                ...(storyBoard.position.side === 'left' ? styles.storyBoardLeft : styles.storyBoardRight),
                                top: storyBoard.position.top,
                                animationDelay: `${index * 0.2}s`
                            }}
                            className="story-board"
                        >
                            {renderStoryBoardContent(storyBoard)}
                        </div>
                    ))}
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
import React, { useState, useEffect, useRef } from 'react';
import { useSpring, animated, config } from 'react-spring';
import storyBoardsSmallViewData from '../content/story-boards-small.json';
import storyBoardsMediumViewData from '../content/story-boards-medium.json';
import storyBoardsLargeViewData from '../content/story-boards-large.json';
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

    // Responsive values configuration
    const responsive = {
        // Section height
        sectionHeight: () => {
            switch (deviceType) {
                case 'xs': return '470vh';
                case 'sm': return '470vh';
                case 'md': return '410vh';
                case 'lg': return '400vh';
                case 'xl': return '410vh';
                case 'xxl': return '410vh';
                default: return '400vh';
            }
        },

        // Road container width
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

        // Story board positioning
        storyBoardLeft: () => {
            switch (deviceType) {
                case 'xs': return '3%';
                case 'sm': return '4%';
                case 'md': return '5%';
                case 'lg': return '8%';
                case 'xl': return '9%';
                case 'xxl': return '11%';
                default: return '5%';
            }
        },

        storyBoardRight: () => {
            switch (deviceType) {
                case 'xs': return '3%';
                case 'sm': return '4%';
                case 'md': return '5%';
                case 'lg': return '8%';
                case 'xl': return '9%';
                case 'xxl': return '11%';
                default: return '5%';
            }
        },

        // Story board max width
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

        // Typography
        titleFontSize: () => {
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

        subtitleFontSize: () => {
            switch (deviceType) {
                case 'xs': return '0.9rem';
                case 'sm': return '0.95rem';
                case 'md': return '1rem';
                case 'lg': return '1.2rem';
                case 'xl': return '1.3rem';
                case 'xxl': return '1.4rem';
                default: return '1rem';
            }
        },

        storyTitleFontSize: () => {
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

        storyDescriptionFontSize: () => {
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

        // Spacing
        titlePadding: () => {
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

        storyMarginBottom: () => {
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
            const baseWidth = {
                xs: 300,
                sm: 400,
                md: 300,
                lg: 350,
                xl: 400,
                xxl: 450
            }[deviceType] || 300;

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
            const baseHeight = {
                xs: 150,
                sm: 250,
                md: 300,
                lg: 350,
                xl: 400,
                xxl: 450
            }[deviceType] || 300;

            if (aspectRatio > 1.5) {
                return baseHeight * 0.8;
            } else if (aspectRatio < 0.8) {
                return baseHeight * 1;
            } else {
                return baseHeight * 0.75;
            }
        },

        // Border radius
        borderRadius: () => {
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

        // Parallax speeds
        backgroundParallax: () => {
            switch (deviceType) {
                case 'xs': return 400;
                case 'sm': return 400;
                case 'md': return 400;
                case 'lg': return 400;
                case 'xl': return 400;
                case 'xxl': return 400;
                default: return 400;
            }
        },

        sideContentParallax: () => {
            switch (deviceType) {
                case 'xs': return 800;
                case 'sm': return 800;
                case 'md': return 800;
                case 'lg': return 800;
                case 'xl': return 800;
                case 'xxl': return 800;
                default: return 800;
            }
        },

        // Data selection
        getStoryBoardData: () => {
            switch (deviceType) {
                case 'xs':
                case 'sm':
                    return storyBoardsSmallViewData;
                case 'md':
                case 'lg':
                    return storyBoardsMediumViewData;
                case 'xl':
                case 'xxl':
                    return storyBoardsLargeViewData;
                default:
                    return storyBoardsMediumViewData;
            }
        }
    };

    // Calculate scroll progress through this section
    const sectionHeight = window.innerHeight * 5;
    const scrollProgress = Math.max(0, Math.min(1, (scrollY - sectionTop) / sectionHeight));

    // Parallax calculations
    const backgroundOffset = scrollProgress * responsive.backgroundParallax();
    const sideContentOffset = scrollProgress * responsive.sideContentParallax();

    // React-spring animations with optimized config
    const backgroundSpring = useSpring({
        to: { transform: `translateY(${backgroundOffset}px)` },
        config: {
            tension: 280,
            friction: 120,
            mass: 1,
            clamp: true
        },
        immediate: false
    });

    const sideContentSpring = useSpring({
        to: { transform: `translateY(${sideContentOffset}px)` },
        config: {
            tension: 280,
            friction: 120,
            mass: 1,
            clamp: true
        },
        immediate: false
    });

    // Scroll hint animation
    const scrollHintSpring = useSpring({
        opacity: Math.max(0, 1 - scrollProgress * 2),
        config: config.gentle,
    });

    const styles = {
        sectionWrapper: {
            position: 'relative',
            background: 'transparent',
            zIndex: 1,
        },
        teamSection: {
            height: responsive.sectionHeight(),
            position: 'relative',
            overflow: 'hidden',
            background: '#FDFCDC',
            zIndex: 1,
        },
        backgroundLayer: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '120%',
            background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\' viewBox=\'0 0 100 100\'%3E%3Cg fill-opacity=\'0.03\'%3E%3Cpolygon fill=\'%23000\' points=\'50 0 60 40 100 50 60 60 50 100 40 60 0 50 40 40\'/%3E%3C/g%3E%3C/svg%3E")',
            zIndex: 1,
            willChange: 'transform',
        },
        roadContainer: {
            position: 'absolute',
            top: '8vh',
            left: '50%',
            transform: 'translateX(-50%)',
            width: responsive.roadWidth(),
            height: '100%',
            zIndex: 2,
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
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
            pointerEvents: 'none',
            willChange: 'transform',
        },
        storyBoard: {
            position: 'absolute',
            maxWidth: responsive.storyBoardMaxWidth(),
            pointerEvents: 'auto',
            cursor: 'pointer',
            padding: '1vh',
            background: '#F07167',
            borderRadius: '30px',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        },
        storyBoardLeft: {
            left: responsive.storyBoardLeft(),
        },
        storyBoardRight: {
            right: responsive.storyBoardRight(),
        },
        storyTitle: {
            fontSize: responsive.storyTitleFontSize(),
            color: '#FED9B7',
            marginBottom: responsive.storyMarginBottom(),
            fontWeight: 'bold',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
            lineHeight: 1.2
        },
        storyDescription: {
            fontSize: responsive.storyDescriptionFontSize(),
            color: '#FDFCDC',
            lineHeight: 1.6,
            textShadow: '1px 1px 2px rgba(255, 255, 255, 0.6)',
            marginBottom: responsive.storyMarginBottom()
        },
        storyImage: {
            width: responsive.imageWidth() + 'px',
            height: responsive.imageHeight() + 'px',
            objectFit: 'cover',
            borderRadius: responsive.borderRadius(),
            filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3))',
            marginBottom: responsive.storyMarginBottom()
        },
        titleContainer: {
            position: 'absolute',
            top: '5vh',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 15,
            textAlign: 'center',
            background: 'transparent',
            backdropFilter: 'blur(10px)',
            padding: responsive.titlePadding(),
            borderRadius: '50px',
            boxShadow: '0 20px 40px rgba(5, 5, 5, 0.1)',
        },
        mainTitle: {
            fontSize: responsive.titleFontSize(),
            color: '#F07167',
            marginBottom: '1rem',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
        },
        subtitle: {
            fontSize: responsive.subtitleFontSize(),
            color: '#F07167',
            opacity: 0.8,
            maxWidth: '500px',
            lineHeight: 1.6
        },
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
                    <img style={styles.roadSvg} src={RouteBackground} alt="Background Overlay of the Team Section, depicting a route under the text blocks" />
                </div>

                {/* Side content with story boards - medium parallax speed */}
                <animated.div style={{ ...styles.sideContent, ...sideContentSpring }}>
                    {responsive.getStoryBoardData().storyBoards.map((storyBoard, index) => (
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
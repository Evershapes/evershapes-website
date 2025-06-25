import React, { useState, useEffect, useRef } from 'react';
import { useSpring, animated, config } from 'react-spring';

const TeamSection = () => {
    const [scrollY, setScrollY] = useState(0);
    const [sectionTop, setSectionTop] = useState(0);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const sectionRef = useRef(null);

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

    const styles = {
        // Wrapper pour gérer les transitions entre sections
        sectionWrapper: {
            position: 'relative',
            background: 'transparent',
            zIndex: 50, // Lower z-index than cliff section
        },
        teamSection: {
            height: '500vh', // Much taller section for scrolling
            position: 'relative',
            overflow: 'hidden',
            background: '#FDFCDC', // Couleur uniforme sans dégradé
            zIndex: 50, // Lower z-index than cliff section
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
            width: getResponsiveValue('200px', '300px', '400px'), // Made wider
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
        teamMember: {
            position: 'absolute',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(15px)',
            borderRadius: '20px',
            padding: getResponsiveValue('1.5rem', '2rem', '2.5rem'),
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.15)',
            border: '3px solid rgba(254, 217, 183, 0.8)',
            maxWidth: getResponsiveValue('280px', '320px', '380px'),
            pointerEvents: 'auto',
            cursor: 'pointer',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        },
        memberLeft: {
            left: getResponsiveValue('5%', '8%', '10%'),
        },
        memberRight: {
            right: getResponsiveValue('5%', '8%', '10%'),
        },
        memberName: {
            fontSize: getResponsiveValue('1.3rem', '1.5rem', '1.8rem'),
            color: '#F07167',
            marginBottom: '0.5rem',
            fontWeight: 'bold'
        },
        memberRole: {
            fontSize: getResponsiveValue('1rem', '1.1rem', '1.2rem'),
            color: '#F07167',
            opacity: 0.8,
            marginBottom: '1rem',
            fontStyle: 'italic'
        },
        memberDescription: {
            fontSize: getResponsiveValue('0.9rem', '1rem', '1.1rem'),
            color: '#555',
            lineHeight: 1.6
        },
        titleContainer: {
            position: 'absolute',
            top: '5vh',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 15, // Higher than fade overlay (10)
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            padding: getResponsiveValue('2rem', '2.5rem', '3rem'),
            borderRadius: '25px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
            border: '2px solid rgba(254, 217, 183, 0.5)',
        },
        mainTitle: {
            fontSize: getResponsiveValue('2.5rem', '3.5rem', '4.5rem'),
            color: '#F07167',
            marginBottom: '1rem',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
        },
        subtitle: {
            fontSize: getResponsiveValue('1rem', '1.2rem', '1.4rem'),
            color: '#F07167',
            opacity: 0.8,
            maxWidth: '500px',
            lineHeight: 1.6
        },
        scrollHint: {
            position: 'absolute',
            bottom: '5vh',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 15, // Higher than fade overlay
            color: '#F07167',
            textAlign: 'center',
            textShadow: '2px 2px 4px rgba(255,255,255,0.8)'
        },
        bounceIcon: {
            width: getResponsiveValue('28px', '32px', '36px'),
            height: getResponsiveValue('28px', '32px', '36px'),
            animation: 'bounce 2s infinite'
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

    // Team data with positioning
    const teamMembers = [
        {
            name: "Alex Johnson",
            role: "Lead Developer",
            description: "Passionate about creating immersive gaming experiences with cutting-edge technology.",
            position: { top: '50vh', side: 'left' }
        },
        {
            name: "Sarah Chen",
            role: "Game Designer",
            description: "Specializes in crafting engaging gameplay mechanics and memorable player experiences.",
            position: { top: '80vh', side: 'right' }
        },
        {
            name: "Mike Rodriguez",
            role: "3D Artist",
            description: "Brings worlds to life through stunning visual design and detailed 3D modeling.",
            position: { top: '110vh', side: 'left' }
        },
        {
            name: "Emma Wilson",
            role: "UI/UX Designer",
            description: "Creates intuitive and beautiful user interfaces that enhance the gaming experience.",
            position: { top: '140vh', side: 'right' }
        },
        {
            name: "David Kim",
            role: "Sound Designer",
            description: "Crafts immersive audio landscapes that bring our virtual worlds to life.",
            position: { top: '170vh', side: 'left' }
        },
        {
            name: "Lisa Park",
            role: "Project Manager",
            description: "Coordinates our talented team to deliver exceptional gaming experiences on time.",
            position: { top: '200vh', side: 'right' }
        },
        {
            name: "Tom Wilson",
            role: "QA Engineer",
            description: "Ensures our games are polished and bug-free for the best player experience.",
            position: { top: '230vh', side: 'left' }
        },
        {
            name: "Maya Patel",
            role: "Marketing Lead",
            description: "Brings our games to the world and connects with our gaming community.",
            position: { top: '260vh', side: 'right' }
        }
    ];

    return (
        <div id="team" style={styles.sectionWrapper}>
            <style jsx>{`
                @keyframes bounce {
                    0%, 20%, 50%, 80%, 100% {
                        transform: translateY(0);
                    }
                    40% {
                        transform: translateY(-12px);
                    }
                    60% {
                        transform: translateY(-6px);
                    }
                }

                .team-member:hover {
                    transform: translateY(-8px) scale(1.02) !important;
                    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2) !important;
                }

                @media (max-width: 768px) {
                    .team-member {
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

                {/* Side content with team members - medium parallax speed */}
                <animated.div style={{ ...styles.sideContent, ...sideContentSpring }}>
                    {teamMembers.map((member, index) => (
                        <div
                            key={index}
                            style={{
                                ...styles.teamMember,
                                ...(member.position.side === 'left' ? styles.memberLeft : styles.memberRight),
                                top: member.position.top,
                                animationDelay: `${index * 0.2}s`
                            }}
                            className="team-member"
                        >
                            <h3 className="BriceBold" style={styles.memberName}>
                                {member.name}
                            </h3>
                            <p className="BriceRegular" style={styles.memberRole}>
                                {member.role}
                            </p>
                            <p className="BriceRegular" style={styles.memberDescription}>
                                {member.description}
                            </p>
                        </div>
                    ))}
                </animated.div>

                {/* Overlay de fade pour transitions extra douces */}
                <div style={styles.fadeOverlay} />

                {/* Title - ABOVE the fade overlay */}
                <div style={styles.titleContainer}>
                    <h1 className="BriceBoldSemiExpanded" style={styles.mainTitle}>
                        Our Team
                    </h1>
                    <p className="BriceRegular" style={styles.subtitle}>
                        Meet the creative minds behind Evershapes. We design, we build, you play!
                    </p>
                </div>

            </section>
        </div>
    );
};

export default TeamSection;
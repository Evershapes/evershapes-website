import React, { useState, useEffect } from 'react'
import '../App.css'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "../../components/ui/navigation-menu"

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [mouseAtTop, setMouseAtTop] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check if device is mobile
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);

        let lastScrollY = window.scrollY;
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;

                    // Show/hide navbar based on scroll direction
                    if (currentScrollY > 100) { // Start hiding after 100px
                        // Only hide if not hovering
                        if (!isHovering) {
                            setIsHidden(true);
                        }
                    } else {
                        // At top of page - always show
                        setIsHidden(false);
                    }

                    setIsScrolled(currentScrollY > 50);
                    lastScrollY = currentScrollY;
                    ticking = false;
                });
                ticking = true;
            }
        };

        const handleMouseMove = (e) => {
            // Show navbar when mouse is at top 50px of screen
            if (e.clientY <= 50) {
                setMouseAtTop(true);
                setIsHidden(false);
            } else {
                setMouseAtTop(false);
                // Hide navbar if scrolled and mouse not at top and not hovering
                if (window.scrollY > 100 && !isHovering) {
                    setIsHidden(true);
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        if (!isMobile) {
            document.addEventListener('mousemove', handleMouseMove);
        }

        // Cleanup
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', checkMobile);
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isHovering, isMobile]);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            // Calculate navbar height (approximately 60px including padding)
            const navbarHeight = 60;
            
            // Get element position
            const elementPosition = element.offsetTop;
            
            // For "accueil" section, scroll a bit higher to show navbar above it
            let offsetPosition = sectionId === 'accueil' 
                ? elementPosition - navbarHeight - 10 // Extra 10px for spacing
                : elementPosition - navbarHeight;
                
            window.scrollTo({
                top: Math.max(0, offsetPosition), // Ensure we don't scroll above page top
                behavior: 'smooth'
            });

            // On mobile, hide navbar after navigation
            if (isMobile) {
                setTimeout(() => {
                    if (window.scrollY > 100) {
                        setIsHidden(true);
                    }
                }, 1500);
            }
        }
    };

    const handleMouseEnter = () => {
        setIsHovering(true);
        setIsHidden(false); // Show navbar when hovering
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        // Hide navbar if scrolled down and mouse not at top
        if (window.scrollY > 100 && !mouseAtTop) {
            setIsHidden(true);
        }
    };

    const handleOpenNavbar = () => {
        setIsHidden(false);
        // Auto-hide after 3 seconds if on mobile and scrolled
        if (isMobile && window.scrollY > 100) {
            setTimeout(() => {
                if (window.scrollY > 100) {
                    setIsHidden(true);
                }
            }, 3000);
        }
    };

    // Only show menu indicator when scrolled down AND navbar is hidden
    const shouldShowMenuIndicator = window.scrollY > 100 && isHidden && !mouseAtTop;

    return (
        <>
            <div
                className={`fixed top-2 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-in-out cursor-pointer ${
                    shouldShowMenuIndicator ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
                }`}
                onClick={handleOpenNavbar}
                style={{
                    backgroundColor: '#F07167',
                    borderRadius: '0 0 20px 20px',
                    padding: '8px 16px 12px 16px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                }}
            >
                <div className="flex flex-col items-center">
                    <span className="text-white text-sm font-bold BriceBold">Menu</span>
                    <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white mt-1"></div>
                </div>
            </div>

            <div 
                className="sticky top-0 z-40 transition-all duration-500 ease-in-out bg-transparent"
                style={{
                    transform: isHidden && !mouseAtTop
                        ? 'translateY(-100%)'
                        : 'translateY(0)',
                    opacity: isHidden && !mouseAtTop ? 0 : 1,
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <nav
                    className={`w-full flex flex-col items-center justify-center px-6 m-0 transition-all duration-500 ease-in-out`}
                    style={{
                        backgroundColor: '#FED9B7',
                        padding: '10px 0 15px 0',
                        borderRadius: '0 0 50% 50% / 0 0 30px 30px',
                        boxShadow: '0 4px 8px rgba(192, 139, 89, 0.41)',
                    }}
                >
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem style={{ margin: '5px' }}>
                                <NavigationMenuLink
                                    className='BriceBold text-2xl ease-in-out transform hover:scale-105 hover:bg-transparent transition duration-300 px-4 py-2 rounded-lg cursor-pointer'
                                    onClick={() => scrollToSection('accueil')}
                                    style={{
                                        color: '#F07167',
                                    }}
                                >
                                    Accueil
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem style={{ margin: '5px' }}>
                                <NavigationMenuLink
                                    className='BriceBold text-2xl ease-in-out transform hover:scale-105 hover:bg-transparent transition duration-300 px-4 py-2 rounded-lg cursor-pointer'
                                    onClick={() => scrollToSection('team')}
                                    style={{
                                        color: '#F07167',
                                    }}
                                >
                                    Team
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem style={{ margin: '5px' }}>
                                <NavigationMenuLink
                                    className='BriceBold text-2xl ease-in-out transform hover:scale-105 hover:bg-transparent transition duration-300 px-4 py-2 rounded-lg cursor-pointer'
                                    onClick={() => scrollToSection('projects')}
                                    style={{
                                        color: '#F07167',
                                    }}
                                >
                                    Projects
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </nav>
            </div>
        </>
    )
}
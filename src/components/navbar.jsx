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
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenuTimer, setMobileMenuTimer] = useState(null);

    useEffect(() => {
        // Check if device is mobile
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);

        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;

                    if (isMobile) {
                        // Mobile behavior
                        if (mobileMenuOpen) {
                            // If mobile menu is open, detect scroll to close it
                            if (Math.abs(currentScrollY - lastScrollY) > 30) { // User scrolled more than 30px
                                setMobileMenuOpen(false);
                                // Clear the auto-hide timer
                                if (mobileMenuTimer) {
                                    clearTimeout(mobileMenuTimer);
                                    setMobileMenuTimer(null);
                                }
                                // Only hide if not at top
                                if (currentScrollY > 20) {
                                    setIsHidden(true);
                                } else {
                                    setIsHidden(false);
                                }
                            }
                        } else {
                            // Normal mobile behavior - hide when scrolling away from top
                            if (currentScrollY > 20) {
                                setIsHidden(true);
                            } else {
                                setIsHidden(false);
                            }
                        }
                    } else {
                        // Desktop behavior
                        if (currentScrollY > 100) {
                            if (!isHovering) {
                                setIsHidden(true);
                            }
                        } else {
                            setIsHidden(false);
                        }
                    }

                    setIsScrolled(currentScrollY > 50);
                    setLastScrollY(currentScrollY);
                    ticking = false;
                });
                ticking = true;
            }
        };

        const handleMouseMove = (e) => {
            // Only handle mouse move on desktop
            if (!isMobile) {
                if (e.clientY <= 50) {
                    setMouseAtTop(true);
                    setIsHidden(false);
                } else {
                    setMouseAtTop(false);
                    if (window.scrollY > 100 && !isHovering) {
                        setIsHidden(true);
                    }
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
            if (!isMobile) {
                document.removeEventListener('mousemove', handleMouseMove);
            }
            // Clear timer on cleanup
            if (mobileMenuTimer) {
                clearTimeout(mobileMenuTimer);
            }
        };
    }, [isHovering, isMobile, mobileMenuOpen, lastScrollY, mobileMenuTimer]);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const navbarHeight = 60;
            const elementPosition = element.offsetTop;
            
            let offsetPosition;
            
            switch(sectionId) {
                case 'accueil':
                    offsetPosition = Math.max(0, elementPosition - navbarHeight - 10);
                    break;
                case 'team':
                    offsetPosition = elementPosition + 50 - navbarHeight;
                    break;
                case 'projects':
                    offsetPosition = elementPosition - navbarHeight;
                    break;
                default:
                    offsetPosition = elementPosition - navbarHeight;
            }
            
            window.scrollTo({
                top: Math.max(0, offsetPosition),
                behavior: 'smooth'
            });

            // Handle mobile menu closing after navigation
            if (isMobile) {
                setMobileMenuOpen(false);
                
                // Clear the auto-hide timer
                if (mobileMenuTimer) {
                    clearTimeout(mobileMenuTimer);
                    setMobileMenuTimer(null);
                }
                
                // Special handling for "Accueil" - don't hide navbar since we're going to top
                if (sectionId === 'accueil') {
                    // Keep navbar visible when going to top
                    setIsHidden(false);
                } else {
                    // For other sections, hide navbar after a longer delay to allow scroll to complete
                    setTimeout(() => {
                        if (window.scrollY > 20) {
                            setIsHidden(true);
                        }
                    }, 1000);
                }
            }
        }
    };

    const handleMouseEnter = () => {
        if (!isMobile) {
            setIsHovering(true);
            setIsHidden(false);
        }
    };

    const handleMouseLeave = () => {
        if (!isMobile) {
            setIsHovering(false);
            if (window.scrollY > 100 && !mouseAtTop) {
                setIsHidden(true);
            }
        }
    };

    const handleOpenNavbar = () => {
        if (isMobile) {
            setMobileMenuOpen(true);
            setIsHidden(false);
            setLastScrollY(window.scrollY); // Remember current scroll position
            
            // Clear any existing timer
            if (mobileMenuTimer) {
                clearTimeout(mobileMenuTimer);
            }
            
            // Auto-hide after 6 seconds
            const timer = setTimeout(() => {
                setMobileMenuOpen(false);
                if (window.scrollY > 20) {
                    setIsHidden(true);
                }
                setMobileMenuTimer(null);
            }, 6000);
            
            setMobileMenuTimer(timer);
        } else {
            setIsHidden(false);
        }
    };

    // Different logic for mobile vs desktop menu indicator
    const shouldShowMenuIndicator = isMobile 
        ? window.scrollY > 20 && isHidden && !mobileMenuOpen
        : window.scrollY > 100 && isHidden && !mouseAtTop;

    return (
        <>
            <div
                className={`fixed top-2 left-1/2 z-[9999] transform -translate-x-1/2 z-50 transition-all duration-500 ease-in-out cursor-pointer ${
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
                <div className="flex flex-col items-center z-200">
                    <span className="text-white text-sm font-bold BriceBold">Menu</span>
                    <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white mt-1"></div>
                </div>
            </div>

            <div 
                className="sticky top-0 z-[9999] z-40 transition-all duration-500 ease-in-out bg-transparent"
                style={{
                    transform: (isHidden && !mobileMenuOpen && (!mouseAtTop || isMobile))
                        ? 'translateY(-100%)'
                        : 'translateY(0)',
                    opacity: (isHidden && !mobileMenuOpen && (!mouseAtTop || isMobile)) ? 0 : 1,
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
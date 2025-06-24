
import React, { useState, useEffect } from 'react'

    const [isScrolled, setIsScrolled] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [mouseAtTop, setMouseAtTop] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
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

        window.addEventListener('scroll', handleScroll);
        document.addEventListener('mousemove', handleMouseMove);

        // Cleanup
        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isHovering]); // Add isHovering to dependency array

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

    return (
        <>
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
                    className={`w-full flex flex-col items-center justify-center px-6 m-0 transition-all duration-0 ease-in-out`}
                    style={{
                        backgroundColor: '#FED9B7',
                        padding: '10px 0 15px 0',
                        borderRadius: '0 0 50% 50% / 0 0 30px 30px',
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
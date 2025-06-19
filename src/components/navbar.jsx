import React, { useState } from 'react'
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

export default class Navbar extends React.Component {
    
    scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    render() {
        return (
            <>
                <nav className="w-full flex flex-col items-center justify-center px-6 m-0 sticky top-0 z-50" style={{ backgroundColor: '#FDFCDC', padding: '10px'}}>
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem style={{ margin: '5px' }}>
                                <NavigationMenuLink 
                                    className='BriceBold text-2xl ease-in-out transform hover:scale-105 hover:bg-transparent transition duration-300 px-4 py-2 rounded-lg cursor-pointer'
                                    onClick={() => this.scrollToSection('accueil')}
                                >
                                    Accueil
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem style={{ margin: '5px' }}>
                                <NavigationMenuLink 
                                    className='BriceBold text-2xl ease-in-out transform hover:scale-105 hover:bg-transparent transition duration-300 px-4 py-2 rounded-lg cursor-pointer'
                                    onClick={() => this.scrollToSection('team')}
                                >
                                    Team
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem style={{ margin: '5px' }}>
                                <NavigationMenuLink 
                                    className='BriceBold text-2xl ease-in-out transform hover:scale-105 hover:bg-transparent transition duration-300 px-4 py-2 rounded-lg cursor-pointer'
                                    onClick={() => this.scrollToSection('projects')}
                                >
                                    Projects
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </nav>
            </>
        )
    }
}
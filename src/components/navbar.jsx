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

import '../../public/fonts/fonts.css'

export default class Navbar extends React.Component {
    render() {
        return (
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem style={{ margin: '5px' }}>
                        <NavigationMenuLink className='BriceBold'>
                            Models
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem style={{ margin: '5px' }}>
                        <NavigationMenuLink className='BriceBold'>
                            Bikes
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem style={{ margin: '5px' }}>
                        <NavigationMenuLink className='BriceBold'>
                            Furnitures
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem style={{ margin: '5px' }}>
                        <NavigationMenuLink className='BriceBold'>
                            Projects
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        )
    }
}


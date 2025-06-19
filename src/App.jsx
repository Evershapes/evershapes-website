import { useState } from 'react'
import './App.css'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "../components/ui/navigation-menu"

import '../public/fonts/fonts.css'

function App() {

    return (
        <>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" className='BriceBoldSemiExpanded'>
                            Models
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" className='BriceBoldSemiExpanded'>
                            Bikes
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" className='BriceBoldSemiExpanded'>
                            Furnitures
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" className='BriceBoldSemiExpanded'>
                            Projects
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </>
    )
}

export default App

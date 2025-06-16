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

function App() {

    return (
        <>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink>
                            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Models</a>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink>
                            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Bikes</a>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink>
                            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Furnitures</a>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink>
                            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Projects</a>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </>
    )
}

export default App

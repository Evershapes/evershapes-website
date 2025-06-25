import React, { useState } from 'react'
import './App.css'

import Navbar from './components/navbar.jsx';
import MainSection from './components/main_section.jsx';
import TeamSection from './components/team_section.jsx';
import ProjectsSection from './components/projects_section.jsx';
import Cliff_Back from './components/cliff_parallax_base';
import GLTFViewer from "./components/GLTFViewer_simple"
import Horizontal_Scroller from "./components/text_scroller"

class App extends React.Component {
    render() {
        return (
            <div className="min-h-screen w-full m-0 p-0">

                <Navbar />
                <MainSection />
                <Cliff_Back />
                
                <TeamSection />
                <ProjectsSection />
                <GLTFViewer config={{
                    modelPath: '/scene/evershapes_scene2.gltf',
                    cameraAngle: 30,
                    cameraDistance: 4,
                    autoRotateSpeed: 0.005,
                    modelRotation: 90,
                    modelScale: 5
                }}
                />
                <GLTFViewer config={{
                    modelPath: '/scene/evershapes_scene3.gltf',
                    cameraAngle: 30,
                    cameraDistance: 4,
                    autoRotateSpeed: 0.005,
                    modelRotation: 90,
                    modelScale: 5
                }}
                />
                <Horizontal_Scroller/>
            </div>
        )
    }
}

export default App
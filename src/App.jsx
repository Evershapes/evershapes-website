import React, { useState } from 'react'
import './App.css'

import Navbar from './components/navbar.jsx';
import MainSection from './components/main_section.jsx';
import TeamSection from './components/team_section.jsx';
import ProjectsSection from './components/projects_section.jsx';
import Cliff_Back from './components/cliff_parallax_base';
import GLTFViewer from "./components/GLTFViewer_simple"
import GLTFSection from './components/GLTFViewer_section';
import Horizontal_Scroller from "./components/text_scroller"
import Footer from "./components/footer"

// EvershapesPortfolioV2

class App extends React.Component {
    render() {
        return (
            <div className="min-h-screen w-full m-0 p-0">

                <Navbar />
                <MainSection />
                <Cliff_Back />

                <TeamSection />

                <GLTFSection
                    sectionId="middle-section"
                    config={{
                        modelPath: '/scene/evershapes_scene2.gltf',
                        cameraAngle: 10,
                        cameraDistance: 4.5,
                        autoRotateSpeed: 0.005,
                        modelRotation: 90,
                        modelScale: 5,
                        yOffset: -0.5


                    }}
                    backgroundColor='#FDFCDC'
                    ellipseGradient='repeating-linear-gradient(174deg, #0322F912 92%, #073AFF00 100%),
                repeating-linear-gradient(49deg, #F9E50373 99%, #073AFF00 100%),
                repeating-radial-gradient(75% 75% at 238% 218%, #F6222212 37%, #073AFF14 39%),
                radial-gradient(99% 99% at 109% 2%, #FCFF00FF 0%, #FFFC0000 100%),
                radial-gradient(99% 99% at 21% 78%, #A76AEFA6 0%, #073AFF00 100%),
                radial-gradient(160% 154% at 711px -303px, #FC7B00FF 0%, #FFA200FF 100%)'
                    overlayText="Go Trough Your Journey"
                    textOffsetMultiplier={6}
                    under_backgroundColor='#FED9B7'
                />
                <ProjectsSection />

                <GLTFSection

                    sectionId="bottom-section"
                    config={{
                        modelPath: '/scene/evershapes_scene3.gltf',
                        cameraAngle: 15,
                        cameraDistance: 4,
                        autoRotateSpeed: 0.005,
                        modelRotation: 90,
                        modelScale: 5,
                        yOffset: 0
                    }}
                    backgroundColor='#FDFCDC'
                    ellipseGradient='repeating-radial-gradient(75% 75% at 238% 218%, #00FFFF12 30%, #073AFF14 39%),
                radial-gradient(99% 99% at 109% 2%, #0F00A9FF 0%, #073AFF00 100%),
                radial-gradient(99% 99% at 21% 78%, #7D00FFFF 0%, #073AFF00 100%),
                radial-gradient(160% 154% at 711px -303px, #2000FFFF 0%, #000000FF 100%)'
                    overlayText="Fights Epic Battles"
                    textOffsetMultiplier={6}
                    under_backgroundColor='#0081A7'
                />
                
                <Footer />
                        
                <Horizontal_Scroller />
            </div>
        )
    }
}

export default App
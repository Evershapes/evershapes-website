import React, { useState } from 'react'
import './App.css'

import Navbar from './components/navbar.jsx';
import MainSection from './components/main_section.jsx';
import TeamSection from './components/team_section.jsx';
import ProjectsSection from './components/projects_section.jsx';
import TwoColumnSection from './components/two_column_section.jsx';
import Cliff_Back from './components/cliff_parallax_base';
import GLTFViewer from "./components/special_scene1"
import GLTFViewer2 from "./components/special_scene2"
import GLTFViewer3 from "./components/special_scene3"


class App extends React.Component {
    render() {
        return (
            <div className="min-h-screen w-full m-0 p-0">

                <Navbar/>
                <MainSection/>
                <Cliff_Back/>
                <TwoColumnSection/>
                <TeamSection/>
                <ProjectsSection/>     
                <GLTFViewer/>
                <GLTFViewer2/>
                <GLTFViewer3/>
            </div>
        )
    }
}

export default App
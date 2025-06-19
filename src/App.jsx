import React, { useState } from 'react'
import './App.css'

import Navbar from './components/navbar.jsx';
import MainSection from './components/main_section.jsx';
import TeamSection from './components/team_section.jsx';
import ProjectsSection from './components/projects_section.jsx';
import TwoColumnSection from './components/two_column_section.jsx';

class App extends React.Component {
    render() {
        return (
            <div className="min-h-screen w-full m-0 p-0">
                <Navbar/>
                
                {/* All sections stacked vertically */}
                <MainSection/>
                <TeamSection/>
                <ProjectsSection/>
                <TwoColumnSection/>
            </div>
        )
    }
}

export default App
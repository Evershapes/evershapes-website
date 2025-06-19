import React, { useState } from 'react'
import './App.css'
import '../public/fonts/fonts.css'

import Navbar from './components/navbar.jsx';
import Mainsection from './components/main_section.jsx';
import TwoColumnSection from './components/two_column_section.jsx';

class App extends React.Component {
    render() {
        return (
            <div className="min-h-screen w-full m-0 p-0">
                <nav className="h-[10vh] w-full flex items-center justify-center px-6 m-0" style={{ backgroundColor: '#FED9B7' }}>
                    <Navbar/>
                </nav>

                <Mainsection/>

                <TwoColumnSection/>

            </div>
        )
    }
}

export default App
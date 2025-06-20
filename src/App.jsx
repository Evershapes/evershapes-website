import React, { useState } from 'react'
import './App.css'
import '../public/fonts/fonts.css'

import Navbar from './components/navbar.jsx';
import Mainsection from './components/main_section.jsx';
import TwoColumnSection from './components/two_column_section.jsx';
import ChessBoard4x4 from './components/tester_chess.jsx';
import Cliff_Back from './components/cliff_parallax_base';

class App extends React.Component {
    render() {
        return (
            <div className="min-h-screen w-full m-0 p-0">
                <nav className="h-[10vh] w-full flex items-center justify-center px-6 m-0" style={{ backgroundColor: '#FED9B7' }}>
                    <Navbar/>
                </nav>

                <Mainsection/>

                <Cliff_Back/>

                <TwoColumnSection/>

                <ChessBoard4x4/>
            </div>
        )
    }
}

export default App
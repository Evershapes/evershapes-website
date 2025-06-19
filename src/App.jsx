import React, { useState } from 'react'
import './App.css'

import Navbar from './components/navbar.jsx';
import Mainsection from './components/main_section.jsx';
import TwoColumnSection from './components/two_column_section.jsx';

class App extends React.Component {
    render() {
        return (
            <div className="min-h-screen w-full m-0 p-0">
                <Navbar/>

                <Mainsection/>

                <TwoColumnSection/>

            </div>
        )
    }
}

export default App
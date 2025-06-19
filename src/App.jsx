import React, { useState } from 'react'
import './App.css'
//import '../public/fonts/fonts.css'

import Header from './components/header.jsx';
import Navbar from './components/navbar.jsx';

class App extends React.Component {
    render() {
        return (
            <div className="min-h-screen w-full m-0 p-0">
                <Header/>
                <Navbar/>
                {/* First Section - 90vh height with cream background */}
                <section className="h-[90vh] w-full flex items-center justify-center m-0" style={{ backgroundColor: '#FDFCDC' }}>
                    <div className="text-center p-8">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">
                            Welcome to Evershapes
                        </h1>
                        <p className="text-lg text-gray-600">
                            Your content goes here. This area takes up 90% of the viewport height.
                        </p>
                    </div>
                </section>

                {/* Second Section - 90vh height with two-column layout */}
                <section className="h-[90vh] w-full flex m-0">
                    {/* Left Column - Darker coral/salmon color */}
                    <div className="w-1/2 h-full flex items-center justify-center" style={{ backgroundColor: '#F07167' }}>
                        <div className="text-center text-white p-8">
                            <h2 className="text-3xl font-bold mb-4">Left Section</h2>
                            <p className="text-lg">Your content for the left column goes here.</p>
                        </div>
                    </div>

                    {/* Right Column - Lighter peach color */}
                    <div className="w-1/2 h-full flex items-center justify-center" style={{ backgroundColor: '#FED9B7' }}>
                        <div className="text-center text-gray-800 p-8">
                            <h2 className="text-3xl font-bold mb-4">Right Section</h2>
                            <p className="text-lg">Your content for the right column goes here.</p>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default App
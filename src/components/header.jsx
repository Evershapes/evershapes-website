import React, { Component } from 'react'
import '../App.css'
import './header.css'

import EvershapesLogo from '../assets/logotransparent.svg'

export default class Header extends Component {
    componentDidMount() {
        // Interactive bubble that follows mouse
        const interBubble = document.querySelector('.interactive');
        if (interBubble) {
            let curX = 0;
            let curY = 0;
            let tgX = 0;
            let tgY = 0;

            const move = () => {
                curX += (tgX - curX) / 20;
                curY += (tgY - curY) / 20;
                interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
                requestAnimationFrame(move);
            };

            const handleMouseMove = (event) => {
                const headerRect = document.querySelector('.header-container').getBoundingClientRect();
                tgX = event.clientX - headerRect.left;
                tgY = event.clientY - headerRect.top;
            };

            document.querySelector('.header-container').addEventListener('mousemove', handleMouseMove);
            move();
        }
    }

    render() {
        return (
            <div className="header-container">
                {/* SVG Filter for the goo effect */}
                <svg xmlns="http://www.w3.org/2000/svg" className="svg-filter">
                    <defs>
                        <filter id="goo">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
                            <feBlend in="SourceGraphic" in2="goo" />
                        </filter>
                    </defs>
                </svg>

                {/* Gradient background with animated blobs */}
                <div className="gradient-bg">
                    <div className="gradients-container">
                        <div className="g1"></div>
                        <div className="g2"></div>
                        <div className="g3"></div>
                        <div className="g4"></div>
                        <div className="g5"></div>
                        <div className="interactive"></div>
                    </div>
                </div>

                {/* Content overlay */}
                <div className="header-content">
                    <div className="logo-container">
                        <img src={EvershapesLogo} height="120" width="120" alt="Evershapes Logo" />
                    </div>
                    <div className="title-container">
                        <h1 className="text-4xl BriceBoldSemiExpanded header-title">
                            Evershapes
                        </h1>
                    </div>
                </div>
            </div>
        )
    }
}
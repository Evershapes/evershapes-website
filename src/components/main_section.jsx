import React from 'react'
import EvershapesLogo from '../assets/logotransparent.svg'


const MainSection = () => {
    return (
        <section id="accueil" className="relative h-[50vh] w-full flex flex-col items-center justify-center m-0" style={{ backgroundColor: '#FDFCDC' }}>
            {/* Lava Lamp Effect */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="lava-container">
                    <div className="blob blob-1"></div>
                    <div className="blob blob-2"></div>
                    <div className="blob blob-3"></div>
                    <div className="blob blob-4"></div>
                    <div className="blob blob-5"></div>
                    <div className="blob blob-6"></div>
                    <div className="blob blob-7"></div>
                    <div className="blob blob-8"></div>
                    <div className="blob blob-9"></div>
                    <div className="blob blob-10"></div>
                    <div className="blob blob-11"></div>
                    <div className="blob blob-12"></div>
                    <div className="blob blob-13"></div>
                    <div className="blob blob-14"></div>
                    <div className="blob blob-15"></div>
                    <div className="blob blob-16"></div>
                    <div className="blob blob-17"></div>
                    <div className="blob blob-18"></div>
                    <div className="blob blob-19"></div>
                    <div className="blob blob-20"></div>
                    <div className="blob blob-top"></div>
                </div>
            </div>
            
            {/* SVG Filter for Goo Effect */}
            <svg className="absolute w-0 h-0" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                        <feBlend in="SourceGraphic" in2="goo" />
                    </filter>
                </defs>
            </svg>

            {/* Original Content */}
            <div className="logo-container relative z-10">
                <img src={EvershapesLogo} height="120" width="120" alt="Evershapes Logo"/>
            </div>
            <div className="title-container relative z-10">
                <h1 className="text-4xl BriceBoldSemiExpanded" style={{color: '#F07167'}}>
                    Evershapes
                </h1>
                <p className="text-xl mt-4 text-center max-w-2xl BriceRegular">
                    We design, we build, you play!
                </p>
            </div>

            <style jsx>{`
                .lava-container {
                    filter: url("#goo");
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    will-change: filter;
                }
                
                .blob {
                    position: absolute;
                    border-radius: 50%;
                    background: #FED9B7;
                    opacity: 0.8;
                    will-change: transform;
                }
                
                .blob-top {
                    width: 100%;
                    height: 4%;
                    top: -3%;
                    left: 0;
                }
                
                .blob-1 {
                    width: 80px;
                    height: 80px;
                    left: 15%;
                    top: -8%;
                    animation: wobble-1 4s ease-out alternate infinite, move-1 13s ease-in-out infinite;
                }
                
                .blob-2 {
                    width: 120px;
                    height: 120px;
                    right: 35%;
                    top: -12%;
                    animation: wobble-2 5s ease-out alternate infinite, move-2 22s ease-in-out infinite;
                }
                
                .blob-3 {
                    width: 60px;
                    height: 60px;
                    top: -5%;
                    left: 45%;
                    animation: wobble-3 6s ease-out alternate infinite, move-3 16s ease-in-out infinite;
                }
                
                .blob-4 {
                    width: 95px;
                    height: 95px;
                    top: -10%;
                    left: 65%;
                    animation: wobble-4 8s ease-out alternate infinite, move-4 12s ease-in-out infinite;
                }
                
                .blob-5 {
                    width: 40px;
                    height: 40px;
                    top: -6%;
                    left: 25%;
                    animation: wobble-5 9s ease-out alternate infinite, move-5 32s ease-in-out infinite;
                }
                
                .blob-6 {
                    width: 55px;
                    height: 55px;
                    top: -7%;
                    right: 15%;
                    animation: wobble-6 10s ease-out alternate infinite, move-6 12s ease-in-out infinite;
                }
                
                .blob-7 {
                    width: 110px;
                    height: 110px;
                    top: -15%;
                    right: 55%;
                    animation: wobble-7 11s ease-out alternate infinite, move-7 32s ease-in-out infinite;
                }
                
                .blob-8 {
                    width: 70px;
                    height: 70px;
                    top: -9%;
                    left: 5%;
                    animation: wobble-8 7s ease-out alternate infinite, move-8 18s ease-in-out infinite;
                }
                
                .blob-9 {
                    width: 45px;
                    height: 45px;
                    top: -4%;
                    left: 75%;
                    animation: wobble-9 5.5s ease-out alternate infinite, move-9 25s ease-in-out infinite;
                }
                
                .blob-10 {
                    width: 85px;
                    height: 85px;
                    top: -11%;
                    right: 45%;
                    animation: wobble-10 6.5s ease-out alternate infinite, move-10 14s ease-in-out infinite;
                }
                
                .blob-11 {
                    width: 50px;
                    height: 50px;
                    top: -6%;
                    left: 85%;
                    animation: wobble-11 8.5s ease-out alternate infinite, move-11 20s ease-in-out infinite;
                }
                
                .blob-12 {
                    width: 65px;
                    height: 65px;
                    top: -8%;
                    right: 5%;
                    animation: wobble-12 4.5s ease-out alternate infinite, move-12 28s ease-in-out infinite;
                }
                
                .blob-13 {
                    width: 35px;
                    height: 35px;
                    top: -3%;
                    left: 55%;
                    animation: wobble-13 9.5s ease-out alternate infinite, move-13 15s ease-in-out infinite;
                }
                
                .blob-14 {
                    width: 75px;
                    height: 75px;
                    top: -13%;
                    left: 95%;
                    animation: wobble-14 3.5s ease-out alternate infinite, move-14 26s ease-in-out infinite;
                }
                
                .blob-15 {
                    width: 90px;
                    height: 90px;
                    top: -16%;
                    right: 25%;
                    animation: wobble-15 7.5s ease-out alternate infinite, move-15 19s ease-in-out infinite;
                }
                
                .blob-16 {
                    width: 42px;
                    height: 42px;
                    top: -5%;
                    left: 10%;
                    animation: wobble-16 6.2s ease-out alternate infinite, move-16 21s ease-in-out infinite;
                }
                
                .blob-17 {
                    width: 68px;
                    height: 68px;
                    top: -9%;
                    right: 8%;
                    animation: wobble-17 8.7s ease-out alternate infinite, move-17 17s ease-in-out infinite;
                }
                
                .blob-18 {
                    width: 52px;
                    height: 52px;
                    top: -7%;
                    left: 38%;
                    animation: wobble-18 5.8s ease-out alternate infinite, move-18 23s ease-in-out infinite;
                }
                
                .blob-19 {
                    width: 78px;
                    height: 78px;
                    top: -12%;
                    right: 60%;
                    animation: wobble-19 4.3s ease-out alternate infinite, move-19 16s ease-in-out infinite;
                }
                
                .blob-20 {
                    width: 38px;
                    height: 38px;
                    top: -4%;
                    left: 68%;
                    animation: wobble-20 9.2s ease-out alternate infinite, move-20 29s ease-in-out infinite;
                }

                /* Movement animations */
                @keyframes move-1 {
                    0%, 100% { transform: translate3d(0, 0, 0); }
                    50% { transform: translate3d(0, 15vh, 0); }
                }
                
                @keyframes move-2 {
                    0%, 100% { transform: translate3d(0, 0, 0); }
                    50% { transform: translate3d(0, 12vh, 0); }
                }
                
                @keyframes move-3 {
                    0%, 100% { transform: translate3d(0, 0, 0); }
                    50% { transform: translate3d(0, 18vh, 0); }
                }
                
                @keyframes move-4 {
                    0%, 100% { transform: translate3d(0, 0, 0); }
                    50% { transform: translate3d(0, 14vh, 0); }
                }
                
                @keyframes move-5 {
                    0%, 100% { transform: translate3d(0, 0, 0); }
                    50% { transform: translate3d(0, 20vh, 0); }
                }
                
                @keyframes move-6 {
                    0%, 100% { transform: translate3d(0, 0, 0); }
                    50% { transform: translate3d(0, 16vh, 0); }
                }
                
                @keyframes move-7 {
                    0%, 100% { transform: translate3d(0, 0, 0); }
                    50% { transform: translate3d(0, 10vh, 0); }
                }
                
                @keyframes move-8 {
                    0%, 100% { transform: translate3d(0, 0, 0); }
                    50% { transform: translate3d(0, 22vh, 0); }
                }
                
                @keyframes move-9 {
                    0%, 100% { transform: translate3d(0, 0, 0); }
                    50% { transform: translate3d(0, 25vh, 0); }
                }
                
                @keyframes move-10 {
                    0%, 100% { transform: translate3d(0, 0, 0); }
                    50% { transform: translate3d(0, 13vh, 0); }
                }
                
                @keyframes move-11 {
                    0%, 100% { transform: translate3d(0, 0, 0); }
                    50% { transform: translate3d(0, 19vh, 0); }
                }
                
                @keyframes move-12 {
                    0%, 100% { transform: translate3d(0, 0, 0); }
                    50% { transform: translate3d(0, 17vh, 0); }
                }
                
                @keyframes move-13 {
                    0%, 100% { transform: translate3d(0, 0, 0); }
                    50% { transform: translate3d(0, 24vh, 0); }
                }
                
                @keyframes move-14 {
                    0%, 100% { transform: translate3d(0, 0, 0); }
                    50% { transform: translate3d(0, 11vh, 0); }
                }
                
                @keyframes move-15 {
                    0%, 100% { transform: translate3d(0, 0, 0); }
                    50% { transform: translate3d(0, 15vh, 0); }
                }
                
                @keyframes move-16 {
                    0%, 100% { transform: translate3d(0, 0, 0); }
                    50% { transform: translate3d(0, 21vh, 0); }
                }
                
                @keyframes move-17 {
                    0%, 100% { transform: translate3d(0, 0, 0); }
                    50% { transform: translate3d(0, 16vh, 0); }
                }
                
                @keyframes move-18 {
                    0%, 100% { transform: translate3d(0, 0, 0); }
                    50% { transform: translate3d(0, 23vh, 0); }
                }
                
                @keyframes move-19 {
                    0%, 100% { transform: translate3d(0, 0, 0); }
                    50% { transform: translate3d(0, 14vh, 0); }
                }
                
                @keyframes move-20 {
                    0%, 100% { transform: translate3d(0, 0, 0); }
                    50% { transform: translate3d(0, 20vh, 0); }
                }

                /* Wobble animations */
                @keyframes wobble-1 {
                    to { border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%; }
                }
                
                @keyframes wobble-2 {
                    to { border-radius: 38% 62% 65% 35% / 50% 50% 60% 40%; }
                }
                
                @keyframes wobble-3 {
                    to { border-radius: 45% 55% 75% 25% / 40% 60% 50% 50%; }
                }
                
                @keyframes wobble-4 {
                    to { border-radius: 40% 60% 68% 32% / 55% 35% 65% 45%; }
                }
                
                @keyframes wobble-5 {
                    to { border-radius: 48% 52% 72% 28% / 42% 58% 52% 48%; }
                }
                
                @keyframes wobble-6 {
                    to { border-radius: 35% 65% 80% 20% / 48% 52% 58% 42%; }
                }
                
                @keyframes wobble-7 {
                    to { border-radius: 43% 57% 66% 34% / 46% 54% 56% 44%; }
                }
                
                @keyframes wobble-8 {
                    to { border-radius: 50% 50% 60% 40% / 35% 65% 45% 55%; }
                }
                
                @keyframes wobble-9 {
                    to { border-radius: 36% 64% 78% 22% / 52% 48% 62% 38%; }
                }
                
                @keyframes wobble-10 {
                    to { border-radius: 44% 56% 74% 26% / 47% 53% 57% 43%; }
                }
                
                @keyframes wobble-11 {
                    to { border-radius: 39% 61% 69% 31% / 41% 59% 51% 49%; }
                }
                
                @keyframes wobble-12 {
                    to { border-radius: 46% 54% 63% 37% / 54% 46% 64% 36%; }
                }
                
                @keyframes wobble-13 {
                    to { border-radius: 41% 59% 77% 23% / 38% 62% 48% 52%; }
                }
                
                @keyframes wobble-14 {
                    to { border-radius: 37% 63% 71% 29% / 56% 44% 66% 34%; }
                }
                
                @keyframes wobble-15 {
                    to { border-radius: 49% 51% 65% 35% / 43% 57% 53% 47%; }
                }
                
                @keyframes wobble-16 {
                    to { border-radius: 45% 55% 62% 38% / 39% 61% 49% 51%; }
                }
                
                @keyframes wobble-17 {
                    to { border-radius: 52% 48% 74% 26% / 56% 44% 64% 36%; }
                }
                
                @keyframes wobble-18 {
                    to { border-radius: 34% 66% 67% 33% / 45% 55% 41% 59%; }
                }
                
                @keyframes wobble-19 {
                    to { border-radius: 47% 53% 79% 21% / 52% 48% 58% 42%; }
                }
                
                @keyframes wobble-20 {
                    to { border-radius: 41% 59% 58% 42% / 37% 63% 47% 53%; }
                }
                
                /* Reduce motion for accessibility */
                @media (prefers-reduced-motion: reduce) {
                    .blob {
                        animation-duration: 20s;
                    }
                }
            `}</style>
        </section>
    )
}

export default MainSection 
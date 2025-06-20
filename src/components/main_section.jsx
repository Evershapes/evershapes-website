import React from 'react'
import EvershapesLogo from '../assets/logotransparent.svg'

const MainSection = () => {
    return (
        <section id="accueil" className="h-[90vh] w-full flex flex-col items-center justify-center m-0" style={{ backgroundColor: '#FDFCDC' }}>
            <div className="logo-container">
                <img src={EvershapesLogo} height="120" width="120" alt="Evershapes Logo"/>
            </div>
            <div className="title-container">
                <h1 className="text-4xl BriceBoldSemiExpanded" style={{color: '#F07167'}}>
                    Evershapes
                </h1>
                <p className="text-xl mt-4 text-center max-w-2xl BriceRegular">
                    We design, we build, you play!
                </p>
            </div>
        </section>
    )
}

export default MainSection
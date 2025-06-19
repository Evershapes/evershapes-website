import React from 'react'

const MainSection = () => {
    return (
        <section className="h-[90vh] w-full flex items-center justify-center m-0" style={{backgroundColor: '#FDFCDC'}}>
            <div className="text-center p-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                    Welcome to Evershapes
                </h1>
                <p className="text-lg text-gray-600">
                    Your content goes here. This area takes up 90% of the viewport height.
                </p>
            </div>
        </section>
    )
}

export default MainSection
import React, { useState } from 'react'
import Card from '../utils/card.jsx'
import Modal from '../utils/modal.jsx'
import { getAllProjects } from '../utils/content.jsx'

const ProjectsSection = () => {
    // Get all projects from the JSON file
    const projects = getAllProjects();
    
    // Modal state
    const [modalOpen, setModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState('');
    const [modalTitle, setModalTitle] = useState('');

    const handleImageClick = (imagePath, title) => {
        setModalImage(imagePath);
        setModalTitle(title);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setModalImage('');
        setModalTitle('');
    };

    return (
        <section 
            id="projects" 
            className="w-full flex flex-col items-center justify-center m-0 p-8" 
            style={{ 
                backgroundColor: '#FDFCDC',
                minHeight: 'fit-content',
                paddingTop: '4rem',
                paddingBottom: '4rem'
            }}
        >
            <div className="projects-content text-center w-full">
                <h1 className="text-5xl BriceBoldSemiExpanded mb-12" style={{ color: '#F07167' }}>
                    Our Projects
                </h1>

                {/* Cards container */}
                <div className="cards-grid">
                    <style>{`
                        .cards-grid {
                            display: grid;
                            gap: 2rem;
                            width: 100%;
                            margin: 2rem auto 0;
                            padding: 0 2rem;
                            justify-items: stretch;
                            align-items: start;
                            min-height: fit-content;
                        }

                        /* Dynamic height calculation based on content */
                        #projects {
                            min-height: fit-content !important;
                            height: auto;
                        }

                        @media (min-width: 1600px) {
                            .cards-grid {
                                grid-template-columns: repeat(5, minmax(320px, 360px));
                                max-width: 1800px;
                                justify-content: center;
                            }
                        }

                        @media (min-width: 1200px) and (max-width: 1599px) {
                            .cards-grid {
                                grid-template-columns: repeat(4, minmax(320px, 360px));
                                max-width: 1500px;
                                justify-content: center;
                            }
                        }

                        @media (min-width: 900px) and (max-width: 1199px) {
                            .cards-grid {
                                grid-template-columns: repeat(3, minmax(320px, 380px));
                                max-width: 1200px;
                                justify-content: center;
                            }
                        }

                        @media (min-width: 600px) and (max-width: 899px) {
                            .cards-grid {
                                grid-template-columns: repeat(2, minmax(320px, 400px));
                                max-width: 850px;
                                gap: 1.5rem;
                                justify-content: center;
                            }
                        }

                        @media (max-width: 599px) {
                            .cards-grid {
                                grid-template-columns: 1fr;
                                max-width: 400px;
                                gap: 1rem;
                                padding: 0 1rem;
                                justify-content: center;
                            }
                        }

                        .no-projects {
                            color: #0081A7;
                            font-size: 1.2rem;
                            margin-top: 2rem;
                            grid-column: 1 / -1;
                            text-align: center;
                        }

                        /* Ensure proper spacing */
                        @media (min-width: 1600px) {
                            #projects {
                                padding-top: ${Math.ceil(projects.length / 5) > 2 ? '3rem' : '4rem'};
                                padding-bottom: ${Math.ceil(projects.length / 5) > 2 ? '3rem' : '4rem'};
                            }
                        }

                        @media (min-width: 1200px) and (max-width: 1599px) {
                            #projects {
                                padding-top: ${Math.ceil(projects.length / 4) > 2 ? '3rem' : '4rem'};
                                padding-bottom: ${Math.ceil(projects.length / 4) > 2 ? '3rem' : '4rem'};
                            }
                        }

                        @media (min-width: 900px) and (max-width: 1199px) {
                            #projects {
                                padding-top: ${Math.ceil(projects.length / 3) > 2 ? '3rem' : '4rem'};
                                padding-bottom: ${Math.ceil(projects.length / 3) > 2 ? '3rem' : '4rem'};
                            }
                        }

                        @media (min-width: 600px) and (max-width: 899px) {
                            #projects {
                                padding-top: ${Math.ceil(projects.length / 2) > 3 ? '2rem' : '4rem'};
                                padding-bottom: ${Math.ceil(projects.length / 2) > 3 ? '2rem' : '4rem'};
                            }
                        }

                        @media (max-width: 599px) {
                            #projects {
                                padding-top: ${projects.length > 4 ? '2rem' : '3rem'};
                                padding-bottom: ${projects.length > 4 ? '2rem' : '3rem'};
                            }
                        }
                    `}</style>

                    {projects.length > 0 ? (
                        projects.map((project, index) => (
                            <Card
                                key={project.id || index}
                                title={project.Title}
                                description={project.Description}
                                imagePath={project.Path}
                                className="project-card"
                                onImageClick={handleImageClick}
                            />
                        ))
                    ) : (
                        <div className="no-projects BriceRegular">
                            No projects found. Add something to all-content.json file!
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            <Modal 
                isOpen={modalOpen}
                onClose={closeModal}
                imageSrc={modalImage}
                title={modalTitle}
            />
        </section>
    )
}

export default ProjectsSection
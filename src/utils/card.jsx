import React from 'react';

const Card = ({ title, description, imagePath, className = "", onImageClick }) => {
  const handleCardClick = () => {
    if (onImageClick) {
      onImageClick(imagePath, title);
    }
  };

  return (
    <div className={`card-container ${className}`}>
      <style>{`
        .card-container {
          background: #F07167;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          
          width: 100%;
          max-width: 400px;
          min-width: 320px;
          height: 400px;
          display: flex;
          flex-direction: column;
          cursor: pointer;
        }

        .card-container:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
        }

        .card-image {
          width: 100%;
          height: 280px; /* Increased from 200px */
          object-fit: cover;
          transition: transform 0.3s ease;
          position: relative;
          z-index: 1;
        }

        .card-container:hover .card-image {
          transform: scale(1.05);
        }

        .card-content {
          padding: 1rem; /* Reduced from 1.5rem */
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 0; /* Allow shrinking */
        }

        .card-title {
          font-size: 1.3rem; /* Slightly smaller */
          font-weight: bold;
          margin-bottom: 0.25rem; /* Reduced margin */
          color: #FED9B7;
          line-height: 1.2;
        }

        .card-description {
          color: #FDFCDC;
          line-height: 1.4; /* Tighter line height */
          
          text-align: left;
          flex: 1;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 3; /* Reduced from 6 to 3 lines */
          -webkit-box-orient: vertical;
        }

        .card-image-container {
          overflow: hidden;
          height: 280px; /* Increased from 200px */
          background: #FED9B7;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          flex-shrink: 0;
        }

        .card-placeholder {
          color: #ccc;
          font-size: 4rem; /* Larger placeholder for bigger area */
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1;
        }

        .click-hint {
          position: absolute;
          top: 10px;
          right: 10px;
          background: #F07167;
          color: white;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.8rem;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 10;
          pointer-events: none;
        }

        .card-container:hover .click-hint {
          opacity: 1;
        }

        @media (max-width: 599px) {
          .card-container {
            min-width: 100%;
            max-width: 100%;
            height: 380px; /* Adjusted for mobile */
          }
          
          .card-content {
            padding: 0.8rem;
          }
          
          .card-title {
            font-size: 1.2rem;
          }
          
          .card-description {
            font-size: 0.85rem;
            -webkit-line-clamp: 2; /* Even fewer lines on mobile */
          }
          
          .card-image-container {
            height: 240px; /* Bigger image on mobile too */
          }

          .card-image {
            height: 240px;
          }
        }

        @media (min-width: 600px) and (max-width: 899px) {
          .card-container {
            height: 390px;
          }
          
          .card-image-container {
            height: 260px;
          }

          .card-image {
            height: 260px;
          }
        }
      `}</style>
      
      <div className="card-image-container" onClick={handleCardClick}>
        <div className="click-hint BriceLightSemiCondensed">Click to view</div>
        {imagePath && (
          <img 
            src={imagePath} 
            alt={title}
            className="card-image"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
        )}
        <div className="card-placeholder" style={{ display: imagePath ? 'none' : 'block' }}>
          📷
        </div>
      </div>
      
      <div className="card-content">
        <h3 className="card-title BriceBoldSemiCondensed">
          {title}
        </h3>
        <p className="card-description BriceLightSemiCondensed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Card;
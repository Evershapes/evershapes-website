import React, { useState, useEffect } from 'react';

const Modal = ({ isOpen, onClose, imageSrc, title }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

  // Close modal when clicking on backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle image load to get dimensions
  const handleImageLoad = (e) => {
    const img = e.target;
    setImageDimensions({
      width: img.naturalWidth,
      height: img.naturalHeight
    });
    setImageLoaded(true);
  };

  // Calculate optimal size for the image
  const getOptimalImageSize = () => {
    if (!imageLoaded || !imageDimensions.width || !imageDimensions.height) {
      return { width: '400px', height: '300px' };
    }

    const maxWidth = window.innerWidth * 0.85;
    const maxHeight = window.innerHeight * 0.75;
    const aspectRatio = imageDimensions.width / imageDimensions.height;

    let width = imageDimensions.width;
    let height = imageDimensions.height;

    // Scale down if too large
    if (width > maxWidth) {
      width = maxWidth;
      height = width / aspectRatio;
    }

    if (height > maxHeight) {
      height = maxHeight;
      width = height * aspectRatio;
    }

    return {
      width: `${Math.round(width)}px`,
      height: `${Math.round(height)}px`
    };
  };

  // Close modal when pressing Escape key
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleResize = () => {
      if (imageLoaded) {
        setImageLoaded(false);
        setTimeout(() => setImageLoaded(true), 100);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      window.addEventListener('resize', handleResize);
      document.body.style.overflow = 'hidden';
    } else {
      setImageLoaded(false);
      setImageDimensions({ width: 0, height: 0 });
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, imageLoaded]);

  if (!isOpen) {
    return null;
  }

  const imageSize = getOptimalImageSize();

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <style>{`
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(4px);
          animation: fadeIn 0.3s ease-out;
          padding: 60px 40px 40px 40px;
          box-sizing: border-box;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-content {
          position: relative;
          animation: slideIn 0.3s ease-out;
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: calc(100vw - 80px);
          max-height: calc(100vh - 100px);
        }

        @keyframes slideIn {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .image-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          background-size: 30px 30px;
        }

        .modal-image {
          display: block;
          object-fit: contain;
          width: 100%;
          height: 100%;
          transition: opacity 0.3s ease;
          background: none;
          border-radius: 12px;
          padding: 10px;
        }

        .loading-placeholder {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: rgba(255, 255, 255, 0.5);
          font-size: 3rem;
          z-index: 1;
        }

        .close-button {
          position: absolute;
          top: -25px;
          right: -25px;
          width: 30px;
          height: 30px;
          background: #F07167;
          border: none;
          border-radius: 50%;
          color: white;
          font-size: 22px;
          font-weight: bold;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.6);
          z-index: 20;
          /* Fix the centering */
          line-height: 1;
          padding: 0;
          margin: 0;
          /* Ensure perfect centering */
          text-align: center;
          vertical-align: middle;
        }

        .close-button::before {
          content: '×';
          display: block;
          line-height: 1;
          font-size: 22px;
          font-weight: bold;
        }

        .close-button:hover {
          background: #e85a54;
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.7);
        }

        .modal-title {
          margin-top: 25px;
          text-align: center;
          color: #FDFCDC;
          font-size: 1.5rem;
          font-weight: bold;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
          max-width: 80vw;
        }

        .image-placeholder {
          width: 400px;
          height: 300px;
          background: rgba(42, 42, 42, 0.8);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #666;
          font-size: 4rem;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .image-info {
          position: absolute;
          bottom: -45px;
          left: 0;
          right: 0;
          text-align: center;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .modal-backdrop {
            padding: 50px 20px 30px 20px;
          }
          
          .modal-title {
            font-size: 1.2rem;
            margin-top: 20px;
            max-width: 90vw;
          }
          
          .close-button {
            width: 40px;
            height: 40px;
            font-size: 20px;
            top: -20px;
            right: -20px;
          }

          .image-info {
            bottom: -40px;
            font-size: 0.8rem;
          }

          .modal-content {
            max-width: calc(100vw - 40px);
            max-height: calc(100vh - 80px);
          }
        }

        @media (max-width: 480px) {
          .modal-backdrop {
            padding: 40px 15px 25px 15px;
          }

          .modal-content {
            max-width: calc(100vw - 30px);
            max-height: calc(100vh - 65px);
          }
        }
      `}</style>

      <div className="modal-content">
        <div
          className="image-container"
          style={{
            width: imageSize.width,
            height: imageSize.height,
            minWidth: '200px',
            minHeight: '150px'
          }}
        >
          <button className="close-button" onClick={onClose} aria-label="Close modal">
          </button>

          {!imageLoaded && (
            <div className="loading-placeholder">
              📷
            </div>
          )}

          {imageSrc ? (
            <img
              src={imageSrc}
              alt={title}
              className="modal-image"
              onLoad={handleImageLoad}
              onError={(e) => {
                console.error('Image failed to load:', imageSrc);
                setImageLoaded(true);
              }}
              style={{
                opacity: imageLoaded ? 1 : 0,
                display: imageLoaded ? 'block' : 'none'
              }}
            />
          ) : (
            <div className="image-placeholder">
              📷
            </div>
          )}
        </div>

        {title && (
          <h3 className="modal-title BriceSemiBoldSemiCondensed">
            {title}
          </h3>
        )}
      </div>
    </div>
  );
};

export default Modal;
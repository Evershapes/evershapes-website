import React, { useState, useEffect, useRef } from 'react';

const TwoColumnSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef(null);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);

  const slides = [
    {
      id: 1,
      leftBg: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      rightBg: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      title: 'A',
      emphasis: 'Breath',
      subtitle: 'Of Fresh Air.',
      chapter: 'Chapter I, page XV',
      paragraph: 'A Prophet sat in the market-place and told the fortunes of all who cared to engage his services. Suddenly there came running up one who told him that his house had been broken into by thieves, and that they had made off with everything they could lay hands on.'
    },
    {
      id: 2,
      leftBg: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      rightBg: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      title: 'The',
      emphasis: 'Drop',
      subtitle: 'Of Eternal life.',
      chapter: 'Chapter II, page VII',
      paragraph: 'A thirsty Crow found a Pitcher with some water in it, but so little was there that, try as she might, she could not reach it with her beak, and it seemed as though she would die of thirst within sight of the remedy.'
    },
    {
      id: 3,
      leftBg: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      rightBg: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      title: 'A',
      emphasis: 'Sense',
      subtitle: 'Of Things to Come.',
      chapter: 'Chapter III, page XI',
      paragraph: 'Every man carries Two Bags about with him, one in front and one behind, and both are packed full of faults. The Bag in front contains his neighbours\' faults, the one behind his own. Hence it is that men do not see their own faults, but never fail to see those of others.'
    }
  ];

  useEffect(() => {
    // Add Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css?family=Cormorant+Garamond:400,500,500i,600,600i,700,700i|Cormorant+SC:400,500,600,700';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    if (isAnimating) return;
    
    if (e.deltaY > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  };

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    touchEndY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (touchStartY.current - touchEndY.current > 50) {
      nextSlide();
    } else if (touchEndY.current - touchStartY.current > 50) {
      prevSlide();
    }
  };

  return (
    <div className="page-wrap">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css?family=Cormorant+Garamond:400,500,500i,600,600i,700,700i|Cormorant+SC:400,500,600,700');

        .page-wrap {
          width: 100%;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(to right bottom,#F07167 50%,#00AFB9 50%);
          overflow: hidden;
        }

        .home-slider {
          height: 80vh;
          width: 90vw;
          position: relative;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
          cursor: grab;
        }

        .home-slider:active {
          cursor: grabbing;
        }

        .swiper-container {
          height: 100%;
          width: 100%;
          position: relative;
          overflow: hidden;
        }

        .swiper-wrapper {
          height: 100%;
          width: 100%;
          transform: translateY(${-currentSlide * 100}%);
          transition: transform 1000ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .swiper-slide {
          height: 100%;
          width: 100%;
          display: flex;
          background-color: #fff;
          overflow: hidden;
          position: relative;
        }

        .swiper-image {
          width: 50%;
          height: 100%;
          position: relative;
        }

        .swiper-image-inner {
          background-size: cover;
          background-position: center center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          background-color: hsla(0, 0%, 0%, 0.2);
          background-blend-mode: overlay;
          position: relative;
          transform: translateY(${currentSlide === 0 ? 0 : currentSlide === 1 ? '35%' : '70%'});
          transition: all 1s ease-out;
        }

        .swiper-image-left {
          padding: 4rem;
          filter: sepia(100%);
          transition: all 1s linear;
          transition-delay: 1s;
        }

        .swiper-image-right {
          filter: hue-rotate(-60deg);
          transition: all 1s linear;
          transition-delay: 1s;
          background-color: hsla(0, 0%, 0%, 0.5);
          background-blend-mode: multiply;
        }

        .slide-active .swiper-image-left {
          filter: sepia(0%);
        }

        .slide-active .swiper-image-right {
          filter: hue-rotate(90deg);
        }

        .slide-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 500;
          color: #fff;
          align-self: flex-start;
          margin: 0 0 auto 0;
          font-size: 4.5rem;
          line-height: 1;
          transition: all .8s cubic-bezier(0.215, 0.61, 0.355, 1) 1.1s;
          transform: translate3d(-20%, 0, 0);
          opacity: 0;
        }

        .slide-emphasis {
          font-weight: 700;
          font-style: italic;
          opacity: 0;
          transition: all .8s cubic-bezier(0.215, 0.61, 0.355, 1) 1.2s;
          transform: translate3d(-20%, 0, 0);
          display: inline-block;
        }

        .slide-subtitle {
          font-size: 3.5rem;
        }

        .slide-chapter {
          font-family: 'Cormorant SC', serif;
          font-size: 14px;
          letter-spacing: 2px;
          margin: 0;
          line-height: 1;
          margin-bottom: auto;
          align-self: flex-end;
          text-transform: uppercase;
          transition: all .8s cubic-bezier(0.215, 0.61, 0.355, 1) 1.3s;
          transform: translate3d(-20%, 0, 0);
          opacity: 0;
          font-weight: 500;
          color: #fff;
          padding-right: 8rem;
        }

        .slide-paragraph {
          margin: 0;
          font-family: 'Cormorant Garamond', serif;
          color: #fff;
          width: 100%;
          max-width: 350px;
          text-align: justify;
          font-size: 1.2rem;
          font-weight: 500;
          opacity: 0;
          transition: all .6s cubic-bezier(0.215, 0.61, 0.355, 1) 1.4s;
          transform: translate3d(-20%, 0, 0);
        }

        .slide-active .slide-title,
        .slide-active .slide-paragraph,
        .slide-active .slide-emphasis,
        .slide-active .slide-chapter {
          transform: translate3d(0, 0, 0);
          opacity: 1;
        }

        .swiper-pagination {
          position: absolute;
          bottom: 10px;
          left: 0;
          width: 100%;
          text-align: center;
          z-index: 10;
        }

        .swiper-pagination-bullet {
          width: 14px;
          height: 14px;
          display: inline-block;
          background: #fff;
          opacity: 0.4;
          margin: 0 5px;
          border-radius: 50%;
          cursor: pointer;
          transition: opacity 300ms;
          border: none;
          padding: 0;
        }

        .swiper-pagination-bullet:hover {
          opacity: 0.7;
        }

        .swiper-pagination-bullet-active {
          opacity: 1;
        }

        @media screen and (max-width: 1280px) {
          .slide-title {
            font-size: 3.9rem;
          }
          .slide-subtitle {
            font-size: 2.9rem;
          }
          .slide-chapter {
            font-size: 13px;
          }
          .slide-paragraph {
            font-size: 1rem;
            line-height: 1.3;
          }
        }

        @media screen and (max-width: 960px) {
          .slide-title {
            font-size: 3.5rem;
          }
          .slide-subtitle {
            font-size: 2.5rem;
          }
          .slide-paragraph {
            max-width: 90%;
          }
        }

        @media screen and (max-width: 640px) {
          .home-slider {
            height: 86vh;
            width: 96vw;
          }
          .slide-title {
            font-size: 3.2rem;
            align-self: center;
          }
          .slide-subtitle {
            font-size: 2.1rem;
          }
          .slide-paragraph {
            max-width: 94%;
          }
          .swiper-image-left,
          .swiper-image-right {
            padding: 2rem;
          }
        }
      `}</style>

      <div 
        className="home-slider"
        ref={containerRef}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="swiper-container">
          <div className="swiper-wrapper">
            {slides.map((slide, index) => (
              <div 
                key={slide.id} 
                className={`swiper-slide ${index === currentSlide ? 'slide-active' : ''}`}
              >
                <div className="swiper-image">
                  <div 
                    className="swiper-image-inner swiper-image-left"
                    style={{ 
                      backgroundImage: `url(${slide.leftBg})`,
                      transform: `translateY(${index === currentSlide ? '0%' : index < currentSlide ? '-20%' : '20%'})`
                    }}
                  >
                    <h1 className="slide-title">
                      {slide.title} <span className="slide-emphasis">{slide.emphasis}</span>. 
                      <br />
                      <span className="slide-subtitle">{slide.subtitle}</span>
                    </h1>
                    <p className="slide-chapter">{slide.chapter}</p>
                  </div>
                </div>
                <div className="swiper-image">
                  <div 
                    className="swiper-image-inner swiper-image-right"
                    style={{ 
                      backgroundImage: `url(${slide.rightBg})`,
                      transform: `translateY(${index === currentSlide ? '0%' : index < currentSlide ? '35%' : '-35%'})`
                    }}
                  >
                    <p className="slide-paragraph">
                      {slide.paragraph}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="swiper-pagination">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`swiper-pagination-bullet ${index === currentSlide ? 'swiper-pagination-bullet-active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoColumnSection;
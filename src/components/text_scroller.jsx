import { useEffect, useRef } from 'react';

const Horizontal_Scroller = ({ text = "Evershapes\u00A0" }) => {
  const tagReelRef = useRef(null);

  useEffect(() => {
    const intervals = [];
    
    const animateRows = () => {
      const rows = tagReelRef.current?.querySelectorAll(".sliding-text-row");
      
      rows?.forEach((e, i) => {
        let row_width = e.getBoundingClientRect().width;
        let row_item_width = e.children[0].getBoundingClientRect().width;
        let initial_offset = ((2 * row_item_width) / row_width) * 100 * -1;
        let x_translation = initial_offset * -1;
        
        console.log(x_translation);
        
        let duration = 5 * (i + 1);
        
        // Create the animation manually
        const animate = () => {
          // Reset to start position immediately
          e.style.transition = 'none';
          e.style.transform = `translateX(${initial_offset}%)`;
          
          // Force reflow
          e.offsetHeight;
          
          // Start animation to end position
          requestAnimationFrame(() => {
            e.style.transition = `transform ${duration}s linear`;
            e.style.transform = 'translateX(0%)';
          });
        };
        
        // Start first animation
        animate();
        
        // Set interval for infinite repeat
        const intervalId = setInterval(() => {
          animate();
        }, duration * 1000);
        
        intervals.push(intervalId);
      });
    };

    // Small delay to ensure elements are rendered
    const timer = setTimeout(animateRows, 100);
    
    return () => {
      clearTimeout(timer);
      intervals.forEach(interval => clearInterval(interval));
    };
  }, []);

  return (
    <div>
      <style>{`
        .sliding-text-container {
          position: relative;
          max-height: 1vh;
          min-height: 1vh;
        }
        
        .sliding-text-content {
          padding: 15px;
          height: 10vh;
          background: #0081A7;
        }
        
        .sliding-text-items {
          overflow: hidden;
          cursor: default;
        }
        
        .sliding-text-row {
          display: flex;
          position: relative;
          text-align: center;
          white-space: nowrap;
        }
        
        .sliding-text-item {
          color: #FDFCDC;
          position: relative;
          line-height: 100%;
          font-size: 2vw;
          flex: 0 0 33%;
          padding: -10px 0;
          text-transform: uppercase;
          font-weight: 900;
        }
        
        .sliding-text-item-stroke {
          position: relative;
          line-height: 100%;
          font-size: 2vw;
          flex: 0 0 33%;
          padding: -10px 0;
          text-transform: uppercase;
          font-weight: 900;
          color: #00AFB9;
          text-shadow: none;
        }
        
        .sliding-text-span {
          position: relative;
          display: inline-block;
          z-index: 1;
        }
      `}</style>
      
      <section className="sliding-text-container" ref={tagReelRef}>
        <div className="sliding-text-content BriceBoldSemiExpanded">
          <div className="sliding-text-items" role="marquee">
            <div className="sliding-text-row">
              <div className="sliding-text-item">
                <span className="sliding-text-span">{text}</span>
              </div>
              <div className="sliding-text-item-stroke">
                <span className="sliding-text-span">{text}</span>
              </div>
              <div className="sliding-text-item">
                <span className="sliding-text-span">{text}</span>
              </div>
              <div className="sliding-text-item-stroke">
                <span className="sliding-text-span">{text}</span>
              </div>
              <div className="sliding-text-item">
                <span className="sliding-text-span">{text}</span>
              </div>
              <div className="sliding-text-item-stroke">
                <span className="sliding-text-span">{text}</span>
              </div>
              <div className="sliding-text-item">
                <span className="sliding-text-span">{text}</span>
              </div>
              <div className="sliding-text-item-stroke">
                <span className="sliding-text-span">{text}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Horizontal_Scroller;
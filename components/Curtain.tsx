import React, { useState, useEffect, useRef } from "react";

function easeInOutQuart(x: number) {
  return 1 - Math.pow(1 - x, 5);
}

const useScrollPosition = (elRef: any) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(Math.round((elRef.current.scrollTop / (elRef.current.scrollHeight - elRef.current.clientHeight)) * 100));
    }

    elRef.current.addEventListener("scroll", updatePosition);
    updatePosition();

    return () => (
      // eslint-disable-next-line
      elRef.current.removeEventListener("scroll", updatePosition)
    );
  }, [elRef]);

  return scrollPosition;
}

const Curtain = ({
  children,
  curtain,
  title,
  curtainSize = 25
}: {
  children: React.ReactNode,
  curtain: React.ReactNode,
  title: React.ReactNode,
  curtainSize?: 25 | 50 | 75 | 100,
}) => {
  const elRef = useRef(null)
  const pos = useScrollPosition(elRef)

  return (
    <>
    <div
      ref={elRef}
      className='container'
    >
      <div className='canvas'>
        <div className="canvas-container">
          <div
            className='canvas-overlay'
            style={{
              opacity: easeInOutQuart(pos / 300),
              zIndex: pos === 0 ? -9 : 9
            }}
          />

          {children}

        </div>
      </div>

      <div className='curtain'>

        <div className='curtain-header'>
          {title}
        </div>

        <div className="curtain-container">
          {curtain}
        </div>

      </div>
    </div>

    <style jsx global>
      {`
        body {
          overflow: hidden;
        }
      `}
    </style>
    <style jsx>
      {`

        .container {
          position: fixed;
          top: 0;
          right: 0;
          left: 0;
          bottom: 0;
          overflow-y: auto;
          scroll-snap-type: y mandatory;
          -webkit-overflow-scrolling: touch;
        }

        .canvas {
          height: calc(100% - 4rem);
          scroll-snap-align: end;
          position: relative;
          overflow: hidden;
        }

        .canvas-container {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
        }

        .canvas-overlay {
          position: absolute;
          top: 0;
          right: 0;
          bottom: -1rem;
          left: 0;
          background-color: var(--white);
          transition: all 100ms ease 0s;
        }

        .curtain {
          height: ${curtainSize}%;
          box-shadow: 0 0 1rem #000;
          position: relative;
          z-index: 999;
          background-color: var(--bg-color);
          padding: 4rem 1rem 1rem;
          scroll-snap-align: end;
           {/* border-radius: 1rem 1rem 0 0; */}
        }

        .curtain-container {
          position: absolute;
          right: 0;
          bottom: 0;
          left: 0;
          top: 4rem;
          overflow-y: auto;
          padding: 1rem 1rem 1rem;
          max-height: ${curtainSize}%;
        }

        .curtain-header {
          position: absolute;
          top: 1rem;
          left: 1rem;
          right: 1rem;
          height: 2rem;
          color: var(--primary-color);
          font-size: 1.4rem;
        }

        .curtain:after {
          content: " ";
          display: block;
          width: 3rem;
          height: 0.5rem;
          background: var(--secondary-color);
          position: absolute;
          top: 1rem;
          right: 1rem;
          border-radius: 1rem;
        }

      `}
    </style>
    </>
  )
}

export { Curtain }

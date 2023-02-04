import React, { useState, useEffect, useRef, forwardRef } from "react";
const MyInput =function MyInput(props) {
  const elRef = useRef(null)
  useEffect(() => {
    const updatePosition = () => {
      console.log(elRef.current)
      // setScrollPosition(Math.round((elRef.current.scrollTop / ((elRef.current.scrollHeight - elRef.current.clientHeight)) || 0.001) * 100));
    }

    elRef.current.addEventListener("scroll", updatePosition);
    updatePosition();

    return () => (
      // eslint-disable-next-line
      elRef.current.removeEventListener("scroll", updatePosition)
    );
  }, []);
  return (
    <div className='child-container'>
            <div className='child' ref={elRef}>
              {props.children}
            </div>
          </div>
  );
};

const Slider = ({
  children,
}: {
  children: React.ReactNode,
}) => {


 
  
  return (
    <>
      <div className='container'>
        {children.map((child, idx) => (
          <MyInput key={idx}>
            {child}
          </MyInput>
        ))}
      </div>
      <style jsx>
        {`
          .container {
            border: 1px solid green;
            width: 100vw;
            height: 100vh;
            overflow-x: scroll;
            display: grid;
            grid-auto-flow: column;
            overflow-y: hidden;
            overscroll-behavior-x: contain;
            scroll-snap-type: x mandatory;
          }
        `}
      </style>
      <style jsx global>
        {`
          .child-container {
            width: 100vw;
            height: 100vh;
            border: 1px solid red;
            scroll-snap-align: center;
        
          }
          .child {
            width: 100%;
            height: 100%;
            overflow-y: auto;
          }
        `}
      </style>
    </>
  )
}

export { Slider }

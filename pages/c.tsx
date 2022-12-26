import React, { useRef } from "react";

import { Curtain } from '../components/Curtain'

export default function RootLayout() {

  return (
    <>
      <Curtain
        curtain={<div>Hello world!</div>}
        title={<h3>Curtain</h3>}
        curtainSize={50}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            overflow: 'auto'
          }}
        >
          <div
            style={{
              width: 3000,
              height: 3000,
              backgroundImage: 'url(./bg.jpg)',
              backgroundSize: 'cover',
            }}
          />
        </div>
      </Curtain>
    </>
  );
}
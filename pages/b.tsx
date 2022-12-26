import React from "react";

import { Curtain } from '../components/Curtain'

export default function RootLayout() {
  return (
    <>
      <Curtain
        curtain={<div>Hello world!</div>}
        title={<h3>Curtain</h3>}
        curtainSize={50}
      >
        <video src="./video.mp4" autoPlay muted loop></video>
      </Curtain>
    </>
  );
}
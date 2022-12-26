import React from "react";
import dynamic from 'next/dynamic'

import { Curtain } from '../components/Curtain'

const Map = dynamic(() => import("../components/Map"), {
  ssr: false,
})

type Point = {
  lat: number
  lng: number
}

export default function RootLayout() {
  const [points, setPoints] = React.useState<Point[]>([])
  return (
    <>
      <Curtain
        title={<h3>Curtain</h3>}
        curtain={
          <ul>
            {points.map((i: Point, idx: number) => (
              <li key={idx}>lat: {i.lat}, lng:{i.lng}</li>
            ))}
          </ul>
        }
        curtainSize={75}
      >
        <Map
          onChange={(point: Point) => {
            setPoints([...points, point])
          }}
        />
      </Curtain>
    </>
  );
}

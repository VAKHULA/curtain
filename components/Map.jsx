"use client"
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";

const Map = ({onChange, styles = {}}) => {
  const [pos, setPos] = useState([49.84860975344834, 24.035318285365136])

  useEffect(() => {
    if (navigator.geolocation) {
      function showPosition(position) {
        setPos([position.coords.latitude, position.coords.longitude])

      }
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      // "Geolocation is not supported by this browser.";
    }
  }, [])

  return (
    <>
      <MapContainer
        center={[49.76707407366792, 30.937500000000004]}
        zoom={4}
        scrollWheelZoom={false}
        style={{
          height: "100%",
          width: "100%",
          zIndex: 5,
          ...styles,
        }}
      >
        <Marker
          position={pos}
          draggable={true}
          eventHandlers={{
            mouseup: (e) => {
              const point = e.target.getLatLng()
              setPos([point.lat, point.lng])
              onChange(point)
            },
            dragend: (e) => {
              const point = e.target.getLatLng()
              setPos([point.lat, point.lng])
              onChange(point)
            },
          }}
        >
          <TileLayer
            // https://leaflet-extras.github.io/leaflet-providers/preview/
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
            // url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
            // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'

          />
          <Popup>
            Hey ! you found me
          </Popup>
        </Marker>
      </MapContainer>
      <style jsx global>{`
        .leaflet-bottom.leaflet-right {
          position: absolute;
          top: 0;
          right: 0;
          font-size: 12px;
          width: 100vw;
        }

        .leaflet-top.leaflet-left {
          top: initial;
          left: initial;
          right: 1rem;
          bottom: 6rem;
        }
      `}</style>
    </>
  )
}

export default Map

// light_all,
// dark_all,
// light_nolabels,
// light_only_labels,
// dark_nolabels,
// dark_only_labels,
// rastertiles/voyager,
// rastertiles/voyager_nolabels,
// rastertiles/voyager_only_labels,
// rastertiles/voyager_labels_under
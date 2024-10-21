import "./App.css";
import "leaflet/dist/leaflet.css";

import {
  Circle,
  ImageOverlay,
  MapContainer,
  Marker,
  Polygon,
  Popup,
  TileLayer,
  // useMap,
} from "react-leaflet";

// This code is for using tif file
// import GeoRasterLayer from "georaster-layer-for-leaflet";
// import georaster from "georaster";
// import { useEffect } from "react";
// function GeoTiffLayer(url) {
//   const map = useMap();

//   useEffect(() => {
//     fetch(url?.url)
//       .then((response) => response.arrayBuffer())
//       .then((arrayBuffer) => georaster(arrayBuffer))
//       .then((raster) => {
//         const layer = new GeoRasterLayer({
//           georaster: raster,
//           opacity: 0.7,
//           resolution: 256,
//         });
//         layer.addTo(map);
//       })
//       .catch((error) => {
//         console.error("Error loading GeoTIFF:", error);
//       });
//   }, [url, map]);

//   return null;
// }
function App() {
  // const geotiffUrl = "HYP_HR.tif";
  const imageUrl = "test-raster.png"; // Replace with your image URL
  const imageBounds = [
    [27.6761663, 85.441718],
    [27.67776, 85.438884],
  ];
  const polygonCoordinates = [
    [27.67, 85.42],
    [27.67, 85.43],
    [27.68, 85.44],
    [27.69, 85.43],
    [27.68, 85.42],
    [27.67, 85.42],
  ];
  const center = [27.6748, 85.4274];
  const handlePolygonClick = () => {
    console.log("polygon Click!!!!");
  };

  return (
    <>
      <div className="main-container">
        <MapContainer
          center={[27.6748, 85.4274]}
          zoom={18}
          scrollWheelZoom={true}
        >
          {/* <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          /> */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={[27.6748, 85.4274]}>
            <Popup>Basic popup message</Popup>
          </Marker>
          <ImageOverlay
            url={imageUrl}
            bounds={imageBounds}
            opacity={0.7} // Adjust the opacity if needed
          />
          <Circle center={center} fillColor="red" radius={200} />
          <Polygon
            positions={polygonCoordinates}
            color="black"
            fillColor="green"
            fillOpacity={0.5}
            weight={5}
            eventHandlers={{
              click: handlePolygonClick, // Open modal on click
              mouseover: (e) => {
                e.target.setStyle({ fillColor: "lightgreen" }); // Change color on hover
              },
              mouseout: (e) => {
                e.target.setStyle({ fillColor: "green" }); // Reset color when not hovering
              },
            }}
          >
            <Popup>Click for more information</Popup>
          </Polygon>
          {/* <GeoTiffLayer url={geotiffUrl} /> */}
        </MapContainer>
      </div>
    </>
  );
}

export default App;

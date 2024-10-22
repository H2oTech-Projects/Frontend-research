import "./App.css";
import "leaflet/dist/leaflet.css";

import {
  // Circle,
  ImageOverlay,
  MapContainer,
  Marker,
  Polygon,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";

// This code is for using tif file
import GeoRasterLayer from "georaster-layer-for-leaflet";
import georaster from "georaster";
import { useEffect, useState } from "react";
function GeoTiffLayer() {
  const map = useMap();
  console.log(map);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("HYP_50M_SR.tif")
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => georaster(arrayBuffer))
      .then((raster) => {
        const layer = new GeoRasterLayer({
          georaster: raster,
          opacity: 0.3,
          resolution: 256,
        });
        layer.addTo(map);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading GeoTIFF:", error);
      });
  }, [map]);
  useEffect(() => {
    loading
      ? console.log(loading, "loading")
      : console.log(loading, "rendered");
  }, [loading]);
  return null;
}
function App() {
  // const geotiffUrl = "HYP_HR.tif";
  const viewState = {
    tif: false,
    png: true,
    vector: true,
  };
  const imageUrl = "test-raster.png";
  const [ViewType, setViewType] = useState(viewState);
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
  // const center = [27.6748, 85.4274];
  const handlePolygonClick = () => {
    console.log("polygon Click!!!!");
  };

  return (
    <>
      <div className="main-container">
        <div className="layout-setting">
          <button
            onClick={() =>
              setViewType({ tif: true, png: false, vector: false })
            }
          >
            show tif
          </button>
          <button
            onClick={() =>
              setViewType({ tif: false, png: true, vector: false })
            }
          >
            show png
          </button>
          <button
            onClick={() =>
              setViewType({ tif: false, png: false, vector: true })
            }
          >
            show vector
          </button>
        </div>
        <MapContainer
          center={[27.6748, 85.4274]}
          zoom={18}
          scrollWheelZoom={false}
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
          {ViewType?.png && (
            <ImageOverlay url={imageUrl} bounds={imageBounds} opacity={0.7} />
          )}

          {ViewType?.vector && (
            // <Circle center={center} fillColor="green" radius={200} />
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
          )}
          {ViewType?.tif && <GeoTiffLayer />}
        </MapContainer>
      </div>
    </>
  );
}

export default App;

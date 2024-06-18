import React from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import MarkerComponent from "../Mark/MarkerComponent";
import { MarkerData } from "../../interfaces/mark";

interface MapComponentProps {
  markers: MarkerData[];
  addMarker: (e: L.LeafletMouseEvent) => void;
  removeMarker: (id: number) => void;
  updateMarkerPosition: (id: number, newPosition: L.LatLng) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({
  markers,
  addMarker,
  removeMarker,
  updateMarkerPosition,
}) => {
  const MapClick = () => {
    useMapEvents({
      click: addMarker,
    });
    return null;
  };

  return (
    <MapContainer
      center={[49.47311448871094, 30.544871580076776]}
      zoom={7}
      style={{ height: "93vh", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapClick />
      {markers.map((marker) => (
        <MarkerComponent
          key={marker.id}
          marker={marker}
          onRemove={() => removeMarker(marker.id)}
          onPositionChange={(newPosition: L.LatLng) =>
            updateMarkerPosition(marker.id, newPosition)
          }
        />
      ))}
    </MapContainer>
  );
};

export default MapComponent;

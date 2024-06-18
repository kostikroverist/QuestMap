import React from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { GiHillConquest } from "react-icons/gi";
import { MarkerData } from "../../interfaces/mark";

interface MarkerProps {
  marker: MarkerData;
  onRemove: () => void;
  onPositionChange: (newPosition: L.LatLng) => void;
}

const MarkerComponent: React.FC<MarkerProps> = ({
  marker,
  onRemove,
  onPositionChange,
}) => {
  const handleDragEnd = (e: L.DragEndEvent) => {
    const newPosition = e.target.getLatLng();
    onPositionChange(newPosition);
  };

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove();
  };

  return (
    <Marker
      position={marker.position}
      draggable={marker.draggable}
      eventHandlers={{
        dragend: handleDragEnd,
      }}
      icon={L.divIcon({
        className: "custom-icon",
        html: `<div class="p-3 rounded-full bg-blue-500 text-white text-lg flex items-center justify-center"><span>${marker.id}</span></div>`,
      })}
    >
      <Popup className="ml-2">
        <div className="flex flex-col items-center">
          <p>{`Timestamp: ${marker.timestamp.toLocaleString()}`}</p>
          <button
            onClick={handleRemoveClick}
            className="bg-red-500 text-white px-2 py-1 rounded flex items-center mt-2"
          >
            <GiHillConquest className="mr-1" /> Remove
          </button>
        </div>
      </Popup>
    </Marker>
  );
};

export default MarkerComponent;

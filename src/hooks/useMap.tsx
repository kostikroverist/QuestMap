import { useState } from "react";
import L from "leaflet";
import { MarkerData } from "../interfaces/mark";
import FirebaseService from "../service/FirebaseService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const useMap = () => {
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [markerId, setMarkerId] = useState<number>(1);

  const addMarker = async (e: L.LeafletMouseEvent) => {
    if (markers.length >= 3) {
      toast.error("You can only add up to 3 markers.");
      return;
    }
    const newMarker: MarkerData = {
      id: markerId,
      position: e.latlng,
      draggable: true,
      next: null,
      timestamp: new Date(),
    };

    if (markers.length > 0) {
      const previousMarker = markers[markers.length - 1];
      const updatedPreviousMarker = { ...previousMarker, next: markerId };
      setMarkers([...markers.slice(0, -1), updatedPreviousMarker, newMarker]);
      await FirebaseService.updateQuest(
        previousMarker.id,
        updatedPreviousMarker.position,
        markerId
      );
    } else {
      setMarkers([...markers, newMarker]);
    }

    setMarkerId(markerId + 1);
    await FirebaseService.addQuest(newMarker, null);
    toast.success(`Mark was add`);
  };

  const removeMarker = async (id: number) => {
    const updatedMarkers = markers.filter((marker) => marker.id !== id);

    if (updatedMarkers.length > 0) {
      const index = markers.findIndex((marker) => marker.id === id);
      if (index > 0) {
        const previousMarker = updatedMarkers[index - 1];
        const nextMarkerId =
          index < updatedMarkers.length ? updatedMarkers[index].id : null;
        const updatedPreviousMarker = { ...previousMarker, next: nextMarkerId };
        updatedMarkers[index - 1] = updatedPreviousMarker;
        await FirebaseService.updateQuest(
          updatedPreviousMarker.id,
          updatedPreviousMarker.position,
          nextMarkerId
        );
      }
    }
    setMarkers(updatedMarkers);
    await FirebaseService.removeQuest(id);
    toast.info(`Mark ${id} was remove`);
  };

  const removeAllMarkers = async () => {
    await FirebaseService.removeAllQuests();
    setMarkers([]);
    setMarkerId(1);
    toast.info(`all Marks was remove`);
  };

  const updateMarkerPosition = async (id: number, newPosition: L.LatLng) => {
    const updatedMarkers = markers.map((marker) =>
      marker.id === id ? { ...marker, position: newPosition } : marker
    );
    setMarkers(updatedMarkers);
    await FirebaseService.updateQuest(id, newPosition, null);
    toast.success(`Mark postion was update`);
  };

  return {
    markers,
    addMarker,
    removeMarker,
    removeAllMarkers,
    updateMarkerPosition,
  };
};

export default useMap;

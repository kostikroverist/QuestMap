export interface MarkerData {
  id: number;
  position: L.LatLng;
  draggable: boolean;
  next: number | null;
  timestamp: Date;
}

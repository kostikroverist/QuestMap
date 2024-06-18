import { ToastContainer } from "react-toastify";
import "./App.css";
import MapComponent from "./component/Map/MapComponents";
import QuestCards from "./component/QuestCards/QuestCards";
import useMap from "./hooks/useMap";

function App() {
  const {
    markers,
    addMarker,
    removeMarker,
    removeAllMarkers,
    updateMarkerPosition,
  } = useMap();

  return (
    <>
      <div className="flex">
        <ToastContainer />;
        <QuestCards removeAllMarkers={removeAllMarkers} />
      </div>
      <MapComponent
        markers={markers}
        addMarker={addMarker}
        removeMarker={removeMarker}
        updateMarkerPosition={updateMarkerPosition}
      />
    </>
  );
}

export default App;

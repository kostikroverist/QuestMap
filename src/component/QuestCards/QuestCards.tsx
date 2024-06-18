import React from "react";

interface QuestCardsProps {
  removeAllMarkers: () => void;
}

const QuestCards: React.FC<QuestCardsProps> = ({ removeAllMarkers }) => {
  return (
    <button
      className="p-2 bg-blue-700 rounded-lg m-3 text-white hover:bg-blue-400"
      onClick={removeAllMarkers}
    >
      Remove All Markers
    </button>
  );
};

export default QuestCards;

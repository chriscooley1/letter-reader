import React, { useState } from "react";

interface HistoryProps {
  onLoad: (sequence: string[]) => void;
}

const History: React.FC<HistoryProps> = ({ onLoad }) => {
  const [history, setHistory] = useState<string[]>(() => {
    const savedHistory = localStorage.getItem("sequenceHistory");
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  const handleLoad = (sequence: string) => {
    onLoad(sequence.split(",").map(item => item.trim()));
  };

  return (
    <div>
      {history.map((sequence, index) => (
        <button key={index} onClick={() => handleLoad(sequence)}>{sequence}</button>
      ))}
    </div>
  );
};

export default History;

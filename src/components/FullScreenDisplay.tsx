import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import "../App.css";

const FullScreenDisplay: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [index, setIndex] = useState(0);
  const [sequence, setSequence] = useState<string[]>([]);
  const [speed, setSpeed] = useState<number>(500);

  useEffect(() => {
    if (location.state) {
      const { sequence: seq, speed: spd } = location.state as { sequence: string[], speed: number };
      setSequence(seq);
      setSpeed(spd);
    }
  }, [location.state]);

  useEffect(() => {
    if (sequence.length > 0) {
      const interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % sequence.length);
      }, speed);

      return () => clearInterval(interval);
    }
  }, [sequence, speed]);

  return (
    <div className={`fullscreen-display ${theme.className}`}>
      <div className="display-content">
        {sequence[index]}
      </div>
      <button className="back-button" onClick={() => navigate("/")}>Back</button>
    </div>
  );
};

export default FullScreenDisplay;

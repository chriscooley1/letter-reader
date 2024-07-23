import React, { useState } from "react";
import { createSequence } from '../api';
import { useTheme } from '../context/ThemeContext';
import "../App.css";

interface SettingsProps {
  onUpdate: (sequence: string[], speed: number) => void;
  userId: number;
}

const Settings: React.FC<SettingsProps> = ({ onUpdate, userId }) => {
  const [input, setInput] = useState<string>("");
  const [speed, setSpeed] = useState<number>(500);
  const [quantity, setQuantity] = useState<number>(10);
  const { theme } = useTheme();

  const handleUpdate = async () => {
    const sequence = input.split(",").map((item) => item.trim());
    onUpdate(sequence, speed);
    localStorage.setItem("inputSequence", input);
    try {
      const response = await createSequence(userId, "My Sequence", input);
      console.log("Sequence saved successfully:", response.data);
    } catch (error: any) {
      console.error("Error saving sequence:", error.response?.data || error.message || error);
    }
  };

  const generateRandomLetters = () => {
    const letters = Array.from({ length: quantity }, () => String.fromCharCode(65 + Math.floor(Math.random() * 26)));
    setInput(letters.join(", "));
  };

  const generateRandomNumbers = () => {
    const numbers = Array.from({ length: quantity }, () => Math.floor(Math.random() * 100).toString());
    setInput(numbers.join(", "));
  };

  return (
    <div className={`settings-container ${theme.className}`}>
      <div className="input-field">
        <label htmlFor="sequenceInput">Sequence (comma-separated):</label>
        <textarea
          id="sequenceInput"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter letters or words separated by commas"
        />
      </div>
      <div className="input-field">
        <label htmlFor="speedInput">Speed (milliseconds):</label>
        <input
          id="speedInput"
          type="number"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          placeholder="Enter speed in milliseconds"
        />
      </div>
      <div className="input-field">
        <label htmlFor="quantityInput">Quantity:</label>
        <input
          id="quantityInput"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          placeholder="Enter quantity"
          min="1"
        />
      </div>
      <div>
        <button type="button" onClick={generateRandomLetters}>Generate Random Letters</button>
        <button type="button" onClick={generateRandomNumbers}>Generate Random Numbers</button>
      </div>
      <button type="button" onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default Settings;

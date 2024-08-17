import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./CollectionSetup.css";
import {
  generateRandomLetters,
  generateRandomNumbers,
  generateFullAlphabet,
  generateNumbersOneToHundred,
} from "../../utils/RandomGenerators";
import { saveCollection } from "../../api"; // Assuming you have this API function

const CollectionSetup: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { collectionName, isPublic, category } = location.state || {};

  const [file, setFile] = useState<File | null>(null);
  const [itemCount, setItemCount] = useState<number>(1);
  const [sequence, setSequence] = useState<string[]>([]);
  const [type, setType] = useState<string>("letters");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setSequence([]); // Clear any existing sequence
    }
  };

  const generateRandomSequence = () => {
    let generatedSequence: string[] = [];
    if (type === "letters") {
      generatedSequence = generateRandomLetters(itemCount);
    } else if (type === "numbers") {
      generatedSequence = generateRandomNumbers(itemCount);
    } else if (type === "alphabet") {
      generatedSequence = generateFullAlphabet();
    } else if (type === "numbersOneToHundred") {
      generatedSequence = generateNumbersOneToHundred();
    }
    setSequence(generatedSequence);
    setFile(null); // Clear any uploaded file
  };

  const handleNext = () => {
    if (!collectionName) {
      alert("Collection name is missing. Please go back and enter a name.");
      return;
    }

    navigate("/collection-final-step", {
      state: { collectionName, isPublic, category, itemCount, file, sequence },
    });
  };

  const handleSaveCollection = async () => {
    try {
      const collectionData = sequence.map((name, index) => ({
        id: index + 1,
        name,
      }));
      await saveCollection(
        1, // Assume userId is 1 for example purposes, replace as needed
        collectionName,
        collectionData,
        isPublic ? "public" : "private",
        category // Pass the category to the API
      );      
      navigate("/your-collections"); // Redirect to collections page
    } catch (error) {
      console.error("Error saving collection:", error);
    }
  };

  return (
    <div className="collection-setup-container">
      <h1>Collection: {collectionName}</h1>
      <h2>Step 2 - Set Up Collection Body</h2>
      <div className="centered-input">
        <label htmlFor="itemCount">Quantity #:</label>
        <input
          type="number"
          id="itemCount"
          className="custom-input"
          value={itemCount}
          min={1}
          onChange={(e) => {
            const count = parseInt(e.target.value, 10);
            setItemCount(count);
          }}
          placeholder="Enter number of items"
          title="Enter the number of items"
        />
      </div>
      <div className="centered-input">
        <label htmlFor="typeSelect">Type:</label>
        <select
          id="typeSelect"
          className="custom-input"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="letters">Letters</option>
          <option value="numbers">Numbers</option>
          <option value="alphabet">Full Alphabet</option>
          <option value="numbersOneToHundred">Numbers 1-100</option>
        </select>
      </div>
      <button
        type="button"
        onClick={generateRandomSequence}
        className="styled-button"
      >
        Generate Random Sequence
      </button>
      <p>- OR -</p>
      <div className="centered-input">
        <label htmlFor="fileUpload">
          Upload a file to create a collection from
        </label>
        <input
          type="file"
          id="fileUpload"
          onChange={handleFileChange}
          title="Choose a file to upload"
        />
      </div>
      <button
        type="button"
        onClick={sequence.length > 0 ? handleSaveCollection : handleNext}
        className="styled-button"
      >
        {sequence.length > 0 ? "Save Collection" : "Next"}
      </button>
      {sequence.length > 0 && (
        <div>
          <h3>Generated Sequence:</h3>
          <p>{sequence.join(", ")}</p>
        </div>
      )}
    </div>
  );
};

export default CollectionSetup;
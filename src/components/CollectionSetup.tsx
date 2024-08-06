import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../App.css";

const CollectionSetup: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [file, setFile] = useState<File | null>(null);
  const [itemCount, setItemCount] = useState<number>(1);
  const { collectionName, isPublic } = location.state;
  const [sequence, setSequence] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const generateRandomSequence = (count: number) => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const generatedSequence = Array.from({ length: count }, () =>
      alphabet[Math.floor(Math.random() * alphabet.length)]
    );
    setSequence(generatedSequence);
  };

  const handleNext = () => {
    // Log the details for debugging
    console.log("Collection Name:", collectionName);
    console.log("Is Public:", isPublic);
    console.log("File:", file);
    console.log("Item Count:", itemCount);
    console.log("Generated Sequence:", sequence);

    // Navigate to the final step with accumulated data
    navigate("/collection-final-step", {
      state: { collectionName, isPublic, itemCount, file, sequence },
    });
  };

  return (
    <div className="collection-setup-container">
      <h1>Collection: {collectionName}</h1>
      <h2>Step 2 - Set Up Collection Body</h2>
      <div>
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
      <p>- OR -</p>
      <div>
        <label htmlFor="itemCount">
          Input a number of Items to add to this Collection
        </label>
        <input
          type="number"
          id="itemCount"
          className="custom-input"
          value={itemCount}
          min={1}
          onChange={(e) => {
            const count = parseInt(e.target.value);
            setItemCount(count);
            generateRandomSequence(count);
          }}
          placeholder="Enter number of items"
          title="Enter the number of items"
        />
      </div>
      <button type="button" onClick={handleNext} className="styled-button">
        Next
      </button>
    </div>
  );
};

export default CollectionSetup;

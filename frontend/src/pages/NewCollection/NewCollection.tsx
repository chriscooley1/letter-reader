import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewCollection.css";

const NewCollection: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("Math");
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const navigate = useNavigate();

  const categories = ["Math", "Language Arts", "More"];

  const handleNext = () => {
    if (!name.trim()) {
      alert("Please enter a collection name.");
      return;
    }

    // Navigate to the setup step with the initial collection details
    navigate("/collection-setup", {
      state: { collectionName: name, isPublic, category },
    });
  };

  return (
    <div className="new-collection-container">
      <h1>New Collection</h1>
      <div>
        <label htmlFor="collectionName">Step 1 - Collection Name</label>
        <input
          type="text"
          id="collectionName"
          className="custom-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter collection name"
          title="Collection Name"
        />
      </div>
      <div className="centered-input">
        <label htmlFor="categorySelect">Category:</label>
        <select
          id="categorySelect"
          className="custom-input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div className="checkbox-container">
        <input
          type="checkbox"
          id="publicCheckbox"
          checked={isPublic}
          onChange={() => setIsPublic(!isPublic)}
          title="Share collection publicly"
        />
        <label htmlFor="publicCheckbox">
          I want to share my collection publicly
        </label>
      </div>
      <button type="button" onClick={handleNext} className="styled-button">
        Next
      </button>
    </div>
  );
};

export default NewCollection;
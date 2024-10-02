import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import NameWheel from "./NameWheel";
import WheelSegment from "./WheelSegment";

const NameGenerator: React.FC = () => {
  const [nameInput, setNameInput] = useState<string>("");
  const [nameList, setNameList] = useState<string[]>([]);
  const [generatedName, setGeneratedName] = useState<string | null>(null);
  const [nameListId, setNameListId] = useState<number | null>(null);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const { getAccessTokenSilently } = useAuth0();

  const loadNameList = useCallback(async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.get("http://localhost:8000/namelists/", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.length > 0) {
        const latestNameList = response.data[0];
        setNameListId(latestNameList.namelist_id);
        setNameList(latestNameList.names);
      }
    } catch (error) {
      console.error("Error loading name list:", error);
    }
  }, [getAccessTokenSilently]);

  useEffect(() => {
    loadNameList();
  }, [loadNameList]);

  const saveNameList = async (updatedList: string[] = nameList) => {
    try {
      const token = await getAccessTokenSilently();
      const data = { name: "My Name List", names: updatedList };
      if (nameListId) {
        await axios.put(`http://localhost:8000/namelists/${nameListId}`, data, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        const response = await axios.post("http://localhost:8000/namelists/", data, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setNameListId(response.data.namelist_id);
      }
    } catch (error) {
      console.error("Error saving name list:", error);
    }
  };

  const handleAddName = () => {
    if (nameInput.trim() !== "") {
      const updatedList = [...nameList, nameInput.trim()];
      setNameList(updatedList);
      setNameInput("");
      saveNameList(updatedList);
    }
  };

  const handleRemoveName = (index: number) => {
    const updatedList = nameList.filter((_, i) => i !== index);
    setNameList(updatedList);
    saveNameList(updatedList);
  };

  const handleEditName = (index: number, newName: string) => {
    const updatedList = [...nameList];
    updatedList[index] = newName.trim();
    setNameList(updatedList);
    saveNameList(updatedList);
  };

  const handleSpin = () => {
    if (nameList.length > 0) {
      setIsSpinning(true);
      const spinRevolutions = 2 + Math.random() * 3; // 2 to 5 full rotations
      const targetAngle = spinRevolutions * 2 * Math.PI;
      return targetAngle;
    }
    return 0;
  };

  const handleNameSelected = (name: string) => {
    setGeneratedName(name);
    setIsSpinning(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAddName();
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen pt-20">
      <div className="flex flex-col items-center w-full max-w-md">
        <div className="mb-5 w-full">
          <div className="flex items-center justify-center mb-5">
            <label htmlFor="nameInput" className="mr-2">Add a Name:</label>
            <input
              type="text"
              id="nameInput"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-white text-black border border-current rounded p-2 text-base font-caveat"
              placeholder="Enter a name"
            />
            <button
              type="button"
              onClick={handleAddName}
              className="ml-2 bg-light-blue text-black px-4 py-2 rounded font-bold uppercase transition duration-300 hover:bg-hover-blue hover:scale-105 active:bg-active-blue active:scale-95"
            >
              Add
            </button>
          </div>
          <button
            type="button"
            onClick={handleSpin}
            className="w-full bg-light-blue text-black px-4 py-2 rounded font-bold uppercase transition duration-300 hover:bg-hover-blue hover:scale-105 active:bg-active-blue active:scale-95"
          >
            Spin the Wheel
          </button>
        </div>
        <div className="w-full">
          <NameWheel
            names={nameList}
            isSpinning={isSpinning}
            onSpin={handleSpin}
            onNameSelected={handleNameSelected}
            stopSpinning={() => setIsSpinning(false)}
          />
        </div>
        <div className="mt-5 w-full">
          <h2 className="text-xl font-bold mb-2">Names on the Wheel:</h2>
          <ul className="list-none p-0">
            {nameList.map((name, index) => (
              <WheelSegment
                key={index}
                name={name}
                index={index}
                angle={0}
                radius={150}
                onRemove={() => handleRemoveName(index)}
                onEdit={(newName) => handleEditName(index, newName)}
              />
            ))}
          </ul>
        </div>
        {generatedName && (
          <div className="mt-5 text-center">
            <h2 className="text-xl font-bold">Generated Name:</h2>
            <p className="text-2xl">{generatedName}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NameGenerator;
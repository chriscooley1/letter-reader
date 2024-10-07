import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  generateRandomLetters,
  generateRandomNumbers,
  generateFullAlphabet,
  generateNumbersOneToHundred,
  generateMathProblems,
  generateNumberSenseImages,
  generatePeriodicTableElements,
  generateScienceTerms,
  generateNursingTerms,
} from "../utils/RandomGenerators";
import { saveCollection, getCurrentUser } from "../api";
import { useAuth0 } from "@auth0/auth0-react";
import { User } from "../types/user";
import { useTheme } from "../context/ThemeContext";

type Operation =
  | "multiplication"
  | "addition"
  | "subtraction"
  | "division"
  | "PeriodicElement";

const CollectionSetup: React.FC = () => {
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const location = useLocation();
  const { collectionName, isPublic, category } = location.state || {};
  const { theme } = useTheme();

  const [file, setFile] = useState<File | null>(null);
  const [itemCount, setItemCount] = useState<number>(1);
  const [sequence, setSequence] = useState<string[]>([]);
  const [type, setType] = useState<string>("letters");
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [operation, setOperation] = useState<Operation | null>(null);
  const [numberSenseItems, setNumberSenseItems] = useState<
    { url?: string; svg?: string; count: number }[]
  >([]);
  const [dotColor, setDotColor] = useState<string>("blue");
  const [dotShape, setDotShape] = useState<string>("circle");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await getCurrentUser(getAccessTokenSilently);
        if (isUser(fetchedUser)) {
          const userWithDefaults: User = {
            ...fetchedUser,
            id: fetchedUser.id || generateId(),
            name: fetchedUser.name || "Default Name",
            username: fetchedUser.username || "defaultUsername",
            email: fetchedUser.email || "default@example.com",
          };
          setCurrentUser(userWithDefaults);
        } else {
          console.error(
            "Fetched user is missing required properties:",
            fetchedUser,
          );
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    fetchUser();
  }, [getAccessTokenSilently]);

  useEffect(() => {
    console.log("User data in state:", currentUser);
  }, [currentUser]);

  useEffect(() => {
    switch (category) {
      case "Math":
        setType("numbers");
        break;
      case "Language Arts":
        setType("letters");
        break;
      case "Number Sense":
        setType("numberSense");
        break;
      case "Science":
        setType("scienceTerms");
        break;
      case "Nursing":
        setType("nursingTerms");
        break;
      default:
        setType("letters");
    }
  }, [category]);

  useEffect(() => {
    if (type === "mathProblems" && !operation) {
      setOperation("addition"); // Set a default operation
    }
  }, [type, operation]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setSequence([]); // Clear any existing sequence
    }
  };

  const generateRandomSequence = () => {
    let generatedSequence: string[] = [];
    switch (type) {
      case "numbers":
        generatedSequence = generateRandomNumbers(itemCount);
        break;
      case "letters":
        generatedSequence = generateRandomLetters(itemCount);
        break;
      case "alphabet":
        generatedSequence = generateFullAlphabet();
        break;
      case "numbersOneToHundred":
        generatedSequence = generateNumbersOneToHundred();
        break;
      case "mathProblems":
        if (operation && operation !== "PeriodicElement") {
          const problems = generateMathProblems(itemCount, operation);
          generatedSequence = problems.map((item) => item);
        } else {
          console.error(
            "Math Problems selected but operation is not set or is PeriodicElement",
          );
        }
        break;
      case "numberSense": {
        const images = generateNumberSenseImages(itemCount, dotColor, dotShape);
        setNumberSenseItems(images);
        generatedSequence = images.map(
          (image, index) =>
            `Number Sense Image ${index + 1} (Count: ${image.count})`,
        );
        break;
      }
      case "periodicTable":
        generatedSequence = generatePeriodicTableElements(itemCount);
        break;
      case "scienceTerms":
        generatedSequence = generateScienceTerms(itemCount);
        break;
      case "nursingTerms":
        generatedSequence = generateNursingTerms(itemCount);
        break;
      default:
        console.error("Invalid type selected");
    }
    setSequence(generatedSequence);
    setFile(null);
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
    console.log("User data before saving collection:", currentUser);

    try {
      if (!currentUser || !currentUser.username) {
        throw new Error("Current user is undefined");
      }

      const collectionData = sequence.map((name, index) => ({
        id: index + 1,
        name,
        svg: type === "numberSense" ? numberSenseItems[index]?.svg : undefined,
        count:
          type === "numberSense" ? numberSenseItems[index]?.count : undefined,
      }));

      console.log("Saving collection with data:", {
        username: currentUser.username,
        collectionName,
        collectionData,
        isPublic,
        category,
        type,
      });
      await saveCollection(
        currentUser.username,
        collectionName,
        collectionData,
        isPublic ? "public" : "private",
        category,
        type,
        getAccessTokenSilently,
      );
      navigate("/your-collections");
    } catch (error) {
      console.error("Error saving collection:", error);
      alert("There was an error saving your collection. Please try again.");
    }
  };

  if (!currentUser) {
    return <div className="p-4 text-center">Loading user information...</div>;
  }

  return (
    <div
      className={`flex min-h-screen w-full flex-col items-center pl-[250px] pt-[50px] ${theme.isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}
    >
      <h1 className="text-4xl font-bold">Step 2 - Setup</h1>
      <h1 className="text-3xl font-bold">Collection: {collectionName}</h1>
      <div className="mb-4 flex flex-col items-center space-y-2">
        <div>
          <label htmlFor="categorySelect" className="mb-2 block font-bold">
            Category:
          </label>
          <select
            id="categorySelect"
            className="font-caveat rounded border border-gray-300 bg-white p-2 text-black"
            value={category}
            disabled
          >
            <option value="">Select a category</option>
            <option value="Math">Math</option>
            <option value="Language Arts">Language Arts</option>
            <option value="Number Sense">Number Sense</option>
            <option value="Science">Science</option>
            <option value="Nursing">Nursing</option>
          </select>
        </div>
        <div>
          <label htmlFor="typeSelect" className="mb-2 block font-bold">
            Type:
          </label>
          <select
            id="typeSelect"
            className="font-caveat rounded border border-gray-300 bg-white p-2 text-black"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            {category === "Math" && (
              <>
                <option value="numbers">Numbers</option>
                <option value="numbersOneToHundred">Numbers 1-100</option>
                <option value="mathProblems">Math Problems</option>
              </>
            )}
            {category === "Language Arts" && (
              <>
                <option value="letters">Letters</option>
                <option value="alphabet">Full Alphabet</option>
              </>
            )}
            {category === "Number Sense" && (
              <option value="numberSense">Random Pictures</option>
            )}
            {category === "Science" && (
              <>
                <option value="periodicTable">Periodic Table</option>
                <option value="scienceTerms">Science Terms</option>
              </>
            )}
            {category === "Nursing" && (
              <option value="nursingTerms">Nursing Terms</option>
            )}
          </select>
        </div>
        <div>
          <label htmlFor="itemCount" className="mb-2 block font-bold">
            Quantity #:
          </label>
          <input
            type="number"
            id="itemCount"
            className="w-full rounded-md border border-gray-300 p-2 font-['Caveat']"
            value={itemCount}
            min={1}
            onChange={(e) => {
              const count = parseInt(e.target.value, 10);
              setItemCount(count);
            }}
          />
        </div>
        {category === "Number Sense" && (
          <>
            <div>
              <label htmlFor="dot-color" className="mb-2 block font-bold">
                Dot Color:
              </label>
              <select
                id="dot-color"
                className="w-full rounded-md border border-gray-300 p-2 font-['Caveat']"
                value={dotColor}
                onChange={(e) => setDotColor(e.target.value)}
              >
                {["blue", "green", "red", "purple", "orange"].map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="dot-shape" className="mb-2 block font-bold">
                Dot Shape:
              </label>
              <select
                id="dot-shape"
                className="w-full rounded-md border border-gray-300 p-2 font-['Caveat']"
                value={dotShape}
                onChange={(e) => setDotShape(e.target.value)}
              >
                {["circle", "square", "triangle"].map((shape) => (
                  <option key={shape} value={shape}>
                    {shape}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
        <button
          type="button"
          className="w-full rounded-md bg-green-500 px-4 py-2 font-bold uppercase text-white transition duration-300 hover:bg-green-600"
          onClick={generateRandomSequence}
        >
          Generate Random Sequence
        </button>
        <p className="text-center">- OR -</p>
        <div>
          <label htmlFor="fileUpload" className="mb-2 block font-bold">
            Choose File:
          </label>
          <input
            type="file"
            id="fileUpload"
            className="w-full rounded-md border border-gray-300 p-2 font-['Caveat']"
            onChange={handleFileChange}
          />
        </div>
        <button
          type="button"
          className="bg-light-blue hover:bg-hover-blue active:bg-active-blue mt-5 max-w-[300px] cursor-pointer rounded border border-gray-300 p-2.5 text-base font-bold uppercase text-black transition-all duration-300 hover:scale-105 active:scale-95"
          onClick={sequence.length > 0 ? handleSaveCollection : handleNext}
        >
          {sequence.length > 0 ? "Save Collection" : "Next"}
        </button>
      </div>
      {sequence.length > 0 && (
        <div className="mt-6">
          <h3 className="mb-2 text-xl font-bold">Generated Sequence:</h3>
          <p className="text-lg">{sequence.join(", ")}</p>
        </div>
      )}
      {category === "Number Sense" && numberSenseItems.length > 0 && (
        <div className="mt-6">
          <h3 className="mb-2 text-xl font-bold">
            Generated Number Sense Images:
          </h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {numberSenseItems.map((image, index) => (
              <div
                key={index}
                className="rounded-md border border-gray-300 p-2"
              >
                <img
                  src={image.url || image.svg}
                  alt={`Number Sense Image ${index + 1}`}
                  className="h-auto w-full"
                />
                <p className="mt-2 text-center">Count: {image.count}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionSetup;

// Define the type guard function
function isUser(user: unknown): user is User {
  return (
    typeof user === "object" &&
    user !== null &&
    typeof (user as User).username === "string"
  );
}

// Define the function to generate a unique ID
function generateId(): string {
  return Math.random().toString(36).slice(2, 11);
}

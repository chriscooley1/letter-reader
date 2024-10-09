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
  const [collectionItemCount, setCollectionItemCount] = useState<number>(1);
  const [sequence, setSequence] = useState<
    Array<{ name: string; svg?: string; count?: number }>
  >([]);
  const [type, setType] = useState<string>("letters");
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [operation, setOperation] = useState<Operation | null>(null);
  const [numberSenseItems, setNumberSenseItems] = useState<
    { url?: string; svg?: string; count: number }[]
  >([]);
  const [dotColor, setDotColor] = useState<string>("blue");
  const [dotShape, setDotShape] = useState<string>("circle");
  const [dotCountType, setDotCountType] = useState<"fixed" | "random">("fixed");
  const [minDots, setMinDots] = useState<number>(1);
  const [maxDots, setMaxDots] = useState<number>(10);

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
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      // Create a FileReader to read the file
      const reader = new FileReader();
      reader.onloadend = () => {
        // Create a sequence item based on the uploaded file
        const newItem = {
          name: selectedFile.name,
          svg: reader.result as string, // Use the result from FileReader
          count: 1, // You can adjust this as needed
        };
        setSequence([newItem]); // Set the sequence to the new item
      };

      // Read the file as a data URL
      reader.readAsDataURL(selectedFile);
    }
  };

  const generateRandomSequence = () => {
    let generatedSequence: Array<{
      name: string;
      svg?: string;
      count?: number;
    }> = [];
    switch (type) {
      case "numbers":
        generatedSequence = generateRandomNumbers(itemCount).map((num) => ({
          name: num.toString(),
        }));
        break;
      case "letters":
        generatedSequence = generateRandomLetters(itemCount).map((letter) => ({
          name: letter,
        }));
        break;
      case "alphabet":
        generatedSequence = generateFullAlphabet().map((letter) => ({
          name: letter,
        }));
        break;
      case "numbersOneToHundred":
        generatedSequence = generateNumbersOneToHundred().map((num) => ({
          name: num.toString(),
        }));
        break;
      case "mathProblems":
        if (operation && operation !== "PeriodicElement") {
          generatedSequence = generateMathProblems(itemCount, operation).map(
            (problem) => ({ name: problem }),
          );
        } else {
          console.error(
            "Math Problems selected but operation is not set or is PeriodicElement",
          );
        }
        break;
      case "numberSense": {
        const generatedItems = [];
        for (let i = 0; i < collectionItemCount; i++) {
          let dotCount;
          if (dotCountType === "fixed") {
            dotCount = itemCount;
          } else {
            dotCount =
              Math.floor(Math.random() * (maxDots - minDots + 1)) + minDots;
          }
          const image = generateNumberSenseImages(dotCount, dotColor, dotShape);
          setNumberSenseItems((prev) => [...prev, image]);
          generatedItems.push({
            name: `Number Sense Image (Count: ${image.count})`,
            svg: image.svg,
            count: image.count,
          });
        }
        generatedSequence = generatedItems;
        break;
      }
      case "periodicTable":
        generatedSequence = generatePeriodicTableElements(itemCount).map(
          (element) => ({ name: element }),
        );
        break;
      case "scienceTerms":
        generatedSequence = generateScienceTerms(itemCount).map((term) => ({
          name: term,
        }));
        break;
      case "nursingTerms":
        generatedSequence = generateNursingTerms(itemCount).map((term) => ({
          name: term,
        }));
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

      const collectionData = sequence.map((item, index) => ({
        id: index + 1,
        name: item.name,
        svg: item.svg,
        count: item.count,
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
      <h2 className="text-3xl font-bold">Collection: {collectionName}</h2>
      <h3 className="mb-4 text-2xl font-semibold">Category: {category}</h3>
      <div className="mb-4 flex w-full max-w-3xl flex-col items-center space-y-4">
        {category !== "Number Sense" ? (
          <>
            <div className="flex items-center space-x-4">
              <label
                htmlFor="typeSelect"
                className="whitespace-nowrap font-bold"
              >
                Type:
              </label>
              <select
                id="typeSelect"
                className="font-caveat rounded border border-gray-300 bg-white p-2 text-center text-black"
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
            <div className="flex items-center space-x-4">
              <label
                htmlFor="itemCount"
                className="whitespace-nowrap font-bold"
              >
                Quantity:
              </label>
              <input
                type="number"
                id="itemCount"
                className="rounded-md border border-gray-300 p-2 text-center font-['Caveat']"
                value={itemCount}
                min={1}
                onChange={(e) => {
                  const count = parseInt(e.target.value, 10);
                  setItemCount(count);
                }}
              />
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center space-x-4">
              <label
                htmlFor="dotCountType"
                className="whitespace-nowrap font-bold"
              >
                Dot Count Type:
              </label>
              <select
                id="dotCountType"
                className="rounded-md border border-gray-300 p-2 text-center font-['Caveat'] text-black"
                value={dotCountType}
                onChange={(e) =>
                  setDotCountType(e.target.value as "fixed" | "random")
                }
              >
                <option value="fixed">Fixed</option>
                <option value="random">Random</option>
              </select>
            </div>
            {dotCountType === "fixed" ? (
              <div className="flex items-center space-x-4">
                <label
                  htmlFor="itemCount"
                  className="whitespace-nowrap font-bold"
                >
                  Number of Dots:
                </label>
                <input
                  type="number"
                  id="itemCount"
                  className="rounded-md border border-gray-300 p-2 text-center font-['Caveat']"
                  value={itemCount}
                  min={1}
                  onChange={(e) => {
                    const count = parseInt(e.target.value, 10);
                    setItemCount(count);
                  }}
                />
              </div>
            ) : (
              <>
                <div className="flex items-center space-x-4">
                  <label
                    htmlFor="minDots"
                    className="whitespace-nowrap font-bold"
                  >
                    Minimum Dots:
                  </label>
                  <input
                    type="number"
                    id="minDots"
                    className="rounded-md border border-gray-300 p-2 text-center font-['Caveat']"
                    value={minDots}
                    min={1}
                    onChange={(e) => {
                      const count = parseInt(e.target.value, 10);
                      setMinDots(count);
                    }}
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <label
                    htmlFor="maxDots"
                    className="whitespace-nowrap font-bold"
                  >
                    Maximum Dots:
                  </label>
                  <input
                    type="number"
                    id="maxDots"
                    className="rounded-md border border-gray-300 p-2 text-center font-['Caveat']"
                    value={maxDots}
                    min={minDots}
                    onChange={(e) => {
                      const count = parseInt(e.target.value, 10);
                      setMaxDots(count);
                    }}
                  />
                </div>
              </>
            )}
            <div className="flex items-center space-x-4">
              <label
                htmlFor="collectionItemCount"
                className="whitespace-nowrap font-bold"
              >
                Number of Items in Collection:
              </label>
              <input
                type="number"
                id="collectionItemCount"
                className="rounded-md border border-gray-300 p-2 text-center font-['Caveat']"
                value={collectionItemCount}
                min={1}
                onChange={(e) => {
                  const count = parseInt(e.target.value, 10);
                  setCollectionItemCount(count);
                }}
              />
            </div>
            <div className="flex items-center space-x-4">
              <label
                htmlFor="dot-color"
                className="whitespace-nowrap font-bold"
              >
                Dot Color:
              </label>
              <select
                id="dot-color"
                className="rounded-md border border-gray-300 p-2 text-center font-['Caveat'] text-black"
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
            <div className="flex items-center space-x-4">
              <label
                htmlFor="dot-shape"
                className="whitespace-nowrap font-bold"
              >
                Dot Shape:
              </label>
              <select
                id="dot-shape"
                className="rounded-md border border-gray-300 p-2 text-center font-['Caveat'] text-black"
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
          className="rounded-md bg-green-500 px-4 py-2 font-bold uppercase text-white transition duration-300 hover:bg-green-600"
          onClick={generateRandomSequence}
        >
          Generate Random Sequence
        </button>
        <p className="text-center">- OR -</p>
        <div>
          <label htmlFor="fileUpload" className="mb-2 block font-bold">
            {/* Choose File: */}
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
          onClick={file ? handleSaveCollection : handleNext} // Adjusted to save if a file is selected
        >
          {file ? "Save Collection" : "Next"}
        </button>
      </div>
      {sequence.length > 0 && (
        <div className="mt-6">
          <h3 className="mb-2 text-center text-xl font-bold">
            Generated Sequence:
          </h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {sequence.map((item, index) => (
              <div key={index} className="rounded-md border border-gray-300 p-2">
                {item.svg && (
                  <img
                    src={item.svg} // Use the base64-encoded image data
                    alt={item.name}
                    className="h-auto w-full"
                  />
                )}
                <p className="mt-2 text-center">{item.name}</p>
              </div>
            ))}
          </div>
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
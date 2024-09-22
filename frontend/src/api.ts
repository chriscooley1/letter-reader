import axios from "axios";
import { User } from "@auth0/auth0-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://race-the-clock-backend-production.up.railway.app";
console.log("Environment variables:", import.meta.env);
console.log("API_BASE_URL:", API_BASE_URL);

if (!API_BASE_URL) {
  console.error("VITE_API_BASE_URL is not set in the environment variables");
}

console.log("API_BASE_URL:", API_BASE_URL); // This will help debug the issue

interface Item {
  id: number;
  name: string;
}

// Function to handle API errors
const handleApiError = (error: any) => {
  if (error.response) {
    console.error("API Error:", error.response.data);
    if (error.response.status === 401) {
      console.error("Unauthorized - Redirecting to login.");
      window.location.href = "/race-the-clock/"; // Assuming "/race-the-clock" is the basename
    }
  } else if (error.request) {
    console.error("No response received:", error.request);
  } else {
    console.error("Error in API request setup:", error.message);
  }
  throw error;
};

// API function examples
export const getCurrentUser = async (getAccessTokenSilently: () => Promise<string>): Promise<User> => {
  try {
    console.log("Fetching access token for current user...");
    const token = await getAccessTokenSilently();
    const response = await axios.get(`${API_BASE_URL}/users/me/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Current user data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    handleApiError(error);
    throw new Error("Could not fetch current user.");
  }
};

// Function to update the display name
export const updateDisplayName = async (displayNamePayload: { display_name: string }, getAccessTokenSilently: () => Promise<string>) => {
  try {
    console.log("Updating display name with payload:", displayNamePayload);
    const token = await getAccessTokenSilently();
    await axios.put(`${API_BASE_URL}/users/me/display_name`, displayNamePayload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Display name updated successfully.");
  } catch (error) {
    handleApiError(error);
  }
};

export const getSequences = async (userId: string, getAccessTokenSilently: () => Promise<string>) => {
  try {
    console.log("Fetching sequences for user ID:", userId);
    const token = await getAccessTokenSilently();
    const response = await axios.get(
      `${API_BASE_URL}/users/${userId}/sequences`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("Sequences retrieved:", response.data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Function to create a sequence
export const createSequence = async (userId: string, name: string, sequence: string, getAccessTokenSilently: () => Promise<string>) => {
  try {
    console.log("Creating sequence with name:", name);
    const token = await getAccessTokenSilently();
    const response = await axios.post(
      `${API_BASE_URL}/sequences`,
      { user_id: userId, name, description: sequence },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("Sequence created successfully:", response.data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Function to update a sequence
export const updateSequence = async (sequenceId: number, name: string, description: string, getAccessTokenSilently: () => Promise<string>) => {
  try {
    console.log(`Updating sequence ID: ${sequenceId} with name: ${name}`);
    const token = await getAccessTokenSilently();
    const response = await axios.put(
      `${API_BASE_URL}/sequences/${sequenceId}`,
      { name, description },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("Sequence updated successfully:", response.data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Function to delete a sequence
export const deleteSequence = async (sequenceId: number, getAccessTokenSilently: () => Promise<string>) => {
  try {
    console.log("Deleting sequence ID:", sequenceId);
    const token = await getAccessTokenSilently();
    const response = await axios.delete(
      `${API_BASE_URL}/sequences/${sequenceId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("Sequence deleted successfully.");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Collection-related functions
export interface Collection {
  collection_id: number;
  name: string;
  description: string;
  creator_username: string;
  created_at: string;
  category: string;
  user_id: number;
  items: { name: string }[]; // Adjust based on your actual item structure
}

export const getCollections = async (getAccessTokenSilently: () => Promise<string>) => {
  try {
    const token = await getAccessTokenSilently();
    const response = await axios.get(`${API_BASE_URL}/users/me/collections`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Function to create a collection
export const createCollection = async (userId: string, name: string, description: string, getAccessTokenSilently: () => Promise<string>) => {
  try {
    console.log("Creating collection with name:", name);
    const token = await getAccessTokenSilently();
    const response = await axios.post(
      `${API_BASE_URL}/collections`,
      { user_id: userId, name, description },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("Collection created successfully:", response.data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Function to update a collection
export const updateCollection = async (collectionId: number, name: string, description: string, category: string, getAccessTokenSilently: () => Promise<string>) => {
  try {
    console.log(`Updating collection ID: ${collectionId} with name: ${name}`);
    const token = await getAccessTokenSilently();
    const response = await axios.put(
      `${API_BASE_URL}/collections/${collectionId}`,
      {
        name,
        description,
        category,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("Collection updated successfully:", response.data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Function to delete a collection
export const deleteCollection = async (collectionId: number, getAccessTokenSilently: () => Promise<string>) => {
  try {
    console.log("Deleting collection ID:", collectionId);
    const token = await getAccessTokenSilently();
    const response = await axios.delete(
      `${API_BASE_URL}/collections/${collectionId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("Collection deleted successfully.");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Updated API function to include public/private status
export const saveCollection = async (userId: string, collectionName: string, items: { id: number; name: string }[], status: string, category: string, getAccessTokenSilently: () => Promise<string>) => {
  try {
    console.log("Saving collection with name:", collectionName);
    const token = await getAccessTokenSilently();
    const response = await axios.post(
      `${API_BASE_URL}/collections`,
      {
        user_id: userId,
        name: collectionName,
        description: JSON.stringify(items),
        status,
        category,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("Collection saved successfully:", response.data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Function to create a collection from a form
export const createCollectionFromForm = async (
  name: string,
  description: string,
  isPublic: boolean,
  getAccessTokenSilently: () => Promise<string>
) => {
  try {
    const token = await getAccessTokenSilently();
    const response = await axios.post(
      `${API_BASE_URL}/collections`,
      {
        name,
        description,
        status: isPublic ? "public" : "private",
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Function to fetch public collections
export const fetchPublicCollections = async () => {
  try {
    const response = await axios.get<Collection[]>(`${API_BASE_URL}/collections/public`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Function to fetch items for a specific collection
export const fetchItemsForCollection = async (collectionId: number, token: string) => {
  try {
    const response = await axios.get<Item[]>(`${API_BASE_URL}/collections/${collectionId}/items`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Function to delete a collection by ID
export const deleteCollectionById = async (collectionId: number, getAccessTokenSilently: () => Promise<string>) => {
  try {
    const token = await getAccessTokenSilently();
    const response = await axios.delete(`${API_BASE_URL}/collections/${collectionId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Function to duplicate a collection
export const duplicateCollection = async (
  collectionToDuplicate: Collection,
  getAccessTokenSilently: () => Promise<string>
) => {
  const newCollectionName = `${collectionToDuplicate.name} Copy`;
  const newCollection = {
    name: newCollectionName,
    description: collectionToDuplicate.description,
    category: collectionToDuplicate.category,
    status: "private",
    user_id: collectionToDuplicate.user_id,
  };

  try {
    const token = await getAccessTokenSilently();
    const response = await axios.post(`${API_BASE_URL}/collections`, newCollection, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Function to fetch collections
export const fetchCollections = async (getAccessTokenSilently: () => Promise<string>) => {
  try {
    console.log("Fetching collections...");
    console.log("API_BASE_URL:", API_BASE_URL);
    const token = await getAccessTokenSilently();
    console.log("Token received:", token ? "Token exists" : "No token");
    const url = `${API_BASE_URL}/users/me/collections`;
    console.log("Fetching from URL:", url);
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Fetched collections:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching collections:", error);
    if (axios.isAxiosError(error)) {
      console.error("Axios error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers,
      });
    }
    handleApiError(error);
  }
};

export const subscribeToCollection = async (
  collectionId: number,
  getAccessTokenSilently: () => Promise<string>
): Promise<Collection> => {
  try {
    const token = await getAccessTokenSilently();
    const response = await axios.post(
      `${API_BASE_URL}/collections/subscribe/${collectionId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw new Error("Could not subscribe to the collection.");
  }
};

// Add this new function
export const searchPublicCollections = async (query: string) => {
  try {
    const response = await axios.get<Collection[]>(`${API_BASE_URL}/collections/search`, {
      params: { query }
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const checkBackendHealth = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/health`);
    return response.data;
  } catch (error) {
    console.error("Error checking backend health:", error);
    throw error;
  }
};

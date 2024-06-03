import axios from "axios";

const API_URL = "/api/Cubes";

const getCubes = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log("Fetched cubes:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching cubes:", error);
    return [];
  }
};

const createCube = async (cube) => {
  try {
    const response = await axios.post(API_URL, cube);
    console.log("Created cube response:", response);
  } catch (error) {
    console.error("Error creating cube:", error);
  }
};

const updateCube = async (id, cube) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, cube);
    console.log("Updated cube response:", response);
  } catch (error) {
    console.error("Error updating cube:", error);
  }
};

const deleteCube = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    console.log("Deleted cube response:", response);
  } catch (error) {
    console.error("Error deleting cube:", error);
  }
};

export { getCubes, createCube, updateCube, deleteCube };

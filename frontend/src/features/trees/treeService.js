import axios from "axios";

const API_URL = "http://localhost:8000/api/trees";

// Find tree based on longitude latitude
const findTreeLongLat = async (token, longitude, latitude) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `${API_URL}/nearby?long=${longitude}&lat=${latitude}`,
    config
  );
  return response.data;
};

// Get all trees from database
const getAllTrees = async () => {
  const response = await axios.get(`${API_URL}`);

  return response.data;
};

const treeService = {
  findTreeLongLat,
  getAllTrees,
};

export default treeService;

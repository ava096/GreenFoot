import axios from "axios";

const API_URL = "http://localhost:8000/api/trees";

// Add a new tree to the dataset
const addNewTree = async (treeData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + "/", treeData, config);
  return response.data;
};

//Update a tree's record
const updateTree = async (id, treeData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + `/${id}`, treeData, config);
  return response.data;
};

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
  addNewTree,
  updateTree,
  findTreeLongLat,
  getAllTrees,
};

export default treeService;

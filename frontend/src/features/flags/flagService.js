import axios from "axios";

const API_URL = "http://localhost:8000/api/flags/";

//Create new flag
const createFlag = async (id, flagData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL + `flagReport/${id}`,
    flagData,
    config
  );

  return response.data;
};

//Get flagged reports
const getFlaggedReports = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "getFlagged", config);

  return response.data;
};

// Get flag by ID
const getFlaggedID = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + `getFlagged/${id}`);

  return response.data;
};

// Get user's flags
const userFlagged = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "userFlagged", config);

  return response.data;
};

//Update flag status
const updateFlagStatus = async (id, flagData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + `updateFlag/${id}`,
    flagData,
    config
  );

  return response.data;
};

const flagService = {
  createFlag,
  getFlaggedReports,
  getFlaggedID,
  userFlagged,
  updateFlagStatus,
};

export default flagService;

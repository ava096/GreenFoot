import axios from "axios";

const API_URL = "http://localhost:8000/api/reports/";

// Create new report
const createReport = async (reportData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    API_URL + "newReport/" + reportData.treeID,
    reportData,
    config
  );

  return response.data;
};

// Get user reports
const getUserReports = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + "userReports", config);

  return response.data;
};

// Delete user report
const deleteReport = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + `deleteReport/${id}`, config);

  return response.data;
};

// Update a report
const updateReport = async (id, reportData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + `updateReport/${id}`,
    reportData,
    config
  );

  return response.data;
};

// Upvote a report
const upvoteReport = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + `upvoteReport/${id}`, config);

  return response.data;
};

const reportService = {
  createReport,
  getUserReports,
  deleteReport,
  updateReport,
  upvoteReport,
};

export default reportService;

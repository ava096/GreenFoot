import axios from "axios";

const API_URL = "http://localhost:8000/api/reports/";

// Create new report
const createReport = async (reportData, token) => {
  console.log(reportData);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + "newReport", reportData, config);

  return response.data;
};

const reportService = {
  createReport,
};

export default reportService;

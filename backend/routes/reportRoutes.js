const express = require("express");
const router = express.Router();
const {
  getAllReports,
  getUserReports,
  getTreeReports,
  getReportById,
  newReport,
  updateReport,
  deleteReport,
} = require("../controllers/reportController");
const { protect } = require("../middleware/authMiddleware");

router.get("/allReports", getAllReports);
router.get("/userReports", protect, getUserReports);
router.get("/treeReports/:id", getTreeReports);
router.get("/report/:id", getReportById);
router.post("/newReport/:id", protect, newReport);
router.put("/updateReport/:id", updateReport);
router.delete("/deleteReport/:id", protect, deleteReport);

module.exports = router;

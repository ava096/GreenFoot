const express = require("express");
const router = express.Router();
const {
  getAllReports,
  getUserReports,
  newReport,
  updateReport,
  deleteReport,
} = require("../controllers/reportController");
const { protect } = require("../middleware/authMiddleware");

router.get("/allReports", getAllReports);
router.get("/userReports", getUserReports);
router.post("/newReport", protect, newReport);
router.put("/updateReport/:id", updateReport);
router.delete("/deleteReport/:id", deleteReport);

module.exports = router;

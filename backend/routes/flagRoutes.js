const express = require("express");
const router = express.Router();
const {
  flagReport,
  getFlaggedReports,
  updateFlagStatus,
} = require("../controllers/flagController");
const { protect } = require("../middleware/authMiddleware");

router.post("/flagReport/:id", protect, flagReport);
router.get("/getFlagged", protect, getFlaggedReports);
router.put("/updateFlag/:id", protect, updateFlagStatus);

module.exports = router;

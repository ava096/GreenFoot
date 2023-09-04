const express = require("express");
const router = express.Router();
const {
  flagReport,
  getFlaggedReports,
  getFlagById,
  getUsersFlags,
  updateFlagStatus,
} = require("../controllers/flagController");
const { protect } = require("../middleware/authMiddleware");

router.post("/flagReport/:id", protect, flagReport);
router.get("/getFlagged", protect, getFlaggedReports);
router.get("/getFlagged/:id", protect, getFlagById);
router.get("/userFlagged", protect, getUsersFlags);
router.put("/updateFlag/:id", protect, updateFlagStatus);

module.exports = router;

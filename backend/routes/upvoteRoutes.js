const express = require("express");
const router = express.Router();
const { addUpvote, removeUpvote } = require("../controllers/upvoteController");
const { protect } = require("../middleware/authMiddleware");

router.post("/addUpvote/:reportID", protect, addUpvote);
router.delete("/removeUpvote/:reportID", protect, removeUpvote);

module.exports = router;

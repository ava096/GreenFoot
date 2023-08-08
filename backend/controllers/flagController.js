const asyncHandler = require("express-async-handler");
const Flag = require("../models/flagModel");
const Report = require("../models/reportModel");

// @desc    Get flagged reports
// @route   GET /api/flagged
// @access  Private
const getFlaggedReports = asyncHandler(async (req, res) => {
  try {
    //flaggedReports will be array of flags
    const flaggedReports = await Flag.find()
      //this field will be populated with the corresponding report document for each flag
      .populate("report");

    res.status(200).json(flaggedReports);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = {
  getFlaggedReports,
};

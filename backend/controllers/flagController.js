const asyncHandler = require("express-async-handler");
const Flag = require("../models/flagModel");
const Report = require("../models/reportModel");

// @desc    Create new flag
// @route   POST /api/flagged/:id
// @acess   Private
const flagReport = asyncHandler(async (req, res) => {
  try {
    //Check if user has already flagged report
    const alreadyFlagged = await Flag.findOne({
      userFlagging: req.user.id,
      reportFlagged: req.params.id,
    });

    if (alreadyFlagged) {
      return res
        .status(400)
        .json({ message: "You have already flagged this report" });
    }

    //If user has not flagged report
    const flag = new Flag({
      userFlagging: req.user.id,
      userName: req.user.userName,
      reportFlagged: req.params.id,
      reasonForFlag: req.body.reasonForFlag,
      additionalInfo: req.body.additionalInfo,
    });

    //save new flag
    const savedFlag = await flag.save();

    res.status(201).json(savedFlag);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Get flagged reports
// @route   GET /api/flagged
// @access  Private/Admin only
const getFlaggedReports = asyncHandler(async (req, res) => {
  try {
    //flaggedReports will be array of flags
    const flaggedReports = await Flag.find()
      //this field will be populated with the corresponding report document for each flag
      .populate("reportFlagged");

    res.status(200).json(flaggedReports);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Update a flag's status
// @route   PUT /api/flagged/:id
// @access  Private/Admin
const updateFlagStatus = asyncHandler(async (req, res) => {
  try {
    //hideReport here will act as a signal for whether
    //a report needs to be set as hidden in the report schema
    const { flagStatus, hideReport, adminComments } = req.body;
    //get admin info
    const adminResolving = req.user.id;
    const adminUserName = req.user.userName;

    //find flag and update status
    const flag = await Flag.findById(req.params.id);

    if (flag) {
      flag.flagStatus = flagStatus;

      //hide report if signal is received
      if (hideReport) {
        const report = await Report.findById(flag.reportFlagged);
        console.log(report);
        if (report) {
          report.isHidden = true;
          await report.save();
        }
      } else {
        //if flag is not found
        res.status(404).json({ message: "Flag not found" });
      }

      await flag.save();
      res.status(200).json(flag);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = {
  flagReport,
  getFlaggedReports,
  updateFlagStatus,
};

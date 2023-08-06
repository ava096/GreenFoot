const asyncHandler = require("express-async-handler");
const Upvote = require("../models/upvoteModel");
const Report = require("../models/reportModel");

// @desc    Upvote a report
// @route   POST /api/upvotes/:reportID
// @access  Private
const addUpvote = asyncHandler(async (req, res) => {
  try {
    //IDs required to make sure entry is unique
    const reportID = req.params.reportID;
    const userID = req.user.id;

    //Check if user has already upvoted this report
    const upvote = await Upvote.findOne({ user: userID, report: reportID });

    //If they have done so
    if (upvote) {
      res.status(400).json({ message: "You have already upvoted this report" });
      return;
    }

    //If upvoting is successful
    const newUpvote = await Upvote.create({ user: userID, report: reportID });

    //increase upvotes in Report cluster document
    await Report.findByIdAndUpdate(reportID, { $inc: { reportUpvotes: 1 } });

    res.status(201).json(newUpvote);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// @desc    Remove an upvote
// @route   DELETE /api/upvotes/:reportID
// @access  Private
const removeUpvote = asyncHandler(async (req, res) => {
  try {
    //IDs needed for function
    const reportID = req.params.reportID;
    const userID = req.user.id;

    const upvote = await Upvote.findOne({ user: userID, report: reportID });

    //Check that user has actually upvoted report
    if (!upvote) {
      res.status(400).json({ message: "You have not upvoted this report" });
      return;
    }

    //find upvote and delete from upvote schema
    await Upvote.findByIdAndDelete(upvote.id);
    //adjust upvote quantity in report model
    await Report.findByIdAndUpdate(reportID, { $inc: { reportUpvotes: -1 } });

    res.status(204).json({ message: "Upvote removed" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  addUpvote,
  removeUpvote,
};

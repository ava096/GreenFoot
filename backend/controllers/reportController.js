const asyncHandler = require("express-async-handler");
const Report = require("../models/reportModel");
const Tree = require("../models/treeModel");

// @desc    Get all reports
// @route   GET /api/reports
// @access  Public
const getAllReports = asyncHandler(async (req, res) => {
  try {
    const reports = await Report.find();
    res.status(201).json(reports);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Get reports associated with logged in user
// @route   GET /api/reports
// @access  Private
const getUserReports = asyncHandler(async (req, res) => {
  try {
    const userReports = await Report.find({ user: req.user.id });

    // Check if there are no reports
    if (userReports.length === 0) {
      return res
        .status(200)
        .json({ message: "No reports found for this user." });
    } else {
      res.status(200).json(userReports);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get reports associated with a specific tree
// @route   GET /api/reports
// @access  Public
const getTreeReports = asyncHandler(async (req, res) => {
  try {
    const treeReports = await Report.find({ tree: req.params.id });
    res.status(201).json(treeReports);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Get report by ID
// @route   GET /api/reports
// @access  Public
const getReportById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const report = await Report.findById(id);

    let upvoteCount = 0;

    if (report) {
      for (let value of report.reportUpvotes.values()) {
        if (value === true) {
          upvoteCount++;
        }
      }
      report._doc.upvoteCount = upvoteCount;
    }

    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create a new report
// @route   POST /api/reports
// @access  Private
const newReport = asyncHandler(async (req, res) => {
  try {
    // Check if tree exists
    const tree = await Tree.findById(req.params.id);
    if (!tree) {
      return res.status(404).json({ message: "Tree not found." });
    }

    const reportData = {
      ...req.body,
      user: req.user.id,
      tree: req.params.id,
      isModerated: false,
      reportUpvotes: {},
      isHidden: false,
      usedToUpdate: false,
    };
    const report = await Report.create(reportData);
    res.status(201).json(report);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Update a report
// @route   PUT /api/reports
// @access  Private
const updateReport = asyncHandler(async (req, res) => {
  const id = req.params.id;

  try {
    const report = await Report.findById(id);

    // if report doesn't exist
    if (!report) {
      return res.status(404).json({ message: "Cannot find this report" });
    }

    // Check for user
    if (!req.user) {
      res.status(401);
      throw new Error("User not found");
    }

    // Ensure the logged in user matches user associated with report
    // or that the logged in user is an admin
    if (
      report.user.toString() !== req.user.id &&
      req.user.userRole !== "admin"
    ) {
      res.status(401);
      throw new Error("User not authorised");
    }

    const updatedReport = await Report.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    // if report is sucessfully updated
    res.status(200).json(updatedReport);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Upvote a report
// @route   PUT /api/reports/:id
// @access  Private
const upvoteReport = asyncHandler(async (req, res) => {
  try {
    // set flag for letting user know if report has been used to update a tree record
    let treeUpdated = false;

    //report id
    const { id } = req.params;
    //user id
    const user = req.user.id;

    //Get report user wants to upvote
    const report = await Report.findById(id);

    //Check if user has already upvoted report
    const isUpvoted = report.reportUpvotes.get(user.toString());

    if (isUpvoted) {
      //return invalid request if user has already liked report
      return res
        .status(400)
        .json({ message: "You have already upvoted this report." });
    } else {
      report.reportUpvotes.set(user.toString(), true);
    }

    // If the report has >=5 upvotes and hasn't been used to update a tree yet:
    if (report.reportUpvotes.size >= 5 && !report.usedToUpdate) {
      //flagging this report for a potential update
      report.usedToUpdate = true;

      const tree = await Tree.findById(report.tree);

      //make sure info supplied is valid
      if (report.reportTreeLocationType !== "Not Provided") {
        tree.treeLocationType = report.reportTreeLocationType;
      }

      if (report.reportTreeType !== "Not Provided") {
        tree.treeType = report.reportTreeType;
      }

      if (report.reportTreeScientificName != "Not Provided") {
        tree.treeScientificName = report.reportTreeScientificName;

        if (
          !report.reportTreeScientificName.includes("(Specific Type Unknown")
        ) {
          report.levelOfConcern = "Green";
        }
      }

      if (report.reportTreeAge !== "Not Provided") {
        tree.treeAge = report.reportTreeAge;
      }

      if (report.reportTreeDescription !== "Not Provided") {
        tree.treeDescription = report.reportTreeDescription;
      }

      if (report.reportTreeSurroundings !== "Not Provided") {
        tree.treeSurroundings = report.reportTreeSurroundings;
      }

      if (report.reportTreeVigour !== "Not Provided") {
        tree.treeVigour = report.reportTreeVigour;
      }

      if (report.reportTreeCondition !== "Not Provided") {
        tree.treeCondition = report.reportTreeCondition;
      }

      if (report.reportTreeDiameterCentimetres !== null) {
        tree.treeDiameterCentimetres = report.reportTreeDiameterCentimetres;
      }

      if (report.reportTreeSpreadRadiusMetres !== null) {
        tree.treeSpreadRadiusMetres = report.reportTreeSpreadRadiusMetres;
      }

      if (report.reportTreeHeightMetres !== null) {
        tree.treeHeightMetres = report.reportTreeHeightMetres;
      }

      await tree.save();

      // flagged as true, response can be sent to indicate an update
      treeUpdated = true;
    }

    //Save the changes made
    await report.save();

    // if an update was made to a tree record
    if (treeUpdated) {
      res.status(200).json({
        message: "This report has been used to update the tree record",
        report,
      });
    } else {
      // if no update was made to a tree record
      res.status(200).json(report);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Delete a report
// @route   DELETE /api/reports
// @access  Private
const deleteReport = asyncHandler(async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    // if report does not exist
    if (!report) {
      res.status(400);
      throw new Error("Report not found");
    }

    // Check for user
    if (!req.user) {
      res.status(401);
      throw new Error("User not found");
    }

    // Ensure the logged in user matches user associated with report or has the admin role
    if (
      report.user.toString() !== req.user.id &&
      req.user.userRole !== "admin"
    ) {
      res.status(401);
      throw new Error("User not authorised");
    }

    await report.deleteOne();

    // if report is successfully deleted
    res.status(201).json({ id: req.params.id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = {
  getAllReports,
  getUserReports,
  getTreeReports,
  getReportById,
  newReport,
  updateReport,
  upvoteReport,
  deleteReport,
};

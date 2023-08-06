const asyncHandler = require("express-async-handler");
const Report = require("../models/reportModel");
const User = require("../models/userModel");

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
    res.status(201).json(userReports);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
    const reportData = {
      ...req.body,
      user: req.user.id,
      tree: req.params.id,
      isModerated: false,
      reportUpvotes: 0,
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

// @desc    Delete a report
// @route   DELETE /api/reports
// @acess   Private
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
  deleteReport,
};

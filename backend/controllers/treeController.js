const asyncHandler = require("express-async-handler");
const Tree = require("../models/treeModel");

// @desc    Get all trees
// @route   GET /api/trees
// @access  Public
const getAllTrees = asyncHandler(async (req, res) => {
  try {
    const trees = await Tree.find();
    res.status(200).json(trees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get tree
// @route   GET /api/trees/:id
// @access  Public
const getTree = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const tree = await Tree.findById(id);
    res.status(200).json(tree);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create new entry
// @route   POST /api/trees
// @access  Private
const setTree = asyncHandler(async (req, res) => {
  try {
    const tree = await Tree.create(req.body);
    res.status(200).json(tree);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// @desc    Update entry
// @route   PUT /api/trees
// @access  Private
const updateTree = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const tree = await Tree.findByIdAndUpdate(id, req.body);

    //if ID does not exist
    if (!tree) {
      return res
        .status(404)
        .json({ message: `Cannot find any records with ID ${id}` });
    }

    //if record is successfully updated
    const updatedTree = await Tree.findById(id);
    res.status(200).json(updatedTree);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Delete entry
// @route   DELETE /api/trees
// @access  Private
const deleteTree = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const tree = await Tree.findByIdAndDelete(id);

    //if record does not exist
    if (!tree) {
      return res
        .status(404)
        .json({ message: `Cannot find any records with ID ${id}` });
    }

    //if sucessfully deleted
    res.status(200).json(tree);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  getAllTrees,
  getTree,
  setTree,
  updateTree,
  deleteTree,
};

const asyncHandler = require("express-async-handler");
const Tree = require("../models/treeModel");
const User = require("../models/userModel");

// @desc    Get all trees and return in alphabetical order
// @route   GET /api/trees
// @access  Public
const getAllTrees = asyncHandler(async (req, res) => {
  try {
    if (Object.keys(req.query).length > 0) {
      return next();
    }

    const trees = await Tree.find().sort({ treeType: 1 });
    res.status(200).json(trees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get tree by ID
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

// @desc    GET tree filtered by search params
// @route   GET/api/trees
// @access  Public
const getTreeSearch = asyncHandler(async (req, res) => {
  try {
    if (Object.keys(req.query).length === 0) {
      return res.status(200).json([]);
    }

    const {
      treeLocationType,
      treeType,
      treeScientificName,
      treeAge,
      treeSurroundings,
      treeVigour,
      treeCondition,
      treeDiameterCentimetres,
      treeSpreadRadiusMetres,
      treeHeightMetres,
    } = req.query;

    //store search results in array
    const filter = {};

    if (treeLocationType) {
      filter.treeLocationType = treeLocationType;
    }

    if (treeType) {
      filter.treeType = treeType;
    }

    if (treeScientificName) {
      filter.treeScientificName = treeScientificName;
    }

    if (treeAge) {
      filter.treeAge = treeAge;
    }

    if (treeSurroundings) {
      filter.treeSurroundings = treeSurroundings;
    }

    if (treeVigour) {
      filter.treeVigour = treeVigour;
    }

    if (treeCondition) {
      filter.treeCondition = treeCondition;
    }

    if (treeDiameterCentimetres) {
      filter.treeDiameterCentimetres = treeDiameterCentimetres;
    }

    if (treeSpreadRadiusMetres) {
      filter.treeSpreadRadiusMetres = treeSpreadRadiusMetres;
    }

    if (treeHeightMetres) {
      filter.treeHeightMetres = treeHeightMetres;
    }

    //apply filters and search database
    const trees = await Tree.find(filter);
    res.status(200).json(trees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get 10 closest trees to current co-ordinates
// @route   GET /api/trees
// @access  Private
const getClosestTrees = asyncHandler(async (req, res) => {
  try {
    const maxDistance = 10000;

    const long = Number(req.query.longitude);
    const lat = Number(req.query.latitude);

    const trees = await Tree.find({
      location: {
        $near: {
          $maxDistance: maxDistance,
          $geometry: {
            type: "Point",
            coordinates: [long, lat],
          },
        },
      },
    }).limit(10);

    console.log(`${trees.length} trees found`);

    res.status(200).json(trees);
  } catch (error) {
    console.error(`Error getting closest trees: ${error}`);
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
    const updatedTree = await Tree.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    //if ID does not exist
    if (!updatedTree) {
      return res
        .status(404)
        .json({ message: `Cannot find any records with ID ${id}` });
    }

    //if record is successfully updated
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
    const tree = await Tree.findById(req.params.id);

    //if record does not exist
    if (!tree) {
      res.status(400);
      throw new Error("Tree not found");
    }

    //check for user
    if (!req.user) {
      res.status(401);
      throw new Error("User not found");
    }

    await tree.deleteOne();

    //if sucessfully deleted
    res.status(200).json(tree);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  getAllTrees,
  getTree,
  getTreeSearch,
  getClosestTrees,
  setTree,
  updateTree,
  deleteTree,
};

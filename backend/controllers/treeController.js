const asyncHandler = require("express-async-handler");
const Tree = require("../models/treeModel");

// @desc    Get all trees
// @route   GET /api/trees
// @access  Public
const getAllTrees = asyncHandler(async (req, res) => {
  try {
    if (Object.keys(req.query).length > 0) {
      return next();
    }

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

// @desc    GET reports associated with logged in user
// @route   GET/api/trees
// @access  Private
const getUserTree = asyncHandler(async (req, res) => {
  try {
    const trees = await Tree.find({ user: req.user.id });
    res.status(200).json(trees);
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
      treeType,
      species,
      speciesType,
      age,
      treeSurround,
      vigour,
      condition,
      diameterCentimetres,
      radiusMetres,
      treeHeightMetres,
    } = req.query;

    //store search results in array
    const filter = {};

    if (treeType) {
      filter.treeType = treeType;
    }

    if (speciesType) {
      filter.speciesType = speciesType;
    }

    if (species) {
      filter.species = species;
    }

    if (age) {
      filter.age = age;
    }

    if (treeSurround) {
      filter.treeSurround = treeSurround;
    }

    if (vigour) {
      filter.vigour = vigour;
    }

    if (condition) {
      filter.condition = condition;
    }

    if (diameterCentimetres) {
      filter.diameterCentimetres = diameterCentimetres;
    }

    if (radiusMetres) {
      filter.radiusMetres = radiusMetres;
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
  getUserTree,
  getTreeSearch,
  setTree,
  updateTree,
  deleteTree,
};

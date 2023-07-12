const mongoose = require("mongoose");

const treeSchema = mongoose.Schema(
  {
    treeLocationType: {
      type: String,
      required: [true, "Please include a tree location type"],
    },
    treeType: {
      type: String,
      required: [true, "Please include what type of tree this is"],
    },
    treeScientificName: {
      type: String,
      required: [true, "Please include a scientific name"],
    },
    treeAge: {
      type: String,
      required: [true, "Please include an age"],
    },
    treeDescription: {
      type: String,
      required: [true, "Please include a description"],
    },
    treeSurroundings: {
      type: String,
      required: [true, "Please include the tree's surroundings"],
    },
    treeVigour: {
      type: String,
      required: [true, "Please include the tree's vigour"],
    },
    treeCondition: {
      type: String,
      required: [true, "Please include the tree's condition"],
    },
    treeDiameterCentimetres: {
      type: Number,
      required: true,
    },
    treeRadiusMetres: {
      type: Number,
      required: true,
    },
    treeLongitude: {
      type: Number,
      required: true,
    },
    treeLatitude: {
      type: Number,
      required: true,
    },
    treeHeightMetres: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Tree = mongoose.model("Tree", treeSchema);

module.exports = Tree;

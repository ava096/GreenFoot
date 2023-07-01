const mongoose = require("mongoose");

const treeSchema = mongoose.Schema(
  {
    treeType: {
      type: String,
      required: [true, "Please include a tree type"],
    },
    speciesType: {
      type: String,
      required: [true, "Please include a species"],
    },
    species: {
      type: String,
      required: [true, "Please include a scientific name"],
    },
    age: {
      type: String,
      required: [true, "Please include an age"],
    },
    description: {
      type: String,
      required: [true, "Please include a description"],
    },
    treeSurround: {
      type: String,
      required: [true, "Please include the tree's surroundings"],
    },
    vigour: {
      type: String,
      required: [true, "Please include the tree's vigour"],
    },
    condition: {
      type: String,
      required: [true, "Please include the tree's condition"],
    },
    diameterCentimetres: {
      type: Number,
      required: true,
    },
    radiusMetres: {
      type: Number,
      required: true,
    },
    locationX: {
      type: Number,
      required: true,
    },
    locationY: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    treeTag: {
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

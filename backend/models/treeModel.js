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
      required: [true, "Please include the tree's diameter in centimetres"],
    },
    treeSpreadRadiusMetres: {
      type: Number,
      required: [true, "Please include the tree's spread radius in metres"],
    },
    treeHeightMetres: {
      type: Number,
      required: [true, "Please include the tree's height in metres"],
    },
    location: {
      type: { type: String, default: "Point", required: true },
      coordinates: [Number],
    },
  },
  {
    timestamps: true,
  }
);

treeSchema.index({ location: "2dsphere" });

const Tree = mongoose.model("Tree", treeSchema);

module.exports = Tree;

const mongoose = require("mongoose");

const treeSchema = mongoose.Schema(
  {
    treeLocationType: {
      type: String,
      default: "No data provided",
    },
    treeType: {
      type: String,
      default: "No data provided",
    },
    treeScientificName: {
      type: String,
      default: "No data provided",
    },
    treeAge: {
      type: String,
      default: "No data provided",
    },
    treeDescription: {
      type: String,
      default: "No data provided",
    },
    treeSurroundings: {
      type: String,
      default: "No data provided",
    },
    treeVigour: {
      type: String,
      default: "No data provided",
    },
    treeCondition: {
      type: String,
      default: "No data provided",
    },
    treeDiameterCentimetres: {
      type: Number,
      default: null,
    },
    treeSpreadRadiusMetres: {
      type: Number,
      default: null,
    },
    treeHeightMetres: {
      type: Number,
      default: null,
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

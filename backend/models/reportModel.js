const mongoose = require("mongoose");

const reportSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
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
    longitude: {
      type: Number,
      required: true,
    },
    latitude: {
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

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;

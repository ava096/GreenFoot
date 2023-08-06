const mongoose = require("mongoose");

const reportSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    tree: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Tree",
    },
    reportTreeLocationType: {
      type: String,
      required: [true, "Please include a tree location type"],
    },
    reportTreeType: {
      type: String,
      required: [true, "Please include what type of tree this is"],
    },
    reportTreeScientificName: {
      type: String,
      required: [true, "Please include a scientific name"],
    },
    reportTreeAge: {
      type: String,
      required: [true, "Please include an age"],
    },
    reportTreeDescription: {
      type: String,
      required: [true, "Please include a description"],
    },
    reportTreeSurroundings: {
      type: String,
      required: [true, "Please include the tree's surroundings"],
    },
    reportTreeVigour: {
      type: String,
      required: [true, "Please include the tree's vigour"],
    },
    reportTreeCondition: {
      type: String,
      required: [true, "Please include the tree's condition"],
    },
    reportTreeDiameterCentimetres: {
      type: Number,
      required: true,
    },
    reportTreeSpreadRadiusMetres: {
      type: Number,
      required: true,
    },
    reportTreeHeightMetres: {
      type: Number,
      required: true,
    },
    reportImage: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    isModerated: {
      type: Boolean,
      required: true,
    },
    reportUpvotes: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;

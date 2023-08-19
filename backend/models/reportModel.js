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
      default: "Not Provided",
    },
    reportTreeType: {
      type: String,
      default: "Not Provided",
    },
    reportTreeScientificName: {
      type: String,
      default: "Not Provided",
    },
    reportTreeAge: {
      type: String,
      default: "Not Provided",
    },
    reportTreeDescription: {
      type: String,
      default: "Not Provided",
    },
    reportTreeSurroundings: {
      type: String,
      default: "Not Provided",
    },
    reportTreeVigour: {
      type: String,
      default: "Not Provided",
    },
    reportTreeCondition: {
      type: String,
      default: "Not Provided",
    },
    reportTreeDiameterCentimetres: {
      type: Number,
      default: null,
    },
    reportTreeSpreadRadiusMetres: {
      type: Number,
      default: null,
    },
    reportTreeHeightMetres: {
      type: Number,
      default: null,
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
      type: Map,
      of: Boolean,
    },
    isHidden: {
      type: Boolean,
      required: true,
    },
    usedToUpdate: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;

const mongoose = require("mongoose");

const flagSchema = mongoose.Schema(
  {
    userFlagging: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    reportFlagged: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Report",
    },
    userName: {
      type: String,
      required: true,
    },
    reasonForFlag: {
      type: String,
      required: true,
    },
    additionalInfo: {
      type: String,
      default: "No additional information provided",
    },
    flagStatus: {
      type: String,
      enum: ["pendingReview", "resolved", "rejected"],
      default: "pendingReview",
    },
    adminResolving: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    adminUserName: {
      type: String,
      default: null,
    },
    adminComments: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Create a unique compound index on user and report
flagSchema.index({ userFlagging: 1, reportFlagged: 1 }, { unique: true });

const Flag = mongoose.model("Flag", flagSchema);

module.exports = Flag;

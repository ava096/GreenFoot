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
  },
  {
    timestamps: true,
  }
);

// Create a unique compound index on user and report
flagSchema.index({ user: 1, report: 1 }, { unique: true });

const Flag = mongoose.model("Flag", flagSchema);

module.exports = Flag;

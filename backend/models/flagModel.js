const mongoose = require("mongoose");

const flagSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    report: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Report",
    },
    reasonForFlag: {
      type: String,
      required: true,
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

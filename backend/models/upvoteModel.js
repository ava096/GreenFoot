const mongoose = require("mongoose");

const upvoteSchema = mongoose.Schema({
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
});

upvoteSchema.index({ user: 1, report: 1 }, { unique: true });

const Upvote = mongoose.model("Upvote", upvoteSchema);

module.exports = Upvote;

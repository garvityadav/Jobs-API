const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      trim: true,
      maxLength: [20, "Name can't be more than 20 characters"],
    },
    position: {
      type: String,
      trim: true,
      maxLength: [20, "can't exceed more than 20 characters"],
    },
    status: {
      type: String,
      enum: ["interview", "pending", "decline"],
      default: "pending",
    },
    createdAt: {
      type: Date,
      default: new Date().toDateString(),
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "please provide a User"],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("job", JobSchema);

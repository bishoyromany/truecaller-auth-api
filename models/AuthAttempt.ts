import mongoose from "mongoose";

const AuthAttemptSchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: Number,
      required: true,
    },
    requestId: {
      type: String,
      required: true,
    },
    isUsed: {
      type: Boolean,
      required: true,
      default: false,
    },
    body: {
      type: Object,
    },
    user: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

const AuthAttempt = mongoose.model("AuthAttempt", AuthAttemptSchema);

module.exports = AuthAttempt;

import mongoose from "mongoose";

const AuthAttemptSchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: String,
      required: true,
    },
    key: {
      type: String,
      required: true,
    },
    isUsed: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const AuthAttempt = mongoose.model("AuthAttempt", AuthAttemptSchema);

module.exports = AuthAttempt;

const mongoose = require("mongoose");

const profileSchema = mongoose.Schema(
  {
    name: { type: String, default: "Anonymous" },
    age: { type: Number, required: true },
    gender: String,
    location: String,
    symptoms: [{ type: String }],
    tested: Boolean,
    diagnosed: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Profile", profileSchema);

const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true
    },

    email: {
      type: String,
      unique: true,
      required: true
    },

    password: {
      type: String,
      required: true
    },

    favorites: {
      type: [Schema.Types.ObjectId],
      ref: "Recipe"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);

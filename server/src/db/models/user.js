const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: mongoose.SchemaTypes.String,
      trim: true,
    },
    email: {
      type: mongoose.SchemaTypes.String,
      validate(value) {
        if (!validator.isEmail(value)) throw new Error("Email is invalid");
      },
      unique: true,
      trim: true,
    },
    password: {
      type: mongoose.SchemaTypes.String,
    },
    ipAddress: {
      type: mongoose.SchemaTypes.String,
    },
    recaptchaToken: {
      type: mongoose.SchemaTypes.String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, 8);
    next();
  } catch (error) {
    throw new Error(error.message);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
  },
  { versionKey: false }
);

userSchema.pre("save", async function () {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

const User = mongoose.model("users", userSchema);

module.exports = {
  User,
};

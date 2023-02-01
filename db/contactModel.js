const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Set email for contact"],
    },
    phone: {
      type: String,
      required: [true, "Set phone number for contact"],
    },
  },
  { versionKey: false }
);

const Contact = mongoose.model("contacts", contactSchema);

module.exports = {
  Contact,
};

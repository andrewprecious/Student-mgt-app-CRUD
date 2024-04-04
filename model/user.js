const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    school: {
      type: String,
      required: true,
    },

    age: {
      type: String,
      required: true,
    },

    class: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
      // default: "No-image-yet",
    },
  },
  { timestamps: true }
);

const mainUser = mongoose.model("user", schema);

module.exports = mainUser;

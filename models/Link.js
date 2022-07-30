const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
  url: {
    type: String,
    required: [true, "Url is required*"],
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "user",
    required: true,
  },
});

const Link = mongoose.model("link", linkSchema);

module.exports = Link;

const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
  walletAddress: {
    type: String,
    required: [true, "Wallet Address is required*"],
  },
});

const Wallet = mongoose.model("wallet", walletSchema);

module.exports = Wallet;

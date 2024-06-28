const mongoose = require("mongoose");
const productData = require("./product");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  bankdetails: {
    accno: {
      type: Number,
      required: true,
    },
    ifsc: {
      type: String,
      required: true,
    },
    bname: {
      type: String,
      required: true,
    },
  },
  address: {
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "productData" }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);

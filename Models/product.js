const mongoose = require("mongoose");
const user = require("./user");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productDetails: {
    type: String,
    required: true,
  },
  expectedPrice: {
    type: Number,
    required: true,
  },
  working: {
    type: String,
    required: true,
  },
  damage: {
    type: String,
    required: true,
  },
  damageDetails: {
    type: String,
    required: false,
  },
  customerName: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: Number,
    required: true,
  },
  emailId: {
    type: String,
    required: true,
  },
  pickupAddress: {
    type: String,
    required: true,
  },
  accountHolderName: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: Number,
    required: true,
  },
  bankName: {
    type: String,
    required: true,
  },
  ifscCode: {
    type: String,
    required: true,
  },
  photos: [
    {
      filename: {
        default: "images/i1.jpg",
        type: String,
        required: true,
      },
      path: {
        default: "images/i1.jpg",
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  offeredPrice: {
    type: String,
    required: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    enum: ["pending", "rejected", "sold"],
    default: "pending",
    required: true,
  },
  invoice: {
    filename: {
      type: String,
      required: false,
    },
    path: {
      type: String,
      required: false,
    },
  },
});

module.exports =
  mongoose.models.Product || mongoose.model("productData", productSchema);

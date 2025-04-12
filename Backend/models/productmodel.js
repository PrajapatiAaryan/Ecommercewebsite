const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    titleDescription: {
      type: String,
      required: true,
      trim: true,
    },
    stars: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    actualPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    offerPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    shortDescription: {
      type: String,
      required: true,
      trim: true,
    },
    color: {
      type: [String], // Array of color names
      default: [],
    },
    availableSizes: {
      type: [String], // Array of sizes (e.g., ["S", "M", "L"])
      default: [],
    },
    image: {
      type: String, // URL or file path
    },
    longDescription: {
      type: String,
      trim: true,
    },
    additionalInformation: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      required: true, // Ensuring every product has a category
      trim: true,
    },
    subcategory: {
      type: String,
      required: true, // Ensuring every product has a subcategory
      trim: true,
    },
    reviews: {
      type: [
        {
          user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to user model
          rating: { type: Number, min: 1, max: 5, required: true },
          comment: { type: String, trim: true },
          createdAt: { type: Date, default: Date.now },
        },
      ],
      default: [],
    },
  },
  { timestamps: true } // Adds createdAt & updatedAt fields automatically
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;

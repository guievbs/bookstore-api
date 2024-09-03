const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
      required: true,
    },
    genre: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", BookSchema);

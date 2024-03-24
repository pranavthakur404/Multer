const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  images: [{ type: String }],
});

module.exports = mongoose.model("product", productSchema);

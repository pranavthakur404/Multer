const express = require("express");
const router = express.Router();
const upload = require("../config/multer");

// models
const Product = require("../models/product");

// defining routes
const cpUpload = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "images", maxCount: 8 },
]);

router.post("/upload", cpUpload, async (req, res) => {
  try {
    const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
    const fileName = `${basePath}${req.files["image"][0].filename}`;
    let filesPath = [];
    req.files["images"].map((list) => {
      filesPath.push(`${basePath}${list.filename}`);
    });

    if (!(fileName || filesPath)) {
      return res.status(404).json({
        success: false,
        message: "Photos required",
      });
    }

    const product = new Product({
      image: fileName,
      images: filesPath,
    });

    const response = await product.save();
    res.status(201).json({ success: true, response });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong while uploading image",
    });
  }
});

module.exports = router;

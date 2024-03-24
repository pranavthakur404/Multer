const express = require("express");
const app = express();
require("dotenv").config();

// mount router
const productRouter = require("./routes/product");
app.use("/api/v1", productRouter);

// database connection
const dbConnect = require("./config/database");
dbConnect();

app.get("/", (req, res) => {
  res.send("Multer server started");
});

app.listen(process.env.PORT, () => {
  console.log("Server started");
});

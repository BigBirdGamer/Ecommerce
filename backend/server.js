require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000
const MONGO_URI = process.env.MONGO_URI;
const products = require("./data/products");



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose.connection.on("error", (err) => {
    console.log(err.message + "is Mongod not running");
  });
  mongoose.connection.on("disconnect", () => {
    console.log("mongo not running");
  });
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
  });
  mongoose.connection.once("open", () => {
    console.log("connected to Mongoose");
  });
  

  const userController  = require("./controllers/userController");
  const productController = require("./controllers/productController");
  app.use("/api/user" , userController);
  app.use("/api/product" , productController);



app.listen(PORT, console.log(`server listening on port ${PORT}`));

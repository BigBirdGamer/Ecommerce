require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
const colors = require("colors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ERROR IF CANNOT CONNECT TO DB
mongoose.connection.on("error", (err) => {
  console.log(err.message + "is Mongod not running".red.bold);
});

// CONNECT TO DB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
});

// MESSAGE IF CONNECTED
mongoose.connection.once("open", () => {
  console.log("connected to Mongoose".cyan);
});

// USER CONTROLLER
const usersController = require("./controllers/usersController");
app.use("/api/users", usersController);

// PRODUCT CONTROLLER
const productController = require("./controllers/productController");
app.use("/api/products", productController);

// ORDER CONTROLLER
const orderController = require("./controllers/orderController");
app.use("/api/orders", orderController);

// SEEDER
const seeder = require("./seeder");
app.use("/api/seeder", seeder);

// PAYPAL
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

// CUSTOM ERROR HANDLER USED WITH ASYNC HANDLER
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

// CUSTOM ERROR HANDLER
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.send({
    message: err.message,
  });
});

app.listen(PORT, console.log(`server listening on port ${PORT}`.yellow.bold));

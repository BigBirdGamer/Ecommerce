//  using users in line 18 did not work properly. Error . Validation Failed
// const users = require("./data/users");
const products = require("./data/products");
const express = require("express");
const router = express.Router();
const colors = require("colors");
const Product = require("./models/productModel");
const Users = require("./models/userModel");
const Order = require("./models/orderModel");
const bcrypt = require("bcrypt");

router.post("/seedData", async (req, res) => {
  try {
    await Order.deleteMany();
    await Users.deleteMany();
    await Product.deleteMany();

    const createdUsers = await Users.create(
      {
        name: "Admin User",
        email: "admin@example.com",
        password: bcrypt.hashSync("1234", 10),
        isAdmin: true,
      },
      {
        name: "Lucas Lee",
        email: "lucas@example.com",
        password: bcrypt.hashSync("1234", 10),
      },
      {
        name: "Lucy Lee",
        email: "lucy@example.com",
        password: bcrypt.hashSync("1234", 10),
      }
    );

    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });
    Product.insertMany(sampleProducts);

    res.send(console.log("DATA CREATED".green.bold));
  } catch (error) {
    console.log(`${error}`.red.bold);
  }
});

router.delete("/deleteData", async (req, res) => {
  try {
    await Order.deleteMany();
    await Users.deleteMany();
    await Product.deleteMany();
    res.send(console.log("DATA DELETED".red.bold));
  } catch (error) {
    console.log(`${error}`.red.bold);
  }
});

module.exports = router;

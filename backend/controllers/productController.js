const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");
const admin = require("../authentication/adminAuth");
const protect = require("../authentication/authMiddleware");

// Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers.
const asyncHandler = require("express-Async-Handler");

// FETCH ALL PRODUCTS
// Public Route
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const product = await Product.find();
    res.send(product);
  })
);

// FETCH BY ID
// Public Route
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404);
      // throw to custom error handler
      throw new Error("Product not found");
    }
  })
);

// DELETE ONE Product
// PROTECTED / ADMIN
router.delete(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (product) {
      await product.remove();
      res.send({ message: "Product removed successfully" });
    } else {
      res.status(404);
      throw new Error("product Not Found");
    }
  })
);

// Create a new Product
//  PROTECTED / ADMIN
router.post(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const product = new Product({
      name: "Sample name",
      price: 0,
      user: req.user._id,
      image: "/images/sample.jpg",
      brand: "Sample brand",
      category: "Sample category",
      countInStock: 0,
      numReviews: 0,
      description: "Sample description",
    });

    const createdProduct = await product.save();
    res.status(201).send(createdProduct);
  })
);

// UPDATE A PRODUCT
// PROTECTED / ADMIN
router.put(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } =
      req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name;
      product.price = price;
      product.description = description;
      product.image = image;
      product.brand = brand;
      product.category = category;
      product.countInStock = countInStock;

      const updatedProduct = await product.save();
      res.send(updatedProduct);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);

// Create a Review
// protect

router.post(
  "/:id/reviews",
  protect,
  asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Product has already been reviewed by you");
      }

      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);

      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: "Review added" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);

module.exports = router;

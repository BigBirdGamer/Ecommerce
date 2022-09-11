const { request } = require("express");
const express = require("express");
const router = express.Router();
const asyncHandler = require("express-Async-Handler");
const protect = require("../authentication/authMiddleware");
const Order = require("../models/orderModel");
const admin = require("../authentication/adminAuth");

// Get Current User Order
// Protected
router.get(
  "/myorders",
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.find({ user: req.user._id });
    res.send(order);
  })
);

// Get ALL ORDER
// PROTECTED/ ADMIN
router.get(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const orders = await Order.find().populate("user", " id name");
    res.send(orders);
  })
);

// Get Order by ID
// Protected
router.get(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (order) {
      res.send(order);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  })
);

// Update order to paid
// protected
router.put(
  "/:id/pay",
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };
      const updatedOrder = await order.save();

      res.send(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  })
);

// Create order
// Protect Route
router.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error("No order items");
      return;
    } else {
      const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      const createdOrder = await order.save();

      res.status(201).json(createdOrder);
    }
  })
);

// Update order to delivered
//  Protect /Admin
router.put(
  "/:id/deliver",
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();

      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  })
);

module.exports = router;

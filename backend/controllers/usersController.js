const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const generateToken = require("../authentication/authToken");
const protect = require("../authentication/authMiddleware");
const admin = require("../authentication/adminAuth");

// Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers.
const asyncHandler = require("express-Async-Handler");

// Get All Users
// PROTECTED /ADMIn
router.get(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send(users);
  })
);

// Update you profile
// PROTECTED
router.get(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error("No user found");
    }
  })
);

// LOGIN
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user?.password))) {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  })
);
//  REGISTER
router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const exist = await User.findOne({ email });
    if (exist) {
      res.status(400);
      throw new Error(" User already exists");
    }

    const hashUser = await User.create({
      ...req.body,
      password: await bcrypt.hash(req.body.password, 10),
    });

    if (hashUser) {
      res.status(201).send({
        _id: hashUser._id,
        name: hashUser.name,
        email: hashUser.email,
        isAdmin: hashUser.isAdmin,
        token: generateToken(hashUser._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid data");
    }
  })
);

// GET USER BY ID
//  PROTECTED /ADMIN
router.get(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");

    if (user) {
      res.send(user);
    } else {
      res.status(404);
      throw new Error("No user found");
    }
  })
);

// UPDATE USER PROFILE
// PROTECTED
router.put(
  "/update",
  protect,
  asyncHandler(async (req, res, next) => {
    const { _id } = req.user;
    const user = await User.findById(_id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 10);
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      throw new Error("User not found");
    }
  })
);

// ADMIN UPDATE USER
// PROTECTED/ ADMIN
router.put(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isAdmin =
        req.body.isAdmin == undefined ? user.isAdmin : req.body.isAdmin;

      const updatedUser = await user.save();

      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error("No user found");
    }
  })
);

// DELETE ONE USER
// PROTECTED / ADMIN
router.delete(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user) {
      await user.remove();
      res.send({ message: "User removed successfully" });
    } else {
      res.status(404);
      throw new Error("User Not Found");
    }
  })
);
module.exports = router;

const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const { protect } = require("../middleware/authMiddleware");
const userModel = require("../models/userModel");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const router = express.Router();

router.get("/", (req, res) => {
  res.send("test");
});

router.get("/profile", protect, async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    throw new Error("User not found");
  }
});

// router.put("/profile", protect, async (req, res) => {
//   const {_id} = req.user
//   const user = await User.findById(_id);
//   if (user) {
//     user.name = req.body.name || user.name;
//     user.email = req.body.email || user.email;
//     if (req.body.password) {
//       user.password = bcrypt.hashSync(req.body.password, 10);
//     }
//     const updatedUser = await user.save({
//       _id: _id._id,
//       name: updatedUser.name,
//       email: updatedUser.email,
//       isAdmin: updatedUser.isAdmin,
//       token: generateToken(updatedUser._id),
//     });
//   } else {
//     throw new Error("User not found");
//   }
// });

router.put("/profile", protect, async (req, res) => {
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
});

router.post("/register", async (req, res) => {
  const { email } = req.body;
  const checkEmail = await User.findOne({ email: email });
  if (checkEmail) {
    throw new Error("User alredy exist");
  } else {
    try {
      const hashedUser = {
        ...req.body,
        password: await bcrypt.hash(req.body.password, 10),
      };
      const user = await User.create(hashedUser);
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        data: "Successfully registered",
      });
    } catch (err) {
      console.log(err);
    }
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user && (await bcrypt.compare(password, user?.password))) {
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    throw new Error(" User not found");
  }
});

router.post("/seed", async (req, res) => {
  try {
    const user = await User.create(
      {
        name: "Admin User",
        email: "admin@example.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true,
      },
      {
        name: "John Doe",
        email: "john@example.com",
        password: bcrypt.hashSync("123456", 10),
      },
      {
        name: "Jane Doe",
        email: "jane@example.com",
        password: bcrypt.hashSync("123456", 10),
      }
    );
    res.send(user);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;

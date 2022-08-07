// Modules import
const express = require("express");
const bcrypt = require("bcrypt");
const { v4: uuid4 } = require("uuid");
const validate = require("uuid-validate");
const nodemailer = require("nodemailer");
const sendEmail = require("./email");
var bodyparser = require("body-parser");

// Router initialization
const router = express.Router();
// router.use(bodyparser.urlencoded({ extended: false }))

// // parse application/json
// router.use(bodyparser.json())

// Models import
const Memory = require("../models/memories");
const User = require("../models/users");
const Otp = require("../models/otp");

// URL parsing

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
// router.use(bodyparser.json());

// api root [Not to be implemented]
router.get("/", (req, res) => {
  res.send("API call successful!");
});

// User Login
router.post("/login", async (req, res) => {
  const userName = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({ email: userName });
  if (user) {
    const validPass = await bcrypt.compare(password, user.password);
    if (validPass) {
      const mems = await Memory.find({ uid: user["userId"] });
      res.json({
        success: true,
        message: "Login Successful",
        uid: user.userId,
        memories: mems,
      });
    } else {
      res.json({ success: false, message: "Invalid Password" });
    }
  } else {
    res.json({
      success: false,
      message: "User doesn't exist. Try again with other credentials.",
    });
  }
});

// Profile page
router.post("/homepage", async (req, res) => {
  const uid = req.body.uuid;
  if (validate(uid)) {
    const user = await User.findOne({ userId: uid });
    if (user) {
      const mems = await Memory.find({ uid: uid });
      res.json({ user: user, memories: mems });
    } else {
      res.json({ message: "Invalid user!" });
    }
  } else {
    res.json({ message: "Invalid UID" });
  }
});

// User registration
router.post("/register", async (req, res) => {
  const userId = uuid4();
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  const user = new User({
    userId: userId,
    email: req.body.email,
    name: req.body.name,
    password: hashedPass,
  });
  await user
    .save()
    .then((result) =>
      res.json({ success: true, message: "User Created Successfully" })
    )
    .catch((err) => {
      if (err && err.code === 11000)
        res.json({
          success: false,
          message: "User Already exists! Try with other email.",
        });
      else console.log("Error in register : ", err);
    });
});

// Forgot password [Generate OTP]
router.post("/getotp", async (req, res) => {
  const email = req.body.email;
  console.log("email", email);

  const user = await User.findOne({ email: email });
  console.log(user);
  if (user) {
    const theOtp = Math.floor(
      Math.random() * (999999 - 100000) + 100000
    ).toString();
    const userOtp = await Otp.findOne({ email: email });
    if (userOtp) {
      userOtp.otp = theOtp;
      await userOtp.save();
    } else {
      const otp = new Otp({
        email: email,
        otp: theOtp,
      });
      await otp.save();
    }
    if (sendEmail(email, theOtp)) {
      res.json({ success: true, message: "Mail sent successfully" });
    } else {
      res.json({
        success: false,
        message: "Mail not sent. Try again after sometime.",
      });
    }
  } else {
    res.json({
      success: false,
      message: "No user found with the given email.",
    });
  }
});

// Forgot password [Set Password]
router.post("/setpassword", async (req, res) => {
  const email = req.body.email;
  const theOtp = req.body.otp;
  const password = req.body.password;
  const userOtp = await Otp.findOne({ email: email });
  if (userOtp) {
    if (userOtp.otp === theOtp) {
      const user = await User.findOne({ email: email });
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(password, salt);
      user.password = hashedPass;
      await user.save();
      userOtp.otp = null;
      await userOtp.save();
      res.json({ success: true, message: "New password saved Successfully" });
    } else {
      res.json({
        success: false,
        message: "The OTP you have entered is wrong",
      });
    }
  } else {
    res.json({ success: false, message: "No details found!" });
  }
});

// Create a memory
router.post("/memory/create", async (req, res) => {
  const uid = req.body.uuid;
  if (validate(uid)) {
    const user = await User.findOne({ userId: uid });
    if (user) {
      const newMem = new Memory({
        uid: uid,
        date: req.body.date,
        title: req.body.title,
        content: req.body.content,
      });
      await newMem
        .save()
        .then((result) => {
          res.json({ success: true, message: "Data Saved Successfully" });
        })
        .catch((err) => {
          console.log("Error da : ", err);
        });
    } else {
      res.json({ success: false, message: "Invalid User deatils." });
    }
  } else {
    res.json({ success: false, message: "Invalid UID" });
  }
});

module.exports = router;

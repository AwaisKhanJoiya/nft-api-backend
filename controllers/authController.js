const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Coupon = require("../models/coupons");
const Wallet = require("../models/Wallet");
const Link = require("../models/Link");
const coupons = require("../codes");

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  // incorrect email
  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  // incorrect password
  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = "that email is already registered";
    return errors;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "net ninja secret", {
    expiresIn: maxAge,
  });
};

// controller actions
module.exports.signup_get = (req, res) => {
  res.render("signup");
};

module.exports.login_get = (req, res) => {
  res.render("login");
};

module.exports.signup_post = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  console.log(email, password);

  try {
    const user = await User.create({ email, password, firstName, lastName });
    const token = createToken(user._id);
    // res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user, token });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    // res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user, token });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.logout_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

module.exports.coupons_get = async (req, res) => {
  console.log("route hit");

  try {
    const user = await Coupon.create({ coupons: coupons });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.checkCoupon = async (req, res) => {
  // console.log()
  const code = req.body.reedomCoupon;

  try {
    const response = await Coupon.findOne({ reedeemed_coupons: code });
    if (response) {
      return res
        .status(500)
        .json({ error: "This code is expired/already used!" });
    }
    const coupon = await Coupon.findOne({ coupons: code });
    if (!coupon) {
      return res.status(500).json({ error: "Invalid Coupon Code!" });
    }
    const data = await Coupon.findOneAndUpdate(
      { coupons: code },
      { $push: { reedeemed_coupons: code } }
    );
    if (data) {
      // Users.findOneAndUpdate({name: req.user.name}, {$push: {friends: friend}});
      res.json({ data: data });
    } else {
      return res.status(500).json({ error: "Invalid Coupon Code!" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports.addWallet = async (req, res) => {
  const walletAddress = req.body.walletAddress;
  try {
    const wallet = await Wallet.create({ walletAddress });
    res.status(201).json({ wallet: wallet._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};
module.exports.addNftPoints = async (req, res) => {
  const id = req.body.id;
  try {
    const user = await User.findOneAndUpdate(
      { _id: id },
      { nftPoints: req.body.points }
    );
    res.status(201).json({ user });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.addLink = async (req, res) => {
  const url = req.body.url;
  const user = req.body.user;
  try {
    const link = await Link.create({ url, user });
    res.status(201).json({ link: link._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

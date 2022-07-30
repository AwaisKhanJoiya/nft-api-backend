const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req, res) => {
  // console.log("Checking beta..")
  const token = req.body.token;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'net ninja secret', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.status(400).json({status: "bad auth"});
      } else {
        // console.log(decodedToken);
        res.status(200).json({status: "good auth", decodedToken})
        // next();
      }
    });
  } else {
    res.status(400).json({status: "bad auth"});
  }
};

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'net ninja secret', async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};


module.exports = { requireAuth, checkUser };
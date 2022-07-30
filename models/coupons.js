const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({

  reedeemed_coupons: {
    type: Array
  },
  coupons: {
    type: Array
  }
});

const Coupon = mongoose.model('coupon', couponSchema);

module.exports = Coupon;
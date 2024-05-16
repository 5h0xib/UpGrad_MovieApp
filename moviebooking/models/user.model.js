const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userid: {type: Number,require: true,unique: true,},
  email: {type: String,require: true,unique: true,toLowerCase: true,},
  first_name: {type: String,require: true,},
  last_name: {type: String,require: true,},
  username: {type: String,require: true,},
  contact: {type: String,require: true,},
  password: {type: String,require: true,},
  role: {type: String,default: "user",},
  isLoggedIn: {type: Boolean,default: false,},
  uuid: {type: String,},
  accesstoken: {type: String,},
  coupens: {type: Array,},
  bookingRequests: [
    {
      reference_number: {type: Number,},
      coupon_code: {type: Number,},
      show_id: {type: Number,},
      tickets: [],
    },
  ],
});

module.exports = mongoose.model('User', userSchema);

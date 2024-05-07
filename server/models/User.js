const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartItemSchema = new Schema({
  image: String,
  title: String,
  price: Number,
  description: String,
  _id: String, 
});

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    password: String,
    cart: [cartItemSchema],
  },
  { timestamps: true, versionKey: false }
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;

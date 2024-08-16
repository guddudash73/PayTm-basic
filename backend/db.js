const express = require("express");
const mongoose = require("mongoose");
const { Schema } = require("zod");

mongoose.connect(
  "mongodb+srv://guddudash73:guddu%402303@paytm.lncxw.mongodb.net/users"
);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minLength: 3,
    maxLength: 30,
    trim: true,
    unique: true,
    require: true,
    lowercase: true,
  },
  password: {
    type: String,
    minLength: 6,
    require: true,
  },
  firstName: {
    type: String,
    maxLength: 50,
    trim: true,
    require: true,
  },
  lastName: {
    type: String,
    maxLength: 50,
    trim: true,
    require: true,
  },
});

const accountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true }, //ref to User model accessing _id from the user model
  balance: { type: Number, require: true },
});

const User = mongoose.model("users", userSchema);
const Account = mongoose.model("Account", accountSchema);
module.exports = {
  User,
  Account,
};

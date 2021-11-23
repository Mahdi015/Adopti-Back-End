const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const PetSchema = mongoose.Schema(
  {
    qs1: {
      type: String,
    },
    qs2: {
      type: String,
      enum: ["Yes", "No"],
    },
    qs3: {
      type: String,
    },
    qs4: {
      type: String,
    },
    qs6: {
      type: String,
      enum: ["Yes", "No"],
    },
    qs7: {
      type: String,
      enum: ["Yes", "No"],
    },
    qs8: {
      type: String,
      enum: ["Yes", "No"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    petname: {
      type: String,
      trim: true,
    },
    breed: {
      type: String,
      trim: true,
    },
    petgender: {
      type: String,
      trim: true,
    },
    petage: {
      type: String,
      trim: true,
    },
    petcolor: {
      type: String,
      trim: true,
    },
    coatlength: {
      type: String,
      trim: true,
    },
    pics: {
      type: Array,
    },
    petstory: {
      type: String,
      trim: true,
    },
    petdiet: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    petlove: {
      type: Number,
      default: 0,
    },
    zipcode: {
      type: Number,
    },
    loveArray: [
      {
        lovedBy: { type: ObjectId, ref: "User" },
      },
    ],
    reviewStatus: {
      type: String,
      default: "Waiting Review",
      enum: ["Waiting Review", "Approved", "Cancelled"],
    },
    postedBy: [{ type: ObjectId, ref: "User" }],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Pet", PetSchema);

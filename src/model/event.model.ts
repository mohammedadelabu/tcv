import bcrypt from "bcrypt";
import express, { NextFunction, Response, Request } from "express";
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: String,
  description:String,
  category: { type: String },
  date: {
    type: Date,
  },
  isVirtual: Boolean,
  address: String,
});


export default mongoose.model("Event", eventSchema);

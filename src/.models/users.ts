/** @format */

import mongoose from "mongoose";

const model = new mongoose.Schema({
  Nome: { type: String, required: true },
  Email: { type: String, required: true },
  JWT: { type: String, default: "" },
  Password: { type: String, required: true },
  Privilege: { type: Number, default: 0 },
  Trys: [
    {
      Ip: String,
      Date: { type: Date, default: Date.now() },
    },
  ],
  Data_cadastro: { type: Date, default: Date.now() },
});

export const users = mongoose.model("users", model);

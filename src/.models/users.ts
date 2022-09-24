/** @format */

import mongoose from "mongoose";

const model = new mongoose.Schema({
  Nome: String,
  Email: String,
  JWT: { type: String, default: "" },
  Password: String,
  Confirm: String,
  Privilege: { type: String, default: 0 },
  trys: [
    {
      ip: String,
      times: Number,
    },
  ],
  Data_cadastro: { type: Date, default: Date.now() },
});

export const users = mongoose.model("users", model);

/** @format */

import mongoose from "mongoose";



const model = new mongoose.Schema({
  Nome: String,
  Email: String,
  JWT: { type: String, default: "" },
  Password: String,
  Privilege: { type: String, default: 0 },
  Trys: [
    {
      Ip: String,
      Date: { type: Date, default: Date.now() },
    },
  ],
  Data_cadastro: { type: Date, default: Date.now() },
});

export const users = mongoose.model("users", model);

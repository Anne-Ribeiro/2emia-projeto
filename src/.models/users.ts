/** @format */

import mongoose from "mongoose";

let ttl = 60

const model = new mongoose.Schema({
  Nome: String,
  Email: String,
  JWT: { type: String, default: "" },
  Password: String,
  Privilege: { type: String, default: 0 },
  Trys: [
    {
      Ip: { type: String, expireAfterSeconds: ttl},
      Date: { type: Date, default: Date.now(),  expireAfterSeconds: ttl },
    },
  ] ,
  Data_cadastro: { type: Date, default: Date.now() },
});

export const users = mongoose.model("users", model);

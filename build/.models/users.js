"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const model = new mongoose_1.default.Schema({
    Nome: String,
    Email: String,
    JWT: { type: String, default: "" },
    Password: String,
    Confirm: String,
    Privilege: { type: String, default: 0 },
    Trys: [
        {
            Ip: String,
            Date: { type: Date, default: Date.now() },
        },
    ],
    Data_cadastro: { type: Date, default: Date.now() },
});
exports.users = mongoose_1.default.model("users", model);

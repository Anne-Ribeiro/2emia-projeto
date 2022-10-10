"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const model = new mongoose_1.default.Schema({
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
exports.users = mongoose_1.default.model("users", model);

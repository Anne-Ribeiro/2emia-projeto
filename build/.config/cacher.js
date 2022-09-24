"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let port = process.env.PORT_REDIS;
if (port == undefined) {
    throw console.error(` ❌ - A string da porta não pode ficar vazia`);
}
else {
    port = parseInt(port);
}
exports.redis = new ioredis_1.default({
    host: process.env.REDIS_HOST,
    //port: 10534,
    port: port,
    password: process.env.CLUSTER_REDIS,
});

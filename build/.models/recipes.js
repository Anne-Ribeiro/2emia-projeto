"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipes = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const model = new mongoose_1.default.Schema({
    Titulo: { type: String, required: true },
    Email: { type: String, required: true } /* De quem cadastrou */,
    Descricao: { type: String, required: true, maxLength: 200 },
    Tempo: Number,
    Porcoes: Number,
    Imagem: String,
    Ingredientes: (Array),
    Preparo: String,
    Alterado: { type: Boolean, default: false },
    Data_de_cadastro: { type: Date, default: Date.now() },
});
exports.recipes = mongoose_1.default.model("recipes", model);

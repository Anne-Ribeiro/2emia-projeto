/** @format */

import mongoose from "mongoose";

const model = new mongoose.Schema({
  Titulo: { type: String, required: true },
  Email: { type: String, required: true } /* De quem cadastrou */,
  Descricao: { type: String, required: true, maxLength: 200 },
  Tempo: Number,
  Porcoes: Number,
  Imagem: String,
  Ingredientes: Array<String>,
  Preparo: String,
  Alterado: { type: Boolean, default: false },
  Data_de_cadastro: { type: Date, default: Date.now() },
});

export const recipes = mongoose.model("recipes", model);

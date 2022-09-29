/** @format */

import { Express, Request, Response } from "express";
import { conexao } from "../.config/database";

import { users } from "../.models/users";
import { recipes } from "../.models/recipes";

import { verifyToken } from "./middleware/Tokens";

export default function (app: Express) {
  conexao();

  app.get("/create", function (req: Request, res: Response) {
    res.render("create.ejs");
  });

  app.post("/create", async function (req: Request, res: Response) {
    let dados = req.body;

    let consulta = await users.findOne({
      Email: dados.email,
    });

    if (consulta === null) {
      return res.send(`Não foi posível se conectar ao DB`);
    }

    try {
      let result = verifyToken({
        analise_token: dados.jwt,
        secret: consulta.JWT,
      });
    } catch (err) {
      console.error(err);
      res.send(`Erro genérico`);
    }

    let lenthP = 200;

    if (dados.descricao.length > lenthP) {
      return res.send(
        `O comprimento da descrição é maior que o permitido. ${dados.descricao.length} > ${lenthP}`,
      );
    }

    let gravar = await new recipes({
      Titulo: dados.titulo,
      Email: dados.email,
      Descricao: dados.descricao,
      Porcoes: dados.porcoes,
      Imagem: dados.imagem,
      Ingredientes: dados.ingredientes,
      Preparo: dados.preparo,
    }).save();

    res.send("ok");
  });
}

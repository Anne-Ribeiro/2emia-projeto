/** @format */

import { Express, Request, Response } from "express";
import { conexao } from "../.config/database";

import { users } from "../.models/users";
import { recipes } from "../.models/recipes";

import { verifyToken } from "./middleware/Tokens";
import DelSecret from "./middleware/DeleteSecret";

export default function (app: Express) {
  conexao();

  app.get("/create", async function (req: Request, res: Response) {
    let jwt = req.cookies.jwt;

    let email = req.cookies.email;

    let consulta = await users.findOne({
      Email: email,
    });

    if (consulta === null) {
      DelSecret(res);
      return res.send(`Não foi possivel encontrar o email ${email}`);
    }

    let result;

    try {
      result = verifyToken({
        analise_token: jwt,
        secret: consulta.JWT,
      });
    } catch (err) {
      console.error(err);
      return res.send(`Erro genérico`);
    }

    if (result.verified == false) {
      DelSecret(res);
      return res.send(`Não foi possivel assinar sua autenticação`);
    }

    console.log(req.cookies);
    res.render("create.ejs");
  });

  app.post("/create", async function (req: Request, res: Response) {
    let dados = req.body;

    let jwt = req.cookies.jwt;
    let email = req.cookies.email;

    let consulta = await users.findOne({
      Email: email,
    });

    if (consulta === null) {
      DelSecret(res);
      return res.send(`Não foi possivel encontrar o email ${email}`);
    }

    try {
      let result = verifyToken({
        analise_token: jwt,
        secret: consulta.JWT,
      });
    } catch (err) {
      console.error(err);
      DelSecret(res);
      return res.send(`Não foi possível assinar o jwt`);
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

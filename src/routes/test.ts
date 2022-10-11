/** @format */

import { Express, Request, Response, text } from "express";
import { createToken, verifyToken } from "./middleware/Tokens";
import { conexao } from "../.config/database";

export default function (app: Express) {
  app.get("/", async function (req: Request, res: Response) {
    let tk = await createToken({
      msg: "teste",
      secret: "secret",
      time: "1min",
    });

    if (tk == undefined) {
      return res.send("err");
    }

    let vef = await verifyToken({
      analise_token: tk,
      secret: "secret",
    });

    res.render("index.ejs", { tk, vef });
  });

  /*
  app.get("/r", async function (req: Request, res: Response) {
    console.log("Criar Redis:");
    console.time();

    let createR = await redis.set("hello", "world");

    console.timeEnd();

    console.log("Ler Redis:");
    console.time();
    let ReadR = await redis.get("hello");
    console.timeEnd();

    console.log("Delete Redis:");
    console.time();
    let delR = await redis.del("hello");
    console.timeEnd();

    console.log(`-----------------------------------------`);
    conexao();

    console.log("Criar Mongo:");
    console.time();

    let createM = await new teste({
      Hello: "world",
    });

    console.timeEnd();

    console.log("Ler Mongo:");
    console.time();
    let ReadM = await teste.findOne({
      Hello: "hello",
    });
    console.timeEnd();

    console.log("Update Mongo:");
    console.time();
    let update = await teste.findOneAndUpdate({
      Hello: "helo",
    });
    console.timeEnd();

    console.log("Delete Mongo:");
    console.time();
    let delM = await teste.findOneAndDelete({
      Hello: "helo",
    });
    console.timeEnd();

    res.send({
      createR,
      ReadR,
      delR,
      createM,
      ReadM,
      update,
      delM,
    });
  });*/
}

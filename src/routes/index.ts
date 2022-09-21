/** @format */

import { Express, Request, Response } from "express";
import { createToken, verifyToken } from "./middleware/Tokens";

export default function (app: Express) {
  app.get("/", async function (req: Request, res: Response) {
    let tk = await createToken({
      msg: "teste",
      secret: "secret",
      time: "5min",
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
}

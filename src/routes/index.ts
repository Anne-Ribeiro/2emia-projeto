/** @format */

import { Express, Request, Response } from "express";
import { conexao } from "../.config/database";

export default function (app: Express) {
  app.get("/", function (req: Request, res: Response) {
    res.render("index.ejs");
  });
}

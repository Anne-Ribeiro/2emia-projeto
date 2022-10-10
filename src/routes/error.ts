/** @format */

import { Express, Request, Response } from "express";

export default function (app: Express) {
  app.get("/*", function (req: Request, res: Response) {
    res.render("error.ejs");
  });
}

/** @format */

import { Express, Request, Response, NextFunction } from "express";

export default function (app: Express) {
  app.get("/dev/showcase", function (req: Request, res: Response) {
    res.render("showcase.ejs");
  });
}

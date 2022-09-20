/** @format */

import { app, port } from "./.config/server";

import { createToken, verifyToken } from "./routes/middleware/Tokens";

import { Request, Response } from "express";

app.listen(port, function () {
  console.log(`✔ - Funcionando em http://0.0.0.0:${port}`);
});

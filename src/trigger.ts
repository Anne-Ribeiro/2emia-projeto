/** @format */

import { app, port } from "./.config/server";

import { createToken, verifyToken } from "./routes/middleware/Tokens";

app.get("/", async function (req, res) {
  let token = await createToken({
    msg: "mensagem",
    secret: "segredo",
    time: "5min",
  });

  if (token == undefined) {
    return res.send("err");
  }

  let verify = await verifyToken({
    analise_token: token,
    secret: "segredo",
  });

  res.send({ token, verify });
});

app.listen(port, function () {
  console.log(`✔ - Funcionando em http://0.0.0.0:${port}`);
});

/** @format */

import { app, port } from "./.config/server";
import { conexao } from "./.config/database";

conexao();

app.listen(port, function () {
  console.log(`✔ - Funcionando em http://0.0.0.0:${port}`);
});

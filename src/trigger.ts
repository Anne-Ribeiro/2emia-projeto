/** @format */

import { app, port } from "./.config/server";

app.listen(port, function () {
  console.log(`✔ - Funcionando em http://0.0.0.0:${port}`);
});

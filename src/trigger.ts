/** @format */

import { app, port } from "./.config/server";

app.get("/", function (req, res) {
  res.send("hello");
});

app.listen(port, function () {
  console.log(`Working on http://0.0.0.0:${port}`);
});

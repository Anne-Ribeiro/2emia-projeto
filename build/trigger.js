"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./.config/server");
server_1.app.listen(server_1.port, server_1.host, function () {
    console.log(`✔ - Funcionando em http://${server_1.host}:${server_1.port}`);
});

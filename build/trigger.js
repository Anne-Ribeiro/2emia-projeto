"use strict";
/** @format */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./.config/server");
const Tokens_1 = require("./routes/middleware/Tokens");
server_1.app.get("/", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let token = yield (0, Tokens_1.createToken)({
            msg: "mensagem",
            secret: "segredo",
            time: "5min",
        });
        if (token == undefined) {
            return res.send("err");
        }
        let verify = yield (0, Tokens_1.verifyToken)({
            analise_token: token,
            secret: "segredo",
        });
        res.send({ token, verify });
    });
});
server_1.app.listen(server_1.port, function () {
    console.log(`✔ - Funcionando em http://0.0.0.0:${server_1.port}`);
});

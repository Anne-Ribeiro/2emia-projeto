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
const Tokens_1 = require("./middleware/Tokens");
function default_1(app) {
    app.get("/", function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let tk = yield (0, Tokens_1.createToken)({
                msg: "teste",
                secret: "secret",
                time: "5min",
            });
            if (tk == undefined) {
                return res.send("err");
            }
            let vef = yield (0, Tokens_1.verifyToken)({
                analise_token: tk,
                secret: "secret",
            });
            res.render("index.ejs", { tk, vef });
        });
    });
}
exports.default = default_1;

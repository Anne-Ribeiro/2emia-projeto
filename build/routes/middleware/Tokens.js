"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function createToken(tkparam) {
    /* Exportando a função como padrão */
    try {
        let token = jsonwebtoken_1.default.sign({
            id: tkparam.msg,
        }, tkparam.secret, { expiresIn: tkparam.time });
        console.log(token);
        return token;
    }
    catch (err) {
        console.error(`❌ - Não foi possivel criar um token válido: ${err}`);
        return;
    }
}
exports.createToken = createToken;
function verifyToken(tkparam) {
    try {
        let token = jsonwebtoken_1.default.verify(tkparam.analise_token, tkparam.secret);
        console.log(token);
        return token;
    }
    catch (err) {
        console.error(`❌ - Não foi possivel criar um token válido: ${err}`);
        return;
    }
}
exports.verifyToken = verifyToken;

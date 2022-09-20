/** @format */

"use strict";
/** @format */
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = (tkparam) => {
  /* Exportando a função como padrão */
  try {
    let token = jsonwebtoken_1.default.sign(
      {
        id: tkparam.msg,
      },
      tkparam.secret,
      { expiresIn: tkparam.time },
    );
    console.log(token);
    return token;
  } catch (err) {
    console.error(`Não foi possivel criar um token válido: ${err}`);
    return;
  }
};

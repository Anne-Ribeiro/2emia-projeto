/** @format */

"use strict";
/** @format */
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.conexao = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(
  require("dotenv"),
); /* Importando leitor de variáveis de ambiente*/
dotenv_1.default.config(); /* Configurando o leitor */
const conexao = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    let localdb =
      "mongodb://localhost/reddito-teste"; /* Banco de Dados Local */
    let conexao_string = process.env.CONEXAO_STRING || localdb;
    /* Pega a variável de ambiente e se não conseguir utiliza a env local */
    if (process.env.Node_env == "test" && conexao_string == localdb) {
      throw console.error(
        `$ ❌ {process.env.Node_env} - Falta de string de conexão ou utilização de banco de dados no ambiente de produção`,
      );
    } /* Checa o ambiente de produção e se ele está utilizando o db local e quando verdadeiro para a execução do programa */
    const mongodb = yield mongoose_1.default.connect(conexao_string, () => {
      console.log(
        `✔ - Mongo DB conectado com sucesso`,
      ); /* Conecta ao Mongo DB e printa um log na tela */
    });
  });
exports.conexao = conexao;

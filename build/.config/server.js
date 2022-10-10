"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.port = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet")); /* Lib pra proteger o site contra vunerabilidades conhecidas, recomendado pela documentação: https://expressjs.com/pt-br/advanced/best-practice-security.html */
const compression_1 = __importDefault(require("compression")); /* Lib pra melhorar a performace com o gzip comprimindo dados, recomendado pela documentação: https://expressjs.com/pt-br/advanced/best-practice-performance.html*/
const cookie_parser_1 = __importDefault(require("cookie-parser")); /* Lib para trabalhar com cookies para aumentar a segurança */
/* Importando Rotas manuamente */
const test_1 = __importDefault(require("../routes/test"));
const registro_1 = __importDefault(require("../routes/registro"));
const login_1 = __importDefault(require("../routes/login"));
const recipes_1 = __importDefault(require("../routes/recipes"));
const error_1 = __importDefault(require("../routes/error"));
const app = (0, express_1.default)(); /* Instanciando o express */
exports.app = app;
const port = process.env.PORT || 7777; /* Definindo a porta de execução */
exports.port = port;
app.use((0, helmet_1.default)()); /* Utilizando a lib do helmet */
app.use((0, compression_1.default)()); /* Utilizando a lib compression */
app.use((0, cookie_parser_1.default)()); /* Utilizando a lib cookieParser */
app.set("views", "./src/EJS"); /* Alterando a pasta padrão views para a EJS */
app.use(express_1.default.urlencoded({ extended: false })); /* Setando um parseador de Json */
let statics = [
    app.use(express_1.default.static("./src/assets")) /* Setando a pasta assets para servir arquivos estáticos */,
];
let routes = [
    (0, test_1.default)(app),
    (0, registro_1.default)(app),
    (0, login_1.default)(app),
    (0, recipes_1.default)(app),
    (0, error_1.default)(app),
]; /* Executando todas a rotas e passando o express para cada uma */

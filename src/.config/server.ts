/** @format */

import express from "express";
import helmet from "helmet"; /* Lib pra proteger o site contra vunerabilidades conhecidas, recomendado pela documentação: https://expressjs.com/pt-br/advanced/best-practice-security.html */
import compression from "compression"; /* Lib pra melhorar a performace com o gzip comprimindo dados, recomendado pela documentação: https://expressjs.com/pt-br/advanced/best-practice-performance.html*/

/* Importando Rotas manuamente */
import index from "../routes/test";
import showcase from "../routes/showcase";
import registro from "../routes/registro";
import login from "../routes/login";

const app = express(); /* Instanciando o express */
const port = process.env.PORT || 7777; /* Definindo a porta de execução */

app.use(helmet()); /* Utilizando a lib do helmet */
app.use(compression()); /* Utilizando a lib compression */

app.set("views", "./src/EJS"); /* Alterando a pasta padrão views para a EJS */

app.use(
  express.urlencoded({ extended: false }),
); /* Setando um parseador de Json */

let statics = [
  app.use(
    express.static("./src/assets"),
  ) /* Setando a pasta assets para servir arquivos estáticos */,
];

let routes = [
  index(app),
  showcase(app),
  registro(app),
  login(app),
]; /* Executando todas a rotas e passando o express para cada uma */

export { app, port }; /* Exportando variáveis */

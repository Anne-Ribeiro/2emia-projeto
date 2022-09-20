/** @format */

import express from "express";
import helmet from "helmet"; /* Lib pra proteger o site contra vunerabilidades conhecidas, recomendado pela documentação: https://expressjs.com/pt-br/advanced/best-practice-security.html */
import compression from "compression"; /* Lib pra melhorar a performace com o gzip comprimindo dados, recomendado pela documentação: https://expressjs.com/pt-br/advanced/best-practice-performance.html*/

const app = express(); /* Instanciando o express */
const port = process.env.PORT || 7777; /* Definindo a porta de execução */

app.use(helmet()); /* Utilizando a lib do helmet */
app.use(compression()); /* Utilizando a lib compression */

app.use(
  express.urlencoded({ extended: false }),
); /* Setando um parseador de Json */

app.set("views", "EJS"); /* Alterando a pasta padrão views para a EJS */
app.use(
  express.static("./assets"),
); /* Setando a pasta assets para servir arquivos estáticos */

export { app, port }; /* Exportando variáveis */

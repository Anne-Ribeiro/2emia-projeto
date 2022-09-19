/** @format */

import express from "express";
import helmet from "helmet"; /* Lib pra proteger o site contra vunerabilidades conhecidas, recomendado pela documentação: https://expressjs.com/pt-br/advanced/best-practice-security.html */
import compression from "compression"; /* Lib pra melhorar a performace com o gzip comprimindo dados, recomendado pela documentação: https://expressjs.com/pt-br/advanced/best-practice-performance.html*/

const app = express(); /* Instanciando o express */
const port = process.env.PORT || 7777; /* Definindo a porta de execução */

app.use(helmet()); /* Utilizando a lib do helmet */
app.use(compression()); /* Utilizando a lib compression */

app.use(express.urlencoded({ extended: false }));

app.set("views", "EJS");
app.use(express.static("./assets"));

export { app, port };

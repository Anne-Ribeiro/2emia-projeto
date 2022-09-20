/** @format */

const mongoose = require("mongoose");
const dotenv = require("dotenv"); /* Importando leitor de variáveis de ambiente*/

dotenv.config(); /* Configurando o leitor */

const conexao = async () => {
  let localdb = "mongodb://localhost/reddito-teste"; /* Banco de Dados Local */

  let conexao_string = process.env.CONEXAO_STRING || localdb;
  /* Pega a variável de ambiente e se não conseguir utiliza a env local */

  if (process.env.Node_env == "test" && conexao_string == localdb) {
    throw console.error(
      `$ ❌ {process.env.Node_env} - Falta de string de conexão ou utilização de banco de dados no ambiente de produção`,
    );
  } /* Checa o ambiente de produção e se ele está utilizando o db local e quando verdadeiro para a execução do programa */

  const mongodb = await mongoose.connect(conexao_string, () => {
    console.log(
      `✔ - Mongo DB conectado com sucesso`,
    ); /* Conecta ao Mongo DB e printa um log na tela */
  });
};

module.exports = conexao;

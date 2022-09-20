/** @format */

import jwt from "jsonwebtoken";

interface createToken {
  msg: string;
  secret: string;
  time: string | number;
}

interface verifyToken {
  analise_token: string;
  secret: string;
}

export function createToken(tkparam: createToken): void | string {
  /* Exportando a função como padrão */

  try {
    let token = jwt.sign(
      {
        id: tkparam.msg,
      },
      tkparam.secret,
      { expiresIn: tkparam.time },
    );

    console.log(token);

    return token;
  } catch (err) {
    console.error(`❌ - Não foi possivel criar um token válido: ${err}`);
    return;
  }
}

export function verifyToken(tkparam: verifyToken) {
  try {
    let token = jwt.verify(tkparam.analise_token, tkparam.secret);

    console.log(token);

    return token;
  } catch (err) {
    console.error(`❌ - Não foi possivel criar um token válido: ${err}`);
    return;
  }
}

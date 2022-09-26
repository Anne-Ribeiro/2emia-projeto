/** @format */

import { Express, Request, Response } from "express";
import argon2 from "argon2";
import { conexao } from "../.config/database";
import { users } from "../.models/users";
import { createToken } from "./middleware/Tokens";
import makeSecret from "./middleware/makeSecrete";
import { DelUser } from "./middleware/DeleteSecret";

interface dados {
  email: string;
  password: string;
}

export default function (app: Express) {
  conexao();

  app.get("/login", async function (req: Request, res: Response) {
    let cas = await users.find();
    console.log(cas);
    res.render("login.ejs");
  });

  app.post("/login", async function (req: Request, res: Response) {
    let dados: dados = req.body;

    let reqIp = req.ip;

    dados.email = dados.email.trim();
    dados.password = dados.password.trim();

    let exists = await users.findOne({
      Email: dados.email,
    });

    if (exists === null) {
      return res.send(`O email ${dados.email} não está cadastrado`);
    } else if (exists.Password == null) {
      return res.send(`Um erro inesperado aconteceu`);
    }

    let times = await users.findOne(
      {
        Email: exists.Email,
      },
      [
        {
          $match: {
            $and: [
              { Date: { $gt: Date.now() - 1000, $lt: Date.now() } },
              { Ip: reqIp },
            ],
          },
        },
        { $group: { _id: null, times: { $sum: 1 } } },
      ],
    );

    console.log(`${times}`);

    let result;

    try {
      result = await argon2.verify(exists.Password, dados.password);
    } catch (err) {
      console.error(err);
      return res.send(`Um erro inesperado aconeceu`);
    }

    let secret: string | undefined = await makeSecret(50);

    if (result == true && exists.Email != undefined) {
      let token = createToken({
        msg: exists.Email,
        secret: secret,
        time: "1h",
      });

      await users.findOneAndUpdate({ Email: exists.Email }, { JWT: secret });

      console.log(secret);
      console.log(token);

      secret = undefined;

      res.send({
        dados,
      });
    } else {
      await users.findOneAndUpdate(
        {
          Email: exists.Email,
        },
        {
          $push: {
            Trys: { Ip: reqIp, Date: Date.now() },
          },
        },
      );
      return res.send(`Email e/ou senha inválidos`);
    }
  });
}

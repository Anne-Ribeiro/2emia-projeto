"use strict";
/** @format */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Tokens_1 = require("./middleware/Tokens");
function default_1(app) {
    app.get("/", function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let tk = yield (0, Tokens_1.createToken)({
                msg: "teste",
                secret: "secret",
                time: "1min",
            });
            if (tk == undefined) {
                return res.send("err");
            }
            let vef = yield (0, Tokens_1.verifyToken)({
                analise_token: tk,
                secret: "secret",
            });
            res.render("index.ejs", { tk, vef });
        });
    });
    /*
    app.get("/r", async function (req: Request, res: Response) {
      console.log("Criar Redis:");
      console.time();
  
      let createR = await redis.set("hello", "world");
  
      console.timeEnd();
  
      console.log("Ler Redis:");
      console.time();
      let ReadR = await redis.get("hello");
      console.timeEnd();
  
      console.log("Delete Redis:");
      console.time();
      let delR = await redis.del("hello");
      console.timeEnd();
  
      console.log(`-----------------------------------------`);
      conexao();
  
      console.log("Criar Mongo:");
      console.time();
  
      let createM = await new teste({
        Hello: "world",
      });
  
      console.timeEnd();
  
      console.log("Ler Mongo:");
      console.time();
      let ReadM = await teste.findOne({
        Hello: "hello",
      });
      console.timeEnd();
  
      console.log("Update Mongo:");
      console.time();
      let update = await teste.findOneAndUpdate({
        Hello: "helo",
      });
      console.timeEnd();
  
      console.log("Delete Mongo:");
      console.time();
      let delM = await teste.findOneAndDelete({
        Hello: "helo",
      });
      console.timeEnd();
  
      res.send({
        createR,
        ReadR,
        delR,
        createM,
        ReadM,
        update,
        delM,
      });
    });*/
}
exports.default = default_1;

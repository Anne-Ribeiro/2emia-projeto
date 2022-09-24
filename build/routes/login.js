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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const argon2_1 = __importDefault(require("argon2"));
const database_1 = require("../.config/database");
const users_1 = require("../.models/users");
const Tokens_1 = require("./middleware/Tokens");
const makeSecrete_1 = __importDefault(require("./middleware/makeSecrete"));
function default_1(app) {
    (0, database_1.conexao)();
    app.get("/login", function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let cas = yield users_1.users.find();
            console.log(cas);
            res.render("login.ejs");
        });
    });
    app.post("/login", function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let dados = req.body;
            dados.email = dados.email.trim();
            dados.password = dados.password.trim();
            let exists = yield users_1.users.findOne({
                Email: dados.email,
            });
            if (exists === null) {
                return res.send(`O email ${dados.email} não está cadastrado`);
            }
            else if (exists.Password == null) {
                return res.send(`Um erro inesperado aconteceu`);
            }
            let result;
            try {
                result = yield argon2_1.default.verify(exists.Password, dados.password);
            }
            catch (err) {
                console.error(err);
                return res.send(`As senhas não batem`);
            }
            let secret = yield (0, makeSecrete_1.default)(50);
            if (result == true && exists.Email != undefined) {
                let token = (0, Tokens_1.createToken)({
                    msg: exists.Email,
                    secret: secret,
                    time: "1h",
                });
                yield users_1.users.findOneAndUpdate({ Email: exists.Email }, { JWT: secret });
                console.log(secret);
                console.log(token);
                secret = undefined;
                res.send({
                    dados,
                });
            }
            else {
                res.send(`Erro`);
            }
        });
    });
}
exports.default = default_1;

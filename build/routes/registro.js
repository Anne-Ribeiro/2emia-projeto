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
const database_1 = require("../.config/database");
const argon2_1 = __importDefault(require("argon2"));
const aes_1 = __importDefault(require("crypto-js/aes"));
const users_1 = require("../.models/users");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function default_1(app) {
    (0, database_1.conexao)();
    app.get("/registro", function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let cas = yield users_1.users.find();
            console.log(cas);
            res.render("registro.ejs", {});
        });
    });
    app.post("/registro", function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let dados = req.body; /* Requisita dados do body */
            /* Remove espaços denescessários */
            dados.nome = dados.nome.trim();
            dados.email = dados.email.trim();
            dados.password = dados.password.trim();
            dados.confirm = dados.confirm.trim();
            /* Verifica se ele já está cadastrado */
            let exists = yield users_1.users.findOne({
                Email: dados.email,
            });
            if (exists != null) {
                return res.send(`O email ${dados.email} já foi cadastrado`);
            }
            if (dados.password !== dados.confirm) {
                return res.send(`A senha e sua confirmação não batem`);
            }
            /* Encripitando data crítica */
            try {
                let key = process.env.SECRET;
                if (key === undefined) {
                    throw console.error(`No bytes found`);
                }
                dados.password = yield argon2_1.default.hash(dados.password);
                dados.email = yield aes_1.default.encrypt(dados.email, key).toString();
            }
            catch (err) {
                console.error(err);
                return res.send(`Algum erro aconteceu`);
            }
            /* Efetivamente registra o usuário */
            let cadastro = yield new users_1.users({
                Nome: dados.nome,
                Email: dados.email,
                Password: dados.password,
            }).save();
            res.send(dados);
        });
    });
}
exports.default = default_1;

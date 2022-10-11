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
const users_1 = require("../.models/users");
const recipes_1 = require("../.models/recipes");
const Tokens_1 = require("./middleware/Tokens");
const DeleteSecret_1 = __importDefault(require("./middleware/DeleteSecret"));
function default_1(app) {
    (0, database_1.conexao)();
    app.get("/create", function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let jwt = req.cookies.jwt;
            let email = req.cookies.email;
            let consulta = yield users_1.users.findOne({
                Email: email,
            });
            if (consulta === null) {
                (0, DeleteSecret_1.default)(res);
                return res.send(`Não foi possivel encontrar o email ${email}`);
            }
            let result;
            try {
                result = (0, Tokens_1.verifyToken)({
                    analise_token: jwt,
                    secret: consulta.JWT,
                });
            }
            catch (err) {
                console.error(err);
                return res.send(`Erro genérico`);
            }
            if (result.verified == false) {
                (0, DeleteSecret_1.default)(res);
                return res.send(`Não foi possivel assinar sua autenticação`);
            }
            let retorno = yield recipes_1.recipes.find({ Email: email });
            console.log(retorno);
            res.render("create.ejs", { retorno });
        });
    });
    app.post("/create", function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let dados = req.body;
            let jwt = req.cookies.jwt;
            let email = req.cookies.email;
            let consulta = yield users_1.users.findOne({
                Email: email,
            });
            if (consulta === null) {
                (0, DeleteSecret_1.default)(res);
                return res.send(`Não foi possivel encontrar o email ${email}`);
            }
            try {
                let result = (0, Tokens_1.verifyToken)({
                    analise_token: jwt,
                    secret: consulta.JWT,
                });
            }
            catch (err) {
                console.error(err);
                (0, DeleteSecret_1.default)(res);
                return res.send(`Não foi possível assinar o jwt`);
            }
            let lenthP = 200;
            if (dados.descricao.length > lenthP) {
                return res.send(`O comprimento da descrição é maior que o permitido. ${dados.descricao.length} > ${lenthP}`);
            }
            try {
                let gravar = yield new recipes_1.recipes({
                    Titulo: dados.titulo,
                    Email: email,
                    Descricao: dados.descricao,
                    Porcoes: dados.porcoes,
                    Imagem: dados.imagem,
                    Ingredientes: dados.ingredientes,
                    Preparo: dados.preparo,
                }).save();
            }
            catch (err) {
                console.log(err);
                return res.send("nem todos os campos foram preenchidos");
            }
            res.redirect("/create");
        });
    });
    app.post("/update", function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let dados = req.body;
            let jwt = req.cookies.jwt;
            let email = req.cookies.email;
            let consulta = yield users_1.users.findOne({
                Email: email,
            });
            if (consulta === null) {
                (0, DeleteSecret_1.default)(res);
                return res.send(`Não foi possivel encontrar o email ${email}`);
            }
            try {
                let result = (0, Tokens_1.verifyToken)({
                    analise_token: jwt,
                    secret: consulta.JWT,
                });
            }
            catch (err) {
                console.error(err);
                (0, DeleteSecret_1.default)(res);
                return res.send(`Não foi possível assinar o jwt`);
            }
            try {
                let update = yield recipes_1.recipes.findOneAndUpdate({
                    _id: dados._id,
                    Email: email,
                }, {
                    Titulo: dados.titulo,
                    Email: email,
                    Descricao: dados.descricao,
                    Porcoes: dados.porcoes,
                    Imagem: dados.imagem,
                    Ingredientes: dados.ingredientes,
                    Preparo: dados.preparo,
                    Alterado: true,
                });
            }
            catch (err) {
                console.log(err);
                return res.send("campos essenciais não foram preenchidos");
            }
            res.redirect("/create");
        });
    });
    app.post("/delete", function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let dados = req.body;
            let jwt = req.cookies.jwt;
            let email = req.cookies.email;
            let consulta = yield users_1.users.findOne({
                Email: email,
            });
            if (consulta === null) {
                (0, DeleteSecret_1.default)(res);
                return res.send(`Não foi possivel encontrar o email ${email}`);
            }
            try {
                let result = (0, Tokens_1.verifyToken)({
                    analise_token: jwt,
                    secret: consulta.JWT,
                });
            }
            catch (err) {
                console.error(err);
                (0, DeleteSecret_1.default)(res);
                return res.send(`Não foi possível assinar o jwt`);
            }
            let del = yield recipes_1.recipes.findOneAndDelete({
                _id: dados._id,
                Email: email,
            });
            res.redirect("/create");
        });
    });
}
exports.default = default_1;

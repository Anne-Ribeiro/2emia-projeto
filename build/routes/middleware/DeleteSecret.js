"use strict";
/**
 * /* Tipos de datas recebidas
 *
 * @format
 */
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(res) {
    try {
        res.clearCookie("jwt");
        res.clearCookie("email");
        return;
    }
    catch (err) {
        console.log(`❌ - Não foi possivel limpar os campos de usuários\n\n${err}`);
    }
}
exports.default = default_1;

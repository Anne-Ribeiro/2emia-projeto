"use strict";
/**
 * /* Tipos de datas recebidas
 *
 * @format
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DelUser = void 0;
function DelUser(user) {
    try {
        delete user._id, delete user.JWT;
        delete user.Password;
        delete user.Privilege;
        return user;
    }
    catch (_a) {
        return `❌ - Não foi possivel limpar os campos de usuários`;
    }
}
exports.DelUser = DelUser;

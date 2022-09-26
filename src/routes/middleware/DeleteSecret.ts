/**
 * /* Tipos de datas recebidas
 *
 * @format
 */

interface user {
  _id?: String;
  Nome: String;
  Email: String;
  JWT?: String;
  Password?: String;
  Privilege?: Number;
  trys?: [
    {
      ip: String;
      times: Number;
    },
  ];
  Data_cadastro: Date;
}

function DelUser(user: user) {
  try {
    delete user._id, delete user.JWT, delete user.Password;
    delete user.Privilege;

    return user;
  } catch {
    return `❌ - Não foi possivel limpar os campos de usuários`;
  }
}

export { DelUser };

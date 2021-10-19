async function connect() {
  if(global.connection && global.connection.state != 'disconnected') return global.connection;

  const mysql = require("mysql2/promise");
  const connection = await mysql.createConnection({
    host: 'mysql.overflow.dev.br',
    user: 'overflow01',
    database: 'overflow01',
    password: 'overflow06042021'
  });
  console.log("Conectado ao BD!");

  global.connection = connection;

  return connection;
}

module.exports = {
  createUser: async (user) => {
    try {
      const conn = await connect();
      return await conn.query(`INSERT INTO usuario VALUES (null, "${user.name}", '${user.birthdate}', '${user.cpf}', '${user.email}', '${user.cellphone}', '${user.password}', '${user.gender}', 0, null, '${user.type}');`);
    } catch (error) {
      return error; 
    }
  },

  readUsers: async () => {
    try {
      let conn = await connect();
      return await conn.query(`SELECT * FROM usuario;`);
    } catch (error) {
      return error;
    }
  },

  updateUser: async (user, id) => {
    try {
      const conn = await connect();
      
      return await conn.query(`UPDATE usuario SET nm_usuario = "${user.name}", dt_nascimento = '${user.birthdate}', cd_cpf = '${user.cpf}', nm_email = '${user.email}', nr_celular = '${user.cellphone}', cd_senha = '${user.password}', sg_genero = '${user.gender}', nr_avaliacao = 0, nm_curriculo = null, cd_tipo = '${user.type}' WHERE cd_usuario = ${id};`);
    } catch (error) {
      return error; 
    }
  },

  deleteUser: async (id) => {
    try {
      const conn = await connect();
      
      return await conn.query(`DELETE FROM usuario WHERE cd_usuario = ${id}`);

    } catch (error) {
      return error; 
    }
  }
}
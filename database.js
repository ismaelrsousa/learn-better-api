async function connect() {
  if(global.connection && global.connection.state != 'disconnected') return global.connection;

  const mysql = require("mysql2/promise");
  // const connection = await mysql.createConnection({
  //   host: 'mysql.overflow.dev.br',
  //   user: 'overflow01',
  //   database: 'overflow01',
  //   password: 'overflow06042021'
  // });
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'learn_better_api',
    password: ''
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
  },

  createCategory: async (category) => {
    try {
      const conn = await connect();
      return await conn.query(`INSERT INTO categoria VALUES (null, "${category.name}", "${category.tags}", ${category.status}, null)`);
    } catch (error) {
      return error; 
    }
  },

  readCategory: async () => {
    try {
      let conn = await connect();
      return await conn.query(`SELECT * FROM categoria;`);
    } catch (error) {
      return error;
    }
  },

  updateCategory: async (category, id) => {
    try {
      const conn = await connect();
      
      return await conn.query(`UPDATE categoria SET nm_categoria = "${category.name}", nm_tags = "${category.tags}", cd_status = ${category.status}, cd_categoria_pai = null WHERE cd_categoria = ${id}`);
    } catch (error) {
      return error; 
    }
  },

  deleteCategory: async (id) => {
    try {
      const conn = await connect();
      
      return await conn.query(`DELETE FROM categoria WHERE cd_categoria = ${id}`);

    } catch (error) {
      return error; 
    }
  },

  createMessage: async (message) => {
    try {
      const conn = await connect();
      return await conn.query(`INSERT INTO mensagem VALUES (null, ${message.author}, ${message.destiny}, "${message.message}")`);
    } catch (error) {
      return error; 
    }
  },

  readMessage: async () => {
    try {
      let conn = await connect();
      return await conn.query(`SELECT * FROM mensagem;`);
    } catch (error) {
      return error;
    }
  },

  updateMessage: async (message, id) => {
    try {
      const conn = await connect();
      
      return await conn.query(`UPDATE mensagem SET cd_autor = ${message.author}, cd_destino = ${message.destiny}, nm_mensagem = "${message.message}" WHERE cd_mensagem = ${id}`);
    } catch (error) {
      return error; 
    }
  },

  deleteMessage: async (id) => {
    try {
      const conn = await connect();
      
      return await conn.query(`DELETE FROM mensagem WHERE cd_mensagem = ${id}`);

    } catch (error) {
      return error; 
    }
  },

  createMentory: async (mentory) => {
    try {
      const conn = await connect();
      return await conn.query(`INSERT INTO mentoria VALUES (null, ${mentory.mentor}, ${mentory.mentee}, "${mentory.start_date}", "${mentory.end_date}", ${mentory.avaliation_mentor}, ${mentory.avaliation_mentee}, ${mentory.status}, ${mentory.category})`);
    } catch (error) {
      return error; 
    }
  },

  readMentory: async () => {
    try {
      let conn = await connect();
      return await conn.query(`SELECT * FROM mentoria;`);
    } catch (error) {
      return error;
    }
  },

  updateMentory: async (mentory, id) => {
    try {
      const conn = await connect();
      
      return await conn.query(`UPDATE mentoria SET cd_mentor = ${mentory.mentor}, cd_mentorado = ${mentory.mentee}, dt_inicio = "${mentory.start_date}", dt_fim = "${mentory.end_date}", nr_avaliacao_mentor = ${mentory.avaliation_mentor}, nr_avaliacao_mentorado = ${mentory.avaliation_mentee}, cd_status = ${mentory.status}, cd_categoria = ${mentory.category} WHERE cd_mentoria = ${id}`);
    } catch (error) {
      return error; 
    }
  },

  deleteMentory: async (id) => {
    try {
      const conn = await connect();
      
      return await conn.query(`DELETE FROM mentoria WHERE cd_mentoria = ${id}`);

    } catch (error) {
      return error; 
    }
  },
}
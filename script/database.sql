DROP DATABASE if EXISTS learn_better_api;
CREATE DATABASE learn_better_api;
USE learn_better_api;

DROP TABLE IF EXISTS categoria;
CREATE TABLE categoria (
	cd_categoria INTEGER(4) AUTO_INCREMENT PRIMARY KEY,
	nm_categoria VARCHAR(200) NOT NULL,
	nm_tags VARCHAR(250),
	cd_status INT(1) NOT NULL,
	cd_categoria_pai INT(4)
);

DROP TABLE IF EXISTS usuario;
CREATE TABLE usuario (
	cd_usuario INT(4) AUTO_INCREMENT PRIMARY KEY,
	nm_usuario VARCHAR(250) NOT NULL,
	dt_nascimento DATE NOT NULL,
	cd_cpf CHAR(11) NOT NULL,
	nm_email VARCHAR(200) NOT NULL,
	nr_celular VARCHAR(11) NOT NULL,
	cd_senha VARCHAR(30) NOT NULL,
	sg_genero ENUM('m', 'f', 'n/a') NOT NULL,
	nr_avaliacao INT(1) NOT NULL DEFAULT 0,
	nm_curriculo VARCHAR(250),
	cd_tipo ENUM('mentor', 'mentorado') NOT NULL
);

DROP TABLE IF EXISTS categoria_usuario;
CREATE TABLE categoria_usuario (
	cd_categoria_usuario INT(5) AUTO_INCREMENT PRIMARY KEY,
	cd_categoria INT(4) NOT NULL,
	cd_usuario INT(4) NOT NULL,
	FOREIGN KEY (cd_categoria) REFERENCES categoria(cd_categoria),
	FOREIGN KEY (cd_usuario) REFERENCES usuario(cd_usuario)
);

DROP TABLE IF EXISTS mentoria;
CREATE TABLE mentoria (
	cd_mentoria INT(6) AUTO_INCREMENT PRIMARY KEY,
	cd_mentor INT(5) NOT NULL,
	cd_mentorado INT(5) NOT NULL,
	dt_inicio DATETIME NOT NULL,
	dt_fim DATETIME,
	nr_avaliacao_mentor INT(1),
	nr_avaliacao_mentorado INT(1),
	cd_status ENUM('1', '0') NOT NULL DEFAULT '0',
	cd_categoria INT(4),
	FOREIGN KEY (cd_mentor) REFERENCES usuario(cd_usuario),
	FOREIGN KEY (cd_mentorado) REFERENCES usuario(cd_usuario),
	FOREIGN KEY (cd_categoria) REFERENCES categoria(cd_categoria)
);

DROP TABLE IF EXISTS mensagem;
CREATE TABLE mensagem (
	cd_mensagem INT(9) NOT NULL PRIMARY KEY,
	cd_autor INT(4) NOT NULL,
	cd_destino INT(4) NOT NULL,
	FOREIGN KEY (cd_autor) REFERENCES usuario(cd_usuario),
	FOREIGN KEY (cd_destino) REFERENCES usuario(cd_usuario)
);

DROP TABLE IF EXISTS tb_log;
CREATE TABLE tb_log (
	cd_log INT(9) NOT NULL PRIMARY KEY,
	ds_log VARCHAR(250) NOT NULL,
	cd_usuario INT(4) NOT NULL,
	dt_log DATETIME NOT NULL,
	FOREIGN KEY (cd_usuario) REFERENCES usuario(cd_usuario)
);
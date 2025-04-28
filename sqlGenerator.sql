CREATE TABLE Usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255),
    idade INT,
    email VARCHAR(255),
    idNivel INT,
    facebook CHAR(255),
    instagram CHAR(255),
    youtube CHAR(255)
);

CREATE TABLE Nivel (
    id INT PRIMARY KEY AUTO_INCREMENT,
    idUsuario INT,
    NivelAcesso INT
);

CREATE TABLE Login (
    idUsuario INT PRIMARY KEY,
    senha CHAR(255),
    FOREIGN KEY (idUsuario) REFERENCES Usuario(id)
);

CREATE TABLE Receita (
    id INT PRIMARY KEY AUTO_INCREMENT,
    idUsuario INT,
    nome VARCHAR(255),
    descricao TEXT,
    favoritos INT,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(id)
);

CREATE TABLE Categoria (
    id INT PRIMARY KEY AUTO_INCREMENT,
    idReceita INT,
    tipo CHAR(255),
    FOREIGN KEY (idReceita) REFERENCES Receita(id)
);

CREATE TABLE Favorito (
    id INT PRIMARY KEY AUTO_INCREMENT,
    idUsuario INT,
    idReceita INT,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(id),
    FOREIGN KEY (idReceita) REFERENCES Receita(id)
);

CREATE TABLE Comentarios (
    idReceita INT,
    idUsuario INT,
    comentario TEXT,
    PRIMARY KEY (idReceita, idUsuario),
    FOREIGN KEY (idReceita) REFERENCES Receita(id),
    FOREIGN KEY (idUsuario) REFERENCES Usuario(id)
);

CREATE TABLE PalavrasRestritas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255)
);

CREATE TABLE imagensReceitas (
	id int primary key AUTO_INCREMENT,
    idReceita INT,
    comentario TEXT,
    FOREIGN KEY (idReceita) REFERENCES Receita(id)
);

CREATE TABLE imagensUsuarios(
	id int primary key AUTO_INCREMENT,
    idUsuario INT,
    imagem LONGTEXT,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(id)
);


ALTER TABLE Nivel
ADD CONSTRAINT fk_nivel_usuario FOREIGN KEY (idUsuario) REFERENCES Usuario(id);

ALTER TABLE Usuario
ADD CONSTRAINT fk_usuario_nivel FOREIGN KEY (idNivel) REFERENCES Nivel(id);

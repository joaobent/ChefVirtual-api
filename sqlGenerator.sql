CREATE DATABASE fslab;
use fslab;

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

-- Inserir níveis de acesso
INSERT INTO Nivel (idUsuario, NivelAcesso) VALUES 
(NULL, 1), -- Administrador
(NULL, 2), -- Usuário comum
(NULL, 3); -- Moderador

-- Inserir usuários
INSERT INTO Usuario (nome, idade, email, idNivel, facebook, instagram, youtube) VALUES 
('Alice Souza', 25, 'alice@email.com', 1, 'alice.fb', 'alice.ig', 'alice.yt'),
('Bruno Lima', 30, 'bruno@email.com', 2, 'bruno.fb', 'bruno.ig', 'bruno.yt'),
('Carla Dias', 22, 'carla@email.com', 3, 'carla.fb', 'carla.ig', 'carla.yt');

-- Atualizar idUsuario na tabela Nivel
UPDATE Nivel SET idUsuario = 1 WHERE id = 1;
UPDATE Nivel SET idUsuario = 2 WHERE id = 2;
UPDATE Nivel SET idUsuario = 3 WHERE id = 3;

-- Criar login
INSERT INTO Login (idUsuario, senha) VALUES 
(1, 'senhaAlice'),
(2, 'senhaBruno'),
(3, 'senhaCarla');

-- Inserir receitas
INSERT INTO Receita (idUsuario, nome, descricao, favoritos) VALUES 
(1, 'Bolo de Cenoura', 'Receita de bolo com cobertura de chocolate', 5),
(2, 'Lasanha de Frango', 'Lasanha com molho branco e frango desfiado', 3),
(3, 'Salada Tropical', 'Salada com frutas e folhas verdes', 2);

-- Inserir categorias
INSERT INTO Categoria (idReceita, tipo) VALUES 
(1, 'Doce'),
(2, 'Salgado'),
(3, 'Saudável');

-- Inserir favoritos
INSERT INTO Favorito (idUsuario, idReceita) VALUES 
(2, 1), 
(3, 1),
(1, 2);

-- Inserir comentários
INSERT INTO Comentarios (idReceita, idUsuario, comentario) VALUES 
(1, 2, 'Muito bom esse bolo!'),
(2, 1, 'Gostei da lasanha, bem cremosa.'),
(3, 1, 'Leve e saborosa!');

-- Inserir palavras restritas
INSERT INTO PalavrasRestritas (nome) VALUES 
('fudido'),
('merda'),
('porra');

-- Inserir imagens de receitas (URLs de pizza) //TODO - DEPOIS SERÁ O BYTE DA IMAGEM
INSERT INTO imagensReceitascategoria (idReceita, comentario) VALUES 
(1, 'https://www.guiadacozinha.com.br/wp-content/uploads/2020/03/pizza-de-calabresa.jpg'),
(2, 'https://static.itdg.com.br/images/1200-630/72b6a4263d90d1379e27c4c24d2f682a/pizza-de-mussarela.jpg'),
(3, 'https://img.freepik.com/fotos-premium/pizza-de-queijo-fatiada-na-tabua-de-madeira_93675-133258.jpg');

-- Inserir imagens dos usuários (URLs de perfil vazio) //TODO - DEPOIS SERÁ O BYTE DA IMAGEM
INSERT INTO imagensUsuarios (idUsuario, imagem) VALUES 
(1, 'https://www.w3schools.com/howto/img_avatar.png'),
(2, 'https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png'),
(3, 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png');

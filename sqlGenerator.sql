-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema chefvirtual_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema chefvirtual_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `chefvirtual_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `chefvirtual_db` ;

-- -----------------------------------------------------
-- Table `chefvirtual_db`.`categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chefvirtual_db`.`categoria` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tipo` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `chefvirtual_db`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chefvirtual_db`.`usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `imagem` LONGBLOB NULL DEFAULT NULL,
  `facebook` VARCHAR(100) NULL DEFAULT NULL,
  `instagram` VARCHAR(100) NULL DEFAULT NULL,
  `youtube` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email` (`email` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 34
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `chefvirtual_db`.`receita`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chefvirtual_db`.`receita` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(100) NOT NULL,
  `descricao` TEXT NOT NULL,
  `imagem` LONGBLOB NOT NULL,
  `usuario_id` INT NULL DEFAULT NULL,
  `tempo_preparo` INT NULL DEFAULT NULL,
  `qtn_pessoas` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_usuario_receita` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_usuario_receita`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `chefvirtual_db`.`usuario` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 48
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `chefvirtual_db`.`categoria_receita`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chefvirtual_db`.`categoria_receita` (
  `categoria_id` INT NOT NULL,
  `receita_id` INT NOT NULL,
  PRIMARY KEY (`categoria_id`, `receita_id`),
  INDEX `fk_categoria_has_receita_receita1_idx` (`receita_id` ASC) VISIBLE,
  INDEX `fk_categoria_has_receita_categoria1_idx` (`categoria_id` ASC) VISIBLE,
  CONSTRAINT `fk_categoria_has_receita_categoria1`
    FOREIGN KEY (`categoria_id`)
    REFERENCES `chefvirtual_db`.`categoria` (`id`),
  CONSTRAINT `fk_categoria_has_receita_receita1`
    FOREIGN KEY (`receita_id`)
    REFERENCES `chefvirtual_db`.`receita` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `chefvirtual_db`.`codigo_verificacao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chefvirtual_db`.`codigo_verificacao` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `codigo_verificacao` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 40
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `chefvirtual_db`.`comentarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chefvirtual_db`.`comentarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `usuario_id` INT NOT NULL,
  `receita_id` INT NOT NULL,
  `comentario` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_usuario_has_receita_receita1_idx` (`receita_id` ASC) VISIBLE,
  INDEX `fk_usuario_has_receita_usuario1_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_usuario_has_receita_receita1`
    FOREIGN KEY (`receita_id`)
    REFERENCES `chefvirtual_db`.`receita` (`id`),
  CONSTRAINT `fk_usuario_has_receita_usuario1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `chefvirtual_db`.`usuario` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 23
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `chefvirtual_db`.`etapa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chefvirtual_db`.`etapa` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `numeroEtapa` INT NOT NULL,
  `descricao` TEXT NOT NULL,
  `receita_id` INT NOT NULL,
  PRIMARY KEY (`id`, `receita_id`),
  INDEX `fk_etapa_receita1_idx` (`receita_id` ASC) VISIBLE,
  CONSTRAINT `fk_etapa_receita1`
    FOREIGN KEY (`receita_id`)
    REFERENCES `chefvirtual_db`.`receita` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 28
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `chefvirtual_db`.`favoritos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chefvirtual_db`.`favoritos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `usuario_id` INT NOT NULL,
  `receita_id` INT NOT NULL,
  `avaliacao` TINYINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`, `usuario_id`, `receita_id`),
  INDEX `fk_usuario_has_receita_receita2_idx` (`receita_id` ASC) VISIBLE,
  INDEX `fk_usuario_has_receita_usuario2_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_usuario_has_receita_receita2`
    FOREIGN KEY (`receita_id`)
    REFERENCES `chefvirtual_db`.`receita` (`id`),
  CONSTRAINT `fk_usuario_has_receita_usuario2`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `chefvirtual_db`.`usuario` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 50
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `chefvirtual_db`.`ingrediente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chefvirtual_db`.`ingrediente` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `chefvirtual_db`.`ingrediente_receita`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chefvirtual_db`.`ingrediente_receita` (
  `ingrediente_id` INT NOT NULL,
  `receita_id` INT NOT NULL,
  `quantidade` VARCHAR(45) NOT NULL,
  `medida` VARCHAR(20) NULL DEFAULT NULL,
  `unidade` VARCHAR(10) NULL DEFAULT NULL,
  INDEX `fk_ingrediente_has_receita_receita1_idx` (`receita_id` ASC) VISIBLE,
  INDEX `fk_ingrediente_has_receita_ingrediente1_idx` (`ingrediente_id` ASC) VISIBLE,
  CONSTRAINT `fk_ingrediente_has_receita_ingrediente1`
    FOREIGN KEY (`ingrediente_id`)
    REFERENCES `chefvirtual_db`.`ingrediente` (`id`),
  CONSTRAINT `fk_ingrediente_has_receita_receita1`
    FOREIGN KEY (`receita_id`)
    REFERENCES `chefvirtual_db`.`receita` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `chefvirtual_db`.`login`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chefvirtual_db`.`login` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(100) NOT NULL,
  `senha` VARCHAR(225) NOT NULL,
  `codigo_verificacao_id` INT NULL DEFAULT NULL,
  `id_usuario` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_login_codigo_verificacao1_idx` (`codigo_verificacao_id` ASC) VISIBLE,
  INDEX `fk_login_usuario` (`id_usuario` ASC) VISIBLE,
  CONSTRAINT `fk_login_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `chefvirtual_db`.`usuario` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 32
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `chefvirtual_db`.`palavrarestrita`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chefvirtual_db`.`palavrarestrita` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `chefvirtual_db`.`palavroes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chefvirtual_db`.`palavroes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `palavra` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 301
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

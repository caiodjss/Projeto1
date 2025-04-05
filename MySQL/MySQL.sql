-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Docentes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Docentes` (
  `idDocentes` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `area` VARCHAR(100) NULL,
  `telefone` VARCHAR(15) NULL,
  `email` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idDocentes`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Coordenadores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Coordenadores` (
  `idCoordenadores` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `area` VARCHAR(100) NULL,
  `telefone` VARCHAR(15) NULL,
  `email` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idCoordenadores`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Turmas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Turmas` (
  `idTurmas` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NULL,
  `curso` VARCHAR(100) NULL,
  `periodo` VARCHAR(6) NULL,
  `idCoordenadoresFK` INT NULL,
  PRIMARY KEY (`idTurmas`),
  INDEX `Turmas - Coordenadores_idx` (`idCoordenadoresFK` ASC) VISIBLE,
  CONSTRAINT `Turmas - Coordenadores`
    FOREIGN KEY (`idCoordenadoresFK`)
    REFERENCES `mydb`.`Coordenadores` (`idCoordenadores`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Horarios_Docentes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Horarios_Docentes` (
  `idHorarios_Docentes` INT NOT NULL AUTO_INCREMENT,
  `dia_semana` ENUM('Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo') NOT NULL,
  `hora_inicio` TIME NOT NULL,
  `hora_fim` TIME NOT NULL,
  `idDocentesFK` INT NULL,
  `idTurmasFK` INT NULL,
  PRIMARY KEY (`idHorarios_Docentes`),
  INDEX `Horários-Docentes_idx` (`idDocentesFK` ASC) VISIBLE,
  INDEX `Horários-Turmas_idx` (`idTurmasFK` ASC) VISIBLE,
  CONSTRAINT `Horários-Docentes`
    FOREIGN KEY (`idDocentesFK`)
    REFERENCES `mydb`.`Docentes` (`idDocentes`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `Horários-Turmas`
    FOREIGN KEY (`idTurmasFK`)
    REFERENCES `mydb`.`Turmas` (`idTurmas`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
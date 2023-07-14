-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema ecomercedb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `ecomercedb` ;

-- -----------------------------------------------------
-- Schema ecomercedb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ecomercedb` DEFAULT CHARACTER SET utf8 ;
USE `ecomercedb` ;

-- -----------------------------------------------------
-- Table `ecomercedb`.`games`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ecomercedb`.`games` ;

CREATE TABLE IF NOT EXISTS `ecomercedb`.`games` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `steam_app_id` INT NOT NULL,
  `detailed_description` LONGTEXT NULL,
  `about_the_game` MEDIUMTEXT NULL,
  `short_description` TINYTEXT NULL,
  `header_image` VARCHAR(200) NULL,
  `capsule_image` VARCHAR(200) NULL,
  `capsule_imagev5` VARCHAR(200) NULL,
  `website` VARCHAR(200) NULL,
  `pc_requirements_minimum` MEDIUMTEXT NULL,
  `pc_requirements_recomended` MEDIUMTEXT NULL,
  `mac_requirements` MEDIUMTEXT NULL,
  `linux_requirements` MEDIUMTEXT NULL,
  `developers` MEDIUMTEXT NULL,
  `publishers` MEDIUMTEXT NULL,
  `price` FLOAT NULL,
  `release_date` DATE NULL,
  `support_info_url` VARCHAR(200) NULL,
  `suport_info_email` VARCHAR(100) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `steam_appid_UNIQUE` (`steam_app_id` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ecomercedb`.`screenshots`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ecomercedb`.`screenshots` ;

CREATE TABLE IF NOT EXISTS `ecomercedb`.`screenshots` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `games_id` INT NOT NULL,
  `path_thumbnail` VARCHAR(200) NULL,
  `path_full` VARCHAR(200) NULL,
  INDEX `fk_screenshots_games_idx` (`games_id` ASC) ,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_screenshots_games`
    FOREIGN KEY (`games_id`)
    REFERENCES `ecomercedb`.`games` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ecomercedb`.`genres`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ecomercedb`.`genres` ;

CREATE TABLE IF NOT EXISTS `ecomercedb`.`genres` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ecomercedb`.`games_has_genres`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ecomercedb`.`games_has_genres` ;

CREATE TABLE IF NOT EXISTS `ecomercedb`.`games_has_genres` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `genres_id` INT NOT NULL,
  `games_id` INT NOT NULL,
  INDEX `fk_genres_has_games_games1_idx` (`games_id` ASC) ,
  INDEX `fk_genres_has_games_genres1_idx` (`genres_id` ASC) ,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_genres_has_games_genres1`
    FOREIGN KEY (`genres_id`)
    REFERENCES `ecomercedb`.`genres` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_genres_has_games_games1`
    FOREIGN KEY (`games_id`)
    REFERENCES `ecomercedb`.`games` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ecomercedb`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ecomercedb`.`users` ;

CREATE TABLE IF NOT EXISTS `ecomercedb`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `active` TINYINT NOT NULL DEFAULT 1,
  `fecha_nacimiento` DATE NOT NULL,
  `foto_perfil_url` VARCHAR(200) NULL,
  `es_admin` TINYINT NOT NULL DEFAULT 0,
  `validado` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) ,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) )
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
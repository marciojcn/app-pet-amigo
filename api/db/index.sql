-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `db_get_a_pet`
DEFAULT CHARACTER SET utf8mb4
COLLATE utf8mb4_0900_ai_ci;

USE `db_get_a_pet`;

-- -----------------------------------------------------
-- Table `pets`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pets` (
  `id`        INT            NOT NULL AUTO_INCREMENT,
  `name`      VARCHAR(255)   NOT NULL,
  `age`       INT            NULL,
  `weight`    DECIMAL(5,2)   NULL,
  `color`     VARCHAR(255)   NULL,
  `images`    TEXT           NULL,
  `available` TINYINT(1)     NOT NULL DEFAULT 1,
  `createdAt` DATETIME       NOT NULL,
  `updatedAt` DATETIME       NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Table `users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id`        INT            NOT NULL AUTO_INCREMENT,
  `name`      VARCHAR(255)   NOT NULL,
  `email`     VARCHAR(255)   NOT NULL UNIQUE,
  `password`  VARCHAR(255)   NOT NULL,
  `image`     VARCHAR(255)   NULL,
  `phone`     VARCHAR(20)    NOT NULL,
  `createdAt` DATETIME       NOT NULL,
  `updatedAt` DATETIME       NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
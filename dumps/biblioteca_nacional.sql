
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema biblioteca_nacional
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema biblioteca_nacional
-- -----------------------------------------------------

DROP SCHEMA IF EXISTS `biblioteca_nacional`;

CREATE SCHEMA IF NOT EXISTS `biblioteca_nacional` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci; ;
USE `biblioteca_nacional` ;

-- -----------------------------------------------------
-- Table `biblioteca_nacional`.`books`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `biblioteca_nacional`.`books` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `is_rented` TINYINT(1) NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `title` (`title` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `biblioteca_nacional`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `biblioteca_nacional`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(100) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `role` INT NOT NULL DEFAULT '2',
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `biblioteca_nacional`.`rentals`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `biblioteca_nacional`.`rentals` (
  `book_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `rental_date` DATE NULL DEFAULT NULL,
  `returned_at` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`book_id`, `user_id`),
  INDEX `user_id` (`user_id` ASC) VISIBLE,
  CONSTRAINT `rentals_ibfk_1`
    FOREIGN KEY (`book_id`)
    REFERENCES `biblioteca_nacional`.`books` (`id`),
  CONSTRAINT `rentals_ibfk_2`
    FOREIGN KEY (`user_id`)
    REFERENCES `biblioteca_nacional`.`users` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

INSERT INTO users(username, password, role)
VALUES 
('Sobrinho do seu Ze', '123456', 1), 
('Seu Ze', '123456', 1);

INSERT INTO biblioteca_nacional.books (title, is_rented) VALUES
('O Grande Gatsby', 0),
('1984', 1),
('Dom Quixote', 0),
('A Revolucao dos Bichos', 0),
('Cem Anos de Solidao', 1),
('Ulisses', 0),
('A Divina Comedia', 1),
('Em Busca do Tempo Perdido', 0),
('Moby Dick', 0),
('O Senhor dos Aneis', 1);

INSERT INTO biblioteca_nacional.users (username, password, role) VALUES
('johnsmith', 'B@1P45sw', 2),
('janedoe', 'P@ssw0rd!', 2),
('michaelbrown', 'Secur3P@ss', 2),
('emilyjones', 'MyP@ss123', 2),
('davidwilson', 'P@ssw0rd!', 2),
('sarahthomas', 'SecretP@ss', 2),
('robertrobinson', 'P@ssw0rd123', 2),
('olivialopez', 'P@ssw0rd!', 2),
('williammartinez', '12345678', 2),
('sophiawalker', 'P@ssw0rd!', 2);

INSERT INTO biblioteca_nacional.rentals (book_id, user_id, rental_date, returned_at) VALUES
(2, 1, '2023-05-01', NULL),
(5, 3, '2023-05-03', NULL),
(7, 2, '2023-05-05', NULL),
(1, 2, '2023-05-01', '2023-05-05'),
(10, 9, '2023-05-20', NULL);

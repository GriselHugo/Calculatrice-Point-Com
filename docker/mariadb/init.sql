/* Créer une base de données */
CREATE DATABASE IF NOT EXISTS `CalcPC-db`;

/* Charger des données initiales */
USE `CalcPC-db`;

/* Créer une table "calculations" */
CREATE TABLE IF NOT EXISTS `calculations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `calculation` varchar(255) NOT NULL,
  `result` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 09, 2021 at 10:35 PM
-- Server version: 5.7.24
-- PHP Version: 7.2.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `en_movimiento`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `discount` tinyint(4) DEFAULT NULL,
  `image` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `category_id` int(11) NOT NULL,
  `size` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `brand_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Truncate table before insert `products`
--

TRUNCATE TABLE `products`;
--
-- Dumping data for table `products`
--

INSERT DELAYED IGNORE INTO `products` (`id`, `name`, `description`, `price`, `discount`, `image`, `category_id`, `size`, `brand_id`) VALUES
(1, 'Bolso Sport Unisex', 'Practico bolso para ir al gimnasio, con correa regulable y compartimentos varios', '6770.00', 0, 'bolso.jpg', 1, '30', 1),
(2, 'Camiseta Argentina', 'camiseta selección Argentina - Mundial', '250000.00', 10, 'camisetaargentina_2.jpg', 2, 'XS - S - M - L - XL', 1),
(3, 'Pesas de entrenamiento MIR', 'pesas de metal, NO SE OXIDAN', '4500.00', 0, 'pesas.jpg', 1, '5kg - 10 kg', 5),
(4, 'Zapatillas Urbanas Model.0', 'calzado de uso diario, modelo bota con abrojo', '7990.00', 0, 'zapatillas.jpg', 2, '36 - 38', 1),
(5, 'Calzas Nike', 'calzas de mujer, 100% lycra. Tecnología GORE-TECH', '3450.00', 0, 'myfile-1614785466630.jpg', 1, 'S - L', 1),
(6, 'Botines de Futlbol ADIDAS', 'Botines para fútbol, con tapones intercambiables', '15500.00', 10, 'botines-adidas.jpg', 3, '40-44', 2),
(7, 'Botines Borussia TT', 'Los botines Puma Borussia TT mantienen el diseño típico, además del confort interno, para que sientas control de la pelota', '6100.00', 10, 'botines-puma.jpg', 1, '41', 1),
(8, 'Remera Deportiva Adidas', 'camiseta tecnología DRI-FIT', '3700.00', 10, 'camiseta_deportiva.jpg', 1, '26', 2),
(9, 'Camiseta Deportiva Style Deluxe', 'Camiseta con redes laterales para una mejor circulacion de aire', '4200.00', 0, 'camiseta_deportiva_2.jpg', 2, '29', 5),
(10, 'Camiseta entrenamiento brasil', 'Camiseta de entrenamiento dri-fit del equipo nacional de Brasil', '12000.00', 10, 'image-1620857191298.jpg', 1, '38', 5),
(11, 'Remera Barcelona - RAKUTEN', 'remera de futbol Club Barcelona', '9153.00', 0, 'camiseta-entrenamiento_2.jpg', 1, '38', 5),
(12, 'Remera mujer deportiva ADIDAS', 'remera deportiva, fibra altamente resistente', '4618.00', 10, 'camiseta-mujer-2.jpg', 1, '38', 2),
(13, 'Camiseta Mujer Salomon', 'remera deportiva', '6958.00', 5, 'camiseta-mujer-violeta.jpg', 3, '38', 4),
(14, 'Camiseta de fultbol Nigeria', 'camiseta oficial Nigeria', '8014.00', 15, 'camiseta-nigeria.jpg', 2, '38', 5),
(15, 'Camiseta oficial Club PSG', 'Está inspirada en los colores de la bandera francesa y con tecnología Dri-Fit para que te mantengas cómodo durante todo el partidos', '9305.00', 0, 'camiseta-PSG.jpg', 2, '38', 5),
(16, 'Pantalon Sportswear Gym Vntg', 'pantalon corto entrenamiento para mujer', '4500.00', 10, 'pantalon-corto-running-mujer.jpg', 1, '38', 5),
(17, 'Pantalon Corto Salomon', 'Pantalón corto, con malla interna', '1990.00', 5, 'pantalon-corto-running-mujer-2.jpg', 3, '38', 4),
(18, 'Campera deportiva Nike Jacket 2.0', 'Campera capucha ajustable', '5500.00', 10, 'running-jacket.jpg', 3, '38', 1),
(19, 'Campera Jacket', 'Campera impermeable, con cuello y cierre', '4714.00', 0, 'running-jacket_2.jpg', 1, '38', 5),
(21, 'Short Deportivo Nike', 'pantalon corto liso, de algodon para hombre', '6500.00', 25, 'short_deporte.jpg', 3, '38', 1),
(22, 'Short Nike Running II', 'Short de microfibra', '4925.00', 20, 'short-nike-running.jpg', 1, '38', 1),
(23, 'AIRMAX Shoes', 'zapatillas de mujer con camara de aire', '7200.00', 20, 'zapatillas_2.jpg', 3, '38', 1),
(24, 'Zapatillas ASICS, modelo Spring 2020', 'zapatillas', '4350.00', 0, 'zapatillas_asics.jpg', 2, '38', 6),
(25, 'Calzado New Balance - Edición 2021', 'Zapatillas marca Nike, edicion Post Pandemia', '6229.00', 20, 'Zapatillas-new-balance-foam.jpg', 1, '38', 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 05, 2026 at 01:41 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `laporan_triset`
--

-- --------------------------------------------------------

--
-- Table structure for table `report_data_backup_1772626437748`
--

CREATE TABLE `report_data_backup_1772626437748` (
  `id` int(11) NOT NULL,
  `brand_name` varchar(100) NOT NULL,
  `harian_n_qty` int(11) DEFAULT 0,
  `harian_n_harga` int(11) DEFAULT 0,
  `harian_ob_qty` int(11) DEFAULT 0,
  `harian_ob_harga` int(11) DEFAULT 0,
  `kumulatif_n_qty` int(11) DEFAULT 0,
  `kumulatif_n_harga` int(11) DEFAULT 0,
  `kumulatif_ob_qty` int(11) DEFAULT 0,
  `kumulatif_ob_harga` int(11) DEFAULT 0,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `report_date` date NOT NULL DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `report_harian`
--

CREATE TABLE `report_harian` (
  `id` int(11) NOT NULL,
  `brand_name` varchar(100) NOT NULL,
  `report_date` date NOT NULL,
  `n_qty` int(11) DEFAULT 0,
  `n_harga` bigint(20) DEFAULT 0,
  `ob_qty` int(11) DEFAULT 0,
  `ob_harga` bigint(20) DEFAULT 0,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `report_harian`
--

INSERT INTO `report_harian` (`id`, `brand_name`, `report_date`, `n_qty`, `n_harga`, `ob_qty`, `ob_harga`, `updated_at`) VALUES
(14, 'Bruno Premi', '2026-03-02', 0, 0, 1, 849500, '2026-03-04 12:27:54'),
(15, 'Rohde', '2026-03-02', 0, 0, 1, 199000, '2026-03-04 12:27:54'),
(16, 'Triset', '2026-03-02', 1, 351920, 6, 839400, '2026-03-04 12:27:54'),
(17, 'Yongki Komaladi', '2026-03-02', 0, 0, 9, 882500, '2026-03-04 12:27:54'),
(18, 'Fladeo', '2026-03-02', 5, 993800, 18, 1922800, '2026-03-04 12:27:54'),
(19, 'Lawrensia', '2026-03-02', 0, 0, 5, 499500, '2026-03-04 12:27:54'),
(20, 'Steve & Co', '2026-03-02', 3, 943110, 2, 259800, '2026-03-04 12:27:54'),
(21, 'Dr Kevin', '2026-03-02', 0, 0, 4, 759800, '2026-03-04 12:27:54'),
(22, 'Cardinal', '2026-03-02', 2, 649300, 0, 0, '2026-03-04 12:27:54'),
(23, 'St Moritz', '2026-03-02', 5, 1490014, 7, 1177310, '2026-03-04 12:27:54'),
(24, 'Genny', '2026-03-02', 9, 2627520, 23, 2185740, '2026-03-04 12:27:54'),
(25, 'Peter Keiza', '2026-03-02', 0, 0, 5, 615000, '2026-03-04 12:27:54'),
(26, 'Laviola', '2026-03-02', 7, 1674297, 9, 1239110, '2026-03-04 12:27:54'),
(42, 'Triset', '2026-03-03', 1, 391920, 6, 809400, '2026-03-04 12:28:21'),
(43, 'Yongki Komaladi', '2026-03-03', 1, 239400, 7, 694900, '2026-03-04 12:28:21'),
(44, 'Fladeo', '2026-03-03', 0, 0, 16, 1791500, '2026-03-04 12:28:21'),
(46, 'Steve & Co', '2026-03-03', 0, 0, 4, 669600, '2026-03-04 12:28:21'),
(47, 'Dr Kevin', '2026-03-03', 0, 0, 1, 100000, '2026-03-04 12:28:21'),
(48, 'Cardinal', '2026-03-03', 1, 279300, 0, 0, '2026-03-04 12:28:21'),
(49, 'St Moritz', '2026-03-03', 3, 779720, 6, 979400, '2026-03-04 12:28:21'),
(50, 'Genny', '2026-03-03', 2, 610400, 23, 2912800, '2026-03-04 12:28:21'),
(51, 'Peter Keiza', '2026-03-03', 0, 0, 5, 959550, '2026-03-04 12:28:21'),
(52, 'Laviola', '2026-03-03', 7, 1746397, 9, 1079100, '2026-03-04 12:28:21'),
(118, 'Bruno Premi', '2026-03-04', 1, 979300, 0, 0, '2026-03-04 15:33:40'),
(119, 'Rohde', '2026-03-04', 0, 0, 0, 0, '2026-03-04 15:33:40'),
(120, 'Triset', '2026-03-04', 3, 1159760, 7, 899300, '2026-03-04 15:33:40'),
(121, 'Yongki Komaladi', '2026-03-04', 4, 1047950, 5, 495000, '2026-03-04 15:33:40'),
(122, 'Fladeo', '2026-03-04', 3, 659950, 27, 2753000, '2026-03-04 15:33:40'),
(123, 'Lawrensia', '2026-03-04', 0, 0, 5, 499500, '2026-03-04 15:33:40'),
(124, 'Steve & Co', '2026-03-04', 0, 0, 5, 749500, '2026-03-04 15:33:40'),
(125, 'Dr Kevin', '2026-03-04', 0, 0, 5, 919700, '2026-03-04 15:33:40'),
(126, 'Cardinal', '2026-03-04', 0, 0, 0, 0, '2026-03-04 15:33:40'),
(127, 'St Moritz', '2026-03-04', 3, 962976, 6, 1099400, '2026-03-04 15:33:40'),
(128, 'Genny', '2026-03-04', 4, 1093040, 29, 3442200, '2026-03-04 15:33:40'),
(129, 'Peter Keiza', '2026-03-04', 0, 0, 10, 1010000, '2026-03-04 15:33:40'),
(130, 'Laviola', '2026-03-04', 18, 4654880, 15, 2254518, '2026-03-04 15:33:40');

-- --------------------------------------------------------

--
-- Table structure for table `report_kumulatif`
--

CREATE TABLE `report_kumulatif` (
  `id` int(11) NOT NULL,
  `brand_name` varchar(100) NOT NULL,
  `report_date` date NOT NULL,
  `n_qty` int(11) DEFAULT 0,
  `n_harga` bigint(20) DEFAULT 0,
  `ob_qty` int(11) DEFAULT 0,
  `ob_harga` bigint(20) DEFAULT 0,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `report_kumulatif`
--

INSERT INTO `report_kumulatif` (`id`, `brand_name`, `report_date`, `n_qty`, `n_harga`, `ob_qty`, `ob_harga`, `updated_at`) VALUES
(14, 'Bruno Premi', '2026-03-02', 0, 0, 2, 1549000, '2026-03-04 12:27:54'),
(15, 'Rohde', '2026-03-02', 0, 0, 1, 199000, '2026-03-04 12:27:54'),
(16, 'Triset', '2026-03-02', 6, 2003560, 20, 2778100, '2026-03-04 12:27:54'),
(17, 'Yongki Komaladi', '2026-03-02', 6, 1802060, 12, 2100800, '2026-03-04 12:27:54'),
(18, 'Fladeo', '2026-03-02', 20, 5137880, 65, 5384500, '2026-03-04 12:27:54'),
(19, 'Lawrensia', '2026-03-02', 1, 286930, 13, 1298700, '2026-03-04 12:27:54'),
(20, 'Steve & Co', '2026-03-02', 4, 2547250, 3, 439700, '2026-03-04 12:27:54'),
(21, 'Dr Kevin', '2026-03-02', 0, 0, 7, 1039800, '2026-03-04 12:27:54'),
(22, 'Cardinal', '2026-03-02', 3, 923800, 0, 0, '2026-03-04 12:27:54'),
(23, 'St Moritz', '2026-03-02', 16, 4624732, 18, 3797300, '2026-03-04 12:27:54'),
(24, 'Genny', '2026-03-02', 27, 7635600, 30, 3584100, '2026-03-04 12:27:54'),
(25, 'Peter Keiza', '2026-03-02', 0, 0, 7, 1003000, '2026-03-04 12:27:54'),
(26, 'Laviola', '2026-03-02', 7, 1674297, 54, 10098531, '2026-03-04 12:27:54'),
(40, 'Bruno Premi', '2026-03-03', 0, 0, 2, 1549000, '2026-03-04 12:27:58'),
(41, 'Rohde', '2026-03-03', 0, 0, 1, 199000, '2026-03-04 12:27:58'),
(42, 'Triset', '2026-03-03', 7, 2395480, 26, 3587500, '2026-03-04 12:28:21'),
(43, 'Yongki Komaladi', '2026-03-03', 7, 2041460, 19, 2795700, '2026-03-04 12:28:21'),
(44, 'Fladeo', '2026-03-03', 20, 5137880, 81, 7176000, '2026-03-04 12:28:21'),
(45, 'Lawrensia', '2026-03-03', 1, 286930, 13, 1298700, '2026-03-04 12:27:58'),
(46, 'Steve & Co', '2026-03-03', 4, 2547250, 7, 1109300, '2026-03-04 12:28:21'),
(47, 'Dr Kevin', '2026-03-03', 0, 0, 8, 1139800, '2026-03-04 12:28:21'),
(48, 'Cardinal', '2026-03-03', 4, 1203100, 0, 0, '2026-03-04 12:28:21'),
(49, 'St Moritz', '2026-03-03', 19, 5404452, 24, 4776700, '2026-03-04 12:28:21'),
(50, 'Genny', '2026-03-03', 29, 8246000, 53, 6496900, '2026-03-04 12:28:21'),
(51, 'Peter Keiza', '2026-03-03', 0, 0, 12, 1962550, '2026-03-04 12:28:21'),
(52, 'Laviola', '2026-03-03', 14, 3420694, 63, 11177631, '2026-03-04 12:28:21'),
(79, 'Bruno Premi', '2026-03-04', 1, 979300, 2, 1549000, '2026-03-04 15:33:40'),
(80, 'Rohde', '2026-03-04', 0, 0, 1, 199000, '2026-03-04 13:01:20'),
(81, 'Triset', '2026-03-04', 10, 3555240, 33, 4486800, '2026-03-04 15:33:40'),
(82, 'Yongki Komaladi', '2026-03-04', 11, 3089410, 24, 3290700, '2026-03-04 15:33:40'),
(83, 'Fladeo', '2026-03-04', 23, 5797830, 108, 9929000, '2026-03-04 15:33:40'),
(84, 'Lawrensia', '2026-03-04', 1, 286930, 18, 1798200, '2026-03-04 15:33:40'),
(85, 'Steve & Co', '2026-03-04', 4, 2547250, 12, 1858800, '2026-03-04 15:33:40'),
(86, 'Dr Kevin', '2026-03-04', 0, 0, 13, 2059500, '2026-03-04 15:33:40'),
(87, 'Cardinal', '2026-03-04', 4, 1203100, 0, 0, '2026-03-04 13:01:20'),
(88, 'St Moritz', '2026-03-04', 22, 6367428, 30, 5876100, '2026-03-04 15:33:40'),
(89, 'Genny', '2026-03-04', 33, 9339040, 82, 9939100, '2026-03-04 15:33:40'),
(90, 'Peter Keiza', '2026-03-04', 0, 0, 22, 2972550, '2026-03-04 15:33:40'),
(91, 'Laviola', '2026-03-04', 32, 8075574, 78, 13432149, '2026-03-04 15:33:40'),
(92, 'Bruno Premi', '2026-02-28', 0, 0, 0, 0, '2026-03-04 13:32:00'),
(93, 'Rohde', '2026-02-28', 0, 0, 0, 0, '2026-03-04 13:32:00'),
(94, 'Triset', '2026-02-28', 0, 0, 0, 0, '2026-03-04 13:32:00'),
(95, 'Yongki Komaladi', '2026-02-28', 0, 0, 0, 0, '2026-03-04 13:32:00'),
(96, 'Fladeo', '2026-02-28', 0, 0, 0, 0, '2026-03-04 13:32:00'),
(97, 'Lawrensia', '2026-02-28', 0, 0, 0, 0, '2026-03-04 13:32:00'),
(98, 'Steve & Co', '2026-02-28', 0, 0, 0, 0, '2026-03-04 13:32:00'),
(99, 'Dr Kevin', '2026-02-28', 0, 0, 0, 0, '2026-03-04 13:32:00'),
(100, 'Cardinal', '2026-02-28', 0, 0, 0, 0, '2026-03-04 13:32:00'),
(101, 'St Moritz', '2026-02-28', 0, 0, 0, 0, '2026-03-04 13:32:00'),
(102, 'Genny', '2026-02-28', 0, 0, 0, 0, '2026-03-04 13:32:00'),
(103, 'Peter Keiza', '2026-02-28', 0, 0, 0, 0, '2026-03-04 13:32:00'),
(104, 'Laviola', '2026-02-28', 0, 0, 0, 0, '2026-03-04 13:32:00'),
(105, 'Bruno Premi', '2026-02-24', 0, 0, 0, 0, '2026-03-04 14:01:24'),
(106, 'Rohde', '2026-02-24', 0, 0, 0, 0, '2026-03-04 14:01:24'),
(107, 'Triset', '2026-02-24', 0, 0, 0, 0, '2026-03-04 14:01:24'),
(108, 'Yongki Komaladi', '2026-02-24', 0, 0, 0, 0, '2026-03-04 14:01:24'),
(109, 'Fladeo', '2026-02-24', 0, 0, 0, 0, '2026-03-04 14:01:24'),
(110, 'Lawrensia', '2026-02-24', 0, 0, 0, 0, '2026-03-04 14:01:24'),
(111, 'Steve & Co', '2026-02-24', 0, 0, 0, 0, '2026-03-04 14:01:24'),
(112, 'Dr Kevin', '2026-02-24', 0, 0, 0, 0, '2026-03-04 14:01:24'),
(113, 'Cardinal', '2026-02-24', 0, 0, 0, 0, '2026-03-04 14:01:24'),
(114, 'St Moritz', '2026-02-24', 0, 0, 0, 0, '2026-03-04 14:01:24'),
(115, 'Genny', '2026-02-24', 0, 0, 0, 0, '2026-03-04 14:01:24'),
(116, 'Peter Keiza', '2026-02-24', 0, 0, 0, 0, '2026-03-04 14:01:24'),
(117, 'Laviola', '2026-02-24', 0, 0, 0, 0, '2026-03-04 14:01:24'),
(131, 'Bruno Premi', '2026-03-05', 1, 979300, 2, 1549000, '2026-03-04 15:33:57'),
(132, 'Rohde', '2026-03-05', 0, 0, 1, 199000, '2026-03-04 15:33:57'),
(133, 'Triset', '2026-03-05', 10, 3555240, 33, 4486800, '2026-03-04 15:33:57'),
(134, 'Yongki Komaladi', '2026-03-05', 11, 3089410, 24, 3290700, '2026-03-04 15:33:57'),
(135, 'Fladeo', '2026-03-05', 23, 5797830, 108, 9929000, '2026-03-04 15:33:57'),
(136, 'Lawrensia', '2026-03-05', 1, 286930, 18, 1798200, '2026-03-04 15:33:57'),
(137, 'Steve & Co', '2026-03-05', 4, 2547250, 12, 1858800, '2026-03-04 15:33:57'),
(138, 'Dr Kevin', '2026-03-05', 0, 0, 13, 2059500, '2026-03-04 15:33:57'),
(139, 'Cardinal', '2026-03-05', 4, 1203100, 0, 0, '2026-03-04 15:33:57'),
(140, 'St Moritz', '2026-03-05', 22, 6367428, 30, 5876100, '2026-03-04 15:33:57'),
(141, 'Genny', '2026-03-05', 33, 9339040, 82, 9939100, '2026-03-04 15:33:57'),
(142, 'Peter Keiza', '2026-03-05', 0, 0, 22, 2972550, '2026-03-04 15:33:57'),
(143, 'Laviola', '2026-03-05', 32, 8075574, 78, 13432149, '2026-03-04 15:33:57');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `report_data_backup_1772626437748`
--
ALTER TABLE `report_data_backup_1772626437748`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_brand_date` (`brand_name`,`report_date`);

--
-- Indexes for table `report_harian`
--
ALTER TABLE `report_harian`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_brand_date` (`brand_name`,`report_date`);

--
-- Indexes for table `report_kumulatif`
--
ALTER TABLE `report_kumulatif`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_brand_date` (`brand_name`,`report_date`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `report_data_backup_1772626437748`
--
ALTER TABLE `report_data_backup_1772626437748`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `report_harian`
--
ALTER TABLE `report_harian`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=131;

--
-- AUTO_INCREMENT for table `report_kumulatif`
--
ALTER TABLE `report_kumulatif`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=144;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

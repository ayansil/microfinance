-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 06, 2019 at 08:20 AM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 5.6.40

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `microfinances`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `email`, `password`, `created_at`, `updated_at`) VALUES
(1, 'admin@gmail.com', '21232f297a57a5a743894a0e4a801fc3', '2019-02-09 16:16:35', '2019-02-09 16:16:35');

-- --------------------------------------------------------

--
-- Table structure for table `branches`
--

CREATE TABLE `branches` (
  `id` bigint(11) NOT NULL,
  `branch_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `is_deleted` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `branches`
--

INSERT INTO `branches` (`id`, `branch_name`, `address`, `created_at`, `updated_at`, `is_deleted`) VALUES
(1, 'ABC Branch', '93, Khaluibill, First Lane, Burdwan, West Bengal, Pin-713101', '2019-02-10 19:49:16', '0000-00-00 00:00:00', 0),
(2, 'DEF Branch 345', '93, Khaluibill, First Lane, Burdwan, West Bengal, Pin-713101', '2019-02-10 19:49:16', '2019-02-23 12:57:57', 0),
(3, 'GHI Branch', '93, Khaluibill, First Lane, Burdwan, West Bengal, Pin-713101', '2019-02-10 19:49:30', '0000-00-00 00:00:00', 0),
(5, 'apple2 ww', '35 site, #123\nadd sadasd\nuiiiu, pin -889922', '2019-02-19 14:39:59', '2019-02-23 12:51:36', 0),
(6, 'banana branch', '78 nuiuuo\n98asda asdsa# 23\n1/a\nPin -780909', '2019-02-19 14:56:31', '2019-02-23 12:51:22', 1),
(7, 'nopeis buid', 'asda uiuoiiww#\n019 892 2sd#77\n#23\nPin -222222', '2019-02-20 13:44:25', '2019-02-23 12:40:45', 1),
(8, 'apple ui', '89, uio poi, #23\n2345, 456, 789kjjkasdjasj\nasddda -89000', '2019-02-23 08:40:52', '2019-02-23 11:50:21', 1),
(9, 'ape test', 'test 65', '2019-02-23 12:55:07', '2019-02-23 12:55:07', 0),
(10, 'simple test 1', 'simple test 1', '2019-02-23 12:56:34', '2019-02-23 12:56:34', 0),
(11, 'simple test 2', 'simple test 2', '2019-02-23 12:56:46', '2019-02-23 12:56:46', 0),
(12, 'simple test 3', 'simple test 3', '2019-02-23 12:57:00', '2019-02-28 13:47:20', 1),
(13, 'simple test 4', 'simple test 1', '2019-02-23 12:57:14', '2019-02-28 13:44:14', 1),
(14, 'simple test 5', 'simple test 1', '2019-02-23 12:57:23', '2019-02-23 12:57:23', 0),
(15, 'simple test 6', 'simple test 1', '2019-02-23 12:57:33', '2019-02-23 12:58:05', 1),
(16, 'simple test 11', 'simple test 11', '2019-02-23 12:58:17', '2019-02-28 14:00:28', 1),
(17, 'ape', 'ad adadas', '2019-02-28 13:45:01', '2019-02-28 13:45:01', 0),
(18, 'apple 123', 'ads asd', '2019-02-28 14:00:19', '2019-02-28 14:00:19', 0),
(19, 'ple', 'lk 09\nlkl #23\n asdad ad a- 67\npin -678900', '2019-02-28 14:00:51', '2019-02-28 14:00:51', 0);

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` bigint(20) NOT NULL,
  `first_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `address` text COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `nominee_first_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `nominee_last_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `nominee_relation` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `is_deleted` int(11) NOT NULL DEFAULT '0',
  `branch_id` bigint(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `first_name`, `last_name`, `address`, `phone`, `nominee_first_name`, `nominee_last_name`, `nominee_relation`, `is_deleted`, `branch_id`, `created_at`, `updated_at`) VALUES
(1, 'Ayan', 'Sil', 'Baishnabghata Road\n5h', '09434007942', 'Ayana', 'Sil', 'sister', 1, 9, '2019-02-28 14:31:09', '2019-02-28 14:47:03'),
(2, 'Ayana', 'Silya', 'Baishnabghata Road\n5h', '09434007943', 'ayanajk', 'Sil', 'sister', 1, 10, '2019-02-28 14:45:10', '2019-02-28 14:49:03'),
(3, 'Ayan', 'Sil', 'Baishnabghata Road\n5h', '09434007942', 'Ayana', 'Sils', 'Brother', 0, 9, '2019-02-28 14:49:38', '2019-02-28 14:49:38'),
(4, 'Ayana', 'Sil', '1st Floor, 24, KKD Chatterjee Road\n101', '08910871708', 'Shilpa', 'Ghosh', 'spouse', 0, 5, '2019-02-28 14:50:09', '2019-02-28 14:50:09');

-- --------------------------------------------------------

--
-- Table structure for table `tokens`
--

CREATE TABLE `tokens` (
  `id` int(11) NOT NULL,
  `token` bigint(20) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tokens`
--

INSERT INTO `tokens` (`id`, `token`, `admin_id`, `created_at`, `updated_at`) VALUES
(1, 22120, 1, '2019-02-09 15:10:00', '2019-02-09 15:10:00'),
(2, 23348, 1, '2019-02-09 15:31:34', '2019-02-09 15:31:34'),
(3, 15212, 1, '2019-02-09 15:33:24', '2019-02-09 15:33:24'),
(4, 89744, 1, '2019-02-10 05:42:41', '2019-02-10 05:42:41'),
(5, 11997, 1, '2019-02-10 07:35:08', '2019-02-10 07:35:08'),
(6, 69762, 1, '2019-02-10 07:53:42', '2019-02-10 07:53:42'),
(7, 28924, 1, '2019-02-10 07:54:27', '2019-02-10 07:54:27'),
(8, 38652, 1, '2019-02-10 07:55:23', '2019-02-10 07:55:23'),
(9, 77853, 1, '2019-02-10 08:16:02', '2019-02-10 08:16:02'),
(10, 33525, 1, '2019-02-10 08:34:54', '2019-02-10 08:34:54'),
(11, 65614, 1, '2019-02-10 08:35:33', '2019-02-10 08:35:33'),
(12, 99718, 1, '2019-02-10 08:46:48', '2019-02-10 08:46:48'),
(13, 97571, 1, '2019-02-10 08:49:15', '2019-02-10 08:49:15'),
(14, 41536, 1, '2019-02-10 08:50:13', '2019-02-10 08:50:13'),
(15, 28768, 1, '2019-02-10 08:52:50', '2019-02-10 08:52:50'),
(16, 83078, 1, '2019-02-10 09:06:55', '2019-02-10 09:06:55'),
(17, 29071, 1, '2019-02-10 09:09:50', '2019-02-10 09:09:50'),
(18, 39348, 1, '2019-02-10 09:13:23', '2019-02-10 09:13:23'),
(19, 70051, 1, '2019-02-10 09:13:58', '2019-02-10 09:13:58'),
(20, 58635, 1, '2019-02-10 09:13:58', '2019-02-10 09:13:58'),
(21, 90937, 1, '2019-02-10 09:31:53', '2019-02-10 09:31:53'),
(22, 72913, 1, '2019-02-10 09:32:22', '2019-02-10 09:32:22'),
(23, 65918, 1, '2019-02-10 09:32:48', '2019-02-10 09:32:48'),
(24, 61753, 1, '2019-02-10 09:33:35', '2019-02-10 09:33:35'),
(25, 62872, 1, '2019-02-10 09:34:06', '2019-02-10 09:34:06'),
(26, 25353, 1, '2019-02-10 13:34:36', '2019-02-10 13:34:36'),
(27, 4758, 1, '2019-02-18 13:42:56', '2019-02-18 13:42:56'),
(28, 53554, 1, '2019-02-19 10:36:47', '2019-02-19 10:36:47'),
(29, 39786, 1, '2019-02-20 13:40:40', '2019-02-20 13:40:40'),
(30, 65255, 1, '2019-02-20 14:17:57', '2019-02-20 14:17:57'),
(31, 39980, 1, '2019-02-23 08:35:05', '2019-02-23 08:35:05'),
(32, 39662, 1, '2019-02-23 12:40:32', '2019-02-23 12:40:32'),
(33, 25142, 1, '2019-02-28 13:42:49', '2019-02-28 13:42:49'),
(34, 47901, 1, '2019-02-28 13:43:10', '2019-02-28 13:43:10');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `branches`
--
ALTER TABLE `branches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `branch_id` (`branch_id`);

--
-- Indexes for table `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `branches`
--
ALTER TABLE `branches`
  MODIFY `id` bigint(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tokens`
--
ALTER TABLE `tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `customers`
--
ALTER TABLE `customers`
  ADD CONSTRAINT `customers_ibfk_1` FOREIGN KEY (`branch_id`) REFERENCES `branches` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

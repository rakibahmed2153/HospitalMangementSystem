-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 06, 2019 at 01:32 PM
-- Server version: 10.3.16-MariaDB
-- PHP Version: 7.1.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hospital`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `number` varchar(20) NOT NULL,
  `email` varchar(30) NOT NULL,
  `address` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`, `number`, `email`, `address`) VALUES
(1, 'a', '12345', '0170000102', 'a@gmail.com', 'Dhaka,Bangladesh'),
(3, 'rakib', 'rakib1', '017000000', 'ra@gmail.com', 'Dhaka,Bangladesh');

-- --------------------------------------------------------

--
-- Table structure for table `bed`
--

CREATE TABLE `bed` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `word` varchar(100) NOT NULL,
  `bedno` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bed`
--

INSERT INTO `bed` (`id`, `name`, `word`, `bedno`) VALUES
(1, 'a', 'medical', 'm-0011'),
(4, 'jahid', 'Child', 'c-0011'),
(6, 't', 'Anesthetic', 'A-0001');

-- --------------------------------------------------------

--
-- Table structure for table `bloodbank`
--

CREATE TABLE `bloodbank` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `number` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `bloodGroup` varchar(100) NOT NULL,
  `amount` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bloodbank`
--

INSERT INTO `bloodbank` (`id`, `name`, `number`, `email`, `bloodGroup`, `amount`, `address`) VALUES
(2, 'Rakib', '01478523692', 'a@gmail.com', 'A-', '1 Beg', 'DHAKA,Bangladesh'),
(3, 'Bob', '01478523692', 'bob@gmail.com', 'A+', '2 Begs', 'DHAKA,Bangladesh');

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `dname` varchar(100) NOT NULL,
  `description` varchar(5000) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`dname`, `description`, `id`) VALUES
('Pharmacy', 'Pharmacy is the science and technique of preparing, dispensing, and reviewing drugs and providing additional clinical services. It is a health profession that links health sciences with pharmaceutical sciences and aims to ensure the safe, effective, and affordable use of drug.', 12),
('Orthopedic', 'Orthopaedics is the medical specialty that focuses on injuries and diseases of your body\'s musculoskeletal system. This complex system, which includes your bones, joints, ligaments, tendons, muscles, and nerves, allows you to move, work, and be active.', 14),
('Accident and Emergency ', 'An emergency department (ED), also known as an accident & emergency department (A&E), emergency room (ER), emergency ward (EW) or casualty department, is a medical treatment facility specializing in emergency medicine, the acute care of patients who present without prior appointment; either by their own means.', 17),
('Anaesthetics', 'Medications that cause anaesthesia are called anaesthetics. Anaesthetics are used during tests and surgical operations to numb sensation in certain areas of the body or induce sleep. This prevents pain and discomfort, and enables a wide range of medical procedures to be carried out.\r\n', 18);

-- --------------------------------------------------------

--
-- Table structure for table `doctor`
--

CREATE TABLE `doctor` (
  `dname` varchar(200) NOT NULL,
  `number` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `department` varchar(200) NOT NULL,
  `address` varchar(200) NOT NULL,
  `password` varchar(100) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `doctor`
--

INSERT INTO `doctor` (`dname`, `number`, `email`, `department`, `address`, `password`, `id`) VALUES
('Mr.A', '017412585200', 'ma@gmail.com', 'Orthopedic', 'Dhaka', '12345', 1),
('x', '01741258521', 'x@gmail.com', 'Anaesthetics', 'Dhaka', '1234', 1236),
('r', '01741258520', 'r@gmail.com', 'Orthopedic', 'Dhaka', '4561', 1237);

-- --------------------------------------------------------

--
-- Table structure for table `notice`
--

CREATE TABLE `notice` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `message` varchar(2000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `notice`
--

INSERT INTO `notice` (`id`, `title`, `message`) VALUES
(2, 'Emergency', 'closed.'),
(4, 'Holiday', 'Today Is holiday');

-- --------------------------------------------------------

--
-- Table structure for table `nurse`
--

CREATE TABLE `nurse` (
  `id` int(11) NOT NULL,
  `nname` varchar(100) NOT NULL,
  `number` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `nurse`
--

INSERT INTO `nurse` (`id`, `nname`, `number`, `email`, `address`, `password`) VALUES
(1, 'A', '01473698523', 'a@gmail.com', 'Dhaka', '12345'),
(3, 'AAA', '01478523691', 'a@gmail.com', 'Dhaka', '1234');

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

CREATE TABLE `patient` (
  `id` int(11) NOT NULL,
  `pname` varchar(100) NOT NULL,
  `number` varchar(100) NOT NULL,
  `problem` varchar(10000) NOT NULL,
  `doctor` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `patient`
--

INSERT INTO `patient` (`id`, `pname`, `number`, `problem`, `doctor`, `address`, `password`) VALUES
(3, 'asd', '13245676789', 'Celiac Disease', 'Mr.A', 'DHAKA', '1234'),
(8, 'a', '74108529630', 'Celiac Disease', 'Mr.A', 'DHAKA,Bangladesh', '1234'),
(9, 'jahid', '014785236985', 'Celiac Disease', 'Mr.A', 'DHAKA', '12345'),
(10, 't', '01478523675', 'Allergies & Asthma', 'x', 'DHAKA', '4563');

-- --------------------------------------------------------

--
-- Table structure for table `prescription`
--

CREATE TABLE `prescription` (
  `id` int(11) NOT NULL,
  `pname` varchar(100) NOT NULL,
  `problem` varchar(500) NOT NULL,
  `prescription` varchar(50000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `prescription`
--

INSERT INTO `prescription` (`id`, `pname`, `problem`, `prescription`) VALUES
(1, 'asd', 'Allergies & Asthma.', 'medicine names: ...\r\nTime:....'),
(3, 't', 'Allergies & Asthma.', 'Take Proper Rest');

-- --------------------------------------------------------

--
-- Table structure for table `report`
--

CREATE TABLE `report` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `date` varchar(100) NOT NULL,
  `details` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `report`
--

INSERT INTO `report` (`id`, `name`, `date`, `details`) VALUES
(1, 'qw', '2019-07-19', 'Operation Details'),
(2, 't', '2019-07-10', 'Emergency');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bed`
--
ALTER TABLE `bed`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bloodbank`
--
ALTER TABLE `bloodbank`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `doctor`
--
ALTER TABLE `doctor`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notice`
--
ALTER TABLE `notice`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `nurse`
--
ALTER TABLE `nurse`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `prescription`
--
ALTER TABLE `prescription`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `report`
--
ALTER TABLE `report`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `bed`
--
ALTER TABLE `bed`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `bloodbank`
--
ALTER TABLE `bloodbank`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `doctor`
--
ALTER TABLE `doctor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1238;

--
-- AUTO_INCREMENT for table `notice`
--
ALTER TABLE `notice`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `nurse`
--
ALTER TABLE `nurse`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `patient`
--
ALTER TABLE `patient`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `prescription`
--
ALTER TABLE `prescription`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `report`
--
ALTER TABLE `report`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

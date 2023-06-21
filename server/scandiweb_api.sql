-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Июн 20 2023 г., 18:03
-- Версия сервера: 8.0.30
-- Версия PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `scandiweb_api`
--

-- --------------------------------------------------------

--
-- Структура таблицы `books`
--

CREATE TABLE `books` (
  `id` int UNSIGNED NOT NULL,
  `sku` varchar(255) NOT NULL,
  `weight` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `books`
--

INSERT INTO `books` (`id`, `sku`, `weight`) VALUES
(1, 'a1245d', 5),
(17, 'zx125v11241212554', 12414),
(24, 'zx125111254', 12414),
(25, 'zx1252111254', 12414),
(26, 'zx12521311254', 12414),
(29, 'zx125242131154', 12414),
(30, 'zx12524211154', 12414),
(34, 'x12522115', 12414),
(35, 'x1252215', 12414),
(36, 'x152215', 12414),
(37, 'x15215', 12414),
(38, 'x25215', 12414),
(39, 'x252215', 12414),
(40, 'x2522315', 12414),
(41, 'x2151522315', 12414),
(42, 'x2151522fass315', 12414);

-- --------------------------------------------------------

--
-- Структура таблицы `dvd`
--

CREATE TABLE `dvd` (
  `id` int UNSIGNED NOT NULL,
  `sku` varchar(255) NOT NULL,
  `size` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `dvd`
--

INSERT INTO `dvd` (`id`, `sku`, `size`) VALUES
(27, 'dsgsdg', 1235152);

-- --------------------------------------------------------

--
-- Структура таблицы `furniture`
--

CREATE TABLE `furniture` (
  `id` int UNSIGNED NOT NULL,
  `sku` varchar(255) NOT NULL,
  `height` int NOT NULL,
  `width` int NOT NULL,
  `length` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `products`
--

CREATE TABLE `products` (
  `id` int UNSIGNED NOT NULL,
  `sku` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` float NOT NULL,
  `type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `products`
--

INSERT INTO `products` (`id`, `sku`, `name`, `price`, `type`) VALUES
(65, 'zx125v11241212554', 'zxvzxv', 1224, 'books'),
(73, 'zx125111254', 'zxvzxv', 1224, 'books'),
(74, 'zx1252111254', 'zxvzxv', 1224, 'books'),
(75, 'zx12521311254', 'zxvzxv', 1224, 'books'),
(78, 'zx125242131154', 'zxvzxv', 1224, 'books'),
(79, 'zx12524211154', 'zxvzxv', 1224, 'books'),
(83, 'x12522115', 'zxvzxv', 1224, 'books'),
(84, 'x1252215', 'zxvzxv', 1224, 'books'),
(85, 'x152215', 'zxvzxv', 1224, 'books'),
(86, 'x15215', 'zxvzxv', 1224, 'books'),
(87, 'x25215', 'zxvzxv', 1224, 'books'),
(88, 'x252215', 'zxvzxv', 1224, 'books'),
(89, 'x2522315', 'zxvzxv', 1224, 'books'),
(93, 'x2151522315', 'zxvzxv', 1224, 'books'),
(94, 'x2151522fass315', 'zxvzxv', 1224, 'books'),
(99, 'dsgsdg', 'qwr125', 1245450, 'dvd');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sku` (`sku`);

--
-- Индексы таблицы `dvd`
--
ALTER TABLE `dvd`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sku` (`sku`);

--
-- Индексы таблицы `furniture`
--
ALTER TABLE `furniture`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sku` (`sku`);

--
-- Индексы таблицы `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sku` (`sku`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `books`
--
ALTER TABLE `books`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT для таблицы `dvd`
--
ALTER TABLE `dvd`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT для таблицы `furniture`
--
ALTER TABLE `furniture`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `products`
--
ALTER TABLE `products`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

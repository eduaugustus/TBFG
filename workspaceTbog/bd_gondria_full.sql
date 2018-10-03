-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Tempo de geração: 13/09/2018 às 21:01
-- Versão do servidor: 5.7.11-log
-- Versão do PHP: 5.6.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `bd_gondria`
--
CREATE DATABASE IF NOT EXISTS `bd_gondria` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `bd_gondria`;

-- --------------------------------------------------------

--
-- Estrutura para tabela `consultas_mensais`
--

CREATE TABLE `consultas_mensais` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'Id do mês que aconteceram as consultas',
  `mes` tinyint(2) UNSIGNED NOT NULL COMMENT 'Armazena o mês em que ocorreram as consukltas inserindo o primeiro dia daql mês',
  `ano` int(4) UNSIGNED NOT NULL COMMENT 'Armazena o ano do relatorio feito',
  `numero_visitas` int(10) UNSIGNED NOT NULL COMMENT 'Armazena o número de visitas realizadas naquele mês',
  `numero_cadastros` int(10) UNSIGNED NOT NULL COMMENT 'Armazena a quantidade de pessoas cadastradas em um mes'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Tabela que armazena os dados necessários para se ter uma idéia das consultas mensais realizadas no site';

--
-- Fazendo dump de dados para tabela `consultas_mensais`
--

INSERT INTO `consultas_mensais` (`id`, `mes`, `ano`, `numero_visitas`, `numero_cadastros`) VALUES
(43, 8, 2018, 6, 4),
(44, 7, 2018, 10, 5),
(45, 6, 2018, 16, 7),
(46, 5, 2018, 12, 6),
(47, 4, 2018, 5, 8),
(48, 3, 2018, 5, 6),
(54, 1, 2018, 7, 5),
(55, 2, 2018, 6, 8);

-- --------------------------------------------------------

--
-- Estrutura para tabela `pontuacoes`
--

CREATE TABLE `pontuacoes` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'Armazena o id da pontuação cadastrada',
  `tempo` time NOT NULL COMMENT 'Armazena o tempo em que a fase foi concluida',
  `pontuacao` smallint(5) UNSIGNED NOT NULL COMMENT 'Armazena a pontuação total atingida na fase',
  `fase` tinyint(1) UNSIGNED NOT NULL COMMENT 'Armazena a fase em que a pontuação foi atngida',
  `usuarios_id` int(10) UNSIGNED NOT NULL COMMENT 'Armazena o id do usuário que atingiu a pontuação'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Tabela que armazena as pontuações alcançadas pelos jogadores nas fases ';

--
-- Fazendo dump de dados para tabela `pontuacoes`
--

INSERT INTO `pontuacoes` (`id`, `tempo`, `pontuacao`, `fase`, `usuarios_id`) VALUES
(1, '00:11:21', 500, 3, 11),
(2, '00:12:20', 7552, 1, 11),
(3, '00:14:23', 5970, 2, 11),
(4, '00:16:39', 7419, 1, 13),
(5, '00:12:38', 8825, 4, 13),
(6, '00:19:30', 5075, 3, 13),
(7, '00:21:24', 9905, 3, 14),
(8, '00:19:31', 9937, 1, 16),
(9, '00:15:45', 8241, 4, 17),
(10, '00:14:16', 7597, 3, 17),
(11, '00:15:43', 5225, 2, 17),
(12, '00:17:47', 3933, 4, 18),
(13, '00:13:32', 9069, 1, 18),
(14, '00:20:17', 9159, 3, 19),
(15, '00:15:19', 3207, 1, 19),
(16, '00:12:33', 5483, 2, 20),
(17, '00:18:47', 8989, 3, 20),
(18, '00:16:38', 3336, 1, 21),
(19, '00:14:22', 4049, 2, 21),
(20, '00:11:10', 5511, 4, 23),
(21, '00:14:19', 8443, 2, 23),
(22, '00:10:52', 5348, 1, 24),
(23, '00:20:32', 1219, 4, 24),
(24, '00:10:59', 9626, 2, 25),
(25, '00:11:32', 9314, 1, 25),
(26, '00:22:32', 7822, 3, 25),
(27, '00:18:26', 9918, 4, 25);

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'Armazena o id de cada usuário cadastrado',
  `nome` varchar(45) NOT NULL COMMENT 'Armazena o nome do usuário cadastrado',
  `apelido` varchar(16) NOT NULL COMMENT 'Armazena o nome de jogador/nick do usuário cadastrado',
  `data_nascimento` date NOT NULL COMMENT 'Armazena a data d enascimento do usuário cadastrado',
  `email` varchar(80) NOT NULL COMMENT 'Armazena o e-mail do usuário cadastrado\n',
  `senha` char(32) NOT NULL COMMENT 'Armazena a senha do usuário cadastrado',
  `data_cadastro` date NOT NULL COMMENT 'Armazena a data em que o usuário foi cadastrado',
  `permissao` tinyint(1) UNSIGNED NOT NULL COMMENT 'Armazena a permissão do usuário : 0 para jogador 1 para ADM',
  `ultimo_login` date DEFAULT NULL COMMENT 'Armazena a data de ultimo login do usuário'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Tabela que armazena os cadastros de cada usuário';

--
-- Fazendo dump de dados para tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `nome`, `apelido`, `data_nascimento`, `email`, `senha`, `data_cadastro`, `permissao`, `ultimo_login`) VALUES
(6, 'Eduardo', 'eduaugustus', '2000-08-07', 'eduaugustocardozo@gmail.com', '25A63380FB53D3B5310B7B6870F23CD9', '2018-07-08', 0, '2018-08-13'),
(9, 'eduardo augusto', 'user', '2018-08-07', 'edu@gmail.comm', '25A63380FB53D3B5310B7B6870F23CD9', '2018-08-09', 0, '2018-08-13'),
(10, 'admin', 'admin', '2018-08-07', 'admin@gmail.com', '40A82A1B087936E5B6E67F4726559968', '2018-08-13', 1, '2018-09-13'),
(11, 'Gabriel', 'Nonesinho', '2001-01-29', 'momentogabriel@gmail.com', 'A72C87E555F119DCD4F150BF7A0DC5DD', '2018-09-12', 0, '2018-09-12'),
(12, 'Nones', 'Nones', '2001-01-29', 'gabriel_nones@estudante.sc.senai.br', '4FCF68DFE7532C8F79C3E6FF693F6DBE', '2018-09-12', 1, NULL),
(13, 'Leticia', 'Leleca', '2001-04-06', 'leticia@letica.com', 'CF4EED73D0D4CF16272504E481D73D52', '2018-09-12', 0, '2018-09-12'),
(14, 'Rodrigo', 'PRP', '2001-10-20', 'rodrigo@majuana.com', '846BF242CD60C8F661D1DC6EED06EB15', '2018-09-12', 0, '2018-09-12'),
(15, 'Marlow', 'Marlow', '1800-02-19', 'samuel@skate.com', '5E6EF5D736608EC5E8B65CCE9819AC55', '2018-09-12', 0, NULL),
(16, 'Lele', 'Lelezinha', '2001-04-06', 'leleca@sena.com', '40A82A1B087936E5B6E67F4726559968', '2018-09-12', 0, '2018-09-12'),
(17, 'eduardo', 'eduardo', '1111-01-29', 'eduardo@eduardo.com', '40A82A1B087936E5B6E67F4726559968', '2018-09-12', 0, '2018-09-12'),
(18, 'Chabralzilla', 'Chabralzilla', '2000-10-10', 'chabra@chabra.com', '40A82A1B087936E5B6E67F4726559968', '2018-09-12', 0, '2018-09-12'),
(19, 'roger', 'roger', '2000-02-20', 'roger@roger.com', '40A82A1B087936E5B6E67F4726559968', '2018-09-12', 0, '2018-09-12'),
(20, 'thiago', 'thiago', '2000-02-20', 'thi@thi.com', '40A82A1B087936E5B6E67F4726559968', '2018-09-12', 0, '2018-09-12'),
(21, 'jean', 'Jean', '2000-02-20', 'jean@jean.com', '40A82A1B087936E5B6E67F4726559968', '2018-09-12', 0, '2018-09-12'),
(22, 'Kpote', 'Kpote', '2000-02-20', 'kpote@kapote.com', '40A82A1B087936E5B6E67F4726559968', '2018-09-12', 0, NULL),
(23, 'Jesus', 'Jesus', '2000-02-20', 'jesus@jesus.com', '40A82A1B087936E5B6E67F4726559968', '2018-09-12', 0, '2018-09-12'),
(24, 'Cleiton', 'Cleiton', '2000-02-20', 'cleiton@cleiton.com', '40A82A1B087936E5B6E67F4726559968', '2018-09-12', 0, '2018-09-12'),
(25, 'JogadorNameless', 'jogador', '2017-06-04', 'jogador@gmail.com', '40A82A1B087936E5B6E67F4726559968', '2018-09-13', 0, '2018-09-13');

--
-- Índices de tabelas apagadas
--

--
-- Índices de tabela `consultas_mensais`
--
ALTER TABLE `consultas_mensais`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `pontuacoes`
--
ALTER TABLE `pontuacoes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_pontuacoes_Usuarios` (`usuarios_id`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `apelido` (`apelido`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de tabelas apagadas
--

--
-- AUTO_INCREMENT de tabela `consultas_mensais`
--
ALTER TABLE `consultas_mensais`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Id do mês que aconteceram as consultas', AUTO_INCREMENT=56;
--
-- AUTO_INCREMENT de tabela `pontuacoes`
--
ALTER TABLE `pontuacoes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Armazena o id da pontuação cadastrada', AUTO_INCREMENT=28;
--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Armazena o id de cada usuário cadastrado', AUTO_INCREMENT=26;
--
-- Restrições para dumps de tabelas
--

--
-- Restrições para tabelas `pontuacoes`
--
ALTER TABLE `pontuacoes`
  ADD CONSTRAINT `fk_pontuacoes_Usuarios` FOREIGN KEY (`usuarios_id`) REFERENCES `usuarios` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

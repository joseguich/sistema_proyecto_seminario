CREATE TABLE
  `categoria` (
    `id` int NOT NULL AUTO_INCREMENT,
    `nombre` varchar(100) NOT NULL,
    `createdAt` datetime NOT NULL,
    `updatedAt` datetime NOT NULL,
    PRIMARY KEY (`id`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 15 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;


INSERT INTO categoria(`nombre`, `createdAt`, `updatedAt`) VALUES ('Impresora', CURRENT_DATE, CURRENT_DATE);


CREATE TABLE
  `rols` (
    `id` int NOT NULL AUTO_INCREMENT,
    `nombre` varchar(100) NOT NULL,
    `createdAt` datetime NOT NULL,
    `updatedAt` datetime NOT NULL,
    PRIMARY KEY (`id`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;


CREATE TABLE
  `tickets` (
    `id` char(36) CHARACTER
    SET
      utf8mb4 COLLATE utf8mb4_bin NOT NULL,
      `email` varchar(255) NOT NULL,
      `asunto` varchar(60) NOT NULL,
      `ip` varchar(255) NOT NULL,
      `detalle_ticket` text NOT NULL,
      `estatus` enum('pendiente', 'En proceso', 'declinado', 'resuelto') NOT NULL DEFAULT 'pendiente',
      `imagen` varchar(255) DEFAULT NULL,
      `createdAt` datetime NOT NULL,
      `updatedAt` datetime NOT NULL,
      `usuarioId` int DEFAULT NULL,
      `categoriaId` int DEFAULT NULL,
      PRIMARY KEY (`id`),
      KEY `usuarioId` (`usuarioId`),
      KEY `categoriaId` (`categoriaId`),
      CONSTRAINT `tickets_ibfk_1` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`id`) ON DELETE
    SET
      NULL ON UPDATE CASCADE,
      CONSTRAINT `tickets_ibfk_2` FOREIGN KEY (`categoriaId`) REFERENCES `categoria` (`id`) ON DELETE
    SET
      NULL ON UPDATE CASCADE
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

  drop Table ticket_histories

  CREATE TABLE if NOT exists 
  `ticket_histories` (
      `id` INTEGER AUTO_INCREMENT PRIMARY KEY,
      `id_ticket` varchar(60) NOT NULL,
      `id_user_creador` VARCHAR(25) NOT NULL,
      `id_user_asignado` VARCHAR(25) NOT NULL,
      `accion` VARCHAR(60) NOT NULL,
      `comentario` TEXT NOT NULL,
      `createdAt` DATETIME NOT NULL,
      `updatedAt` DATETIME NOT NULL
  ); 


CREATE TABLE
  `usuarios` (
    `id` int NOT NULL AUTO_INCREMENT,
    `nombre_usuario` varchar(50) NOT NULL,
    `nombre` varchar(50) NOT NULL,
    `email` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    `rol` varchar(255) NOT NULL,
    `token` varchar(255) DEFAULT NULL,
    `remember` varchar(255) DEFAULT NULL,
    `confirmacion` tinyint(1) DEFAULT '0',
    `createdAt` datetime NOT NULL,
    `updatedAt` datetime NOT NULL,
    PRIMARY KEY (`id`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

  ALTER TABLE tickets ADD rolsID INTEGER
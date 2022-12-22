/*
 Navicat Premium Data Transfer

 Source Server         : bd2-api
 Source Server Type    : MariaDB
 Source Server Version : 100507 (10.5.7-MariaDB-1:10.5.7+maria~focal)
 Source Host           : labs-dbservices01.ucab.edu.ve:3306
 Source Schema         : bd2_202315_api-db

 Target Server Type    : MariaDB
 Target Server Version : 100507 (10.5.7-MariaDB-1:10.5.7+maria~focal)
 File Encoding         : 65001

 Date: 22/12/2022 14:25:23
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for ads
-- ----------------------------
DROP TABLE IF EXISTS `ads`;
CREATE TABLE `ads`  (
  `ad_id` int(11) NOT NULL AUTO_INCREMENT,
  `alias` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `promotion_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `redirect_to` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `img` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`ad_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for albums
-- ----------------------------
DROP TABLE IF EXISTS `albums`;
CREATE TABLE `albums`  (
  `album_id` int(11) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `event_id` int(11) NOT NULL,
  PRIMARY KEY (`album_id`) USING BTREE,
  INDEX `album_ibfk_1`(`event_id`) USING BTREE,
  CONSTRAINT `album_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for events
-- ----------------------------
DROP TABLE IF EXISTS `events`;
CREATE TABLE `events`  (
  `event_id` int(11) NOT NULL AUTO_INCREMENT,
  `event_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `img` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`event_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for games
-- ----------------------------
DROP TABLE IF EXISTS `games`;
CREATE TABLE `games`  (
  `game_id` int(11) NOT NULL,
  `team_1_id` int(11) NOT NULL,
  `team_2_id` int(11) NOT NULL,
  `matched_at` date NOT NULL,
  `event_id` int(11) NOT NULL,
  `result` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `winner` int(11) NOT NULL,
  PRIMARY KEY (`game_id`) USING BTREE,
  INDEX `team_1_id`(`team_1_id`) USING BTREE,
  INDEX `games_ibfk_3`(`event_id`) USING BTREE,
  INDEX `games_ibfk_2`(`team_2_id`) USING BTREE,
  INDEX `team_1_id_2`(`team_1_id`, `team_2_id`, `matched_at`, `event_id`) USING BTREE,
  INDEX `team_1_id_3`(`team_1_id`, `team_2_id`) USING BTREE,
  CONSTRAINT `games_ibfk_1` FOREIGN KEY (`team_1_id`) REFERENCES `teams` (`team_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_2` FOREIGN KEY (`team_2_id`) REFERENCES `teams` (`team_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_3` FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for inventory
-- ----------------------------
DROP TABLE IF EXISTS `inventory`;
CREATE TABLE `inventory`  (
  `user_id` int(11) NOT NULL,
  `sticker_id` int(11) NOT NULL AUTO_INCREMENT,
  `quantity` int(11) NOT NULL,
  PRIMARY KEY (`sticker_id`, `user_id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  INDEX `sticker_id`(`sticker_id`) USING BTREE,
  CONSTRAINT `inventory_ibfk_1` FOREIGN KEY (`sticker_id`) REFERENCES `stickers` (`sticker_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `inventory_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for players
-- ----------------------------
DROP TABLE IF EXISTS `players`;
CREATE TABLE `players`  (
  `player_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `last_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `team_id` int(11) NOT NULL,
  `height` decimal(3, 2) NOT NULL,
  `weight` decimal(4, 1) NOT NULL,
  `position` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`player_id`) USING BTREE,
  INDEX `team_id`(`team_id`) USING BTREE,
  CONSTRAINT `players_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `teams` (`team_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for players_games
-- ----------------------------
DROP TABLE IF EXISTS `players_games`;
CREATE TABLE `players_games`  (
  `game_id` int(11) NOT NULL,
  `player_id` int(11) NOT NULL,
  `score` int(11) NOT NULL,
  PRIMARY KEY (`game_id`, `player_id`) USING BTREE,
  INDEX `player_id`(`player_id`) USING BTREE,
  CONSTRAINT `players_games_ibfk_1` FOREIGN KEY (`game_id`) REFERENCES `games` (`game_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `players_games_ibfk_2` FOREIGN KEY (`player_id`) REFERENCES `players` (`player_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for players_teams
-- ----------------------------
DROP TABLE IF EXISTS `players_teams`;
CREATE TABLE `players_teams`  (
  `player_id` int(11) NOT NULL,
  `team_id` int(11) NOT NULL,
  `debut` year NOT NULL,
  `retirement` year NOT NULL,
  PRIMARY KEY (`player_id`, `team_id`, `debut`) USING BTREE,
  INDEX `player_teams_ibfk_2`(`team_id`) USING BTREE,
  CONSTRAINT `player_teams_ibfk_1` FOREIGN KEY (`player_id`) REFERENCES `players` (`player_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `player_teams_ibfk_2` FOREIGN KEY (`team_id`) REFERENCES `teams` (`team_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for stickers
-- ----------------------------
DROP TABLE IF EXISTS `stickers`;
CREATE TABLE `stickers`  (
  `sticker_id` int(11) NOT NULL AUTO_INCREMENT,
  `player_id` int(11) NOT NULL,
  `img` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `event_id` int(11) NOT NULL,
  `team_id` int(11) NOT NULL,
  `appearance_rate` float NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`sticker_id`) USING BTREE,
  INDEX `team_id`(`team_id`) USING BTREE,
  INDEX `stickers_ibfk_1`(`player_id`) USING BTREE,
  INDEX `stickers_ibfk_2`(`event_id`) USING BTREE,
  CONSTRAINT `stickers_ibfk_1` FOREIGN KEY (`player_id`) REFERENCES `players` (`player_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `stickers_ibfk_2` FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for teams
-- ----------------------------
DROP TABLE IF EXISTS `teams`;
CREATE TABLE `teams`  (
  `team_id` int(11) NOT NULL AUTO_INCREMENT,
  `team_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `badge` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`team_id`) USING BTREE,
  INDEX `team_id`(`team_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `user_role` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `user_password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`) USING BTREE,
  UNIQUE INDEX `email`(`email`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for users_ads
-- ----------------------------
DROP TABLE IF EXISTS `users_ads`;
CREATE TABLE `users_ads`  (
  `user_id` int(11) NOT NULL,
  `ad_id` int(11) NOT NULL,
  `requested_quantities` int(11) NOT NULL,
  `clicked_quantities` int(11) NOT NULL,
  PRIMARY KEY (`user_id`, `ad_id`) USING BTREE,
  INDEX `users_ads_ibfk_2`(`ad_id`) USING BTREE,
  CONSTRAINT `users_ads_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `users_ads_ibfk_2` FOREIGN KEY (`ad_id`) REFERENCES `ads` (`ad_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for users_albums
-- ----------------------------
DROP TABLE IF EXISTS `users_albums`;
CREATE TABLE `users_albums`  (
  `album_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `sticker_id` int(11) NOT NULL,
  PRIMARY KEY (`album_id`, `user_id`, `sticker_id`) USING BTREE,
  INDEX `users_albums_ibfk_2`(`user_id`) USING BTREE,
  INDEX `users_albums_ibfk_3`(`sticker_id`) USING BTREE,
  CONSTRAINT `users_albums_ibfk_1` FOREIGN KEY (`album_id`) REFERENCES `albums` (`album_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `users_albums_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `users_albums_ibfk_3` FOREIGN KEY (`sticker_id`) REFERENCES `inventory` (`sticker_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- View structure for album_x_user
-- ----------------------------
DROP VIEW IF EXISTS `album_x_user`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `album_x_user` AS select `bd2_202315_api-db`.`albums`.`sticker_id` AS `sticker_id`,`bd2_202315_api-db`.`albums`.`user_id` AS `user_id` from `albums` where `bd2_202315_api-db`.`albums`.`user_id` = `obtain_userid`();

-- ----------------------------
-- Procedure structure for add_album
-- ----------------------------
DROP PROCEDURE IF EXISTS `add_album`;
delimiter ;;
CREATE PROCEDURE `add_album`(sticker INT, usuario INT)
BEGIN
    INSERT INTO albums
        VALUES(sticker,usuario);
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for add_inventory
-- ----------------------------
DROP PROCEDURE IF EXISTS `add_inventory`;
delimiter ;;
CREATE PROCEDURE `add_inventory`(Random INT, user INT)
fx:BEGIN

    DECLARE sticker INT;

    IF Random BETWEEN 0 AND 10 THEN
        SELECT(s.sticker_id)
        INTO sticker
        FROM stickers AS s
        WHERE s.appearance_rate BETWEEN 0 AND 10
        ORDER BY RAND() LIMIT 1;

        INSERT INTO inventory
        VALUES(sticker,user,CURRENT_DATE);

        CALL add_album(sticker,user);
    LEAVE fx;
    end if;

    IF Random BETWEEN 11 AND 40 THEN
        SELECT(s.sticker_id)
        INTO sticker
        FROM stickers AS s
        WHERE s.appearance_rate BETWEEN 11 AND 40
        ORDER BY RAND() LIMIT 1;

        INSERT INTO inventory
        VALUES(sticker,user,CURRENT_DATE);

        CALL add_album(sticker,user);
    LEAVE fx;
    end if;

    IF Random BETWEEN 41 AND 70 THEN
        SELECT(s.sticker_id)
        INTO sticker
        FROM stickers AS s
        WHERE s.appearance_rate BETWEEN 41 AND 70
        ORDER BY RAND() LIMIT 1;

        INSERT INTO inventory
        VALUES(sticker,user,CURRENT_DATE);

        CALL add_album(sticker,user);
    LEAVE fx;
    end if;

    IF Random BETWEEN 71 AND 100 THEN
        SELECT(s.sticker_id)
        INTO sticker
        FROM stickers AS s
        WHERE s.appearance_rate BETWEEN 71 AND 100
        ORDER BY RAND() LIMIT 1;

        INSERT INTO inventory
        VALUES(sticker,user,CURRENT_DATE);

        CALL add_album(sticker,user);
    LEAVE fx;
    end if;
end
;;
delimiter ;

-- ----------------------------
-- Procedure structure for check_inventory
-- ----------------------------
DROP PROCEDURE IF EXISTS `check_inventory`;
delimiter ;;
CREATE PROCEDURE `check_inventory`(IN userid INT,
	IN stickerid INT)
BEGIN
	DECLARE temp_quantity INT UNSIGNED DEFAULT 0;
	
	SELECT quantity INTO temp_quantity
	FROM inventory
	WHERE (user_id = userid)
	AND (sticker_id = stickerid);
	
	IF (temp_quantity = 0) THEN
	    SIGNAL SQLSTATE '45000' 
		SET MESSAGE_TEXT = 'Error: sticker is not available';
	END IF;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for get_all
-- ----------------------------
DROP PROCEDURE IF EXISTS `get_all`;
delimiter ;;
CREATE PROCEDURE `get_all`(IN table_name VARCHAR(255))
BEGIN
	SET @t:= CONCAT('SELECT * FROM ', table_name);
	PREPARE stmt FROM @t;
	EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for get_all_paginated
-- ----------------------------
DROP PROCEDURE IF EXISTS `get_all_paginated`;
delimiter ;;
CREATE PROCEDURE `get_all_paginated`(IN table_name VARCHAR(255),
	IN size INT)
BEGIN
	SET @t := CONCAT('SELECT * FROM ', table_name, ' LIMIT ', size);
	PREPARE stmt FROM @t;
	EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for get_random_ad
-- ----------------------------
DROP PROCEDURE IF EXISTS `get_random_ad`;
delimiter ;;
CREATE PROCEDURE `get_random_ad`()
begin
	select ad_id from ads order by rand() limit 1;
end
;;
delimiter ;

-- ----------------------------
-- Procedure structure for get_sticker
-- ----------------------------
DROP PROCEDURE IF EXISTS `get_sticker`;
delimiter ;;
CREATE PROCEDURE `get_sticker`(user_id INT)
BEGIN

    DECLARE i INT DEFAULT 1;
    DECLARE Random INT;

    fx: LOOP
        IF i > 5 THEN
            LEAVE fx;
        end if;

        SET i = i + 1;
        SET Random = ROUND((RAND()*100) + 1);
        CALL add_inventory(Random,user_id);
    end loop;
end
;;
delimiter ;

-- ----------------------------
-- Function structure for obtain_userid
-- ----------------------------
DROP FUNCTION IF EXISTS `obtain_userid`;
delimiter ;;
CREATE FUNCTION `obtain_userid`()
 RETURNS int(11)
  NO SQL 
  DETERMINISTIC
RETURN @userid
;;
delimiter ;

-- ----------------------------
-- Procedure structure for update_inventory
-- ----------------------------
DROP PROCEDURE IF EXISTS `update_inventory`;
delimiter ;;
CREATE PROCEDURE `update_inventory`(IN userid INT,
	IN stickerid INT)
BEGIN
	CALL check_inventory(userid, stickerid);
	
	UPDATE inventory
	SET quantity = IF(quantity > 0, quantity - 1, 0)
    WHERE (user_id = userid)
	AND (sticker_id = stickerid);
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for validate_appearance_rate
-- ----------------------------
DROP PROCEDURE IF EXISTS `validate_appearance_rate`;
delimiter ;;
CREATE PROCEDURE `validate_appearance_rate`(IN appearance_rate FLOAT)
BEGIN
    IF appearance_rate NOT BETWEEN 0 AND 100 THEN
        SIGNAL SQLSTATE '45000' 
		SET MESSAGE_TEXT = 'Error: appearance_rate is out of bound, must be between 0 and 100';
    END IF;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for validate_email
-- ----------------------------
DROP PROCEDURE IF EXISTS `validate_email`;
delimiter ;;
CREATE PROCEDURE `validate_email`(IN email VARCHAR(255))
BEGIN
	IF NOT (SELECT email REGEXP '^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$') THEN				
		SIGNAL SQLSTATE '45000' 
		SET MESSAGE_TEXT = 'Error: email entered is not valid';
	END IF;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for validate_existing_sticker
-- ----------------------------
DROP PROCEDURE IF EXISTS `validate_existing_sticker`;
delimiter ;;
CREATE PROCEDURE `validate_existing_sticker`(IN albumid INT,
	IN userid INT,
	IN stickerid INT)
BEGIN
    DECLARE counter INT UNSIGNED DEFAULT 0;

    SELECT COUNT(sticker_id) INTO counter
    FROM users_albums
    WHERE (album_id = albumid)
	AND (user_id = userid)
	AND (sticker_id = stickerid);
	
    IF counter > 0 THEN
		SIGNAL SQLSTATE '45000' 
		SET MESSAGE_TEXT = 'Error: cannot repeat stickers on album';
    END IF;
	
	CALL update_inventory(userid, stickerid);
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for validate_players
-- ----------------------------
DROP PROCEDURE IF EXISTS `validate_players`;
delimiter ;;
CREATE PROCEDURE `validate_players`(IN team_1_id INT,
	IN team_2_id INT)
BEGIN
	IF (team_1_id = team_2_id) THEN				
		SIGNAL SQLSTATE '45000' 
		SET MESSAGE_TEXT = 'Error: teams are the same';
	END IF;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for validate_position
-- ----------------------------
DROP PROCEDURE IF EXISTS `validate_position`;
delimiter ;;
CREATE PROCEDURE `validate_position`(IN position VARCHAR(255))
BEGIN
	IF (position NOT IN ('goalkeeper', 'defender', 'midfield', 'forward')) THEN				
		SIGNAL SQLSTATE '45000' 
		SET MESSAGE_TEXT = 'Error: position is not valid';
	END IF;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for validate_user_role
-- ----------------------------
DROP PROCEDURE IF EXISTS `validate_user_role`;
delimiter ;;
CREATE PROCEDURE `validate_user_role`(IN user_role VARCHAR(255))
BEGIN
	IF (user_role NOT IN ('user', 'administrator')) THEN				
		SIGNAL SQLSTATE '45000' 
		SET MESSAGE_TEXT = 'Error: role must be administrator or user';
	END IF;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for validate_winner
-- ----------------------------
DROP PROCEDURE IF EXISTS `validate_winner`;
delimiter ;;
CREATE PROCEDURE `validate_winner`(IN team_1_id INT,
	IN team_2_id INT,
	IN winner INT)
BEGIN
	IF NOT(winner = team_1_id OR winner = team_2_id) THEN				
		SIGNAL SQLSTATE '45000' 
		SET MESSAGE_TEXT = 'Error: team does not match';
	END IF;
END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table games
-- ----------------------------
DROP TRIGGER IF EXISTS `validate_winner_insert`;
delimiter ;;
CREATE TRIGGER `validate_winner_insert` BEFORE INSERT ON `games` FOR EACH ROW BEGIN
	CALL validate_winner(NEW.team_1_id, NEW.team_2_id, NEW.winner);
END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table games
-- ----------------------------
DROP TRIGGER IF EXISTS `validate_players_insert`;
delimiter ;;
CREATE TRIGGER `validate_players_insert` BEFORE INSERT ON `games` FOR EACH ROW BEGIN
	CALL validate_players(NEW.team_1_id, NEW.team_2_id);
END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table games
-- ----------------------------
DROP TRIGGER IF EXISTS `validate_winner`;
delimiter ;;
CREATE TRIGGER `validate_winner` AFTER INSERT ON `games` FOR EACH ROW BEGIN
	IF NOT(NEW.winner = NEW.team_1_id OR NEW.winner = NEW.team_2_id) THEN				
		SIGNAL SQLSTATE '45000' 
		SET MESSAGE_TEXT = 'Error: team does not match';
	END IF;
END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table games
-- ----------------------------
DROP TRIGGER IF EXISTS `validate_winner_update`;
delimiter ;;
CREATE TRIGGER `validate_winner_update` BEFORE UPDATE ON `games` FOR EACH ROW BEGIN
	CALL validate_winner(NEW.team_1_id, NEW.team_2_id, NEW.winner);
END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table games
-- ----------------------------
DROP TRIGGER IF EXISTS `validate_players_update`;
delimiter ;;
CREATE TRIGGER `validate_players_update` BEFORE UPDATE ON `games` FOR EACH ROW BEGIN
	CALL validate_players(NEW.team_1_id, NEW.team_2_id);
END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table players
-- ----------------------------
DROP TRIGGER IF EXISTS `validate_position_insert`;
delimiter ;;
CREATE TRIGGER `validate_position_insert` BEFORE INSERT ON `players` FOR EACH ROW BEGIN
	CALL validate_position(NEW.position);
END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table players
-- ----------------------------
DROP TRIGGER IF EXISTS `validate_position_update`;
delimiter ;;
CREATE TRIGGER `validate_position_update` BEFORE UPDATE ON `players` FOR EACH ROW BEGIN
	CALL validate_position(NEW.position);
END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table stickers
-- ----------------------------
DROP TRIGGER IF EXISTS `validate_appearance_rate_insert`;
delimiter ;;
CREATE TRIGGER `validate_appearance_rate_insert` BEFORE INSERT ON `stickers` FOR EACH ROW BEGIN
	CALL validate_appearance_rate(NEW.appearance_rate);
END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table stickers
-- ----------------------------
DROP TRIGGER IF EXISTS `validate_appearance_rate_update`;
delimiter ;;
CREATE TRIGGER `validate_appearance_rate_update` BEFORE UPDATE ON `stickers` FOR EACH ROW BEGIN
	CALL validate_appearance_rate(NEW.appearance_rate);
END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table users
-- ----------------------------
DROP TRIGGER IF EXISTS `validate_email_insert`;
delimiter ;;
CREATE TRIGGER `validate_email_insert` BEFORE INSERT ON `users` FOR EACH ROW BEGIN
	CALL validate_email(NEW.email);
END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table users
-- ----------------------------
DROP TRIGGER IF EXISTS `validate_user_role_insert`;
delimiter ;;
CREATE TRIGGER `validate_user_role_insert` BEFORE INSERT ON `users` FOR EACH ROW BEGIN
	CALL validate_user_role(NEW.user_role);
END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table users
-- ----------------------------
DROP TRIGGER IF EXISTS `validate_email_update`;
delimiter ;;
CREATE TRIGGER `validate_email_update` BEFORE UPDATE ON `users` FOR EACH ROW BEGIN
	CALL validate_email(NEW.email);
END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table users
-- ----------------------------
DROP TRIGGER IF EXISTS `validate_user_role_update`;
delimiter ;;
CREATE TRIGGER `validate_user_role_update` BEFORE UPDATE ON `users` FOR EACH ROW BEGIN
	CALL validate_user_role(NEW.user_role);
END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table users_albums
-- ----------------------------
DROP TRIGGER IF EXISTS `validate_existing_sticker_insert`;
delimiter ;;
CREATE TRIGGER `validate_existing_sticker_insert` BEFORE INSERT ON `users_albums` FOR EACH ROW BEGIN
	CALL validate_existing_sticker(NEW.album_id, NEW.user_id, NEW.sticker_id);
END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table users_albums
-- ----------------------------
DROP TRIGGER IF EXISTS `validate_existing_sticker_update`;
delimiter ;;
CREATE TRIGGER `validate_existing_sticker_update` BEFORE UPDATE ON `users_albums` FOR EACH ROW BEGIN
	CALL validate_existing_sticker(NEW.album_id, NEW.user_id, NEW.sticker_id);
END
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;

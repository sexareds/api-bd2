DROP PROCEDURE IF EXISTS validate_existing_sticker;

DELIMITER $$

CREATE PROCEDURE validate_existing_sticker(
	IN albumid INT,
	IN userid INT,
	IN stickerid INT
)
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
END $$

DELIMITER ;
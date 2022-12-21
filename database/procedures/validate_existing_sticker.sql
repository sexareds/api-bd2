DROP PROCEDURE IF EXISTS validate_existing_sticker;

DELIMITER $$

CREATE PROCEDURE validate_existing_sticker(
	IN album_id INT,
	IN user_id INT,
	IN sticker_id INT
)
BEGIN
    DECLARE counter INT UNSIGNED DEFAULT 0;

    SELECT COUNT(sticker_id) INTO counter
    FROM users_albums
    WHERE (album_id = NEW.album_id)
	AND (user_id = NEW.user_id)
	AND (sticker_id = NEW.sticker_id);
	
    IF counter > 0 THEN
		SIGNAL SQLSTATE '45000' 
		SET MESSAGE_TEXT = 'Error: cannot repeat stickers on album';
    END IF;
END $$

DELIMITER ;
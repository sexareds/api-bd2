DROP TRIGGER IF EXISTS validate_existing_sticker_insert;

DELIMITER $$

CREATE TRIGGER validate_existing_sticker_insert BEFORE INSERT ON users_albums FOR EACH ROW
BEGIN
	CALL validate_existing_sticker(NEW.album_id, NEW.user_id, NEW.sticker_id);
END $$

DELIMITER ;
DROP TRIGGER IF EXISTS validate_existing_sticker_update;

DELIMITER $$

CREATE TRIGGER validate_existing_sticker_update BEFORE UPDATE ON users_albums FOR EACH ROW
BEGIN
	CALL validate_existing_sticker(NEW.album_id, NEW.user_id, NEW.sticker_id);
END $$

DELIMITER ;
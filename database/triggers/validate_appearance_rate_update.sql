DROP TRIGGER IF EXISTS validate_appearance_rate_update;

DELIMITER $$

CREATE TRIGGER validate_appearance_rate_update BEFORE UPDATE ON stickers FOR EACH ROW
BEGIN
	CALL validate_appearance_rate(NEW.appearance_rate);
END $$

DELIMITER ;
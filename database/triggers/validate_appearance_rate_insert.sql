DROP TRIGGER IF EXISTS validate_appearance_rate_insert;

DELIMITER $$

CREATE TRIGGER validate_appearance_rate_insert BEFORE INSERT ON stickers FOR EACH ROW
BEGIN
	CALL validate_appearance_rate(NEW.appearance_rate);
END $$

DELIMITER ;
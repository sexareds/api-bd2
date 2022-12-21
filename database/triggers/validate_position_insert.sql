DROP TRIGGER IF EXISTS validate_position_insert;

DELIMITER $$

CREATE TRIGGER validate_position_insert BEFORE INSERT ON players FOR EACH ROW
BEGIN
	CALL validate_position(NEW.position);
END $$

DELIMITER ;
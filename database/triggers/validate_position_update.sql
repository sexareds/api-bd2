DROP TRIGGER IF EXISTS validate_position_update;

DELIMITER $$

CREATE TRIGGER validate_position_update BEFORE UPDATE ON players FOR EACH ROW
BEGIN
	CALL validate_position(NEW.position);
END $$

DELIMITER ;
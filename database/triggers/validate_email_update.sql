DROP TRIGGER IF EXISTS validate_email_update;

DELIMITER $$

CREATE TRIGGER validate_email_update BEFORE UPDATE ON users FOR EACH ROW
BEGIN
	CALL validate_email(NEW.email);
END$$

DELIMITER ;
DROP TRIGGER IF EXISTS validate_email_insert;

DELIMITER $$

CREATE TRIGGER validate_email_insert BEFORE INSERT ON users FOR EACH ROW
BEGIN
	CALL validate_email(NEW.email);
END $$

DELIMITER ;
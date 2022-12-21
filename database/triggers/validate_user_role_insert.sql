DROP TRIGGER IF EXISTS validate_user_role_insert;

DELIMITER $$

CREATE TRIGGER validate_user_role_insert BEFORE INSERT ON users FOR EACH ROW
BEGIN
	CALL validate_user_role(NEW.user_role);
END $$

DELIMITER ;
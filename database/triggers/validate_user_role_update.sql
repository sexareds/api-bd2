DROP TRIGGER IF EXISTS validate_user_role_update;

DELIMITER $$

CREATE TRIGGER validate_user_role_update BEFORE UPDATE ON users FOR EACH ROW
BEGIN
	CALL validate_user_role(NEW.user_role);
END $$

DELIMITER ;
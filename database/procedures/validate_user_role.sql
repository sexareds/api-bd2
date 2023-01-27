DROP PROCEDURE IF EXISTS validate_user_role;

DELIMITER $$

CREATE PROCEDURE validate_user_role(
	IN user_role VARCHAR(255)
)
BEGIN
	IF (user_role NOT IN ('user', 'administrator')) THEN				
		SIGNAL SQLSTATE '45000' 
		SET MESSAGE_TEXT = 'Error: role must be administrator or user';
	END IF;
END $$

DELIMITER ;
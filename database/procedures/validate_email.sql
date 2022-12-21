DROP PROCEDURE IF EXISTS validate_email;

DELIMITER $$

CREATE PROCEDURE validate_email(
	IN email VARCHAR(255)
)
BEGIN
	IF NOT (SELECT email REGEXP '^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$') THEN				
		SIGNAL SQLSTATE '45000' 
		SET MESSAGE_TEXT = 'Error: email entered is not valid';
	END IF;
END $$

DELIMITER ;
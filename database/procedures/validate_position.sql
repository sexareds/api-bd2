DROP PROCEDURE IF EXISTS validate_position;

DELIMITER $$

CREATE PROCEDURE validate_position(
	IN position VARCHAR(255)
)
BEGIN
	IF (position NOT IN ('goalkeeper', 'defender', 'midfield', 'forward')) THEN				
		SIGNAL SQLSTATE '45000' 
		SET MESSAGE_TEXT = 'Error: position is not valid';
	END IF;
END $$

DELIMITER ;
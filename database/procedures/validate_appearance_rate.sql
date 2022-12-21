DROP PROCEDURE IF EXISTS validate_appearance_rate;

DELIMITER $$

CREATE PROCEDURE validate_appearance_rate(
	IN appearance_rate FLOAT
)
BEGIN
    IF appearance_rate NOT BETWEEN 0 AND 100 THEN
        SIGNAL SQLSTATE '45000' 
		SET MESSAGE_TEXT = 'Error: appearance_rate is out of bound, must be between 0 and 100';
    END IF;
END $$

DELIMITER ;
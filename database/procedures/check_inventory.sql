DROP PROCEDURE IF EXISTS check_inventory;

DELIMITER $$

CREATE PROCEDURE check_inventory(
	IN userid INT,
	IN stickerid INT
)
BEGIN
	DECLARE temp_quantity INT UNSIGNED DEFAULT 0;
	
	SELECT quantity INTO temp_quantity
	FROM inventory
	WHERE (user_id = userid)
	AND (sticker_id = stickerid);
	
	IF (temp_quantity = 0) THEN
	    SIGNAL SQLSTATE '45000' 
		SET MESSAGE_TEXT = 'Error: sticker is not available';
	END IF;
END $$

DELIMITER ;
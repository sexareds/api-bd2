DROP PROCEDURE IF EXISTS update_inventory;

DELIMITER $$

CREATE PROCEDURE update_inventory(
	IN userid INT,
	IN stickerid INT
)
BEGIN
	CALL check_inventory(userid, stickerid);
	
	UPDATE inventory
	SET quantity = IF(quantity > 0, quantity - 1, 0)
    WHERE (user_id = userid)
	AND (sticker_id = stickerid);
END $$

DELIMITER ;
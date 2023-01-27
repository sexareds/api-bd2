DROP PROCEDURE IF EXISTS get_all_paginated;

DELIMITER $$

CREATE PROCEDURE get_all_paginated(
	IN table_name VARCHAR(255),
	IN size INT
)
BEGIN
	SET @t := CONCAT('SELECT * FROM ', table_name, ' LIMIT ', size);
	PREPARE stmt FROM @t;
	EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
END $$

DELIMITER ;
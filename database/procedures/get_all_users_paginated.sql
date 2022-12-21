DROP PROCEDURE IF EXISTS get_all_users_paginated;

DELIMITER &&

CREATE PROCEDURE get_all_users_paginated(IN size INT)
BEGIN
	SELECT * FROM users LIMIT size;
END &&

DELIMITER ;
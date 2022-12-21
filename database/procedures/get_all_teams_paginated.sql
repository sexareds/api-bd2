DROP PROCEDURE IF EXISTS get_all_teams_paginated;

DELIMITER &&

CREATE PROCEDURE get_all_teams_paginated(IN size INT)
BEGIN
	SELECT * FROM teams LIMIT size;
END &&

DELIMITER ;
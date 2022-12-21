DROP PROCEDURE IF EXISTS get_all_events_paginated;

DELIMITER &&

CREATE PROCEDURE get_all_events_paginated(IN size INT)
BEGIN
	SELECT * FROM `events` LIMIT size;
END &&

DELIMITER ;
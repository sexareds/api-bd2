DROP PROCEDURE IF EXISTS validate_players;

DELIMITER $$

CREATE PROCEDURE validate_players(
	IN team_1_id INT,
	IN team_2_id INT
)
BEGIN
	IF (team_1_id = team_2_id) THEN				
		SIGNAL SQLSTATE '45000' 
		SET MESSAGE_TEXT = 'Error: teams are the same';
	END IF;
END $$

DELIMITER ;
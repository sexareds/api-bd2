DROP PROCEDURE IF EXISTS validate_winner;

DELIMITER $$

CREATE PROCEDURE validate_winner(
	IN team_1_id INT,
	IN team_2_id INT,
	IN winner INT
)
BEGIN
	IF NOT(winner = team_1_id OR winner = team_2_id) THEN				
		SIGNAL SQLSTATE '45000' 
		SET MESSAGE_TEXT = 'Error: team does not match';
	END IF;
END $$

DELIMITER ;
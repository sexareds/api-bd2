DROP TRIGGER IF EXISTS validate_winner_update;

DELIMITER $$

CREATE TRIGGER validate_winner_update BEFORE UPDATE ON games FOR EACH ROW
BEGIN
	CALL validate_winner(NEW.team_1_id, NEW.team_2_id, NEW.winner);
END $$

DELIMITER ;
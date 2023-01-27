DROP TRIGGER IF EXISTS validate_players_update;

DELIMITER $$

CREATE TRIGGER validate_players_update BEFORE UPDATE ON games FOR EACH ROW
BEGIN
	CALL validate_players(NEW.team_1_id, NEW.team_2_id);
END $$

DELIMITER ;
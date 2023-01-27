DROP TRIGGER IF EXISTS validate_players_insert;

DELIMITER $$

CREATE TRIGGER validate_players_insert BEFORE INSERT ON games FOR EACH ROW
BEGIN
	CALL validate_players(NEW.team_1_id, NEW.team_2_id);
END $$

DELIMITER ;
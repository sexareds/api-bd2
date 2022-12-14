DROP TRIGGER IF EXISTS check_appearance_rate_insert;

CREATE TRIGGER check_appearance_rate_insert
    BEFORE INSERT ON stickers
    FOR EACH ROW
BEGIN

    IF NEW.appearance_rate NOT BETWEEN 0 AND 100 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El rango debe estar entre 0 y 100';
    end if;

end;
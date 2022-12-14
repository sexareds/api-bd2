DROP TRIGGER IF EXISTS check_existing_sticker;

CREATE TRIGGER check_existing_sticker
    BEFORE INSERT ON albums
    FOR EACH ROW
fx:BEGIN

    DECLARE Contador INT DEFAULT null;

    SELECT COUNT(sticker_id)
    INTO Contador
    FROM albums
        WHERE sticker_id = NEW.sticker_id AND
              user_id = NEW.user_id;

    IF Contador > 0 THEN
        LEAVE fx;
    end if;

end;
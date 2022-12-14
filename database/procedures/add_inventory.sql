DROP PROCEDURE IF EXISTS add_inventory;
CREATE PROCEDURE add_inventory(Random INT, user INT)
fx:BEGIN

    DECLARE sticker INT;

    IF Random BETWEEN 0 AND 10 THEN
        SELECT(s.sticker_id)
        INTO sticker
        FROM stickers AS s
        WHERE s.appearance_rate BETWEEN 0 AND 10
        ORDER BY RAND() LIMIT 1;

        INSERT INTO inventory
        VALUES(sticker,user,CURRENT_DATE);

        CALL add_album(sticker,user);
    LEAVE fx;
    end if;

    IF Random BETWEEN 11 AND 40 THEN
        SELECT(s.sticker_id)
        INTO sticker
        FROM stickers AS s
        WHERE s.appearance_rate BETWEEN 11 AND 40
        ORDER BY RAND() LIMIT 1;

        INSERT INTO inventory
        VALUES(sticker,user,CURRENT_DATE);

        CALL add_album(sticker,user);
    LEAVE fx;
    end if;

    IF Random BETWEEN 41 AND 70 THEN
        SELECT(s.sticker_id)
        INTO sticker
        FROM stickers AS s
        WHERE s.appearance_rate BETWEEN 41 AND 70
        ORDER BY RAND() LIMIT 1;

        INSERT INTO inventory
        VALUES(sticker,user,CURRENT_DATE);

        CALL add_album(sticker,user);
    LEAVE fx;
    end if;

    IF Random BETWEEN 71 AND 100 THEN
        SELECT(s.sticker_id)
        INTO sticker
        FROM stickers AS s
        WHERE s.appearance_rate BETWEEN 71 AND 100
        ORDER BY RAND() LIMIT 1;

        INSERT INTO inventory
        VALUES(sticker,user,CURRENT_DATE);

        CALL add_album(sticker,user);
    LEAVE fx;
    end if;
end;

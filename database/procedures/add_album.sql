DROP PROCEDURE IF EXISTS add_album;
CREATE PROCEDURE add_album(sticker INT, usuario INT)
BEGIN
    INSERT INTO albums
        VALUES(sticker,usuario);
END;
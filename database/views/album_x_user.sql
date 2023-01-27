CREATE FUNCTION obtain_userid() RETURNS INT DETERMINISTIC NO SQL RETURN @userid;

DROP VIEW IF EXISTS album_x_user;
CREATE VIEW album_x_user AS
SELECT
    sticker_id,
    user_id
FROM albums
WHERE user_id = obtain_userid();

SELECT AxU.* FROM (SELECT @userid:=1 p) param , album_x_user AS AxU;


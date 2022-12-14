DROP PROCEDURE IF EXISTS get_sticker;
CREATE PROCEDURE get_sticker(user_id INT)
BEGIN

    DECLARE i INT DEFAULT 1;
    DECLARE Random INT;

    fx: LOOP
        IF i > 5 THEN
            LEAVE fx;
        end if;

        SET i = i + 1;
        SET Random = ROUND((RAND()*100) + 1);
        CALL add_inventory(Random,user_id);
    end loop;
end;
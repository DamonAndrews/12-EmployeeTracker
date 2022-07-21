INSERT INTO produce (id, name)
  VALUES (1, "apple");


--insert many

INSERT INTO produce (id, name)
VALUES
    ( 1, "apple"),
    ( 2, "orange"),
    ( 3, "banana");

    INSERT INTO biographies (id, name)
VALUES
    ( 001, "Diary of Anne Frank"),
    ( 002, "Frida: A Biography of Frida Kahlo"),
    ( 003, "Long Walk to Freedom");

SELECT * FROM biographies;


--UPDATE EMPLOYEE ROLE
UPDATE role
SET name = "strawberry"
WHERE id = 1;

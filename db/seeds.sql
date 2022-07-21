INSERT INTO department (name)
VALUES ("Soul Sales"),
       ("Profit Mitigation"),
       ("Offensive Public Affairs"),
       ("Brand Mismanagement");

INSERT INTO role (title, salary, department_id)
VALUES ("Director of Evil", 138000,1),
       ("Jerk in Charge", 480000, 1),
       ("Minion", 30000, 2),
       ("Dabbler of Black Arts", 225000, 3),
       ("Complaint Filer", 35000, 3),
       ("The Excel Guy", 200000, 2),
       ("Office Thief", 350000, 1);
       
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Damon", "Andrews", 1, NULL),
       ("Maxwell", "Andrews", 2, NULL),
       ("Eric", "Swalwell", 3, NULL),
       ("Rachael", "Andrews", 4, NULL),
       ("Marina", "Andrews", 5, 1),
       ("Mason", "Andrews", 6, 1),
       ("Shawn", "OMalley", 7, 1);
DROP DATABASE IF EXISTS badguycorp_db;
CREATE DATABASE badguycorp_db;

USE badguycorp_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(8),
  department_id INT,
  FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE SET NULL
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  FOREIGN KEY (role_id)
  REFERENCES role(id)
  ON DELETE CASCADE,
  FOREIGN KEY (manager_id)
  REFERENCES employee(id)
  ON DELETE CASCADE
);



-- // db.query('SELECT * FROM department', 
--                 //     function (err, res) {
--                 //         console.table(res)})
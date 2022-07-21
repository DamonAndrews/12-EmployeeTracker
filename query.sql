SELECT * FROM department JOIN role ON department.id=role.department_id;

SELECT * FROM role JOIN employee ON role.department_id=employee.role_id;

SELECT id, manager_id FROM employee;

SELECT * FROM departments;

SELECT * FROM role;

SELECT id, first_name, last_name, title, department, salary,manager_id FROM employees JOIN role ON  


SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, CONCAT(manager.first_name," ", manager.last_name)
AS manager
FROM employee
JOIN role
ON role.department_id = employee.role_id
JOIN department
ON role.department_id = employee.role_id
LEFT JOIN employee manager
ON manager.id = employee.manager_id
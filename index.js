const inquirer = require('inquirer');
const { type } = require('os');
const { allowedNodeEnvironmentFlags } = require('process');
const { async } = require('rxjs');
const { isGeneratorFunction } = require('util/types');
require('console.table');
const db = require("./db/connection.js");
const arrDepts= ["Soul Sales","Profit Mitigation","Offensive Public Affairs","Brand Mismanagement"];
const arrRoles = ["Director of Evil", "Jerk in Charge", "Minion", "Dabbler of Black Arts", "Complaint Filer", "The Excel Guy","Office Thief"];
const arrEmps = ["Damon", "Maxwell", "Eric", "Rachael", "Marina", "Mason", "Shawn"];

// TODO: Create an array of questions for user input
console.log("Inside index.js");
function userChoices(){
    inquirer.prompt([
        {type: 'list',
        message: 'Please select from the following options',
        choices: ['Add a Department', 'Add a Role', 'Add an Employee','View all Departments', 'View all Roles', 'View all Employees', 'Update Employee Role', 'All Set!'],
        name: 'optionChoice'}])

    .then(res => {
        let choice = res.optionChoice;
        console.log(choice);
        if(choice === "Add a Department")
        {addADepartment();} 
        else if (choice === "Add a Role")
        {addARole();} 
        else if (choice === "Add an Employee")
        {addAnEmployee();}
        else if (choice === "View all Departments")
        {viewAllDepts();}
        else if (choice === "View all Roles")
        {viewAllRoles();}
        else if (choice === "View all Employees")
        {viewAllEmployees();}
        else if (choice === "Update Employee Role")
        {updateEmployeeRole();}  
        else if (choice === "All Set!")
        {process.exit();}
})};

function addADepartment(){
    inquirer.prompt(
        [{
        type: "input",
        message: "Please enter the name of the Department you would like to add:",
        name: "newDepartment"}])

        .then(deptRes => {
        const deptName = JSON.stringify(deptRes.newDepartment).split('"').join('');
        arrDepts.push(deptName);
        db.query('INSERT INTO department (name) VALUES (?)', deptName, function (err, res) {
        console.log("Added " + deptName + ' to the Department table, Woo Hoo!')
        stillWorking();
})})
}

function addARole(){
    inquirer.prompt(
        [{type: "input",
        message: "Please enter the name of the title of the Role you would like to add:",
            name: "newRole"},
        {type: "input",
        message: "Please enter the salary for the Role you would like to add:",
        name: "newSal"},
        {type: "list",
        message: "Please select the department for the Role you would like to add:",
        choices: arrDepts,
        name: "newDeptRole"}])

        .then(roleRes => {

        const newRole = JSON.stringify(roleRes.newRole).split('"').join('');

        const newSal = JSON.stringify(roleRes.newSal).split('"').join('');

        const newDeptRole = JSON.stringify(roleRes.newDeptRole).split('"').join('');

        arrRoles.push(newRole);

    db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [newRole, newSal, 2], function (err, res) {

        console.log('Added ' + newRole + ' with a salary of ' + newSal + ' and the Department ID of ' + newDeptRole + ' to the Roles table')
        stillWorking();
})})
}

function addAnEmployee(){
    inquirer.prompt(
    [{type: "input",
    message: "Please enter the first name of the Employee you would like to add:",
    name: "newFirstName"},
    {type: "input",
    message: "Please enter the last name of the Employee you would like to add:",
    name: "newLastName"},
    {type: "list",
    message: "Please enter the ID for the ROLE of the employee you are adding:",
    choices: arrRoles,
    name: "newEmployeeRoleId"},
    {type: "list",
    message: "Please enter the ID for the MANAGER of the employee you are adding:",
    choices: arrDepts,
    name: "newEmployeeMgrId"}
])

.then((employeeRes => {

const newFirstName = JSON.stringify(employeeRes.newFirstName).split('"').join('');

const newLastName = JSON.stringify(employeeRes.newLastName).split('"').join('');

const newEmployeeRoleId = JSON.stringify(employeeRes.newEmployeeRoleId).split('"').join('');

const newEmployeeMgrId = JSON.stringify(employeeRes.newEmployeeMgrId).split('"').join('');

arrEmps.push(newFirstName);

    db.query('SELECT role.id FROM role WHERE title = (?)', newEmployeeRoleId, function (err, res) {
        const updEmp = (res.map(hey => `${hey.id}`).join(', '));

      insert(updEmp);
    });

function insert(thisThing) {
const newEmployeeRoleId = thisThing;

    db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [newFirstName, newLastName,newEmployeeRoleId, 1], function (err, res) {

    console.log('Added a new Employee named ' + newFirstName + newLastName + ' with a Role ID of ' + newEmployeeRoleId + ' and a Manager ID of ' + newEmployeeMgrId + ' to the Employees table')
        stillWorking();
    })}}))}


function viewAllDepts() {
    db.query('SELECT * FROM department', function (err, res) {
        console.table(res);
        stillWorking();
})}

function viewAllRoles() {
    db.query('SELECT * FROM role', function (err, res) {
        console.table(res);
        stillWorking();
})}

function viewAllEmployees() {
    db.query('SELECT * FROM employee', function (err, res) {
        console.table(res);
        stillWorking();
})}

function updateEmployeeRole() {
    inquirer.prompt(
    [{type: "list",
    message: "Please select the name of the Employee you would like to update:",
    choices: arrEmps,
    name: "updatedEmp"},
    {type: 'list',
    message: "Which role do you want to change the selected Employee to?",
    choices: arrRoles,
    name: 'updatedRole'},])

    .then((data) => {
    const selectedEmp = JSON.stringify(data.selectedEmp).split('"').join('');
    const selectedRole = JSON.stringify(data.selectedRole).split('"').join('');

    db.query('SELECT employee.id FROM employee WHERE first_name = (?)', selectedEmp, function (err, res) {
        const updEmp = (res.map(hey => `'${hey.id}'`).join(', '));
        });

function updating (lol)  {
    const emplUpd = lol;
    db.query('UPDATE employee SET role_id = (?)', [emplUpd, selectedEmp], function (err, results) {});
}
db.query('SELECT * FROM employee', function (err, results) {
    if (err) {
        console.log(err)
    }
    console.table(results);
    stillWorking();
})})};  
 
function stillWorking() {
    inquirer.prompt([
        {type: 'list',
        message: 'Would you like to see your options again?',
        choices: ['Yes','No'],
        name: 'rustillWork'}])

        .then(res => {
            let choice = res.rustillWork;
            console.log(choice);
            if(choice === 'Yes')
            {userChoices();} 
            else if (choice === 'No')
            {process.exit();} 
        })}

//Let's kick the whole thing off!
userChoices();





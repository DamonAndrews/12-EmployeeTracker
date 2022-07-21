const inquirer = require('inquirer');
const { type } = require('os');
const { allowedNodeEnvironmentFlags } = require('process');
const { async } = require('rxjs');
require('console.table');
const db = require("./db/connection.js");

// TODO: Create an array of questions for user input
console.log("Inside index.js");
function userChoices(){
    inquirer.prompt([
        {
            type: 'list',
        
            message: 'Please select from the following options',
        
            choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update employee Role', 'Finish'],
        
            name: 'optionChoice'
            }
    ]).then(res => {
        let choice = res.optionChoice;
        console.log(choice);

        if(choice === "Add a Department")
        {
            addADepartment();

        } else if (choice === "Add a Role")
        {
            addARole();

        } else if (choice === "Add an Employee")
        {
            addAnEmployee();
        }
        else if (choice === "View all Departments")
        {
            viewAllDepts();
        }
        else if (choice === "View all Roles")
        {
            viewAllRoles();
        }
        else if (choice === "View all Employees")
        {
            viewAllEmployees();
        }
        else if (choice === "Update employee Role")
        {
            updateEmployeeRole();
        }   
})};

function addADepartment(){
    inquirer.prompt(
        [{
            type: "input",
            message: "Please enter the name of the Department you would like to add:",
            name: "newDepartment"}])
                .then(deptRes => {
                const deptName = JSON.stringify(deptRes.newDepartment).split('"').join('');

                db.query('INSERT INTO department (name) VALUES (?)', deptName, function (err, res) {

                    console.log("Added " + deptName + ' to the Department table, Woo Hoo!')
                    userChoices();
                })})
                }

function addARole(){
    inquirer.prompt(
        [{
            type: "input",
            message: "Please enter the name of the title of the Role you would like to add:",
            name: "newRole"},
            {
            type: "input",
            message: "Please enter the salary for the Role you would like to add:",
            name: "newSal"},
            {
            type: "input",
            message: "Please enter the ID of the department for the Role you would like to add:",
            name: "newRoleId"}
        ])
            .then(roleRes => {
                const roleName = JSON.stringify(roleRes.newRole).split('"').join('');
                const newSal = JSON.stringify(roleRes.newSal).split('"').join('');
                const newRoleId = JSON.stringify(roleRes.newRoleId).split('"').join('');

                db.query('INSERT INTO role (name) VALUES (?)', roleName, newSal, newRoleId, function (err, res) {

                    console.log('Added ' + roleName + ' with a salary of ' + newSal + ' and the Department ID of ' + newRoleId + ' to the Roles table')
                    userChoices();
                })})
                }

function addAnEmployee(){
    inquirer.prompt(
    [{
        type: "input",
        message: "Please enter the first name of the Employee you would like to add:",
        name: "newFirstName"},
        {
        type: "input",
        message: "Please enter the last name of the Employee you would like to add:",
        name: "newLastName"},
        {
        type: "input",
        message: "Please enter the ID for the ROLE of the employee you are adding:",
        name: "newEmployeeRoleId"},
        {
        type: "input",
        message: "Please enter the ID for the MANAGER of the employee you are adding:",
        name: "newEmployeeMgrId"}
    ])
    .then(employeeRes => {
        const newFirstName = JSON.stringify(employeeRes.newFirstName).split('"').join('');
        const newLastName = JSON.stringify(employeeRes.newLastName).split('"').join('');
        const newEmployeeRoleId = JSON.stringify(employeeRes.newEmployeeRoleId).split('"').join('');
        const newEmployeeMgrId = JSON.stringify(employeeRes.newEmployeeMgrId).split('"').join('');

        db.query('INSERT INTO employee (name) VALUES (?)', newFirstName, newLastName, newEmployeeRoleId, newEmployeeMgrId, function (err, res) {

            console.log('Added a new Employee named ' + newFirstName + newLastName + ' with a Role ID of ' + newEmployeeRoleId + ' and a Manager ID of ' + newEmployeeMgrId + ' to the Employees table')
            userChoices();
        })})
        }




//Let's kick the whole thing off!
userChoices();







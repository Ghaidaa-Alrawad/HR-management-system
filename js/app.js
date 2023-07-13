"use strict";

//making an emp constructor
function Employee(id, fullName, department, level) {
  this.id = id;
  this.fullName = fullName;
  this.department = department;
  this.level = level;
  this.imageUrl = "";
  this.salary = 0;
}

//here the function to calculate the salary
Employee.prototype.calculateSalary = function () {
  var minSalary, maxSalary;
  switch (this.level) {
    case "Senior":
      minSalary = 1500;
      maxSalary = 2000;
      break;
    case "Mid-Senior":
      minSalary = 1000;
      maxSalary = 1500;
      break;
    case "Junior":
      minSalary = 500;
      maxSalary = 1000;
      break;
    default:
      minSalary = 0;
      maxSalary = 0;
  }

  this.salary =
    Math.floor(Math.random() * (maxSalary - minSalary + 1)) + minSalary;
  this.netSalary = this.salary - this.salary * 0.075;
};

//protoType function to render the emps info
Employee.prototype.render = function () {
  var employeeInfo = document.getElementById("employee-info");
  var employeeRow = document.createElement("tr");
  employeeRow.innerHTML = `
    <td>${this.id}</td>
    <td>${this.fullName}</td>
    <td>${this.department}</td>
    <td>${this.level}</td>
    <td>$${this.salary}</td>
    `;
  // add each employee's row to the table's body element in the index page
  employeeInfo.appendChild(employeeRow);
};

//emp array made it to make the code more clean and to manipulate in easy way (employee instances)
var employees = [];
var emplocal = JSON.parse(localStorage.getItem("employees"));

if (emplocal) {
  employees = emplocal.map(
    (item) => new Employee(item.id, item.fullName, item.department, item.level)
  );
} else {
  employees = [
    new Employee(1000, "Ghazi Samer", "Administration", "Senior"),
    new Employee(1001, "Lana Ali", "Finance", "Senior"),
    new Employee(1002, "Tamara Ayoub", "Marketing", "Senior"),
    new Employee(1003, "Safi Walid", "Administration", "Mid-Senior"),
    new Employee(1004, "Omar Zaid", "Development", "Senior"),
    new Employee(1005, "Rana Saleh", "Development", "Junior"),
    new Employee(1006, "Hadi Ahmad", "Finance", "Mid-Senior"),
  ];
}

console.log("this is the employees", employees);

//salary calculation for each employee in the employees array by calling the calculateSalary method on each employee object
employees.forEach(function (employee) {
  employee.calculateSalary();
});

//to render empInfo
employees.forEach(function (employee) {
  employee.render();
});

// Convert the employees array to a JSON string
var employeesJSON = JSON.stringify(employees);

// Save the JSON string to local storage
localStorage.setItem("employees", employeesJSON);

// Retrieve the JSON string from local storage
var employeesJSON = localStorage.getItem("employees");

// Parse the JSON string back to an array
var employees = JSON.parse(employeesJSON);

// Create a global array to store the employee objects
// const allEmployees = [];
let allEmployees = [];

// Get the <div> element for employee cards from the HTML file by its id
let empCardsDiv = document.getElementById("empCards");

// Get the <form> element from the HTML file by its id
let employeeForm = document.getElementById("employeeForm");

// Create a constructor function for Employee
function Employee1(fullName, department, level, imgUrl) {
  this.fullName = fullName;
  this.department = department;
  this.level = level;
  this.imgUrl = imgUrl;
  this.employeeId = generateEmployeeId();
  allEmployees.push(this);
}

// Render method to render employee information in a card
Employee1.prototype.renderEmployeeCard = function () {
  let cardDiv = document.createElement("div");
  cardDiv.classList.add("card");

  let imgElem = document.createElement("img");
  imgElem.src = this.imgUrl;
  cardDiv.appendChild(imgElem);

  let infoDiv = document.createElement("div");
  infoDiv.classList.add("info");

  let nameElem = document.createElement("h3");
  nameElem.textContent = this.fullName;
  infoDiv.appendChild(nameElem);

  let deptElem = document.createElement("p");
  deptElem.textContent = "Department: " + this.department;
  infoDiv.appendChild(deptElem);

  let levelElem = document.createElement("p");
  levelElem.textContent = "Level: " + this.level;
  infoDiv.appendChild(levelElem);

  let idElem = document.createElement("p");
  idElem.textContent = "Employee ID: " + this.employeeId;
  infoDiv.appendChild(idElem);

  cardDiv.appendChild(infoDiv);
  empCardsDiv.appendChild(cardDiv);
};

// Function to generate a unique four-digit employee id number
function generateEmployeeId() {
  let id = "";
  while (id.length < 4) {
    id += Math.floor(Math.random() * 10);
  }
  return id;
}

// Add initial employees
let employee1 = new Employee1(
  "Gahzi Ahmad",
  "Administration",
  "Senior",
  "./assets/Ghazi.jpg"
);
let employee2 = new Employee1(
  "Hadi Mohammad",
  "Marketing",
  "Mid-Senior",
  "./assets/Hadi.jpg"
);
let employee3 = new Employee1(
  "Lana Hassan",
  "Development",
  "Junior",
  "./assets/LAna.jpg"
);

// Render the initial employee cards
employee1.renderEmployeeCard();
employee2.renderEmployeeCard();
employee3.renderEmployeeCard();

// Event listener for the form submission
employeeForm.addEventListener("submit", submitHandler);

// Submit handler function to handle the form submission event
function submitHandler(event) {
  event.preventDefault();

  // Retrieve values from the form inputs
  let fullName = event.target.elements.fullName.value;
  let department = event.target.elements.department.value;
  let level = event.target.elements.level.value;
  let imgUrl = event.target.elements.imgUrl.value;

  // Create a new Employee object
  let newEmployee = new Employee1(fullName, department, level, imgUrl);

  // Render the employee card
  newEmployee.renderEmployeeCard();
  saveData(allEmployees);

  // Reset the form inputs
  employeeForm.reset();

  let empArr = JSON.parse(localStorage.getItem("employees"));
  let lastEmp = empArr[empArr.length - 1];
  let newEmp = new Employee(lastEmp.id + 1, fullName, department, level);
  newEmp.calculateSalary();
  empArr.push(newEmp);
  localStorage.setItem("employees", JSON.stringify(empArr));
  newEmp.render();
}

// creat a function to save my object in the LS
function saveData(data) {
  let stringArr = JSON.stringify(data); //convert it to array of strings
  localStorage.setItem("Emps", stringArr);
}

function getData() {
  let retrievedData = localStorage.getItem("Emps");
  let parsedData = JSON.parse(retrievedData);

  if (parsedData) {
    for (let i = 3; i < parsedData.length; i++) {
      let employeeData = parsedData[i];
      let employee = new Employee1(
        employeeData.fullName,
        employeeData.department,
        employeeData.level,
        employeeData.imgUrl
      );
      employee.renderEmployeeCard();
    }
  }
}

getData();

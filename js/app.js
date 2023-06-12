'use strict';

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
Employee.prototype.calculateSalary = function() {
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
  
    this.salary = Math.floor(Math.random() * (maxSalary - minSalary + 1)) + minSalary;
    this.netSalary = this.salary - (this.salary * 0.075);
};
  

//protoType function to render the emps info
Employee.prototype.render = function() {
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
var employees = [
  new Employee(1000, "Ghazi Samer", "Administration", "Senior"),
  new Employee(1001, "Lana Ali", "Finance", "Senior"),
  new Employee(1002, "Tamara Ayoub", "Marketing", "Senior"),
  new Employee(1003, "Safi Walid", "Administration", "Mid-Senior"),
  new Employee(1004, "Omar Zaid", "Development", "Senior"),
  new Employee(1005, "Rana Saleh", "Development", "Junior"),
  new Employee(1006, "Hadi Ahmad", "Finance", "Mid-Senior")
];

//salary calculation for each employee in the employees array by calling the calculateSalary method on each employee object 
employees.forEach(function(employee) {
    employee.calculateSalary();
});
  
//to render empInfo
employees.forEach(function(employee) {
    employee.render();
});
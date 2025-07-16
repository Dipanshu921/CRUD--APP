const API = 'http://localhost:3000/employees';
const table = document.getElementById('employeeTable');
const formContainer = document.getElementById('formContainer');
const form = document.getElementById('employeeForm');
const empId = document.getElementById('empId');
const companyName = document.getElementById('companyName');
const companyDetails = document.getElementById('companyDetails');

function fetchEmployees() {
  fetch(API)
    .then(res => res.json())
    .then(data => {
      table.innerHTML = '';
      data.forEach((emp, index) => {
        table.innerHTML += `
          <tr>
            <td>${index + 1}</td>
            <td>${emp.name}</td>
            <td>${emp.details}</td>
            <td>
              <button onclick="viewEmployee(${emp.id})">View</button>
              <button onclick="editEmployee(${emp.id})">Edit</button>
              <button onclick="deleteEmployee(${emp.id})">Delete</button>
            </td>
          </tr>`;
      });
    });
}

function openForm() {
  formContainer.style.display = 'block';
}

function closeForm() {
  formContainer.style.display = 'none';
}

form.onsubmit = e => {
  e.preventDefault();
  const employee = {
    name: companyName.value,
    details: companyDetails.value
  };
  const id = empId.value;
  console.log("Submitted ID:", empId.value); // just for testing
  console.log("Parsed ID:", parseInt(empId.value));
  if (id) {
    fetch(`${API}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(employee)
    }).then(() => { fetchEmployees(); closeForm(); });
  } else {
    fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(employee)
    }).then(() => { fetchEmployees(); closeForm(); });
  }
};

function editEmployee(id) {
  console.log("Editing ID:", id); // just for testing
  fetch(`${API}/${id}`)
    .then(res => res.json())
    .then(emp => {
      empId.value = emp.id;
      companyName.value = emp.name;
      companyDetails.value = emp.details;
      openForm();
    });
}

function deleteEmployee(id) {
  fetch(`${API}/${id}`, { method: 'DELETE' })
    .then(() => fetchEmployees());
}

function viewEmployee(id) {
  fetch(`${API}/${id}`)
    .then(res => res.json())
    .then(emp => {
      alert(`Company: ${emp.name}\nDetails: ${emp.details}`);
    });
}

fetchEmployees();

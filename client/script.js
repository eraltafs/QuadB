// script.js
const userForm = document.getElementById("userForm");
const userTable = document
  .getElementById("userTable")
  .getElementsByTagName("tbody")[0];
let api = "http://localhost:8080";

// Function to fetch and display all users
async function getAllUsers() {
  userTable.innerHTML = ""; // Clear the table
  const response = await fetch(`${api}/details`);
  console.log(response);
  const users = await response.json();

  users.forEach((user) => {
    const row = userTable.insertRow();
    row.insertCell(0).innerHTML = user.user_id;
    row.insertCell(1).innerHTML = user.user_name;
    row.insertCell(2).innerHTML = user.user_email;
    row.insertCell(3).innerHTML = user.user_image;
    row.insertCell(4).innerHTML = user.total_orders;
    row.insertCell(5).innerHTML = user.created_at;
    row.insertCell(6).innerHTML = user.last_logged_in;
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.onclick = () => deleteUser(user.user_id);
    row.insertCell(7).appendChild(deleteButton);
  });
}

// Function to add a new user
async function addUser(event) {
  event.preventDefault();
  const userName = document.getElementById("userName").value;
  const userEmail = document.getElementById("userEmail").value;
  const userPassword = document.getElementById("userPassword").value;
  const userImage = document.getElementById("userImage").value;

  const newUser = {
    user_name: userName,
    user_email: userEmail,
    user_password: userPassword,
    user_image: userImage,
  };
  const response = await fetch(`${api}/insert`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });
  if (response.ok) {
    getAllUsers(); // Refresh the user list
    userForm.reset(); // Clear the form
  }
}
// Function to delete a user
async function deleteUser(userId) {
  const response = await fetch(`${api}/delete/${userId}`, { method: "DELETE" });

  if (response.ok) {
    getAllUsers(); // Refresh the user list
  }
}
// Initial data load
getAllUsers();

// Form submission event listener
userForm.addEventListener("submit", addUser);

import usersData from "./users.json";

// In a real app, this would communicate with a backend API
// For our frontend-only demo, we'll simulate API calls using local storage

// Initialize users in localStorage if not already there
const initializeUsers = () => {
  const storedUsers = localStorage.getItem("users");

  if (!storedUsers) {
    localStorage.setItem("users", JSON.stringify(usersData));
  }

  return JSON.parse(localStorage.getItem("users")) || [];
};

// Get all users
export const getUsers = () => {
  return JSON.parse(localStorage.getItem("users")) || initializeUsers();
};

// Add a new user
export const addUser = (newUser) => {
  const users = getUsers();

  // Check if username already exists
  if (users.some((user) => user.username === newUser.username)) {
    return { success: false, message: "Username already exists" };
  }

  // Add new user
  const updatedUsers = [...users, newUser];
  localStorage.setItem("users", JSON.stringify(updatedUsers));

  return { success: true, message: "User registered successfully" };
};

// Authenticate a user
export const loginUser = (credentials) => {
  const users = getUsers();
  const user = users.find((u) => u.username === credentials.username);

  if (!user) {
    return { success: false, message: "Username does not exist" };
  }

  if (user.password !== credentials.password) {
    return { success: false, message: "Incorrect password" };
  }

  // Store user info in localStorage
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("currentUser", user.username);

  return { success: true, user: { username: user.username } };
};

// Check if user is logged in
export const isAuthenticated = () => {
  return localStorage.getItem("isLoggedIn") === "true";
};

// Logout user
export const logoutUser = () => {
  localStorage.removeItem("currentUser");
  localStorage.removeItem("isLoggedIn");
};

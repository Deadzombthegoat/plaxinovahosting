// script.js

// Get the buttons by their IDs
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');

// Add click event listeners to each button
loginBtn.addEventListener('click', () => {
    // Redirect to login page
    window.location.href = 'login.html'; // Adjust the path as needed
});

registerBtn.addEventListener('click', () => {
    // Redirect to registration page
    window.location.href = 'register.html'; // Adjust the path as needed
});

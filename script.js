// script.js

const API_BASE_URL = "https://panel.plaxinova.online/api/client"; // Your Pterodactyl API base URL
const API_KEY = "ptla_CLy5Ut6WGIftwGfczPuiGzB3Ni4kfNqhictlwCTL8TE"; // Your provided API key

// Check if user is logged in
function isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

// Redirect based on login status
function redirectToAppropriatePage() {
    if (isLoggedIn()) {
        window.location.href = 'dashboard.html'; // Redirect to the dashboard if logged in
    }
}

// Handle login form submission
async function handleLogin(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`${API_BASE_URL}/authentication`, {
            method: 'POST',
            headers: {
                'Accept': 'Application/vnd.pterodactyl.v1+json',
                'Authorization': `Bearer ${API_KEY}`, // Use API key for requests
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password }) // Send login data
        });

        const data = await response.json();

        if (response.ok) {
            // Set login status and redirect to the dashboard
            localStorage.setItem('isLoggedIn', 'true'); // Store login status
            window.location.href = 'dashboard.html'; // Redirect to dashboard
        } else {
            document.getElementById('error-message').innerText = data.errors ? data.errors.join(', ') : "Login failed";
        }
    } catch (error) {
        document.getElementById('error-message').innerText = "An error occurred: " + error.message;
    }
}

// Handle registration form submission
async function handleRegistration(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    // First, create the user in your website's database (optional, depends on your setup)
    try {
        // Assuming you have an endpoint to handle website registration
        const websiteResponse = await fetch('/api/website/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password }) // Send registration data
        });

        if (!websiteResponse.ok) {
            const websiteData = await websiteResponse.json();
            document.getElementById('register-error-message').innerText = websiteData.errors ? websiteData.errors.join(', ') : "Website registration failed";
            return;
        }

        // Now create the user on the Pterodactyl panel
        const panelResponse = await fetch(`${API_BASE_URL}/users`, {
            method: 'POST',
            headers: {
                'Accept': 'Application/vnd.pterodactyl.v1+json',
                'Authorization': `Bearer ${API_KEY}`, // Use API key for requests
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password }) // Send registration data
        });

        const panelData = await panelResponse.json();

        if (panelResponse.ok) {
            // On successful registration, set the login status
            localStorage.setItem('isLoggedIn', 'true'); // Store login status
            window.location.href = 'dashboard.html'; // Redirect to the dashboard
        } else {
            document.getElementById('register-error-message').innerText = panelData.errors ? panelData.errors.join(', ') : "Pterodactyl user creation failed";
        }
    } catch (error) {
        document.getElementById('register-error-message').innerText = "An error occurred: " + error.message;
    }
}

// Run at the start of the script
redirectToAppropriatePage();

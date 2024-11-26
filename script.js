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
        window.location.href = 'dashboard'; // Redirect to the dashboard if logged in
    }
}

// Handle login form submission
async function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`${API_BASE_URL}/authentication`, {
            method: 'POST',
            headers: {
                'Accept': 'Application/vnd.pterodactyl.v1+json',
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'dashboard'; // Redirect to dashboard
        } else {
            const data = await response.json();
            document.getElementById('error-message').innerText = data.errors ? data.errors.join(', ') : "Login failed";
        }
    } catch (error) {
        document.getElementById('error-message').innerText = "An error occurred: " + error.message;
    }
}

// Handle registration form submission
async function handleRegistration(event) {
    event.preventDefault();

    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    try {
        const websiteResponse = await fetch('/api/website/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });

        if (!websiteResponse.ok) {
            const websiteData = await websiteResponse.json();
            document.getElementById('register-error-message').innerText = websiteData.errors ? websiteData.errors.join(', ') : "Website registration failed";
            return;
        }

        const panelResponse = await fetch(`${API_BASE_URL}/users`, {
            method: 'POST',
            headers: {
                'Accept': 'Application/vnd.pterodactyl.v1+json',
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });

        if (panelResponse.ok) {
            window.location.href = 'login'; // Redirect to login after registration
        } else {
            const panelData = await panelResponse.json();
            document.getElementById('register-error-message').innerText = panelData.errors ? panelData.errors.join(', ') : "Pterodactyl user creation failed";
        }
    } catch (error) {
        document.getElementById('register-error-message').innerText = "An error occurred: " + error.message;
    }
}

// Run at the start of the script
redirectToAppropriatePage();

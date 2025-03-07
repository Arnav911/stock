const API_URL = "http://localhost:5000";

// Fetch user ID from token
function getUserIdFromToken() {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "index.html"; // Redirect if not logged in
        return;
    }
    const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT
    return payload.user_id;
}

// Add Stock Entry
async function addStock() {
    const user_id = getUserIdFromToken();
    const crop_name = document.getElementById("crop_name").value;
    const quantity = document.getElementById("quantity").value;

    const res = await fetch(`${API_URL}/add-stock`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ user_id, crop_name, quantity })
    });

    const data = await res.json();
    if (res.ok) {
        alert(data.message);
        loadStock(); // Refresh stock table
    } else {
        alert(data.error);
    }
}

// Fetch and Display Stock Data
async function loadStock() {
    const user_id = getUserIdFromToken();
    const res = await fetch(`${API_URL}/stocks/${user_id}`);
    const stocks = await res.json();

    const stockTable = document.getElementById("stockTable");
    stockTable.innerHTML = ""; // Clear previous data

    stocks.forEach(stock => {
        const row = `<tr>
            <td>${stock.crop_name}</td>
            <td>${stock.quantity}</td>
        </tr>`;
        stockTable.innerHTML += row;
    });
}

// Logout Function
function logout() {
    localStorage.removeItem("token");
    window.location.href = "index.html"; // Redirect to login
}

// Load stock data when page loads
window.onload = loadStock;

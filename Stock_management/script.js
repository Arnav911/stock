async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
  });

  const data = await res.json();
  if (res.ok) {
      localStorage.setItem("token", data.token);
      window.location.href = "dashboard.html"; // Redirect to dashboard
  } else {
      alert(data.error);
  }
}

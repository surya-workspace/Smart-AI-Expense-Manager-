/* script.js
   Handles: register, login, store user in localStorage, redirect to dashboard.
   Assumes backend API base is at http://127.0.0.1:5000/api
*/

const API_BASE = "http://127.0.0.1:5000/api";

// helper: show a simple alert boxed message (replace with nicer UI if you want)
function showMessage(msg) {
  alert(msg);
}

// --- REGISTER ---
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const payload = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      password: form.password.value
    };

    try {
      const res = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.status === 201) {
        showMessage("Registration successful — please login.");
        // redirect to login page
        window.location.href = "loginpage.html";
      } else {
        // show server message if any
        showMessage(data.error || data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Network error (register):", err);
      showMessage("Network error — cannot reach the server. Is backend running?");
    }
  });
}

// --- LOGIN ---
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const payload = {
      email: form.email.value.trim(),
      password: form.password.value
    };

    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok) {
        // Save basic user info for future requests
        const user = {
          user_id: data.user_id,
          name: data.name,
          email: data.email
        };
        localStorage.setItem("smart_expense_user", JSON.stringify(user));
        // redirect to dashboard page
        window.location.href = "dashboardpage.html";
      } else {
        showMessage(data.error || data.message || "Login failed");
      }
    } catch (err) {
      console.error("Network error (login):", err);
      showMessage("Network error — cannot reach the server. Is backend running?");
    }
  });
}

// --- When Dashboard loads, you can read user like this:
// const user = JSON.parse(localStorage.getItem("smart_expense_user"));
// if (!user) { window.location.href = "loginpage.html"; } // protect pages

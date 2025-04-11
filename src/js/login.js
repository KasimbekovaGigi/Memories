// Aurh Section: Login and Register 
const loginLink = document.getElementById("login-link");
const registerLink = document.querySelector(".register-link a");
const forgotLink = document.getElementById("forgot-link");


const loginForm = document.querySelector(".login");
const regForm = document.querySelector(".reg");
const forgotForm = document.querySelector(".forgot");


const loginButton = document.getElementById("login-btn");
const regButton = document.getElementById("reg-btn");
const forgotBtn = document.getElementById("forgot-btn");


registerLink.addEventListener("click", function (event) {
  event.preventDefault();
  loginForm.classList.add("hidden");
  regForm.classList.remove("hidden");
  forgotForm.classList.add("hidden");
});


loginLink.addEventListener("click", function (event) {
  event.preventDefault();
  regForm.classList.add("hidden");
  loginForm.classList.remove("hidden");
  forgotForm.classList.add("hidden");
});

// Event Listener for Forgot Password link
forgotLink.addEventListener("click", function (event) {
  event.preventDefault();
  loginForm.classList.add("hidden");
  regForm.classList.add("hidden");
  forgotForm.classList.remove("hidden");
});

// Event Listener to submit the login form
loginButton.addEventListener("click", function (event) {
  event.preventDefault();

  // Collect user input
  const username = document.querySelector(".login-username").value;
  const password = document.querySelector(".login-password").value;

  // Send login data to the backend
  fetch("http://localhost:5000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.message === "Login successful") {
        // Handle successful login
        alert("Login successful!");
        localStorage.setItem("authToken", data.token);
        window.location.href = "memories.html";
      } else {
        // Show error message if login fails
        alert(data.message);
      }
    })
    .catch(error => {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    });
});

// Event Listener to submit the registration form
regButton.addEventListener("click", function (event) {
  event.preventDefault();

  const username = document.querySelector(".reg-username").value;
  const email = document.querySelector(".reg-email").value;
  const password = document.querySelector(".reg-password").value;
  const confirmPassword = document.querySelector(".reg-confirm-password").value;

  // Add validation logic
  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  // Send registration data to the backend
  fetch("http://localhost:5000/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      email: email,
      password: password,
    }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.message === "Registration successful") {
        alert("Registration successful!");
        regForm.classList.add("hidden");
        loginForm.classList.remove("hidden");
      } else {
        alert(data.message);
      }
    })
    .catch(error => {
      console.error("Error during registration:", error);
      alert("An error occurred. Please try again.");
    });
});

// Event Listener to submit the forgot password form
forgotBtn.addEventListener("click", function (event) {
  event.preventDefault();
  const email = document.querySelector(".forgot-input").value;

  // Handle password reset logic here (for example, send a reset email)
  fetch("http://localhost:5000/api/forgot-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.message === "Check your inbox to reset your password") {
        alert("Check your inbox to reset your password!");
        forgotForm.classList.add("hidden");
        loginForm.classList.remove("hidden");
      } else {
        alert(data.message);
      }
    })
    .catch(error => {
      console.error("Error during password reset:", error);
      alert("An error occurred. Please try again.");
    });
});

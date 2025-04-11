const express = require("express");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const router = express.Router();

// Dummy database (simulating a simple storage)
let users = [];  // Replace with a real database in production

// Registration route
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  console.log(`Received registration request: Username: ${username}, Email: ${email}`);

  // Validate the input data
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if the user already exists
  const userExists = users.find(user => user.email === email);
  if (userExists) {
    console.log(`User with email ${email} already exists.`);
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Add user to the dummy database
  users.push({ username, email, password: hashedPassword });

  console.log(`New user registered: Username: ${username}, Email: ${email}`);

  res.status(200).json({ message: "Registration successful" });
});

// Login route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  console.log(`Login attempt: Username: ${username}`);

  // Find user by username
  const user = users.find(user => user.username === username);
  if (!user) {
    console.log(`No user found with username: ${username}`);
    return res.status(400).json({ message: "No account registered with this username" });
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    console.log(`Incorrect password for username: ${username}`);
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // Log email and password to the console
  console.log(`Login successful! Email: ${user.email}, Password: ${password}`);

  // Send response with user details (email and password)
  res.status(200).json({
    message: "Login successful",
    email: user.email,
    password: password  // Returning email and password (Not recommended for production)
  });
});

// Forgot Password route
router.post("/forgot-password", (req, res) => {
  const { email } = req.body;

  console.log(`Password reset request for email: ${email}`);

  const user = users.find(user => user.email === email);
  if (!user) {
    console.log(`No user found with email: ${email}`);
    return res.status(400).json({ message: "No user found with this email" });
  }

  // Send password reset email (using Nodemailer)
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "your-email@gmail.com",
      pass: "your-email-password",
    },
  });

  let mailOptions = {
    from: "your-email@gmail.com",
    to: email,
    subject: "Password Reset Request",
    text: "Click on the link to reset your password: https://yourdomain.com/reset-password",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(`Error sending password reset email to ${email}:`, error);
      return res.status(500).json({ message: "Error sending email" });
    } else {
      console.log(`Password reset email sent to ${email}.`);
      return res.status(200).json({ message: "Check your inbox to reset your password" });
    }
  });
});

module.exports = router;  // Export the router

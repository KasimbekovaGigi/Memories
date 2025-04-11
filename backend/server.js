// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRouter = require("./routers/authRouter"); // Import the router

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Use the authentication routes from authRouter
app.use("/api", authRouter); // All routes in authRouter will be prefixed with '/api'

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const express = require("express");

const app = express();
const port = 3000;

// Route 1: Home route
app.get("/", (req, res) => {
  res.send("Hey, I am Gowtham!");
});

// Route 2: About route
app.get("/about", (req, res) => {
  res.send("This is a simple Express project.");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

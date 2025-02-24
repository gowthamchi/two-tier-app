const express = require("express");
const mysql = require("mysql2");
const path = require("path");

const app = express();
const port = 3000;

// Set EJS as the view engine
app.set("view engine", "ejs");

// Set the folder for the views (where your .ejs files will go)
app.set("views", path.join(__dirname, "views"));

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: "localhost",   // Host where your MySQL server is running
  user: "root",        // Your MySQL username
  password: "1234",        // Your MySQL password
  database: "testdb",  // The database you want to connect to
});

// Connect to MySQL database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.stack);
    return;
  }
  console.log("Connected to MySQL!");
});

// Route to fetch all users and render the list in an EJS template
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      res.status(500).send("Error fetching users");
      return;
    }
    res.render("users", { users: results });  // Pass data to the EJS template
  });
});

// Route to render the "add user" form
app.get("/add-user", (req, res) => {
  res.render("add-user");  // Render the add user form
});

// Route to handle adding a new user
app.get("/add-user-action", (req, res) => {
  const name = req.query.name;  // Get name from query string
  const age = req.query.age;    // Get age from query string

  // Insert the new user into the 'users' table
  db.query(
    "INSERT INTO users (name, age) VALUES (?, ?)",
    [name, age],
    (err, result) => {
      if (err) {
        console.error("Error inserting user:", err);
        res.status(500).send("Error inserting user");
        return;
      }
      res.redirect("/users");  // Redirect to the users list after adding the user
    }
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

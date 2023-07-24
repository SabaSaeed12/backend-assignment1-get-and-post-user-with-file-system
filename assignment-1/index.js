const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());
//post user
app.post("/create-user", (req, res) => {
  const { username, email, gender } = req.body;

  if (!username || !email || !gender) {
    return res.status(400).json({ error: "username email and gender are required." });
  }

  const user = { username, email, gender };

  fs.writeFile("users.json", JSON.stringify(user), () => {
    
    return res.json({ message: "User created successfully!" });
  });
});

//get the user
app.get("/get-user", (req, res) => {
  fs.readFile("users.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading user data:", err);
      return res.status(500).json({ error: "Error reading user data." });
    }
    if (!data) {
      return res.status(404).json({ error: "User not found." });
    }

    const user = JSON.parse(data);
    return res.json(user);
  });
});

app.listen(8000);

const express = require("express");
const cors = require("cors");
const { sequelize } = require("./config/db");
const { authentication } = require("./middleware/authentace");
const { User } = require("./models/user.model");

const app = express();
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Base API");
});
// API endpoint to insert a new user
app.post("/insert", async (req, res) => {
  try {
    const { user_email, user_password } = req.body;
    console.log(req.body);
    await User.create({ user_email, user_password });
    res.json({ message: "User added successfully" });
  } catch (error) {
    console.error("Error while adding a new user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// API endpoint to fetch user details
app.get("/details/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const user = await User.findOne({ where: { user_id } });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error while fetching user details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// API endpoint to fetch user details
app.get("/details", async (req, res) => {
  try {
    const user = await User.findAll();
    res.json(user);
  } catch (error) {
    console.error("Error while fetching user details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// API endpoint to update user details
app.put("/update", async (req, res) => {
  try {
    const { user_id, ...updatedData } = req.body;
    const [rowsUpdated] = await User.update(updatedData, {
      where: { user_id },
    });
    if (rowsUpdated === 1) {
      res.json({ message: "User details updated successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error while updating user details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// API endpoint to fetch user image
app.get("/image/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const user = await User.findOne({
      attributes: ["user_image"],
      where: { user_id },
    });
    if (user && user.user_image) {
      res.json({ user_image: user.user_image });
    } else {
      res.status(404).json({ message: "User image not found" });
    }
  } catch (error) {
    console.error("Error while fetching user image:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// API endpoint to delete a user
app.delete("/delete/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const rowsDeleted = await User.destroy({ where: { user_id } });
    if (rowsDeleted === 1) {
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error while deleting a user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(8080, async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Connected");
  } catch (err) {
    console.log("Error while connecting");
    console.log(err);
  }

  console.log("Listening on port 8080");
});

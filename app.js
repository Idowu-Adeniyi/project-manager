const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables from .env file
dotenv.config();

// Set strictQuery option
mongoose.set("strictQuery", true);
// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.error("MongoDB connection error:", err));

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Mongoose models
const Project = require("./models/Project");
const Skill = require("./models/Skill");

// Set up the landing page (index page)
app.get("/", (req, res) => {
  res.render("index", { title: "Portfolio App" });
});

// Route to view projects
app.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find(); // Fetch all projects from DB
    res.render("projects", { projects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).send("Error fetching projects");
  }
});

// Route to view skills
app.get("/skills", async (req, res) => {
  try {
    const skills = await Skill.find(); // Fetch all skills from DB
    res.render("skills", { skills });
  } catch (error) {
    console.error("Error fetching skills:", error);
    res.status(500).send("Error fetching skills");
  }
});

// Admin page route
app.get("/admin", (req, res) => {
  res.render("admin", { title: "Admin Page" });
});

// Endpoint to add a project
app.post("/admin/addProject", async (req, res) => {
  const { projectName, projectDescription, projectLink } = req.body;

  try {
    const newProject = new Project({
      projectName,
      projectDescription,
      projectLink,
    });
    await newProject.save();
    console.log("Project saved:", newProject);
    res.redirect("/admin"); // Redirect back to admin page after saving project
  } catch (error) {
    console.error("Error saving project:", error.message);
    res.status(500).send("Error saving project");
  }
});

// Endpoint to add a skill
app.post("/admin/addSkill", async (req, res) => {
  const { skillName, skillLevel } = req.body;

  try {
    const newSkill = new Skill({
      skillName,
      skillLevel,
    });
    await newSkill.save();
    console.log("Skill saved:", newSkill);
    res.redirect("/admin"); // Redirect back to admin page after saving skill
  } catch (error) {
    console.error("Error saving skill:", error.message);
    res.status(500).send("Error saving skill");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

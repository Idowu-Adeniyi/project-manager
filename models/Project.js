const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  projectDescription: { type: String, required: true },
  projectLink: { type: String, required: true },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;

const Project = require("../models/Project");
const Skill = require("../models/Skill");

exports.getAdminPage = (req, res) => {
  res.render("admin", { title: "Admin Page" });
};

exports.getAddSkillPage = (req, res) => {
  res.render("addSkill", { title: "Add Skill" });
};

exports.postAddSkill = async (req, res) => {
  const { name, level } = req.body;
  const newSkill = new Skill({ name, level });
  await newSkill.save();
  res.redirect("/admin");
};

exports.getAddProjectPage = (req, res) => {
  res.render("addProject", { title: "Add Project" });
};

exports.postAddProject = async (req, res) => {
  const { name, description, link } = req.body;
  const newProject = new Project({ name, description, link });
  await newProject.save();
  res.redirect("/admin");
};

exports.getAllProjects = async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
};

exports.getAllSkills = async (req, res) => {
  const skills = await Skill.find();
  res.json(skills);
};

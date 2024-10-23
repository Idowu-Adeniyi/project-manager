const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/admin", adminController.getAdminPage);
router.get("/admin/addSkill", adminController.getAddSkillPage);
router.post("/admin/addSkill", adminController.postAddSkill);
router.get("/admin/addProject", adminController.getAddProjectPage);
router.post("/admin/addProject", adminController.postAddProject);
router.get("/api/projects", adminController.getAllProjects);
router.get("/api/skills", adminController.getAllSkills);

module.exports = router;

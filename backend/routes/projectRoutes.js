const express = require("express");
const router = express.Router();
const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  addUserToProject,
} = require("../controllers/projectController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getProjects);
router.get("/:id", protect, getProjectById);
router.post("/create", protect, createProject);
router.patch("/update/:id", protect, updateProject);
router.delete("/delete/:id", protect, deleteProject);
router.patch("/addUser/:id", protect, addUserToProject);

module.exports = router;

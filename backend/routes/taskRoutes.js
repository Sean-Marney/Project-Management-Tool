const express = require("express");
const router = express.Router({ mergeParams: true });
const { protect } = require("../middleware/authMiddleware");
const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

router.get("/", protect, getTasks);
router.get("/:taskId", getTaskById);
router.post("/create", protect, createTask);
router.patch("/update/:taskId", protect, updateTask);
router.delete("/delete/:taskId", protect, deleteTask);

module.exports = router;

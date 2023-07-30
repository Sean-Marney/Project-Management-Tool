const express = require("express");
const router = express.Router({ mergeParams: true });
const { protect } = require("../middleware/authMiddleware");
const {
  getSubtasks,
  getSubtaskById,
  createSubtask,
  updateSubtask,
  deleteSubtask,
} = require("../controllers/subtaskController");

router.get("/", protect, getSubtasks);
router.get("/:subtaskId", protect, getSubtaskById);
router.post("/create", protect, createSubtask);
router.patch("/update/:subtaskId", protect, updateSubtask);
router.delete("/delete/:subtaskId", protect, deleteSubtask);

module.exports = router;

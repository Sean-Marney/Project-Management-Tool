const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    required: true,
    enum: ["To Do", "In Progress", "Done"],
    default: "To Do",
  },
  priority: {
    type: String,
    required: true,
    enum: ["Low", "Medium", "High"],
    default: "Medium",
  },
  deadline: {
    type: Date,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  assignees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;

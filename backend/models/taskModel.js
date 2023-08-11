const mongoose = require("mongoose");
const Subtask = require("./subtaskModel");

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

// Middleware to cascade delete related subtasks
TaskSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    await Subtask.deleteMany({ task: this._id });
    next();
  }
);

const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;

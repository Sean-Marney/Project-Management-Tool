const mongoose = require("mongoose");

const SubtaskSchema = mongoose.Schema({
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
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
    required: true,
  },
});

const Subtask = mongoose.model("Subtask", SubtaskSchema);
module.exports = Subtask;

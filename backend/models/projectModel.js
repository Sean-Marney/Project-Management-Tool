const mongoose = require("mongoose");
const Task = require("./taskModel");

const ProjectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Middleware to cascade delete related tasks
ProjectSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    const tasks = await Task.find({ project: this._id });
    for (let task of tasks) {
      await task.deleteOne(); // This will trigger the TaskSchema pre-delete middleware.
    }
    next();
  }
);

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;

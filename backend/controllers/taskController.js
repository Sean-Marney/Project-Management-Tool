const Project = require("../models/projectModel");
const Task = require("../models/taskModel");

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId });

    res.status(200).json({ tasks });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

const createTask = async (req, res) => {
  const { name, description } = req.body;

  try {
    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const task = new Task({
      name,
      description,
      project: req.params.projectId,
    });

    await task.save();

    res.status(201).json({ task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

const updateTask = async (req, res) => {
  const { name, description } = req.body;

  try {
    const task = await Task.findById(req.params.taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.name = name;
    task.description = description;

    await task.save();

    res.status(200).json({ task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.deleteOne();

    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask };

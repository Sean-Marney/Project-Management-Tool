const Task = require("../models/taskModel");
const Subtask = require("../models/subtaskModel");

const getSubtasks = async (req, res) => {
  try {
    const subtasks = await Subtask.find({ task: req.params.taskId });

    res.status(200).json({ subtasks });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

const getSubtaskById = async (req, res) => {
  try {
    const subtask = await Subtask.findById(req.params.subtaskId);

    if (!subtask) {
      return res.status(404).json({ message: "Subtask not found" });
    }

    res.status(200).json({ subtask });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

const createSubtask = async (req, res) => {
  const { name, description } = req.body;

  try {
    const task = await Task.findById(req.params.taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const subtask = new Subtask({
      name,
      description,
      task: req.params.taskId,
    });

    await subtask.save();

    res.status(201).json({ subtask });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

const updateSubtask = async (req, res) => {
  const { name, description } = req.body;

  try {
    const subtask = await Subtask.findById(req.params.subtaskId);

    if (!subtask) {
      return res.status(404).json({ message: "Subtask not found" });
    }

    subtask.name = name;
    subtask.description = description;

    await subtask.save();

    res.status(200).json({ subtask });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

const deleteSubtask = async (req, res) => {
  try {
    const subtask = await Subtask.findById(req.params.subtaskId);

    if (!subtask) {
      return res.status(404).json({ message: "Subtask not found" });
    }

    await subtask.deleteOne();

    res.status(200).json({ message: "Subtask deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

module.exports = {
  getSubtasks,
  getSubtaskById,
  createSubtask,
  updateSubtask,
  deleteSubtask,
};

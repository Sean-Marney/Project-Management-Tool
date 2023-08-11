const Project = require("../models/projectModel");

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();

    res.status(200).json({ projects });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ project });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

const createProject = async (req, res) => {
  const { name, description } = req.body;

  try {
    const project = new Project({
      name,
      description,
      owner: req.user.id, // from auth middleware
    });

    await project.save();

    res.status(201).json({ project });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

const updateProject = async (req, res) => {
  const { name, description } = req.body;

  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Ensure the user owns the project
    if (project.owner.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorised" });
    }

    project.name = name;
    project.description = description;

    await project.save();

    res.status(200).json({ project });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Ensure the user owns the project
    if (project.owner.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorised" });
    }

    await project.deleteOne();

    res.status(200).json({ message: "Project deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};

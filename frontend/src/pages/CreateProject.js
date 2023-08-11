import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CreateProject() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const project = {
      name,
      description,
    };

    try {
      const res = await axios.post(
        "http://localhost:4000/api/projects/create",
        project,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setName("");
      setDescription("");

      alert("Project created successfully");

      navigate(`/projects/${res.data.project._id}`);
    } catch (error) {
      alert("Failed to create project");
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Create Project</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Project Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter a Project Name"
            required
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter a Project Description"
            required
          />
        </div>

        <button type="submit">Add Project</button>
      </form>
    </div>
  );
}

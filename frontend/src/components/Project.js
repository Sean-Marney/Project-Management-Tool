import "../sass/index.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";

export default function Project() {
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [date, setDate] = useState("");
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    getProject();
  }, []);

  useEffect(() => {
    if (project) {
      getTasks();
    }
  }, [project]);

  const getProject = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (res.data.project) {
        setProject(res.data.project);
        setDate(moment(res.data.project.createdAt).format("MMMM D YYYY"));
      } else {
        setProject(null);
      }
    } catch (error) {
      console.log(error);
      setProject(null);
    }
  };

  const getTasks = async () => {
    try {
      if (!project) {
        return;
      }

      const res = await axios.get(
        `http://localhost:4000/api/projects/${project._id}/tasks`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (res.data.tasks) {
        let arrTasks = [];

        for (let i = 0; i < res.data.tasks.length; i++) {
          arrTasks.push(res.data.tasks[i]);
        }

        setTasks(arrTasks);
      } else {
        setTasks(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProject = async () => {
    try {
      const userConfirmed = window.confirm(
        "Are you sure you want to delete this project?"
      );

      if (userConfirmed) {
        await axios.delete(`http://localhost:4000/api/projects/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        navigate("/projects");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!project) {
    return <div>Project not found.</div>;
  }

  return (
    <div>
      <h1>{project.name}</h1>
      <p>{project.description}</p>
      <p>Project created {date}</p>
      <button onClick={() => deleteProject()}>Delete Project</button>

      <h2>Tasks</h2>
      <div className="task-container">
        {tasks.map((task) => (
          <div key={task._id} className="task-box">
            <Link to={`/projects/${project._id}/tasks/${task._id}`}>
              <h3>
                <p>{task.name}</p>
              </h3>
              <p>{task.description}</p>
              <p className="priority">{task.priority}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

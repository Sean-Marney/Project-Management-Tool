import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function Task() {
  const { user } = useSelector((state) => state.auth);
  const { projectId, taskId } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    getTask();
  }, []);

  const getTask = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/projects/${projectId}/tasks/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setTask(res.data.task);
    } catch (error) {
      console.log(error);
    }
  };

  if (!task) {
    return <div>Task not found.</div>;
  }

  return (
    <div>
      <h1>
        <p>{task.name}</p>
      </h1>
      <p>{task.description}</p>
      <p>{task.status}</p>
      <p>{task.priority}</p>
      <p>{task.project}</p>
    </div>
  );
}

import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import moment from "moment";

export default function Project() {
  const [project, setProject] = useState([]);
  const { id } = useParams();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    getProject();
  }, []);

  const getProject = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setProject(res.data.project);
    } catch (error) {
      console.log(error);
    }
  };

  const date = moment().format("MMMM D YYYY");

  return (
    <div>
      <h1>{project.name}</h1>
      <p>{project.description}</p>
      <p>Project created {date}</p>
    </div>
  );
}

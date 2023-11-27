import "../../sass/index.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "../../components/Spinner";
import axios from "axios";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  // Gets current user
  const { user } = useSelector((state) => state.auth);

  const getProjects = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/projects", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setProjects(res.data.projects);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  if (!user || !user.user) {
    return <Spinner />;
  }

  return (
    <>
      <section className="grid-layout">
        <div>
          <Link className="block-element" to={"/projects/create"}>
            <h2 className="create-project-text">Create Project</h2>
            <p>Create a new project here</p>
          </Link>
        </div>
        {projects &&
          projects.map((project, index) => (
            <div key={index}>
              <Link
                className="block-element"
                to={`/projects/${project._id}`}
                target="_blank"
              >
                <h2 className="text-xl font-bold">{project.name}</h2>
                <p>{project.description}</p>
              </Link>
            </div>
          ))}
      </section>
    </>
  );
}

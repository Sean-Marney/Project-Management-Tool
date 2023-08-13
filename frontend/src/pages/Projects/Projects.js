import "../../styles/styles.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "../../components/Spinner";
import axios from "axios";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  const navigate = useNavigate();

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

  // useEffect(() => {
  //   if (!user) {
  //     navigate("/login");
  //   }
  // }, [user, navigate]);

  useEffect(() => {
    getProjects();
  }, []);

  if (!user || !user.user) {
    return <Spinner />;
  }

  return (
    <>
      <section className="grid-layout">
        <div className="block-element">
          <Link to={"/projects/create"}>
            <h2 className="text-xl font-bold">Create Project</h2>
            <p>Create a new project here</p>
          </Link>
        </div>
        {projects &&
          projects.map((project, index) => (
            <div key={index} className="block-element">
              <Link to={`/projects/${project._id}`} target="_blank">
                <h2 className="text-xl font-bold">{project.name}</h2>
                <p>{project.description}</p>
              </Link>
            </div>
          ))}
      </section>
    </>
  );
}

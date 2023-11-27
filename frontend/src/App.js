import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OutletGuard from "./components/OutletGuard";

import Header from "./components/Header/Header";
import Projects from "./pages/Projects/Projects";
import Login from "./pages/Login/Login";
import Register from "./pages/Register";
import Project from "./components/Project";
import CreateProject from "./pages/CreateProject";
import NotFound from "./components/NotFound";
import Task from "./components/Task";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Projects />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/projects" element={<OutletGuard />}>
              <Route index element={<Projects />} />
              <Route path=":id" element={<Project />} />
              <Route path="create" element={<CreateProject />} />
              <Route path=":projectId/tasks/:taskId" element={<Task />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

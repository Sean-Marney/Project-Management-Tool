import "./Header.scss";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="container">
        <Link to="/projects" className="logo-text">
          Project Management
        </Link>
        <ul className="nav-links">
          {user ? (
            <li>
              <button onClick={onLogout} className="logout-btn">
                <FaSignOutAlt className="icon" />
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login" className="nav-link">
                  Login <FaSignInAlt className="icon" />
                </Link>
              </li>
              <li>
                <Link to="/register" className="nav-link">
                  Register <FaUser className="icon" />
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}

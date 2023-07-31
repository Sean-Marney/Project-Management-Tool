import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header className="bg-gray-800 text-gray-100 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-6 py-3">
        <div>
          <Link
            to="/"
            className="text-2xl font-bold text-gray-100 hover:text-gray-300 transition duration-200"
          >
            Dashboard
          </Link>
        </div>
        <ul className="flex items-center">
          {user ? (
            <li className="mr-6">
              <button
                onClick={onLogout}
                className="flex items-center text-gray-100 hover:text-gray-300 transition duration-200"
              >
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </li>
          ) : (
            <>
              <li className="mr-6">
                <Link
                  to="/login"
                  className="flex items-center text-gray-100 hover:text-gray-300 transition duration-200"
                >
                  <FaSignInAlt className="mr-2" /> Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="flex items-center text-gray-100 hover:text-gray-300 transition duration-200"
                >
                  <FaUser className="mr-2" /> Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}

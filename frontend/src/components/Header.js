import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
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
        </ul>
      </div>
    </header>
  );
}

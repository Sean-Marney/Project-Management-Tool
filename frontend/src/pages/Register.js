import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-700 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-gray-800 p-6 rounded-md shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-100">
            <FaUser className="mb-2" /> Register
          </h2>
          <p className="mt-2 text-center text-sm text-gray-300">
            Create an account
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <div>
            <input
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-500 placeholder-gray-500 text-gray-200 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={name}
              onChange={onChange}
            />
          </div>

          <div>
            <input
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-500 placeholder-gray-500 text-gray-200 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={onChange}
            />
          </div>

          <div>
            <input
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-500 placeholder-gray-500 text-gray-200 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={onChange}
            />
          </div>

          <div>
            <input
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-500 placeholder-gray-500 text-gray-200 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              type="password"
              id="password2"
              name="password2"
              placeholder="Confirm your password"
              value={password2}
              onChange={onChange}
            />
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

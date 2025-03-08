import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../authService";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState("");
  const navigate = useNavigate();

  // Validate Username
  const validateUsername = (username) => {
    if (!username) return "Username is required";
    return "";
  };

  // Validate Password
  const validatePassword = (password) => {
    if (!password) return "Password is required";
    return "";
  };

  // Handle Input Changes with real-time validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    let newErrors = { ...errors };

    if (name === "username") newErrors.username = validateUsername(value);
    if (name === "password") newErrors.password = validatePassword(value);

    setErrors(newErrors);
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      username: validateUsername(formData.username),
      password: validatePassword(formData.password),
    };

    setErrors(newErrors);
    setGlobalError("");

    if (Object.values(newErrors).every((error) => error === "")) {
      const result = loginUser(formData);

      if (result.success) {
        // Store user session in localStorage
        localStorage.setItem("currentUser", result.user.username);
        localStorage.setItem("isLoggedIn", "true");

        // Navigate to landing page
        navigate("/landing");
      } else {
        setGlobalError(result.message);
      }
    } else {
      setGlobalError("Please fix the errors before proceeding.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Field */}
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Global Authentication Errors */}
          {globalError && (
            <p className="text-red-500 text-sm text-center mb-2">
              {globalError}
            </p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

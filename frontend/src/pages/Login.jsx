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

  // Handle Input Changes
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
      const result = loginUser(formData.username, formData.password);

      if (result.success) {
        alert("Login successful! Redirecting to dashboard...");
        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        setGlobalError(result.message);
      }
    } else {
      setGlobalError("Please fix the errors before proceeding.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/background.jpg')" }}>
      <div className="bg-white p-8 rounded-2xl shadow-lg w-120">
        <h1 className="text-4xl mb-6 font-bold text-center text-green-500">
          SecureConnect!
        </h1>
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Login to your account
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Enter your credentials to access your account
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Username Field */}
          <div>
            <label
              htmlFor="username"
              className="text-sm font-medium mb-1 -ml-1"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="enter your username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200 transition"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium mb-1 -ml-1"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200 transition"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Global Authentication Errors */}
          {globalError && (
            <p className="text-red-500 text-sm text-center mb-2 font-medium">
              {globalError}
            </p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={
              Object.values(errors).some((err) => err !== "") ||
              !formData.username ||
              !formData.password
            }
            className={`w-full font-semibold py-3 my-4 rounded-lg transition duration-300 shadow-md active:scale-95 ${
              Object.values(errors).some((err) => err !== "") ||
              !formData.username ||
              !formData.password
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            Login
          </button>
        </form>

        <p className="text-gray-500 text-center">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-green-500 font-semibold hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;

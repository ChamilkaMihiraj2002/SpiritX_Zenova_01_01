import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUser, getUsers } from "../authService";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const navigate = useNavigate();

  // Get existing usernames
  const usedUsernames = getUsers().map((user) => user.username);

  // Validate Username
  const validateUsername = (username) => {
    if (!username) return "Username is required";
    if (username.length < 8) return "Username must be at least 8 characters";
    if (usedUsernames.includes(username.toLowerCase()))
      return "Username is already taken";
    return "";
  };

  // Validate Password & Strength Indicator
  const validatePassword = (password) => {
    if (!password) return "Password is required";

    let error = "";
    if (!password.match(/[a-z]/)) error = "Must include a lowercase letter";
    else if (!password.match(/[A-Z]/))
      error = "Must include an uppercase letter";
    else if (!password.match(/[^a-zA-Z0-9]/))
      error = "Must include a special character";

    // Strength Indicator
    let strength = "Weak";
    if (password.length >= 12) strength = "Strong";
    else if (password.length >= 8) strength = "Medium";

    setPasswordStrength(strength);
    return error;
  };

  // Validate Confirm Password
  const validateConfirmPassword = (confirmPassword, password) => {
    if (!confirmPassword) return "Please confirm your password";
    return confirmPassword !== password ? "Passwords do not match" : "";
  };

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    let newErrors = { ...errors };

    if (name === "username") newErrors.username = validateUsername(value);
    if (name === "password") newErrors.password = validatePassword(value);
    if (name === "confirmPassword")
      newErrors.confirmPassword = validateConfirmPassword(
        value,
        formData.password
      );

    setErrors(newErrors);
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      username: validateUsername(formData.username),
      password: validatePassword(formData.password),
      confirmPassword: validateConfirmPassword(
        formData.confirmPassword,
        formData.password
      ),
    };

    setErrors(newErrors);
    setGlobalError("");

    if (Object.values(newErrors).every((error) => error === "")) {
      const result = addUser({
        username: formData.username,
        password: formData.password,
      });

      if (result.success) {
        alert("Signup successful! Redirecting to login...");
        // Redirect to login page after 2 seconds
        setTimeout(() => {
          navigate("/login");
        }, 2000);
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
        <h2 className="text-2xl font-semibold text-center mb-4">Signup</h2>
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
            {/* Password Strength Indicator */}
            {formData.password && (
              <p
                className={`text-sm mt-1 ${
                  passwordStrength === "Strong"
                    ? "text-green-500"
                    : passwordStrength === "Medium"
                    ? "text-yellow-500"
                    : "text-red-500"
                }`}
              >
                Strength: {passwordStrength}
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Global Authentication Errors */}
          {globalError && (
            <p className="text-red-500 text-sm text-center mb-2">
              {globalError}
            </p>
          )}

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;

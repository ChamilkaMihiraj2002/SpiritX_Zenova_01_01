import { useState } from "react";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [usedUsernames] = useState(["testuser", "admin", "user123"]); // Simulating existing usernames

  const validateUsername = (username) => {
    if (username.length < 8) return "Username must be at least 8 characters";
    if (usedUsernames.includes(username.toLowerCase()))
      return "Username is already taken";
    return "";
  };

  const validatePassword = (password) => {
    if (!password.match(/[a-z]/)) return "Must include a lowercase letter";
    if (!password.match(/[A-Z]/)) return "Must include an uppercase letter";
    if (!password.match(/[^a-zA-Z0-9]/))
      return "Must include a special character";
    return "";
  };

  const validateConfirmPassword = (confirmPassword, password) => {
    return confirmPassword !== password ? "Passwords do not match" : "";
  };

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

    if (Object.values(newErrors).every((error) => error === "")) {
      console.log("Signup Data:", formData);
      alert("Signup successful!");
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

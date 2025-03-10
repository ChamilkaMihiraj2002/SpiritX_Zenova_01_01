import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "", // Added email field
  });

  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const navigate = useNavigate();

  // Validate Username with API
  const validateUsername = async (username) => {
    if (!username) return "Username is required";
    if (username.length < 8) return "Username must be at least 8 characters";
    
    try {
      const response = await fetch(`http://localhost:3000/api/users/${username}`);
      const data = await response.json();
      
      if (!data.available) {
        return "Username is already taken";
      }
      return "";
    } catch (error) {
      console.error("Username validation error:", error);
      return "Error validating username";
    }
  };

  // Validate Email
  const validateEmail = (email) => {
    if (!email) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Invalid email format";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    let error = "";
    if (!password.match(/[a-z]/)) error = "Must include a lowercase letter";
    else if (!password.match(/[A-Z]/))
      error = "Must include an uppercase letter";
    else if (!password.match(/[^a-zA-Z0-9]/))
      error = "Must include a special character";
    setPasswordStrength(calculatePasswordStrength(password));
    return error;
  };

  const calculatePasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (password.match(/[a-z]/)) score++;
    if (password.match(/[A-Z]/)) score++;
    if (password.match(/[0-9]/)) score++;
    if (password.match(/[^a-zA-Z0-9]/)) score++;
    if (score <= 2) return "Weak";
    if (score <= 4) return "Medium";
    return "Strong";
  };

  const validateConfirmPassword = (confirmPassword, password) => {
    if (!confirmPassword) return "Please confirm your password";
    return confirmPassword !== password ? "Passwords do not match" : "";
  };


  // Handle Input Changes
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    let newErrors = { ...errors };
    if (name === "username") {
      newErrors.username = await validateUsername(value);
    }
    if (name === "email") {
      newErrors.email = validateEmail(value);
    }
    if (name === "password") {
      newErrors.password = validatePassword(value);
    }
    if (name === "confirmPassword") {
      newErrors.confirmPassword = validateConfirmPassword(value, formData.password);
    }

    setErrors(newErrors);
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          email: formData.email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Signup successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setGlobalError(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setGlobalError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/background.jpg')" }}>
      <div className="bg-white p-8 rounded-2xl shadow-lg w-120">
        <h1 className="text-4xl mb-6 font-bold text-center text-green-500">SecureConnect!</h1>
        <h2 className="text-2xl font-bold text-center text-gray-800">Create an account</h2>
        <p className="text-gray-500 text-center mb-6">Enter your credentials to create your account</p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-sm font-medium mb-1 -ml-1">Username</label>
            <input type="text" name="username" placeholder="Enter your username" value={formData.username} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-200"/>
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>
          {/* Email Field - New */}
          <div>
            <label htmlFor="email" className="text-sm font-medium mb-1 -ml-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200 transition"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="text-sm font-medium mb-1 -ml-1">Password</label>
            <input type="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-200"/>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            {formData.password && <p className={`text-sm mt-1 font-medium ${passwordStrength === "Strong" ? "text-green-500" : passwordStrength === "Medium" ? "text-yellow-500" : "text-red-500"}`}>Strength: {passwordStrength}</p>}
          </div>
          <div>
            <label className="text-sm font-medium mb-1 -ml-1">Confirm Password</label>
            <input type="password" name="confirmPassword" placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-200"/>
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>
          {globalError && <p className="text-red-500 text-sm text-center mb-2 font-medium">{globalError}</p>}
          <button type="submit" className={`w-full py-3 rounded-lg shadow-md ${Object.values(errors).some((err) => err) ? "bg-gray-400" : "bg-green-600 hover:bg-green-700 text-white"}`} disabled={Object.values(errors).some((err) => err)}>Signup</button>
        </form>
        <p className="text-gray-500 text-center">Already have an account? <a href="/login" className="text-green-500 font-semibold hover:underline">Login</a></p>
      </div>
    </div>
  );
}

export default Signup;

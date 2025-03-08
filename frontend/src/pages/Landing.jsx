import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const currentUser = localStorage.getItem("user");

    if (!isLoggedIn || !currentUser) {
      // If not logged in, redirect to login page
      navigate("/login");
    } else {
      setUsername(currentUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    // Clear all auth-related items
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
        <h1 className="text-2xl font-semibold mb-4">
          Welcome to the Dashboard
        </h1>
        <p className="text-xl mb-6">Hello, {username}!</p>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Landing;

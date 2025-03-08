import { useState } from "react";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  const [isSignup, setIsSignup] = useState(true);

  return (
    <div>
      {isSignup ? <Signup /> : <Login />}
      <button onClick={() => setIsSignup(!isSignup)}>
        {isSignup ? "Go to Login" : "Go to Signup"}
      </button>
    </div>
  );
}

export default App;

import { useState } from "react";
import "./register.scss";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navitage = useNavigate()

  const handleRegister = (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Invalid email format.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert("successfully created");
        setError("");
        navitage("/login")
      })
      .catch((error) => {
        setError("Failed to create an account. Please try again.");
      });
  };

return (
    <div className="registerWrapper">
      <div className="registerTitle">REGISTER</div>
      <div className="Register">
        <form onSubmit={handleRegister}>
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Register</button>
          {error && <span>{error}</span>}
        </form>
      </div>
      <div className="registerToLogin">
        <Link to="/login" style={{ textDecoration: "none" }}>
            <button className="icon">
                Go To Login
            </button>
        </Link>
      </div>
    </div>
  );
};

export default Register;

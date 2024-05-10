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

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert("successfully created");
        setError("");
        navitage("/login")
      })
      .catch((error) => {
        setError(true);
      });
  };

return (
    <><div className="registerTitle">REGISTER</div>
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
        {error && <span>Wrong email or password!</span>}
      </form>
    </div>
    <div className="registerToLogin">
      <Link to="/login" style={{ textDecoration: "none" }}>
          <button className="icon">
              Go To Login
          </button>
      </Link>
    </div>
    </>
  );
};

export default Register;

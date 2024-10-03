import { useContext, useState } from "react";
import "./login.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";
import {AuthContext} from "../../context/AuthContext"

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navitage = useNavigate()

  const {dispatch} = useContext(AuthContext)

  const handleLogin = (e) => {
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

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch({type:"LOGIN", payload:user})
        navitage("/")
      })
      .catch((error) => {
        setError("Wrong email or password!");
      });
  };

  
  return (
    <div className="loginWrapper">
      <div className="loginTitle">LOGIN</div>
      <div className="login">
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)} />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Login</button>
          {error && <span>{error}</span>}
        </form>
      </div>
      <div className="loginToRegister">
        <Link to="/register" style={{ textDecoration: "none" }}>
            <button className="icon">
                Go To Register
            </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;

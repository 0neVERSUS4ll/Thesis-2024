import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LanIcon from '@mui/icons-material/Lan';
import HubIcon from '@mui/icons-material/Hub';
import LockIcon from '@mui/icons-material/Lock';
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useState, useEffect } from "react";
import { logOutUser, user_is_login } from "../../firebaseMethods";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = () => {
  const navigate = useNavigate();
  let [flag, setFlag] = useState(true);
  const { dispatch } = useContext(DarkModeContext);
  let isAdmin = true;
  let {currentUser} = useContext(AuthContext);
  
  if(currentUser.email === "adam@adam.com"){
    isAdmin = true;
  } else {
    isAdmin = false;
  }

  useEffect(() => {
      user_is_login()
        .then((_) => {
          setFlag(true);
        })
        .catch((_) => {
            console.log(_);
          navigate("/login");
        });
    }, []);

  const signOutUser = () => {
    logOutUser()
      .then((_) => alert(_))
      .catch((_) => console.log(_));
      setFlag(false);
  }

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Network Study Platform</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">LISTS</p>
          {isAdmin ? (
            <><Link to="/users" style={{ textDecoration: "none" }}>
              <li>
                <PersonOutlineIcon className="icon" />
                <span>Users</span>
              </li>
            </Link><Link to="/learning" style={{ textDecoration: "none" }}>
                <li>
                  <CreditCardIcon className="icon" />
                  <span>Learning</span>
                </li>
              </Link></>          
          ) : (
            <li>
              <LockIcon className="icon" />
            <span>No Access</span>
          </li>
          )}
          <Link to="/quizes" style={{ textDecoration: "none" }}>
            <li>
              <HubIcon className="icon" />
              <span>Network-Quiz</span>
            </li>
          </Link>
          <Link to="/topologyQuizes" style={{ textDecoration: "none" }}>
            <li>
              <LanIcon className="icon" />
              <span>Topology-Quiz</span>
            </li>
          </Link>
          <p className="title">USER</p>
          <Link to="/quizPerformance" style={{ textDecoration: "none" }}>
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Performa</span>
          </li>
          </Link>
          {flag ? (
            <li>
              <ExitToAppIcon className="icon" />
              <span onClick={signOutUser}>Logout</span>
            </li>            
          ) : (
              // console.log(flag)
              <Link to="/login" style={{ textDecoration: "none" }}>
                <li>
                  <LoginIcon className="icon" />
                  <span>Login</span>
                </li>
              </Link>
          )}
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;

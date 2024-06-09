import React, { useCallback, useContext, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import "./Header.css";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeIcon from "@mui/icons-material/LightMode";
import { authContext } from "../../Context/authContextProvider";

const apiKey = "AIzaSyAOs3l1dk_d6TtQJHjuzJ7YN1Fb6aWs9Mc";

const Header = (props) => {
  const history = useHistory();
  const [sending, setSending] = useState(false);
  const authCtx = useContext(authContext);

  // handler to verify email
  const verifyEmailHandler = useCallback(async () => {
    if (sending) return;
    setSending(true);
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: authCtx.id,
          }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message || "Failed to Verify");
      }
      const resData = await response.json();
      console.log(resData);
    } catch (error) {
      alert(error);
    } finally {
      setSending(false);
    }
  }, [authCtx.id, sending]);

  // handler to double check the weather the token is valid or not
  const verifyTokenHandler = () => {
    if (!!authCtx.id) {
      verifyEmailHandler();
    }
  };
  const logoutHandler = () => {
    authCtx.logout();
    history.replace("/");
  };

  return (
    <header className="header">
      <nav>
        <ul>
          <li>
            <NavLink activeClassName="active" to="/expense">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink exact activeClassName="active" to="/welcome">
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/aboutus">
              About US
            </NavLink>
          </li>
        </ul>
      </nav>
      {authCtx.isLogin && (
        <divv className="toggle-modes" onClick={props.toggleMode}>
          {props.darkMode ? <LightModeIcon /> : <DarkModeOutlinedIcon />}
        </divv>
      )}
      {authCtx.isLogin && (
        <div>
          <button onClick={verifyTokenHandler}>
            {sending ? "Verifying..." : "Verify"}
          </button>
          <button onClick={logoutHandler}>Logout</button>
        </div>
      )}
    </header>
  );
};

export default Header;

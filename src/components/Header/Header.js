import React, { useCallback, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeIcon from "@mui/icons-material/LightMode";
import { apiKey } from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { removeFromLocalStorage } from "../../store/auth-actions";
import toast, { Toaster } from "react-hot-toast";
import "./Header.css";

const Header = (props) => {
  const history = useHistory();
  const [sending, setSending] = useState(false);
  const isLogin = useSelector((state) => state.auth.isLogin);
  const id = useSelector((state) => state.auth.id);
  const dispatch = useDispatch();

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
            idToken: id,
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
      toast.error(error.message);
      alert(error);
    } finally {
      setSending(false);
    }
  }, [id, sending]);

  // handler to double check the weather the token is valid or not
  const verifyTokenHandler = () => {
    if (!!id) {
      verifyEmailHandler();
    }
  };
  const logoutHandler = () => {
    // authCtx.logout();
    toast.success("Successfully logged out");
    dispatch(removeFromLocalStorage());
    history.replace("/");
  };

  return (
    <>
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
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
        {isLogin && (
          <divv className="toggle-modes" onClick={props.toggleMode}>
            {props.darkMode ? <LightModeIcon /> : <DarkModeOutlinedIcon />}
          </divv>
        )}
        {isLogin && (
          <div>
            <button onClick={verifyTokenHandler}>
              {sending ? "Verifying..." : "Verify"}
            </button>
            <button onClick={logoutHandler}>Logout</button>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;

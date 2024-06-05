import React, { useCallback, useContext, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import "./Header.css";
import { authContext } from "../../Context/authContextProvider";

const apiKey = "AIzaSyAOs3l1dk_d6TtQJHjuzJ7YN1Fb6aWs9Mc";

const Header = () => {
  const history = useHistory();
  const [sending, setSending] = useState(false);
  const authCtx = useContext(authContext);
  console.log(authCtx)
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
  }, [authCtx.id]);

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
        <div>
          <button onClick={verifyTokenHandler} className="verify">
            {sending ? "Verifying..." : "Verify"}
          </button>
          <button onClick={logoutHandler}>Logout</button>
        </div>
      )}
    </header>
  );
};

export default Header;

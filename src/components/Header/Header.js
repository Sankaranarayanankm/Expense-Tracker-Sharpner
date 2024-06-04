import React, { useCallback, useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import { authContext } from "../../Context/authContextProvider";

const apiKey = "AIzaSyAtrHsSiUVCroZLd5JQCn7IR81mEVz-m2w";

const Header = () => {
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
            idToken: authCtx.token.id,
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
  }, [authCtx.token.id]);

  // handler to double check the weather the token is valid or not
  const verifyTokenHandler = () => {
    if (!!authCtx.token.id) {
      verifyEmailHandler();
    }
  };

  return (
    <header className="header">
      <nav>
        <ul>
          <li>
            <NavLink exact activeClassName="active" to="/">
              Home
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
        <button onClick={verifyTokenHandler} className="verify">
          {sending ? "Verifying..." : "Verify"}
        </button>
      )}
    </header>
  );
};

export default Header;

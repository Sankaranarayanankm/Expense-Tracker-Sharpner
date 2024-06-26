import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ForgetPassword.css";
const apiKey = "AIzaSyAOs3l1dk_d6TtQJHjuzJ7YN1Fb6aWs9Mc";

const ForgetPasswrod = (props) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const emailHandler = (event) => {
    setEmail(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    async function resetPassword() {
      try {
        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              requestType: "PASSWORD_RESET",
              email,
            }),
          }
        );

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.error.message || "Failed to reset password");
        }
        const resData = await response.json();
        console.log(resData);
        setMessage("Check your email");
      } catch (error) {
        alert(error);
      }
    }
    resetPassword();
  };
  return (
    <div className="login">
      <form onSubmit={submitHandler} className="form">
        <p>Enter the email which you have registered.</p>
        <input
          type="email"
          value={email}
          onChange={emailHandler}
          placeholder="Email"
        />
        <button>Send Link</button>
        {!!message && <p>{message}</p>}
        <p>
          <Link to="/"> Back to login?</Link>
        </p>
      </form>
    </div>
  );
};

export default ForgetPasswrod;

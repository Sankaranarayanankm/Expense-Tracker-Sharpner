import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import "./Login.css";

const apiKey = "AIzaSyAOs3l1dk_d6TtQJHjuzJ7YN1Fb6aWs9Mc";

const Signup = () => {

  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    email: "",
    password: "",
    confirm: "",
  });
  const changeHandler = (event) => {
    const { name, value } = event.target;
    setState((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const toggleHandler = () => {};
  const submitHandler = (event) => {
    event.preventDefault();
    // uncomment this validation logic after creating the project

    if (
      state.email.length === 0 &&
      state.password.length === 0 &&
      state.confirm.length === 0
    )
      return;
    if (state.password !== state.confirm) {
      alert("type same password in password field and conform password field");
      return;
    }

    async function signup() {
      setLoading(true);
      try {
        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: state.email,
              password: state.password,
              returnSecureToken: true,
            }),
          }
        );
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error.message || "Failed to signup");
        }
        const resData = await response.json();
        console.log(resData);
        history.push('/login');
      } catch (error) {
        alert(error);

        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    signup();
  };

  return (
    <div className="login">
      <form className="form" onSubmit={submitHandler}>
        <h1> SignUp</h1>
        <input
          type="email"
          value={state.email}
          onChange={changeHandler}
          name="email"
          placeholder="Email"
        />
        <br />
        <input
          type="password"
          value={state.password}
          onChange={changeHandler}
          name="password"
          placeholder="Passwrod"
        />
        <br />

        <input
          type="confirm"
          value={state.confirm}
          onChange={changeHandler}
          name="confirm"
          placeholder="Confirm Password"
        />

        <br />

        <button>{loading ? "Sending Request" : "Sign Up"} </button>
      </form>
      <p>
        Have an account?
        <span className="toggler" onClick={toggleHandler}>
          <Link to="/login">Login</Link>
        </span>
      </p>
    </div>
  );
};

export default Signup;

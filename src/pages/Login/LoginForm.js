import React, { useContext, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { authContext } from "../../Context/authContextProvider";
import "./Login.css";

const apiKey = "AIzaSyAOs3l1dk_d6TtQJHjuzJ7YN1Fb6aWs9Mc";

const LoginForm = () => {
  const authCtx = useContext(authContext);

  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    email: "",
    password: "",
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

  const submitHandler = (event) => {
    event.preventDefault();

    async function login() {
      setLoading(true);
      try {
        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
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
          throw new Error(error.error.message || "Failed to login");
        }
        const resData = await response.json();
        authCtx.login(resData.idToken, resData.email);
        history.push("/expense");
        console.log("logged in");
      } catch (error) {
        alert(error);

        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    login();
  };

  return (
    <div className="login">
      <form className="form" onSubmit={submitHandler}>
        <h1>Login</h1>
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

        <button>{loading ? "Sending Request" : "Login Up"} </button>
        <Link to="/forgetpassword">Forget Password?</Link>
      </form>

      <p>
        Don't have an account?
        <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
};

export default LoginForm;

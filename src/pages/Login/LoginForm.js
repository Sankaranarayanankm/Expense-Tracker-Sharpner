import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import "./Login.css";
import { useDispatch } from "react-redux";
import { saveToLocalStorage } from "../../store/auth-actions";
import { apiKey } from "../../store/authSlice";
import toast, { Toaster } from "react-hot-toast";

const LoginForm = () => {
  const dispatch = useDispatch();
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
        toast.success("Successfully logged in");
        const resData = await response.json();
        let obj = {
          id: resData.idToken,
          email: resData.email,
        };
        dispatch(saveToLocalStorage(obj));
        history.push("/expense");
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }
    login();
  };

  return (
    <>
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>

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
            placeholder="Password"
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
    </>
  );
};

export default LoginForm;

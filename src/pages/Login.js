import React, { useContext, useState } from "react";
import "./Login.css";
import { authContext } from "../Context/authContextProvider";
import {useHistory} from 'react-router-dom';
const apiKey = "AIzaSyAtrHsSiUVCroZLd5JQCn7IR81mEVz-m2w";

const Login = () => {
  const authCtx = useContext(authContext);
  const history=useHistory();
  const [isLogin, setIsLogin] = useState(false);
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
  const toggleHandler = () => {
    setIsLogin((prev) => !prev);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    // uncomment this validation logic after creating the project
    // if(state.email.length==0 && state.password.length==0 && state.confirm.length==0) return;
    // if(state.password!==state.confirm){
    //   alert("type same password in password field and conform password field");
    //   return;
    // }
    if (isLogin) {
      async function login() {
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
          authCtx.login(resData.idToken);
          history.push('/welcome');
        } catch (error) {
          alert(error);
          console.log(error);
        }
      }
      login();
    } else {
      async function signup() {
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
        } catch (error) {
          alert(error);
          console.log(error);
        }
      }
      signup();
    }
  };
  return (
    <div className="login">
      <form className="form" onSubmit={submitHandler}>
        <h1> {isLogin ? "Login" : "SignUp"}</h1>
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
        {!isLogin && (
          <input
            type="confirm"
            value={state.confirm}
            onChange={changeHandler}
            name="confirm"
            placeholder="Confirm Password"
          />
        )}
        {!isLogin && <br />}
        <button>Sign Up</button>
      </form>
      <p>
        {isLogin ? "Don't have an account?" : "Have an account?"}
        <span className="toggler" onClick={toggleHandler}>
          {isLogin ? "Signup" : "Login"}
        </span>
      </p>
    </div>
  );
};

export default Login;

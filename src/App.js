import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AboutUS from "./pages/AboutUS/AboutUS";
import Header from "./components/Header/Header";
import Welcome from "./pages/Welcome/Welcome";
import ForgetPasswrod from "./pages/Login/ForgetPasswrod";
import CompleteProfile from "./pages/Profile/CompleteProfile";
import ExpenseList from "./components/Expense/ExpenseList";
import Signup from "./pages/Login/Signup";
import LoginForm from "./pages/Login/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { getDataFromLocalStorage } from "./store/auth-actions";
import { getExpenseData } from "./store/expense-action";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const isLogin = useSelector((state) => state.auth.isLogin);
  const email = useSelector((state) => state.auth.email);
  const dispatch = useDispatch();

  useEffect(() => {
    if (email) {
      dispatch(getExpenseData(email));
    }
  }, [email, dispatch]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  useEffect(() => {
    dispatch(getDataFromLocalStorage());
  }, [dispatch]);
  return (
    <div id={darkMode ? "dark" : "light"}>
      <Header darkMode={darkMode} toggleMode={toggleDarkMode} />
      <Switch>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/" exact>
          {!isLogin && <LoginForm />}
          {isLogin && <ExpenseList />}
        </Route>

        {isLogin && (
          <Route path="/expense">
            <ExpenseList />
          </Route>
        )}
        {isLogin && (
          <Route path="/welcome">
            <Welcome />
          </Route>
        )}
        <Route path="/aboutus" >
          <AboutUS />
        </Route>
        <Route path="/complete-profile">
          <CompleteProfile />
        </Route>
        {!isLogin && (
          <Route path="/forgetpassword">
            <ForgetPasswrod />
          </Route>
        )}
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  );
};

export default App;

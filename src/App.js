import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AboutUS from "./pages/AboutUS/AboutUS";
import Header from "./components/Header/Header";
import { authContext } from "./Context/authContextProvider";
import Welcome from "./pages/Welcome/Welcome";
import ForgetPasswrod from "./pages/Login/ForgetPasswrod";
import CompleteProfile from "./pages/Profile/CompleteProfile";
import ExpenseList from "./components/Expense/ExpenseList";
import Signup from "./pages/Login/Signup";
import LoginForm from "./pages/Login/LoginForm";

// add tostify
const App = () => {
  const authCtx = useContext(authContext);
  return (
    <>
      <Header />
      <Switch>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/" exact>
          {!authCtx.isLogin && <LoginForm />}
          {authCtx.isLogin && <ExpenseList />}
        </Route>

        {authCtx.isLogin && (
          <Route path="/expense">
            <ExpenseList />
          </Route>
        )}
        {authCtx.isLogin && (
          <Route path="/welcome">
            <Welcome />
          </Route>
        )}
        <Route path="/aboutus" exact>
          <AboutUS />
        </Route>
        <Route path="/complete-profile">
          <CompleteProfile />
        </Route>
        {!authCtx.isLogin && (
          <Route path="/forgetpassword">
            <ForgetPasswrod />
          </Route>
        )}
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </>
  );
};

export default App;

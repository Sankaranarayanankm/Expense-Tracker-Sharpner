import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AboutUS from "./pages/AboutUS/AboutUS";
import Header from "./components/Header/Header";
import { authContext } from "./Context/authContextProvider";
import Welcome from "./pages/Welcome/Welcome";
import Login from "./pages/Login/Login";
import ForgetPasswrod from "./pages/Login/ForgetPasswrod";

const App = () => {
  const authCtx = useContext(authContext);
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact>
          {!authCtx.isLogin && <Login />}
          {authCtx.isLogin && <Welcome />}
        </Route>

        {authCtx.isLogin && (
          <Route path="/welcome">
            <Welcome />
          </Route>
        )}
        <Route path="/aboutus" exact>
          <AboutUS />
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

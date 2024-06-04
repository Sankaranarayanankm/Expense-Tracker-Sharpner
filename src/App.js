import React from "react";
import { Switch, Route } from "react-router-dom";
import AboutUS from "./pages/AboutUS/AboutUS";
import Header from "./components/Header/Header";
import AuthContextProvider from "./Context/authContextProvider";
import Welcome from "./pages/Welcome/Welcome";
import Login from "./pages/Login/Login";


const App = () => {
  return (
    <AuthContextProvider>
      <Header />
      <Switch>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/welcome" >
          <Welcome />
        </Route>
        <Route path="/aboutus" exact>
          <AboutUS />
        </Route>
      </Switch>
    </AuthContextProvider>
  );
};

export default App;

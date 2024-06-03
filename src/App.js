import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Products from "./pages/Products";
import AboutUS from "./pages/AboutUS";
import Header from "./components/Header/Header";
import AuthContextProvider from "./Context/authContextProvider";
import Welcome from "./pages/Welcome";


const App = () => {
  return (
    <AuthContextProvider>
      <Header />
      <Switch>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/welcome" exact>
          <Welcome />
        </Route>
        <Route path="/products" exact>
          <Products />
        </Route>
        <Route path="/aboutus" exact>
          <AboutUS />
        </Route>
      </Switch>
    </AuthContextProvider>
  );
};

export default App;

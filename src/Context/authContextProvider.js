import React, { useState } from "react";
export const authContext = React.createContext({
  token: "",
  isLogin: false,
  login: () => {},
  logout: () => {},
});

const AuthContextProvider = (props) => {
  const initialToken = JSON.parse(localStorage.getItem("token")) || {};
  const [token, setToken] = useState(initialToken);
  const updatedStatus = !!token.id;
  const loginHandler = (id, email) => {
    const obj = { id, email };
    setToken(obj);
    localStorage.setItem("token", JSON.stringify(obj));
  };
  const logoutHandler = () => {
    setToken({ id: "", email: "" });
    localStorage.removeItem("token");
  };
  const defalutContext = {
    token,
    isLogin: updatedStatus,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <authContext.Provider value={defalutContext}>
      {props.children}
    </authContext.Provider>
  );
};
export default AuthContextProvider;

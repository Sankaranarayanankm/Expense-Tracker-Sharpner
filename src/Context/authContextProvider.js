import React, { useState } from "react";
export const authContext = React.createContext({
  token: "",
  isLogin: false,
  login: () => {},
  logout: () => {},
});

const AuthContextProvider = (props) => {
  const [token, setToken] = useState("");
  const updatedStatus = !!token;
  const loginHandler = (id) => {
    setToken(id);
  };
  const logoutHandler = () => {
    setToken("");
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

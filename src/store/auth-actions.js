import { authActions } from "./authSlice";

export function saveToLocalStorage(data) {
  return (dispatch) => {
    // function to save to local storage
    localStorage.setItem("token", JSON.stringify(data));
    dispatch(authActions.login(data));
  };
}

export function removeFromLocalStorage() {
  return (dispatch) => {
    localStorage.removeItem("token");
    dispatch(authActions.logout());
  };
}

export function getDataFromLocalStorage() {
  return (dispatch) => {
    const data = localStorage.getItem("token");
    const parsedData = JSON.parse(data);
    if (parsedData) {
      dispatch(authActions.login(parsedData));
    }
  };
}

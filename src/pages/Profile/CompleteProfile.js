import React, { useContext, useEffect, useState } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LanguageIcon from "@mui/icons-material/Language";
import { useHistory } from "react-router-dom";
import "./CompleteProfile.css";
import { authContext } from "../../Context/authContextProvider";

const apiKey = "AIzaSyAtrHsSiUVCroZLd5JQCn7IR81mEVz-m2w";

const CompleteProfile = () => {
  const authCtx = useContext(authContext);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(false);
  const [state, setState] = useState({
    name: "",
    url: "",
  });
  const history = useHistory();
  // getting the data from firebase to prefill the edit profile page
  useEffect(() => {
    async function getData(id) {
      setLoading(true);
      setError(false);
      try {
        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              idToken: id,
            }),
          }
        );
        if (!response.ok) {
          const errorData = await response.json();
          setError(true);
          throw new Error(errorData.error.message || "Failed to get Data");
        }
        const resData = await response.json();
        // using reduce method to convert the array(resData.users) to obj
        const obj = resData.users.reduce((acc, item) => {
          return {
            ...acc,
            [item.email]: item,
          };
        }, {});
       
        // prefilling the data
        const value = obj[authCtx.token.email];
        setState({
          name: value.displayName,
          url: value.photoUrl,
        });
      } catch (error) {
        alert(error);
      }
      finally{
        setLoading(false);
      }
    }
    getData(authCtx.token.id);
  }, [authCtx.token]);

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
    // add async function to update the backend
    async function updateProfile() {
      try {
        setLoading(true);
        setError(false);
        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${apiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              idToken: authCtx.token.id,
              displayName: state.name,
              photoUrl: state.url,
              returnSecureToken: true,
            }),
          }
        );
        if (!response.ok) {
          const errorData = await response.json();
          setError(true);
          throw new Error(
            errorData.error.message || "Failed to update your profile"
          );
        }
        const resData = await response.json();
        console.log(resData);
      } catch (error) {
        console.log(error);
        alert(error);
      }
      finally{
        setLoading(false);
      }
    }
    updateProfile();
  };
  const cancelHandler = () => {
    history.push("/welcome");
  };
  return (
    <div className="profile-form">
      <form onSubmit={submitHandler}>
        <h4>Contact Detals</h4>
        <div className="profile-input">
          <GitHubIcon />
          <label htmlFor="name">Full Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={state.name}
            onChange={changeHandler}
          />
          <LanguageIcon />
          <label htmlFor="url">Profile photo URL</label>
          <input
            type="text"
            id="url"
            name="url"
            value={state.url}
            onChange={changeHandler}
          />
          <br />
         { error && <p>An error Occured!</p>}
        </div>
        <button className="update">{loading?"Updating":"Update"}</button>
        <button onClick={cancelHandler} className="cancel" type="cancel">
          cancel
        </button>
      </form>
    </div>
  );
};

export default CompleteProfile;

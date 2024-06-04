import React, { useContext, useState } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LanguageIcon from "@mui/icons-material/Language";
import { useHistory } from "react-router-dom";
import "./CompleteProfile.css";
import { authContext } from "../../Context/authContextProvider";

const apiKey = "AIzaSyAtrHsSiUVCroZLd5JQCn7IR81mEVz-m2w";

const CompleteProfile = () => {
  const authCtx = useContext(authContext);
  const [state, setState] = useState({
    name: "",
    url: "",
  });
  const history = useHistory();

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
        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${apiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              idToken: authCtx.token,
              displayName: state.name,
              photoUrl: state.url,
              returnSecureToken: true,
            }),
          }
        );
        if(!response.ok){
          const errorData=await response.json();
          throw new Error(errorData.error.message || 'Failed to update your profile');
        }
        const resData=await response.json();
        console.log(resData);
      } catch (error) {
        console.log(error);
        alert(error);
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
        </div>
        <button className="update">Update</button>
        <button onClick={cancelHandler} className="cancel" type="cancel">
          cancel
        </button>
      </form>
    </div>
  );
};

export default CompleteProfile;

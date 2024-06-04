import React from "react";
import { useRouteMatch, Route, Link,Switch } from "react-router-dom";
import CompleteProfile from "../Profile/CompleteProfile";

const Welcome = () => {
  const { path, url } = useRouteMatch();
  return (
    <div>
      <p>Welcome to Expense Tracker</p>
      <p>
        Your porifle is incomplete.
        <Link to={`${url}/complete-profile`}> Complete Now</Link>
      </p>
      <hr />
      <Switch>
        <Route path={`${path}/complete-profile`}>
          <CompleteProfile />
        </Route>
      </Switch>
    </div>
  );
};

export default Welcome;

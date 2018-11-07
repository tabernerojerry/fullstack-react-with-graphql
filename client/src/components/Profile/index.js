import React from "react";

import UserInfo from "./UserInfo";
import UserRecipes from "./UserRecipes";

import withAuth from "../withAuth";

const Profile = ({ authSession }) => (
  <div className="container">
    <div className="row">
      <div className="col s12 m8">
        <UserRecipes _id={authSession.getCurrentUser._id} />
      </div>
      <div className="col s12 m4">
        <UserInfo authSession={authSession} />
      </div>
    </div>
  </div>
);

export default withAuth(
  authSession => authSession && authSession.getCurrentUser
)(Profile);

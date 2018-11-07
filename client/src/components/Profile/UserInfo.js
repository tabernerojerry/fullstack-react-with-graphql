import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";

import { helpers } from "../../utils";

const UserInfo = ({ authSession }) => {
  const { username, email, createdAt, favorites } = authSession.getCurrentUser;

  return (
    <Fragment>
      <h4>User Info</h4>
      <p>Username: {username}</p>
      <p>Email: {email}</p>
      <p>Join Date: {helpers.formatDate(createdAt)}</p>
      <ul>
        <li>
          <h4>Favorites</h4>

          {!favorites.length && (
            <p>You have no favorites, currently. Go Add Some!</p>
          )}

          {favorites.map(favorite => (
            <p key={favorite._id}>
              <Link to={`/recipes/${favorite._id}`}>{favorite.name}</Link>
            </p>
          ))}
        </li>
      </ul>
    </Fragment>
  );
};

export default withRouter(UserInfo);

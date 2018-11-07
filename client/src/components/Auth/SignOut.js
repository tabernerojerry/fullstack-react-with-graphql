import React from "react";
import { ApolloConsumer } from "react-apollo";
import { withRouter } from "react-router-dom";

import { auth } from "../../utils";

const _onSignOut = (client, history) => {
  // remove access token to localstorage
  auth.logOut();

  // clear current user
  client.resetStore();

  // redirect to homepage once logout
  history.push("/");
};

const SignOut = ({ history }) => (
  <ApolloConsumer>
    {client => {
      return (
        <button
          className="btn waves-effect waves-teal white black-text "
          onClick={() => _onSignOut(client, history)}
        >
          Logout
        </button>
      );
    }}
  </ApolloConsumer>
);

export default withRouter(SignOut);

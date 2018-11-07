import React from "react";
import { Redirect } from "react-router-dom";
import { Query } from "react-apollo";

import query from "../queries";

// HOC
const withAuth = conditionFunc => Component => props => (
  <Query query={query.user.GET_CURRENT_USER}>
    {({ loading, data }) => {
      // return null while loading to avoid props issue
      if (loading) return null;

      // redirect to homepage if current user is null
      return conditionFunc(data) ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      );
    }}
  </Query>
);

export default withAuth;

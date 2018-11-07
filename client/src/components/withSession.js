import React from "react";
import { Query } from "react-apollo";

import query from "../queries";

// HOC
const withSession = Component => props => (
  <Query query={query.user.GET_CURRENT_USER}>
    {({ data, loading, refetch }) => {
      // return null while loading to avoid props issue
      if (loading) return null;

      return <Component {...props} refetch={refetch} authSession={data} />;
    }}
  </Query>
);

export default withSession;

import gql from "graphql-tag";

export default {
  GET_CURRENT_USER: gql`
    query GetCurrentUser {
      getCurrentUser {
        _id
        username
        email
        createdAt
        favorites {
          _id
          name
        }
      }
    }
  `
};

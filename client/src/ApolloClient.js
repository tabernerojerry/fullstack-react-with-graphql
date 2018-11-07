import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink
} from "apollo-boost";

import { auth } from "./utils";

const endpointURL = "http://localhost:4444/graphql";

const authLink = new ApolloLink((operation, forward) => {
  if (auth.isLoggedIn()) {
    operation.setContext({
      headers: {
        Authorization: auth.getAccessToken() || null
      }
    });
  }

  return forward(operation);
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, new HttpLink({ uri: endpointURL })]),
  cache: new InMemoryCache()
});

export default client;

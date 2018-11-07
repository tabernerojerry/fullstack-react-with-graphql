const { gql } = require("apollo-server-express");

module.exports = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    favorites: [Recipe!]
    createdAt: String!
    updatedAt: String!
  }

  type Token {
    token: String!
  }

  input SignUpInput {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  input SignInInput {
    username: String!
    password: String!
  }

  extend type Query {
    getCurrentUser: User
  }

  extend type Mutation {
    signUp(input: SignUpInput!): Token!
    signIn(input: SignInInput!): Token!
  }
`;

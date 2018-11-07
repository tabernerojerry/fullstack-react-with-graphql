const { gql } = require("apollo-server-express");

const base = gql`
  type Query {
    _: String
  }

  type Mutation {
    _: String
  }
`;

module.exports = [base, require("./user"), require("./recipe")];

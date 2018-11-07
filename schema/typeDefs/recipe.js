const { gql } = require("apollo-server-express");

module.exports = gql`
  type Recipe {
    _id: ID!
    name: String!
    category: String!
    description: String!
    instructions: String!
    imageUrl: String!
    user: User!
    likes: [User!]
    createdAt: String
    updatedAt: String
  }

  type Message {
    info: String!
  }

  input AddRecipeInput {
    name: String!
    category: String!
    description: String!
    instructions: String!
    imageUrl: String!
    user: ID!
  }

  extend type Query {
    recipes: [Recipe!]
    recipe(_id: ID!): Recipe
    searchRecipes(searchTerm: String!): [Recipe!]
    userRecipes(_id: ID!): [Recipe!]
  }

  extend type Mutation {
    addRecipe(input: AddRecipeInput!): Recipe
    deleteUserRecipe(_id: ID!): Message
    likesRecipe(recipeID: ID!, userID: ID!): Recipe
  }
`;

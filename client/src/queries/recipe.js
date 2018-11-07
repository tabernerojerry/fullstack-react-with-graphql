import gql from "graphql-tag";

import { recipeFragments } from "./fragments";

export default {
  GET_RECIPES: gql`
    query GetRecipes {
      recipes {
        _id
        name
        category
        imageUrl
      }
    }
  `,
  GET_RECIPE: gql`
    query GetRecipe($_id: ID!) {
      recipe(_id: $_id) {
        _id
        name
        category
        description
        instructions
        imageUrl
        likes {
          _id
        }
        createdAt
        user {
          _id
          username
        }
      }
    }
  `,
  SEARCH_RECIPES: gql`
    query SearchRecipes($searchTerm: String!) {
      searchRecipes(searchTerm: $searchTerm) {
        ...UserSearchRecipes
      }
    }
    ${recipeFragments.user_search_recipes}
  `,
  USER_RECIPES: gql`
    query UserRecipes($_id: ID!) {
      userRecipes(_id: $_id) {
        ...UserSearchRecipes
      }
    }
    ${recipeFragments.user_search_recipes}
  `
};

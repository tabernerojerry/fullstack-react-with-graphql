import gql from "graphql-tag";

export const recipeFragments = {
  user_search_recipes: gql`
    fragment UserSearchRecipes on Recipe {
      _id
      name
      likes {
        _id
      }
    }
  `
};

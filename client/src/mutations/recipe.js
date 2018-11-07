import gql from "graphql-tag";

export default {
  ADD_RECIPE: gql`
    mutation AddRecipe($input: AddRecipeInput!) {
      addRecipe(input: $input) {
        _id
        name
        category
        description
        instructions
        imageUrl
        user {
          _id
        }
      }
    }
  `,
  DELETE_USER_RECIPE: gql`
    mutation DeleteUserRecipe($_id: ID!) {
      deleteUserRecipe(_id: $_id) {
        info
      }
    }
  `,
  LIKES_RECIPE: gql`
    mutation LikesRecipe($recipeID: ID!, $userID: ID!) {
      likesRecipe(recipeID: $recipeID, userID: $userID) {
        _id
        likes {
          _id
        }
      }
    }
  `
};

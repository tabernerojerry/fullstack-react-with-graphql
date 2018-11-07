const controller = require("../../controllers");

module.exports = {
  Query: {
    recipe: async (_, { _id }) => await controller.recipe.getRecipe(_id),

    recipes: async () => await controller.recipe.getRecipes(),

    searchRecipes: async (_, { searchTerm }) =>
      await controller.recipe.searchRecipes(searchTerm),

    userRecipes: async (_, { _id }) => await controller.recipe.userRecipes(_id)
  },

  Mutation: {
    addRecipe: async (_, { input }) => await controller.recipe.addRecipe(input),
    deleteUserRecipe: async (_, { _id }) =>
      await controller.recipe.deleteUserRecipes(_id),
    likesRecipe: async (_, { recipeID, userID }) =>
      await controller.recipe.likesRecipe(recipeID, userID)
  }
};

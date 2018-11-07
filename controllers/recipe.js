const model = require("../models");

module.exports = {
  getRecipe: async _id => {
    const recipe = await model.Recipe.findById({ _id }).populate("user", [
      "username"
    ]);

    return recipe;
  },
  getRecipes: async () => {
    const recipies = await model.Recipe.find().sort({ createdAt: "desc" });

    return recipies;
  },
  addRecipe: async inputData => {
    const recipe = await model.Recipe.create(inputData);

    return recipe;
  },
  searchRecipes: async searchTerm => {
    if (searchTerm) {
      const searchResults = await model.Recipe.find(
        {
          $text: { $search: searchTerm }
        },
        {
          score: { $meta: "textScore" }
        }
      ).sort({
        score: { $meta: "textScore" }
      });

      return searchResults;
    } else {
      const recipes = await model.Recipe.find().sort({
        likes: "desc",
        createdAt: "desc"
      });

      return recipes;
    }
  },
  userRecipes: async _id => {
    // find recipes belongs to user
    const userRecipes = await model.Recipe.find({ user: _id }).sort({
      createdAt: "desc"
    });

    return userRecipes;
  },
  deleteUserRecipes: async _id => {
    await model.Recipe.findByIdAndRemove({ _id });

    return {
      info: "Recipe is successfully removed!"
    };
  },
  likesRecipe: async (recipeID, userID) => {
    // find recipe by id
    const findRecipe = await model.Recipe.findById({ _id: recipeID });

    // map recipe that user likes
    const likesRecipe = findRecipe.likes.map(obj => obj.toString());
    //console.log("likesRecipe: ", likesRecipe);

    // check if userID includes in likesRecipe
    /**
     * $pull: delete
     * $addToSet: add
     */
    const operator = likesRecipe.includes(userID.toString())
      ? "$pull"
      : "$addToSet";
    //console.log("operator: ", operator);

    // find recipe and update likes
    const recipe = await model.Recipe.findByIdAndUpdate(
      { _id: recipeID },
      { [operator]: { likes: userID } },
      { new: true }
    );
    //console.log("likes recipe: ", recipe);

    // find user and update favorites
    await model.User.findByIdAndUpdate(
      { _id: userID },
      { [operator]: { favorites: recipeID } },
      { new: true }
    );

    return recipe;
  }
};

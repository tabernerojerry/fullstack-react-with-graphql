const controller = require("../../controllers");

module.exports = {
  Query: {
    getCurrentUser: async (_, __, { currentUser }) =>
      controller.user.getCurrentUser(currentUser)
  },
  Mutation: {
    signUp: async (_, { input }) => await controller.user.signUp(input),
    signIn: async (_, { input }) => await controller.user.singIn(input)
  }
};

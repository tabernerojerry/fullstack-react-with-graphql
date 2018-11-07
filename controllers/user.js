const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Load User Model
const model = require("../models");

// Method to Create Token
const createToken = (user, secret, expiresIn) => {
  const { username, email, _id } = user;

  return jwt.sign({ _id, username, email }, secret, { expiresIn });
};

module.exports = {
  signUp: async input => {
    // find user by username
    const findUser = await model.User.findOne({ username: input.username });

    // validate if user already exist
    if (findUser) {
      throw new Error("User already exist!");
    }

    // Hash User Password
    const hashPassword = await bcrypt.hash(input.password, 10);

    // create user to db
    const user = await model.User.create({ ...input, password: hashPassword });

    return {
      token: createToken(user, process.env.SECRET, "1hr")
    };
  },

  singIn: async input => {
    const { username, password } = input;

    const user = await model.User.findOne({ username });

    if (!user) {
      throw new Error("User not found!");
    }

    // compare password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new Error("Invalid Password!");
    }

    return {
      token: createToken(user, process.env.SECRET, "1hr")
    };
  },

  getCurrentUser: async currentUser => {
    //console.log("currentUser:", currentUser);

    if (!currentUser) return null;

    const user = await model.User.findOne({
      username: currentUser.username
    }).populate({
      path: "favorites",
      model: "Recipe"
    });

    return user;
  }
};

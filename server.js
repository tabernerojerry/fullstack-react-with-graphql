const express = require("express");
const jwt = require("jsonwebtoken");
const { ApolloServer } = require("apollo-server-express");

// Load MongoDB
require("./db");

// Init Express App
const app = express();

app.use(async (req, res, next) => {
  const token = req.headers.authorization;

  if (token !== "null") {
    try {
      //const splitToken = token.split(" ")[1];

      const currentUser = await jwt.verify(token, process.env.SECRET);

      req.currentUser = currentUser;
    } catch (err) {
      console.error(err);
    }
  }
  next();
});

// Load Schema
const { typeDefs, resolvers } = require("./schema");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    currentUser: req.currentUser
  })
});

server.applyMiddleware({
  app,
  cors: {
    credentials: true,
    origin: "http://localhost:3000"
  }
});

const PORT = process.env.PORT || 4444;

app.listen(PORT, () =>
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  )
);

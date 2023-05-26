const express = require("express");
const logger = require("./middleware/logger");
const server = express();

const recipesRouter = require('./routes/recipe');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');

server.use(express.json());
server.use(logger);
server.use(authRouter);
server.use(recipesRouter);
server.use(usersRouter);

server.get("*", (req,res) => {
  res.status(404).send("Not Found");
});

module.exports = server;

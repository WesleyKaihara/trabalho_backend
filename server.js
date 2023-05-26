const express = require("express");
const server = express();

const recipesRouter = require('./routes/recipe');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');

server.use(express.json());
server.use(authRouter);
server.use(recipesRouter);
server.use(usersRouter);

module.exports = server;

const { Router } = require("express");
const users = Router();

const {
  postUser,
  getUsers,
  getUserById,
} = require("../controllers/users.controllers");

users.post("/register", postUser);
users.get("/getUser", getUsers);
users.get("/getUserById/:id", getUserById);

module.exports = { users };

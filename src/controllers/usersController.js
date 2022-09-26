const usersService = require("../db/usersService");

async function signUpUser(req, res) {
  const user = await usersService.addUser(req.body);
  res.status(201).json({
    email: user.email,
  });
}

async function logInUser(req, res) {
  const user = await usersService.loginUser(req.body);
  res.status(200).json({
    token: user.token,
    email: user.email,
  });
}

async function logInUserWithGoogle(req, res) {
  const user = await usersService.loginUserGoogle(req.body);
  res.status(200).json({
    token: user.token,
    email: user.email,
  });
}

async function logOutUser(req, res) {
  await usersService.logOut(req.userId);
  res.status(204).json({ message: "No Content" });
}

async function getCurrentUser(req, res) {
  const user = await usersService.getUser(req.userId);
  res.status(200).send(user);
}

module.exports = {
  signUpUser,
  logInUser,
  logOutUser,
  getCurrentUser,
  logInUserWithGoogle,
};

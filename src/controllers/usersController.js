const { addUser, loginUser, logOut, getUser } = require("../db/usersService");

async function signUpUser(req, res) {
  const user = await addUser(req.body);
  res.status(201).json({
    email: user.email,
  });
}

async function logInUser(req, res) {
  const user = await loginUser(req.body);
  res.status(200).json({
    token: user.token,
    user: {
      email: user.email,
    },
  });
}
async function logOutUser(req, res) {
  await logOut(req.userId);
  res.status(204).json({ message: "No Content" });
}
async function getCurrentUser(req, res) {
  const user = await getUser(req.userId);
  res.status(200).json({
    email: user.email,
  });
}

module.exports = {
  signUpUser,
  logInUser,
  logOutUser,
  getCurrentUser,
};

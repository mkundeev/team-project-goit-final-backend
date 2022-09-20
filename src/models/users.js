require("dotenv").config();
const { User } = require("../db/usersSchema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Conflict, InternalServerError, NotFound } = require("http-errors");

const addUser = async (body) => {
  if (await User.findOne({ email: body.email })) {
    throw new Conflict("Email in use");
  }

  const user = new User({ ...body });

  await user.save();
  return user;
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFound("Email or password is wrong");
  }
  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotFound("Email or password is wrong");
  }
  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.SECRET
  );
  const logedInUser = await User.findOneAndUpdate(
    { email },
    { token },
    {
      new: true,
    }
  );
  return logedInUser;
};

const logOut = async (userId) => {
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { token: null },
      {
        new: true,
      }
    );
    return user;
  } catch (err) {
    throw new InternalServerError("Server error");
  }
};

const getUser = async (userId) => {
  try {
    return User.findById(userId);
  } catch (err) {
    throw new InternalServerError("Server error");
  }
};

module.exports = {
  addUser,
  loginUser,
  logOut,
  getUser,
};

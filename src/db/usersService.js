require("dotenv").config();
const { User } = require("./schemas/usersSchema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Conflict, NotFound, BadRequest } = require("http-errors");

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
  const loggedInUser = await User.findOneAndUpdate(
    { email },
    { token },
    {
      new: true,
    }
  );
  return loggedInUser;
};

const logOut = async (userId) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { token: null },
    {
      new: true,
    }
  );
  return user;
};

const getUser = async (userId) => {
  return await User.findById(userId, "email token startedTests");
};

const setRandomTests = async (userId, testId, tests) => {
  const { startedTests } = await User.findById(userId, "startedTests");
  const test = startedTests.find((el) => el.testId === testId);

  if (test) {
    return new BadRequest("The test with such a testId is already open");
  }

  startedTests.push({
    testId,
    tests,
  });

  await User.findByIdAndUpdate(userId, { startedTests });
  return startedTests;
};

const setAnswer = async (userId, answer) => {
  const { startedTests } = await User.findById(userId, "startedTests");
  const test = startedTests.find((el) => el.testId === answer.testId);

  if (!test) {
    return new BadRequest("No such testId was found");
  }

  const newStartedTests = startedTests.map((el) => {
    if (el.testId !== answer.testId) {
      return el;
    }

    el.currentIndex = answer.currentIndex;

    if (!answer.questionId || !answer.answer) {
      return el;
    }

    const identicalAnswer = el.answers.find(
      (el) => el.questionId === answer.questionId
    );

    if (identicalAnswer) {
      el.answers.map((el) => {
        if (el.questionId !== answer.questionId) {
          return el;
        }

        el.answer = answer.answer;
        return el;
      });
    } else {
      el.answers.push({ questionId: answer.questionId, answer: answer.answer });
    }

    return el;
  });

  await User.findByIdAndUpdate(userId, { newStartedTests });
  return newStartedTests;
};

module.exports = {
  addUser,
  loginUser,
  logOut,
  getUser,
  setRandomTests,
  setAnswer,
};

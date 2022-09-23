require("dotenv").config();
const { User } = require("./schemas/usersSchema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  Conflict,
  NotFound,
  BadRequest,
  InternalServerError,
} = require("http-errors");
const { OAuth2Client } = require("google-auth-library");

const googleClient = new OAuth2Client({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: "http://localhost:3000",
});

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

const loginUserGoogle = async (body) => {
  const { tokens } = await googleClient.getToken(body.code);

  const ticket = await googleClient.verifyIdToken({
    idToken: `${tokens.id_token}`,
    audient: `${process.env.GOOGLE_CLIENT_ID}`,
  });
  const { email } = ticket.getPayload();

  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({ email: email });
    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.SECRET
    );
    user = await User.findByIdAndUpdate(user._id, { token }, { new: true });
  } else {
    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.SECRET
    );
    user = await User.findByIdAndUpdate(user._id, { token }, { new: true });
  }
  return user;
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
  const user = await User.findById(userId, "email token startedTests");

  const userWithoutRightAnswer = {
    email: user.email,
    token: user.token,
    startedTests: user.startedTests.map((el) => ({
      testId: el.testId,
      tests: el.tests.map((el) => ({
        question: el.question,
        questionId: el.questionId,
        answers: el.answers,
      })),
      currentIndex: el.currentIndex,
      answers: el.answers,
    })),
  };

  return userWithoutRightAnswer;
};

const setRandomTests = async (userId, testId, tests) => {
  const { startedTests } = await User.findById(userId, "startedTests");
  const test = startedTests.find((el) => el.testId === testId);

  if (test) {
    throw new BadRequest("The test with such a testId is already open");
  }

  startedTests.push({
    testId,
    tests,
  });

  await User.findByIdAndUpdate(userId, { startedTests });

  const startedTestsWithoutRightAnswer = startedTests.map((el) => ({
    testId: el.testId,
    tests: el.tests.map((el) => ({
      question: el.question,
      questionId: el.questionId,
      answers: el.answers,
    })),
    currentIndex: el.currentIndex,
    answers: el.answers,
  }));

  return startedTestsWithoutRightAnswer;
};

const setAnswer = async (userId, answer) => {
  const { startedTests } = await User.findById(userId, "startedTests");
  const test = startedTests.find((el) => el.testId === answer.testId);

  if (!test) {
    throw new BadRequest("No such testId was found");
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

  await User.findByIdAndUpdate(userId, { startedTests: newStartedTests });

  const startedTestsWithoutRightAnswer = newStartedTests.map((el) => ({
    testId: el.testId,
    tests: el.tests.map((el) => ({
      question: el.question,
      questionId: el.questionId,
      answers: el.answers,
    })),
    currentIndex: el.currentIndex,
    answers: el.answers,
  }));

  return startedTestsWithoutRightAnswer;
};

const getResult = async (userId, finishAnswer) => {
  const { startedTests } = await User.findById(userId, "startedTests");
  const clearedStartedTests = startedTests.filter(
    (el) => el.testId !== finishAnswer.testId
  );
  const test = startedTests.find((el) => el.testId === finishAnswer.testId);

  if (!test) {
    throw new BadRequest("No such testId was found");
  }

  test.answers.push({
    questionId: finishAnswer.questionId,
    answer: finishAnswer.answer,
  });

  if (test.answers.length < 12) {
    await User.findByIdAndUpdate(userId, { startedTests: clearedStartedTests });
    throw new InternalServerError("Not enough answers");
  }

  const parsedAnswers = {};
  test.answers.forEach((el) => (parsedAnswers[el.questionId] = el.answer));

  const result = {
    rightAnswers: 0,
    wrongAnswers: 0,
  };

  test.tests.forEach((el) => {
    if (parsedAnswers[el.questionId]) {
      el.rightAnswer === parsedAnswers[el.questionId]
        ? (result.rightAnswers += 1)
        : (result.wrongAnswers += 1);
    }
  });

  await User.findByIdAndUpdate(userId, { startedTests: clearedStartedTests });
  return result;
};

module.exports = {
  addUser,
  loginUser,
  logOut,
  getUser,
  setRandomTests,
  setAnswer,
  getResult,
  loginUserGoogle,
};

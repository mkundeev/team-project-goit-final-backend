const testsService = require("../db/testsService");
const usersService = require("../db/usersService");

const getTestsList = async (req, res, next) => {
  const tests = await testsService.getTestsList();
  res.status(200).send(tests);
};

const getRandomTests = async (req, res, next) => {
  const tests = await testsService.getRandom(req.params.testId);
  const startedTests = await usersService.setRandomTests(
    req.userId,
    req.params.testId,
    tests
  );
  res.status(200).send(startedTests);
};

const getTestsResult = async (req, res, next) => {
  const result = await testsService.getResult(req.body);
  res.status(200).send(result);
};

const setAnswer = async (req, res, next) => {
  const startedTests = await usersService.setAnswer(req.userId, req.body);
  res.status(200).send(startedTests);
};

module.exports = { getTestsList, getRandomTests, getTestsResult, setAnswer };

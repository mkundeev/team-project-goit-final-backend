const testsService = require("../db/testsService");
const usersService = require("../db/usersService");
const statisticService = require("../db/statisticService");

const getTestsList = async (req, res, next) => {
  const tests = await testsService.getTestsList();
  res.status(200).send(tests);
};

const getRandomTests = async (req, res, next) => {
  const tests = await testsService.getRandom(req.params.testId);
  const { topic } = await testsService.getTest(req.params.testId);

  const startedTests = await usersService.setRandomTests(
    req.userId,
    req.params.testId,
    topic,
    tests
  );
  res.status(200).send(startedTests);
};

const resetTest = async (req, res, next) => {
  console.log(req.body, req.userId);
  const tests = await testsService.getRandom(req.body.testId);
  const startedTests = await usersService.resetTest(
    req.userId,
    req.body.testId,
    tests
  );
  res.status(200).send(startedTests);
};

const getResult = async (req, res, next) => {
  const { result, topic, testId } = await usersService.getResult(
    req.userId,
    req.body
  );
  await statisticService.setUserStatistic(req.userId, result, topic, testId);
  await res.status(200).send(result);
};

const setAnswer = async (req, res, next) => {
  const startedTests = await usersService.setAnswer(req.userId, req.body);
  res.status(200).send(startedTests);
};

module.exports = {
  getTestsList,
  getRandomTests,
  getResult,
  setAnswer,
  resetTest,
};

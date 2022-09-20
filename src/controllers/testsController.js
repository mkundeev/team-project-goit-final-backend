const testsService = require("../db/testsService");

const getTestsList = async (req, res, next) => {
  const tests = await testsService.getTestsList();
  res.status(200).send(tests);
};

const getRandomTests = async (req, res, next) => {
  const tests = await testsService.getRandom(req.params.testType);
  res.status(200).send(tests);
};

const getTestsResult = async (req, res, next) => {
  const result = await testsService.getResult(req.body);
  res.status(200).send(result);
};

module.exports = { getTestsList, getRandomTests, getTestsResult };

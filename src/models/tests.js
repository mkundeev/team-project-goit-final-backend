// const {} = require("http-errors");
const { TestModel } = require("../db/testsSchema");
const { randomNumberArray } = require("../helpers/randomNumberArray");

const getRandom = async (testType) => {
  const response = await TestModel.findOne({ topic: testType });
  const randomTestsIndexes = randomNumberArray(12, response.tests.length);
  const randomTests = randomTestsIndexes.map((el) => response.tests[el]);
  return randomTests;
};

const getResult = async (answers) => {
  const tests = await TestModel.find();
  // let result = {};

  tests.farEach((el) => {});

  // return result;
};

module.exports = { getRandom, getResult };

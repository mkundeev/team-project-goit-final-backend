const { TestModel } = require("./schemas/testsSchema");
const {
  getArrayOfRandomNumbers,
} = require("../helpers/getArrayOfRandomNumbers");
const { InternalServerError } = require("http-errors");

const getTestsList = async () => {
  const testsList = await TestModel.find({}, "_id topic");
  return testsList;
};

const getTest = async (id) => {
  const testsList = await TestModel.findById(id, "topic");
  return testsList;
};

const getRandom = async (testId) => {
  const response = await TestModel.findOne({ _id: testId });

  if (response.tests.length < 12) {
    throw new InternalServerError("Invalid tests length");
  }

  const randomTestsIndexes = getArrayOfRandomNumbers(
    12,
    response.tests.length - 1
  );
  const randomTests = randomTestsIndexes.map((el) => response.tests[el]);
  return randomTests;
};

module.exports = { getTestsList, getTest, getRandom };

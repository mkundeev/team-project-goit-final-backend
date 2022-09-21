const { TestModel } = require("./schemas/testsSchema");
const {
  getArrayOfRandomNumbers,
} = require("../helpers/getArrayOfRandomNumbers");

const getTestsList = async () => {
  const testsList = await TestModel.find({}, "_id topic");
  return testsList;
};

const getRandom = async (testId) => {
  const response = await TestModel.findOne({ _id: testId });
  const randomTestsIndexes = getArrayOfRandomNumbers(
    12,
    response.tests.length - 1
  );
  const randomTests = randomTestsIndexes.map((el) => response.tests[el]);
  return randomTests;
};

const getResult = async (answers) => {
  const response = await TestModel.findById(answers.testId);

  const parsedAnswers = {};
  answers.answers.forEach((el) => (parsedAnswers[el.questionId] = el.answer));

  const result = {
    rightAnswers: 0,
    wrongAnswers: 0,
  };
  response.tests.forEach((el) => {
    if (parsedAnswers[el.questionId]) {
      el.rightAnswer === parsedAnswers[el.questionId]
        ? (result.rightAnswers += 1)
        : (result.wrongAnswers += 1);
    }
  });

  return result;
};

module.exports = { getTestsList, getRandom, getResult };

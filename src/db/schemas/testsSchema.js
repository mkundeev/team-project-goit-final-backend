const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testsSchema = new Schema({
  question: {
    type: String,
    required: [true],
  },
  questionId: {
    type: Number,
    required: [true],
  },
  answers: {
    type: [String],
    required: [true],
  },
  rightAnswer: {
    type: String,
    required: [true],
  },
});

const testSchema = new Schema({
  topic: {
    type: String,
    required: [true],
  },
  tests: {
    type: [testsSchema],
    required: [true],
  },
});

const TestModel = mongoose.model("test", testSchema);

module.exports = { TestModel, testsSchema };

[
  {
    testId: "6329ae438a32a769443212fb",
    topic: "Testing theory",
    rightAnswers: 3,
    wrongAnswers: 9,
    percent: 25,
    createAt: "2022-09-25T19:30:48.452Z",
    _id: "6330ac6808d8dce7292675ca",
  },
  {
    testId: "6329aeaf8a32a769443212fc",
    topic: "QA technical training",
    rightAnswers: 3,
    wrongAnswers: 9,
    percent: 25,
    createAt: "2022-09-25T19:34:54.882Z",
    _id: "6330ad5e08d8dce7292679d2",
  },
  {
    testId: "6329aeaf8a32a769443212fc",
    topic: "QA technical training",
    rightAnswers: 3,
    wrongAnswers: 9,
    percent: 25,
    createAt: "2022-09-26T18:17:42.033Z",
    _id: "6331ecc60ccb645fb2a15f93",
  },
  {
    testId: "6329aeaf8a32a769443212fc",
    topic: "QA technical training",
    rightAnswers: 2,
    wrongAnswers: 10,
    percent: 17,
    createAt: "2022-09-26T19:50:16.986Z",
    _id: "63320279435a7540a10b6d37",
  },
  {
    testId: "6329ae438a32a769443212fb",
    topic: "Testing theory",
    rightAnswers: 2,
    wrongAnswers: 10,
    percent: 17,
    createAt: "2022-09-26T19:50:59.926Z",
    _id: "633202a3435a7540a10b7079",
  },
  {
    testId: "6329ae438a32a769443212fb",
    topic: "Testing theory",
    rightAnswers: 4,
    wrongAnswers: 8,
    percent: 33,
    createAt: "2022-09-26T19:51:33.574Z",
    _id: "633202c5435a7540a10b7463",
  },
  {
    testId: "6329aeaf8a32a769443212fc",
    topic: "QA technical training",
    rightAnswers: 1,
    wrongAnswers: 11,
    percent: 8,
    createAt: "2022-09-29T14:23:51.550Z",
    _id: "6335aa778d7cc1a39b3c8b25",
  },
  {
    testId: "6329aeaf8a32a769443212fc",
    topic: "QA technical training",
    rightAnswers: 1,
    wrongAnswers: 11,
    percent: 8,
    createAt: "2022-10-01T14:48:37.910Z",
    _id: "63385345734030292c44a0ec",
  },
];

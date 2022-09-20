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

module.exports = { TestModel };

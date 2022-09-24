const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { testsSchema } = require("./testsSchema");

const answersSchema = new mongoose.Schema({
  questionId: {
    type: Number,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});

const testResultSchema = new mongoose.Schema({
  testId: {
    type: String,
    required: true,
  },
  rightAnswers: {
    type: Number,
    required: true,
  },
  wrongAnswers: {
    type: Number,
    required: true,
  },
});

const startedTestSchema = new mongoose.Schema({
  testId: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  tests: {
    type: [testsSchema],
    required: true,
  },
  currentIndex: {
    type: Number,
    default: 0,
  },
  answers: {
    type: [answersSchema],
    default: [],
  },
});

const usersSchema = new mongoose.Schema({
  password: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email in use"],
  },
  token: {
    type: String,
    default: null,
  },
  lastTestResult: {
    type: testResultSchema,
    default: null,
  },
  startedTests: {
    type: [startedTestSchema],
    default: [],
  },
});

usersSchema.pre("save", async function () {
  if (this.isNew && this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

const User = mongoose.model("users", usersSchema);

module.exports = {
  User,
};

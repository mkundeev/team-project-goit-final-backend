const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const statisticSchema = new Schema({
  testId: {
    type: String,
    required: true,
  },
  topic: {
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
  percent: {
    type: Number,
    required: true,
  },
  createAt: {
    type: Date,
    required: true,
  },
});
const userStatisticSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  statistic: {
    type: [statisticSchema],
    required: true,
  },
});

const StatisticModel = mongoose.model("statistic", userStatisticSchema);

module.exports = { StatisticModel };

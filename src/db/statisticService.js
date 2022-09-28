const { StatisticModel } = require("./schemas/statisticSchema");

const getUserStatistic = async (userId) => {
  const statistic = await StatisticModel.findOne({ userId });

  if (!statistic) {
    return { statistic: [] };
  }

  return statistic;
};

const setUserStatistic = async (userId, result, topic, testId) => {
  const createAt = new Date();
  const percent = Math.round(
    (result.rightAnswers * 100) / (result.rightAnswers + result.wrongAnswers)
  );
  const statistic = { ...result, topic, testId, createAt, percent };
  const data = await StatisticModel.findOne({ userId });
  if (!data) {
    await StatisticModel.create({ userId, statistic });
  } else {
    await StatisticModel.updateOne(
      { userId },
      { $push: { statistic } },
      { new: true }
    );
  }
};

const deleteTestFromStatistic = async (userId, params) => {
  const parent = await StatisticModel.findOne({ userId });
  parent.statistic.id(params.testId).remove();
  parent.save();
};

module.exports = {
  getUserStatistic,
  setUserStatistic,
  deleteTestFromStatistic,
};

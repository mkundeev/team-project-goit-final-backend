const { StatisticModel } = require("./schemas/statisticSchema");

const getUserStatistic = async (userId) => {
  const statistic = await StatisticModel.findOne({ userId });
  return statistic;
};
const setUserStatistic = async (userId, result, topic, testId) => {
  const createAt = new Date();
  console.log(result);
  const percent = Math.round(
    (result.rightAnswers * 100) / (result.rightAnswers + result.wrongAnswers)
  );
  const statistic = { ...result, topic, testId, createAt, percent };
  const data = await StatisticModel.findOne({ userId });
  if (!data) {
    console.log({ userId, statistic });
    await StatisticModel.create({ userId, statistic });
  } else {
    await StatisticModel.updateOne(
      { userId },
      { $push: { statistic } },
      { new: true }
    );
  }
};

module.exports = {
  getUserStatistic,
  setUserStatistic,
};

const statisticService = require("../db/statisticService");

async function getUserStatistic(req, res) {
  const { statistic } = await statisticService.getUserStatistic(req.userId);
  res.status(200).send(statistic);
}

module.exports = {
  getUserStatistic,
};

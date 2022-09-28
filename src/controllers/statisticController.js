const statisticService = require("../db/statisticService");

async function getUserStatistic(req, res) {
  const { statistic } = await statisticService.getUserStatistic(req.userId);
  res.status(200).send(statistic);
}
async function deleteTestFromStatistic(req, res) {
  await statisticService.deleteTestFromStatistic(req.userId, req.params);
  res.status(200).send({ message: "test was deleted" });
}

module.exports = {
  getUserStatistic,
  deleteTestFromStatistic,
};

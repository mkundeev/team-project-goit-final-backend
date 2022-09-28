const express = require("express");
const {
  getUserStatistic,
  deleteTestFromStatistic,
} = require("../controllers/statisticController");

const { errorHandler } = require("../middlewares/errorHandler");
const { authorize } = require("../middlewares/authorize");

const router = express.Router();

router.get("/", authorize, errorHandler(getUserStatistic));
router.delete("/:testId", authorize, errorHandler(deleteTestFromStatistic));

module.exports = router;

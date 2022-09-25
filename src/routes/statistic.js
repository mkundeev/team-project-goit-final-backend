const express = require("express");
const { getUserStatistic } = require("../controllers/statisticController");

const { errorHandler } = require("../middlewares/errorHandler");
const { authorize } = require("../middlewares/authorize");

const router = express.Router();

router.get("/", authorize, errorHandler(getUserStatistic));

module.exports = router;

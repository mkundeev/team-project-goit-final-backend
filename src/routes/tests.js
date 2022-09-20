const { Router } = require("express");
const { authMW } = require("../middlewares/authMW");
const { validation } = require("../middlewares/validation");
const { errorHandler } = require("../helpers/errorHandler");
const { answersSchema } = require("../models/testsSchema");
const testsService = require("../models/tests");

const testsRouter = Router();

testsRouter.get(
  "/random/:testType",
  authMW,
  errorHandler(async (req, res, next) => {
    const tests = await testsService.getRandom(req.params.testType);
    res.status(200).send(tests);
  })
);

testsRouter.get(
  "/result",
  authMW,
  validation(answersSchema),
  errorHandler(async (req, res, next) => {
    const result = await testsService.getResult(req.body);
    res.status(200).send(result);
  })
);

module.exports = testsRouter;

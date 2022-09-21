const { Router } = require("express");
const { authorize } = require("../middlewares/authorize");
const { validate } = require("../middlewares/validate");
const { errorHandler } = require("../middlewares/errorHandler");
const { answersSchema, answerSchema } = require("../joi/testsSchema");
const {
  getTestsList,
  getRandomTests,
  getTestsResult,
  setAnswer,
} = require("../controllers/testsController");

const testsRouter = Router();

testsRouter.get("/", authorize, errorHandler(getTestsList));

testsRouter.get("/random/:testId", authorize, errorHandler(getRandomTests));

testsRouter.patch(
  "/answer",
  authorize,
  validate(answerSchema),
  errorHandler(setAnswer)
);

testsRouter.post(
  "/result",
  authorize,
  validate(answersSchema),
  errorHandler(getTestsResult)
);

module.exports = testsRouter;

const { Router } = require("express");
const { authorize } = require("../middlewares/authorize");
const { validate } = require("../middlewares/validate");
const { errorHandler } = require("../middlewares/errorHandler");
const { finishTestSchema, answerSchema } = require("../joi/testsSchema");
const {
  getTestsList,
  getRandomTests,
  getResult,
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

testsRouter.patch(
  "/result",
  authorize,
  validate(finishTestSchema),
  errorHandler(getResult)
);

module.exports = testsRouter;

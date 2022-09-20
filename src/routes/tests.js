const { Router } = require("express");
const { authorize } = require("../middlewares/authorize");
const { validation } = require("../middlewares/validate");
const { errorHandler } = require("../middlewares/errorHandler");
const { answersSchema } = require("../joi/testsSchema");
const {
  getTestsList,
  getRandomTests,
  getTestsResult,
} = require("../controllers/testsController");

const testsRouter = Router();

testsRouter.get("/", authorize, errorHandler(getTestsList));

testsRouter.get("/random/:testType", authorize, errorHandler(getRandomTests));

testsRouter.post(
  "/result",
  authorize,
  validation(answersSchema),
  errorHandler(getTestsResult)
);

module.exports = testsRouter;

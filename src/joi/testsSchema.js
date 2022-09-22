const Joi = require("joi");

const finishTestSchema = Joi.object({
  testId: Joi.string().required(),
  questionId: Joi.number().required(),
  answer: Joi.string().required(),
}).required();

const answerSchema = Joi.object({
  testId: Joi.string().required(),
  currentIndex: Joi.number().required(),
  questionId: Joi.number(),
  answer: Joi.string(),
}).required();

module.exports = { finishTestSchema, answerSchema };

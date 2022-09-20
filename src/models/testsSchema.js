const Joi = require("joi");

const answersSchema = Joi.array().items(
  Joi.object({
    questionId: Joi.number().required(),
    answer: Joi.string().required(),
  })
);

module.exports = { answersSchema };

const Joi = require("joi");

const answersSchema = Joi.object({
  testId: Joi.string().required(),
  answers: Joi.array()
    .items(
      Joi.object({
        questionId: Joi.number().required(),
        answer: Joi.string().required(),
      }).required()
    )
    .required(),
}).required();

module.exports = { answersSchema };

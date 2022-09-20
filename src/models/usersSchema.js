const Joi = require("joi");

const userRegistartionValidationSchema = Joi.object({
  password: Joi.string().min(8).max(16).required(),
  email: Joi.string().email().required(),
});

const userAuthorizationValidationSchema = Joi.object({
  password: Joi.string().min(8).max(16).required(),
  email: Joi.string().email().required(),
});

module.exports = {
  userRegistartionValidationSchema,
  userAuthorizationValidationSchema,
};

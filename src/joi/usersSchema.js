const Joi = require("joi");

const userRegistrationValidationSchema = Joi.object({
  password: Joi.string().min(8).max(16).required(),
  email: Joi.string().email().required(),
}).required();

const userAuthorizationValidationSchema = Joi.object({
  password: Joi.string().min(8).max(16).required(),
  email: Joi.string().email().required(),
}).required();

module.exports = {
  userRegistrationValidationSchema,
  userAuthorizationValidationSchema,
};

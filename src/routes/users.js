const express = require("express");
const {
  signUpUser,
  logInUser,
  logOutUser,
  getCurrentUser,
} = require("../controller/usersController");

const { errorHandler } = require("../helpers/errorHandler");

const {
  userRegistartionValidationSchema,
  userAuthorizationValidationSchema,
} = require("../models/usersSchema");
const { validation } = require("../middlewares/validation");
const { authMW } = require("../middlewares/authMW");

const router = express.Router();

router.post(
  "/signup",
  validation(userRegistartionValidationSchema),
  errorHandler(signUpUser)
);

router.post(
  "/login",
  validation(userAuthorizationValidationSchema),
  errorHandler(logInUser)
);

router.post("/logout", authMW, errorHandler(logOutUser));

router.get("/current", authMW, errorHandler(getCurrentUser));

module.exports = router;

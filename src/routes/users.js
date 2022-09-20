const express = require("express");
const {
  signUpUser,
  logInUser,
  logOutUser,
  getCurrentUser,
} = require("../controllers/usersController");

const { errorHandler } = require("../middlewares/errorHandler");
const { validation } = require("../middlewares/validate");
const { authorize } = require("../middlewares/authorize");

const {
  userRegistrationValidationSchema,
  userAuthorizationValidationSchema,
} = require("../joi/usersSchema");

const router = express.Router();

router.post(
  "/signup",
  validation(userRegistrationValidationSchema),
  errorHandler(signUpUser)
);

router.post(
  "/login",
  validation(userAuthorizationValidationSchema),
  errorHandler(logInUser)
);

router.post("/logout", authorize, errorHandler(logOutUser));

router.get("/current", authorize, errorHandler(getCurrentUser));

module.exports = router;

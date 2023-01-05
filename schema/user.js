const joi = require('joi');

// Define validation rules for username and password
const username = joi.string().alphanum().min(1).max(10)
  .required();
const password = joi
  .string()
  .pattern(/^[\S]{6,12}$/)
  .required();

// Define the validation rules for nickname and email
const nickname = joi.string().required();
const userEmail = joi.string().email().required();

// Define the validation rules for the avatar
// dataUri : /src/images
const avatar = joi.string().dataUri().required();

// Define rule objects for validating registration and login form data
exports.regLoginSchema = {
  body: {
    username,
    password,
  },
};

exports.updateUserinfoSchema = {
  body: {
    nickname,
    email: userEmail,
  },
};

exports.update_password_schema = {
  body: {
    oldPwd: password,
    newPwd: joi.not(joi.ref('oldPwd')).concat(password), // new password must be different
  },
};

exports.update_avatar_schema = {
  body: {
    avatar,
  },
};

const express = require('express');
const router = express.Router();
const userInfoHandler = require('../router_handler/userinfo');
const expressjoi = require('@escook/express-joi');
const {
  update_userinfo_schema,
  update_password_schema,
  update_avatar_schema,
} = require('../schema/user');

// Get user info
router.get('/userinfo', userInfoHandler.getUserInfo);

// Update user info
router.post(
  '/userinfo',
  expressjoi(update_userinfo_schema),
  userInfoHandler.updateUserInfo
);

// Reset password
router.post(
  '/updatepwd',
  expressjoi(update_password_schema),
  userInfoHandler.updatePassword
);

// Update user avatar
router.post(
  '/update/avatar',
  expressjoi(update_avatar_schema),
  userInfoHandler.updateAvatar
);

module.exports = router;
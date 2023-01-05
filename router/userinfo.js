const express = require('express');

const router = express.Router();
const expressjoi = require('@escook/express-joi');
const userInfoHandler = require('../router_handler/userinfo');
const {
  updateUserinfoSchema,
  updatePasswordSchema,
  updateAvatarSchema,
} = require('../schema/user');

// Get user info
router.get('/userinfo', userInfoHandler.getUserInfo);

// Update user info
router.post(
  '/userinfo',
  expressjoi(updateUserinfoSchema),
  userInfoHandler.updateUserInfo,
);

// Reset password
router.post(
  '/updatepwd',
  expressjoi(updatePasswordSchema),
  userInfoHandler.updatePassword,
);

// Update user avatar
router.post(
  '/update/avatar',
  expressjoi(updateAvatarSchema),
  userInfoHandler.updateAvatar,
);

module.exports = router;

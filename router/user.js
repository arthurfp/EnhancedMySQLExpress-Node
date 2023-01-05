const express = require('express');

const router = express.Router();
const expressjoi = require('@escook/express-joi');
const userHandler = require('../router_handler/user');
// Middleware for importing validation data
// Import schemas
const {
  regLoginSchema,
} = require('../schema/user');

// Add user
router.post('/reguser', expressjoi(regLoginSchema), userHandler.regUser);

// Login
router.post('/login', expressjoi(regLoginSchema), userHandler.login);

module.exports = router;

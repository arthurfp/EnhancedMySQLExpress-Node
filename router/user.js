const express = require('express');
const router = express.Router();
const userHandler = require('../router_handler/user');
// Middleware for importing validation data
const expressjoi = require('@escook/express-joi');
// Import schemas
const {
    reg_login_schema
} = require('../schema/user');

// Add user
router.post('/reguser', expressjoi(reg_login_schema), userHandler.regUser);

// Login
router.post('/login', expressjoi(reg_login_schema), userHandler.login);

module.exports = router;
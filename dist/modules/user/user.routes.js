"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const router = (0, express_1.Router)();
const userController = new user_controller_1.UserController();
router.post('/register', (req, res, next) => userController.register(req, res, next));
router.post('/login', (req, res, next) => userController.login(req, res, next));
exports.default = router;

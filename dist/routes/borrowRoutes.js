"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const borrowController_1 = require("../controllers/borrowController");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.post('/borrow', auth_1.authenticateJWT, borrowController_1.borrowBook);
router.post('/return', auth_1.authenticateJWT, borrowController_1.returnBook);
exports.default = router;

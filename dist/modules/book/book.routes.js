"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_controller_1 = require("./book.controller");
const auth_1 = require("../../middlewares/auth");
const router = (0, express_1.Router)();
const bookController = new book_controller_1.BookController();
router.get('/', (req, res, next) => bookController.getAvailableBooks(req, res, next)); // Public route
router.post('/', auth_1.authenticateJWT, auth_1.authorizeAdmin, (req, res, next) => bookController.createBook(req, res, next)); // Admin only
router.put('/:id', auth_1.authenticateJWT, auth_1.authorizeAdmin, (req, res, next) => bookController.updateBook(req, res, next)); // Admin only
router.delete('/:id', auth_1.authenticateJWT, auth_1.authorizeAdmin, (req, res, next) => bookController.deleteBook(req, res, next)); // Admin only
exports.default = router;

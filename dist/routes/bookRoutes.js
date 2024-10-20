"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookController_1 = require("../controllers/bookController");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.get('/', bookController_1.getBooks); // List all books
router.get('/:id', bookController_1.getBookById); // View a book by ID
// Admin routes for managing books (protected)
router.post('/', auth_1.authenticateJWT, auth_1.authorizeAdmin, bookController_1.createBook); // Create a new book (admin)
router.put('/:id', auth_1.authenticateJWT, auth_1.authorizeAdmin, bookController_1.updateBook); // Update a book (admin)
router.delete('/:id', auth_1.authenticateJWT, auth_1.authorizeAdmin, bookController_1.deleteBook); // Delete a book (admin)
exports.default = router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorrowController = void 0;
const borrow_service_1 = require("./borrow.service");
const borrow_dto_1 = require("./borrow.dto");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const customError_1 = require("../../utils/customError");
class BorrowController {
    constructor() {
        this.borrowService = new borrow_service_1.BorrowService();
    }
    async borrowBook(req, res, next) {
        const borrowData = (0, class_transformer_1.plainToInstance)(borrow_dto_1.BorrowBookDTO, req.body);
        const errors = await (0, class_validator_1.validate)(borrowData);
        if (errors.length > 0) {
            const validationMessages = errors.map(err => Object.values(err.constraints)).join(', ');
            return next(new customError_1.CustomError(`Validation failed: ${validationMessages}`, 400));
        }
        try {
            const borrow = await this.borrowService.borrowBook(req.user.id, borrowData);
            res.status(201).json({ message: 'Book borrowed successfully', borrow });
        }
        catch (error) {
            next(error);
        }
    }
    async returnBook(req, res, next) {
        const returnData = (0, class_transformer_1.plainToInstance)(borrow_dto_1.ReturnBookDTO, req.body);
        const errors = await (0, class_validator_1.validate)(returnData);
        if (errors.length > 0) {
            const validationMessages = errors.map(err => Object.values(err.constraints)).join(', ');
            return next(new customError_1.CustomError(`Validation failed: ${validationMessages}`, 400));
        }
        try {
            const borrow = await this.borrowService.returnBook(returnData);
            res.status(200).json({ message: 'Book returned successfully', borrow });
        }
        catch (error) {
            next(error);
        }
    }
    async getBorrowHistory(req, res, next) {
        try {
            const history = await this.borrowService.getBorrowHistory(req.user.id);
            res.status(200).json(history);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.BorrowController = BorrowController;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorrowHistoryDTO = exports.ReturnBookDTO = exports.BorrowBookDTO = void 0;
const class_validator_1 = require("class-validator");
class BorrowBookDTO {
}
exports.BorrowBookDTO = BorrowBookDTO;
__decorate([
    (0, class_validator_1.IsInt)({ message: 'Book ID must be a valid integer' }),
    __metadata("design:type", Number)
], BorrowBookDTO.prototype, "bookId", void 0);
class ReturnBookDTO {
}
exports.ReturnBookDTO = ReturnBookDTO;
__decorate([
    (0, class_validator_1.IsInt)({ message: 'Borrow ID must be a valid integer' }),
    __metadata("design:type", Number)
], ReturnBookDTO.prototype, "borrowId", void 0);
class BorrowHistoryDTO {
}
exports.BorrowHistoryDTO = BorrowHistoryDTO;
__decorate([
    (0, class_validator_1.IsDateString)({}, { message: 'Return date must be a valid date' }),
    __metadata("design:type", String)
], BorrowHistoryDTO.prototype, "returnDate", void 0);

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
exports.UpdateBookDTO = exports.CreateBookDTO = void 0;
const class_validator_1 = require("class-validator");
class CreateBookDTO {
}
exports.CreateBookDTO = CreateBookDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBookDTO.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBookDTO.prototype, "author", void 0);
__decorate([
    (0, class_validator_1.IsDateString)({}, { message: 'Published date must be a valid date (YYYY-MM-DD).' }),
    __metadata("design:type", String)
], CreateBookDTO.prototype, "publishedDate", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1, { message: 'Stock must be at least 1.' }),
    __metadata("design:type", Number)
], CreateBookDTO.prototype, "stock", void 0);
class UpdateBookDTO {
}
exports.UpdateBookDTO = UpdateBookDTO;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBookDTO.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBookDTO.prototype, "author", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({}, { message: 'Published date must be a valid date (YYYY-MM-DD).' }),
    __metadata("design:type", String)
], UpdateBookDTO.prototype, "publishedDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1, { message: 'Stock must be at least 1.' }),
    __metadata("design:type", Number)
], UpdateBookDTO.prototype, "stock", void 0);

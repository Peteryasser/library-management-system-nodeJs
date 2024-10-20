"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("./user.service");
const user_dto_1 = require("./user.dto");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const customError_1 = require("../../utils/customError");
class UserController {
    constructor() {
        this.userService = new user_service_1.UserService();
    }
    async register(req, res, next) {
        const userData = (0, class_transformer_1.plainToInstance)(user_dto_1.CreateUserDTO, req.body); // Transform request body to DTO
        const errors = await (0, class_validator_1.validate)(userData); // Validate DTO
        if (errors.length > 0) {
            const validationMessages = errors.map(err => Object.values(err.constraints)).join(', ');
            return next(new customError_1.CustomError(`Validation failed: ${validationMessages}`, 400));
        }
        try {
            const user = await this.userService.registerUser(userData);
            const returnedUser = {
                name: user.name,
                email: user.email,
                role: user.role
            };
            res.status(201).json({ message: 'User registered successfully', returnedUser });
        }
        catch (error) {
            next(error); // Pass error to the centralized error handler
        }
    }
    async login(req, res, next) {
        const loginData = (0, class_transformer_1.plainToInstance)(user_dto_1.LoginUserDTO, req.body);
        const errors = await (0, class_validator_1.validate)(loginData);
        if (errors.length > 0) {
            const validationMessages = errors.map(err => Object.values(err.constraints)).join(', ');
            return next(new customError_1.CustomError(`Validation failed: ${validationMessages}`, 400));
        }
        try {
            const token = await this.userService.loginUser(loginData);
            res.status(200).json({ token });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.UserController = UserController;

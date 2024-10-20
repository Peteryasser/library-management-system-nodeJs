"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_repository_1 = require("./user.repository");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const customError_1 = require("../../utils/customError");
const jwt_1 = require("../../utils/jwt");
class UserService {
    constructor() {
        this.userRepository = new user_repository_1.UserRepository();
    }
    async registerUser(userData) {
        const hashedPassword = await bcryptjs_1.default.hash(userData.password, 10);
        const role = userData.role || 'user';
        try {
            return this.userRepository.createUser({ ...userData, password: hashedPassword, role });
        }
        catch (error) {
            throw new customError_1.CustomError('An unexpected error occurred while registering the user.', 500);
        }
    }
    async loginUser(credentials) {
        const user = await this.userRepository.findByEmail(credentials.email);
        if (!user || !(await bcryptjs_1.default.compare(credentials.password, user.password))) {
            throw new customError_1.CustomError('Invalid credentials', 401);
        }
        return (0, jwt_1.generateToken)(user.id, user.role);
    }
}
exports.UserService = UserService;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const data_source_1 = require("../../data-source");
const User_1 = require("../../entities/User");
class UserRepository {
    constructor() {
        this.repository = data_source_1.AppDataSource.getRepository(User_1.User);
    }
    async createUser(userData) {
        const user = this.repository.create(userData);
        return await this.repository.save(user);
    }
    async findByEmail(email) {
        return await this.repository.findOneBy({ email });
    }
}
exports.UserRepository = UserRepository;

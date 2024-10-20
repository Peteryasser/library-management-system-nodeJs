"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const data_source_1 = require("./data-source");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const bookRoutes_1 = __importDefault(require("./routes/bookRoutes"));
const borrowRoutes_1 = __importDefault(require("./routes/borrowRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
// Initialize the express app
const app = (0, express_1.default)();
// Middleware to parse incoming JSON
app.use(express_1.default.json());
// Setup routes
app.use('/api/users', userRoutes_1.default);
app.use('/api/books', bookRoutes_1.default);
app.use('/api/borrows', borrowRoutes_1.default);
// Initialize the database
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log('Data Source has been initialized');
    app.listen(process.env.PORT, () => {
        console.log('Server is running on port ' + process.env.PORT);
    });
})
    .catch((err) => {
    console.error('Error during Data Source initialization', err);
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
require("reflect-metadata");
const database_1 = __importDefault(require("./utils/database"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app")); // Import the Express app
const PORT = process.env.PORT || 5000;
database_1.default.initialize()
    .then(() => {
    console.log('Data Source has been initialized!');
    app_1.default.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
    .catch((err) => {
    console.error('Error during Data Source initialization:', err);
});

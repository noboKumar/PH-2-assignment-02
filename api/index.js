"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../src/app"));
const db_1 = __importDefault(require("../src/config/db"));
let dbInitialized = false;
const handler = async (req, res) => {
    if (!dbInitialized) {
        try {
            await (0, db_1.default)();
            dbInitialized = true;
        }
        catch (error) {
            console.log("db initialized failed", error);
        }
    }
    return (0, app_1.default)(req, res);
};
exports.default = handler;
//# sourceMappingURL=index.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConfig = void 0;
const error_1 = require("./error");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const constant_1 = require("./constant");
class AppConfig {
    constructor(app) {
        this.app = app;
    }
    loadAppLevelErrorConfig() {
        this.app.use((req, res, next) => {
            const error = new error_1.Error(constant_1.SERVER_OK_HTTP_CODE, req.path + " " + constant_1.NOT_FOUND_MESSAGE);
            res.status(error.statusCode || constant_1.SERVER_INTERNAL_ERROR_HTTP_CODE);
            res.json({ status: error.statusCode || constant_1.SERVER_INTERNAL_ERROR_HTTP_CODE, message: error.message });
        });
    }
    loadAppLevelConfig() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
    }
}
exports.AppConfig = AppConfig;

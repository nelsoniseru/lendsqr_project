"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const transaction_controller_1 = require("./transaction/transaction.controller");
const user_controller_1 = require("./user/user.controller");
const config_1 = require("./config");
class App {
    constructor() {
        this.app = (0, express_1.default)();
    }
    appConfig() {
        new config_1.AppConfig(this.app).loadAppLevelConfig();
    }
    errorConfig() {
        new config_1.AppConfig(this.app).loadAppLevelErrorConfig();
    }
    /* Including wallet Route  */
    includeRoutes() {
        new transaction_controller_1.Transaction(this.app).transactionConfig();
        new user_controller_1.User(this.app).userConfig();
    }
    /* Including app Routes ends */
    startTheServer() {
        this.appConfig();
        this.includeRoutes();
        this.errorConfig();
        const port = process.env.PORT || 4000;
        this.app.listen(port, () => {
            console.log(`Listening on http://localhost:${port}`);
        });
    }
}
exports.App = App;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const user_service_1 = require("../user/user.service");
class User {
    constructor(app) {
        this.service = new user_service_1.userService();
        this.app = app;
    }
    userController() {
        this.app.post("/api/v1/register", this.service.registerService);
        this.app.post("/api/v1/login", this.service.loginService);
    }
    userConfig() {
        this.userController();
    }
}
exports.User = User;

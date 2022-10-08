"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const transaction_service_1 = require("./transaction.service");
const jwt_helper_1 = require("../middleware/jwt_helper");
class Transaction {
    constructor(app) {
        this.service = new transaction_service_1.transactionService();
        this.app = app;
        this.auth = jwt_helper_1.authorized;
    }
    transactionController() {
        this.app.post("/api/v1/fund-account", this.auth, this.service.fundAccountService);
        this.app.post("/api/v1/transfer", this.auth, this.service.transferService);
        this.app.post("/api/v1/withdraw", this.auth, this.service.withdrawService);
    }
    transactionConfig() {
        this.transactionController();
    }
}
exports.Transaction = Transaction;

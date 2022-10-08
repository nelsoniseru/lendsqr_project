"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionService = void 0;
const constant_1 = require("../constant");
const transaction_module_1 = __importDefault(require("./transaction.module"));
var module = new transaction_module_1.default();
class transactionService {
    fundAccountService(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { amount } = req.body;
                var id = res.locals.user.id;
                var result = yield module.fundAccountModule(id, amount);
                if (result == 1) {
                    let transac = yield module.transactionModule(id, amount, 'Credit');
                    if (transac.length > 0)
                        return res.status(constant_1.SERVER_OK_HTTP_CODE).json({ message: `transaction successful` });
                }
                if (result !== 1)
                    return res.status(constant_1.SERVER_BAD_REQUEST_ERROR_HTTP_CODE).json({ message: `opps something went wrong` });
            }
            catch (error) {
                return res.status(constant_1.SERVER_BAD_REQUEST_ERROR_HTTP_CODE).json({ message: `opps something went wrong` });
            }
        });
    }
    transferService(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { amount, email } = req.body;
                var id = res.locals.user.id;
                const to = yield module.emailModule(email);
                const from = yield module.idModule(id);
                if (to.length == 0)
                    return res.status(constant_1.SERVER_BAD_REQUEST_ERROR_HTTP_CODE).json({ message: `${email} account does not exist` });
                if (from[0].wallet_balance < amount)
                    return res.status(constant_1.SERVER_BAD_REQUEST_ERROR_HTTP_CODE).json({ message: `your balance is lower than your amount` });
                var from_amt = from[0].wallet_balance;
                var to_amt = to[0].wallet_balance;
                let transfer_from = yield module.transferFromUserModule(id, from_amt, amount);
                if (transfer_from == 1) {
                    let transfer_to = yield module.transferToUserModule(to_amt, email, amount);
                    yield module.transactionModule(to[0].id, amount, "Credit");
                    yield module.transactionModule(from[0].id, amount, "Debit");
                    if (transfer_to == 1)
                        return res.status(constant_1.SERVER_OK_HTTP_CODE).json({ message: `transaction successful` });
                    if (transfer_to !== 1)
                        return res.status(constant_1.SERVER_BAD_REQUEST_ERROR_HTTP_CODE).json({ message: constant_1.SERVER_ERROR_MSG });
                }
                if (transfer_from !== 1)
                    return res.status(constant_1.SERVER_BAD_REQUEST_ERROR_HTTP_CODE).json({ message: constant_1.SERVER_ERROR_MSG });
            }
            catch (error) {
                res.status(constant_1.SERVER_BAD_REQUEST_ERROR_HTTP_CODE).json({ message: constant_1.SERVER_ERROR_MSG });
            }
        });
    }
    withdrawService(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { amount } = req.body;
                var id = res.locals.user.id;
                const user = yield module.idModule(id);
                if (user[0].wallet_balance < amount)
                    return res.status(constant_1.SERVER_BAD_REQUEST_ERROR_HTTP_CODE).json({ message: `your balance is lower than your amount` });
                var amt = user[0].wallet_balance - Number(amount);
                var result = yield module.withdrawModule(id, amt);
                if (result == 1) {
                    yield module.transactionModule(user[0].id, amount, "Debit");
                    return res.status(constant_1.SERVER_OK_HTTP_CODE).json({ message: `withdrawal successful` });
                }
                if (result !== 1)
                    return res.status(constant_1.SERVER_BAD_REQUEST_ERROR_HTTP_CODE).json({ message: constant_1.SERVER_ERROR_MSG });
            }
            catch (error) {
                res.status(constant_1.SERVER_BAD_REQUEST_ERROR_HTTP_CODE).json({ message: constant_1.SERVER_ERROR_MSG });
            }
        });
    }
}
exports.transactionService = transactionService;

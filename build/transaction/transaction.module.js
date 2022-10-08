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
Object.defineProperty(exports, "__esModule", { value: true });
const knexfile_conig_1 = require("../database/knexfile.conig");
const User = () => (0, knexfile_conig_1.connection)('users');
const Transaction = () => (0, knexfile_conig_1.connection)('transaction');
class Module {
    fundAccountModule(id, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            const userAccount = yield User().where('id', id);
            var amt = userAccount[0].wallet_balance + Number(amount);
            return yield User().update({ wallet_balance: amt }).where({ id });
        });
    }
    transactionModule(id, amount, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const userAccount = yield User().where('id', id);
            return yield Transaction().insert({
                email: userAccount[0].email,
                status,
                amount,
                user_id: userAccount[0].id,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            });
        });
    }
    transferFromUserModule(id, from_amt, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            from_amt = from_amt - Number(amount);
            return yield User().update({ wallet_balance: from_amt }).where({ id });
        });
    }
    transferToUserModule(to_amt, email, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            to_amt = to_amt + Number(amount);
            return yield User().update({ wallet_balance: to_amt }).where({ email });
        });
    }
    emailModule(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User().where('email', email);
        });
    }
    idModule(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User().where('id', id);
        });
    }
    withdrawModule(id, amt) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User().update({ wallet_balance: amt }).where({ id });
        });
    }
}
exports.default = Module;

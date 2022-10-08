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
exports.encryptpass = exports.comparePass = exports.createUser = exports.findExistingUser = void 0;
const knexfile_conig_1 = require("../../database/knexfile.conig");
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 10;
const User = () => (0, knexfile_conig_1.connection)('users');
function findExistingUser(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield User().where('email', email);
        return existingUser;
    });
}
exports.findExistingUser = findExistingUser;
function createUser(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = yield User().insert({ email: payload.email, password: payload.password, created_at: new Date().toISOString(), updated_at: new Date().toISOString() });
        return user;
    });
}
exports.createUser = createUser;
function comparePass(someOtherPlaintextPassword, hash) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compareSync(someOtherPlaintextPassword, hash);
    });
}
exports.comparePass = comparePass;
;
function encryptpass(myPlaintextPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.hash(myPlaintextPassword, saltRounds);
    });
}
exports.encryptpass = encryptpass;
;

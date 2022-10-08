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
exports.userService = void 0;
const constant_1 = require("../utils/constant");
const jwt_helper_1 = require("../middleware/jwt_helper");
const encryptpassword_1 = __importDefault(require("../middleware/encryptpassword"));
const passwordCompare_1 = __importDefault(require("../middleware/passwordCompare"));
const user_module_1 = __importDefault(require("./user.module"));
var module = new user_module_1.default();
class userService {
    registerService(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email && password)
                    return res.status(constant_1.SERVER_BAD_REQUEST_ERROR_HTTP_CODE).json({ message: `${constant_1.FIELD_ERROR_MSG}` });
                const existingEmail = yield module.emailModule(email);
                if (existingEmail.length > 0)
                    return res.status(constant_1.SERVER_BAD_REQUEST_ERROR_HTTP_CODE).json({ message: `${email} ${constant_1.EMAIL_EXIST}` });
                const hashpass = yield (0, encryptpassword_1.default)(password);
                const insertedRows = yield module.createUser(req.body, hashpass);
                if (insertedRows)
                    return res.status(constant_1.SERVER_OK_HTTP_CODE).json({ message: `${email} ${constant_1.CREATE_ACCT_MSG}` });
            }
            catch (error) {
                res.status(constant_1.SERVER_BAD_REQUEST_ERROR_HTTP_CODE).json({ statuscode: constant_1.SERVER_BAD_REQUEST_ERROR_HTTP_CODE, message: constant_1.SERVER_ERROR_MSG });
            }
        });
    }
    loginService(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const existingEmail = yield module.emailModule(email);
                var hash = existingEmail[0].password;
                var comparePassword = yield (0, passwordCompare_1.default)(password, hash);
                if (existingEmail.length == 0 || comparePassword == false)
                    return res.status(constant_1.SERVER_BAD_REQUEST_ERROR_HTTP_CODE).json({ message: constant_1.INVALID_LOGIN_MSG });
                if (comparePassword == true) {
                    var id = existingEmail[0].id;
                    var token = yield (0, jwt_helper_1.accessToken)(id);
                    return res.status(constant_1.SERVER_OK_HTTP_CODE).json({ token });
                }
            }
            catch (error) {
                return res.status(constant_1.SERVER_BAD_REQUEST_ERROR_HTTP_CODE).json({ message: constant_1.INVALID_LOGIN_MSG });
            }
        });
    }
}
exports.userService = userService;

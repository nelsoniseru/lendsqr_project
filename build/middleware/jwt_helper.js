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
exports.accessToken = exports.authorized = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { sign, verify } = jsonwebtoken_1.default;
const default_1 = __importDefault(require("../default"));
function authorized(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.headers['authorization'])
            return res.status(401).json({ "msg": "unauthorized" });
        const header = req.headers['authorization'];
        const bearerToken = header.split(' ');
        const token = bearerToken[1];
        var secret = default_1.default.secret;
        verify(token, secret, (err, payload) => {
            if (err) {
                const msg = err.name === "JsonWebTokenError" ? 'unauthorized' : err.message;
                return res.status(401).json({ msg });
            }
            res.locals.user = payload;
            next();
        });
    });
}
exports.authorized = authorized;
function accessToken(id) {
    return __awaiter(this, void 0, void 0, function* () {
        var secret = default_1.default.secret;
        var exp = default_1.default.exp;
        const token = sign({ id }, secret, {
            expiresIn: exp
        });
        return token;
    });
}
exports.accessToken = accessToken;

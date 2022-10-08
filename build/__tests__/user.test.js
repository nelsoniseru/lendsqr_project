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
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
const jwt_helper_1 = require("../middleware/jwt_helper");
const user_service_1 = require("./service/user.service");
const userInput = {
    id: 1,
    email: "nelsoniseru08@gmail.com",
    password: "nelsoniseru@2022"
};
const userInput2 = {
    id: 2,
    email: "nelsoniseru02@gmail.com",
    password: "nelsoniseru@2022"
};
// beforeEach(async()=>{
//    await connection('users').del()
// })
describe('user register', () => {
    describe("given the email and password are valid", () => {
        it('should return the user payload ', () => __awaiter(void 0, void 0, void 0, function* () {
            (0, supertest_1.default)(app)
                .post("/api/auth/register")
                .send(userInput)
                .expect(200);
        }));
    });
    describe("if the email already exist", () => {
        it('should return a 422', () => __awaiter(void 0, void 0, void 0, function* () {
            let emailExist = yield (0, user_service_1.findExistingUser)(userInput.email);
            (0, supertest_1.default)(app)
                .post("/api/auth/register")
                .expect(422);
        }));
    });
    describe("create user", () => {
        describe("given the email and password are valid", () => {
            it('should return a signed accessToken', () => __awaiter(void 0, void 0, void 0, function* () {
                var hash = yield (0, user_service_1.encryptpass)(userInput['password']);
                userInput['password'] = hash;
                let user = yield (0, user_service_1.createUser)(userInput);
                (0, supertest_1.default)(app)
                    .post("/api/v1/register")
                    .send(user)
                    .expect(200);
            }));
        });
    });
});
describe('user login', () => {
    describe("given the email and password are valid", () => {
        it('should return the user payload ', () => __awaiter(void 0, void 0, void 0, function* () {
            (0, supertest_1.default)(app)
                .post("/api/v1/login")
                .send(userInput)
                .expect(200);
        }));
    });
    describe("given that the email invalid", () => {
        it('should return a 400', () => __awaiter(void 0, void 0, void 0, function* () {
            let user = yield (0, user_service_1.findExistingUser)(userInput2.email);
            (0, supertest_1.default)(app)
                .post("/api/v1/login")
                .send(userInput)
                .expect(400);
        }));
    });
    describe("given that the password does not match", () => {
        it('should return a 400 ', () => __awaiter(void 0, void 0, void 0, function* () {
            let user = yield (0, user_service_1.findExistingUser)(userInput.email);
            yield (0, user_service_1.comparePass)("nelsoniser", user[0].password);
            (0, supertest_1.default)(app)
                .post("/api/v1/login")
                .expect(400);
        }));
    });
    describe("login user", () => {
        describe("given the email and password are valid", () => {
            it('should return a signed accessToken and login the user', () => __awaiter(void 0, void 0, void 0, function* () {
                let id = userInput['id'];
                let jwt = yield (0, jwt_helper_1.accessToken)(id);
                (0, supertest_1.default)(app)
                    .post("/api/v1/login")
                    .set('Authorization', `Bearer ${jwt}`)
                    .send(userInput)
                    .expect(200);
            }));
        });
    });
});

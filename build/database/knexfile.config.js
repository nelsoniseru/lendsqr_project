"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const knex_1 = __importDefault(require("knex"));
const default_1 = __importDefault(require("../utils/default"));
var connection = (0, knex_1.default)({
    client: default_1.default.client,
    connection: {
        database: default_1.default.database,
        user: default_1.default.user,
        password: default_1.default.password,
        port: default_1.default.port
    },
    useNullAsDefault: true
});
exports.connection = connection;

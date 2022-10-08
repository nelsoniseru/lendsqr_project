"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const knex_1 = __importDefault(require("knex"));
var connection = (0, knex_1.default)({
    client: 'mysql',
    connection: {
        database: 'lendsqr',
        user: 'root',
        password: '',
        port: 3306
    },
    useNullAsDefault: true
});
exports.connection = connection;

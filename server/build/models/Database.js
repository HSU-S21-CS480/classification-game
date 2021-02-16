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
const sqlite_1 = require("sqlite");
const sqlite3_1 = __importDefault(require("sqlite3"));
const QuestionDb_1 = __importDefault(require("./QuestionDb"));
class Database {
    constructor(connection_string) {
        this.Questions = null;
        this.init(connection_string);
    }
    init(connection_string) {
        return __awaiter(this, void 0, void 0, function* () {
            this._db = yield sqlite_1.open({
                filename: connection_string,
                driver: sqlite3_1.default.Database
            });
            this.Questions = new QuestionDb_1.default(this._db);
        });
    }
}
exports.default = Database;
//# sourceMappingURL=Database.js.map
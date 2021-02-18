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
const Database_1 = __importDefault(require("../models/Database"));
//define all routes
const question = (router) => {
    router.get('/question', getQuestion);
    router.post('/question/:id', postQuestion);
};
const db = new Database_1.default('../data/QuestionDb.db');
//returns a random question
const getQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const keys = yield ((_a = db.Questions) === null || _a === void 0 ? void 0 : _a.getKeys());
    const key_index = Math.floor(Math.random() * keys.length);
    const data = yield ((_b = db.Questions) === null || _b === void 0 ? void 0 : _b.get(key_index));
    res.json({ data });
});
const postQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const model = req.body;
    //TODO: save response to DB
    res.json({ model });
});
exports.default = question;
//# sourceMappingURL=question.js.map
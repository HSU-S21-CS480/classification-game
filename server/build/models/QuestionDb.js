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
class QuestionDb {
    constructor(db) {
        this._db = db;
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT 
                        q.*, 
                        GROUP_CONCAT(qc.choice, ':') AS choices, 
                        GROUP_CONCAT(qc.sort_order, ':') AS sort_order 
                    FROM Questions q
                    INNER JOIN QuestionChoices qc on q.choice_group = qc.group_id
                    WHERE q.id = :id`;
            const params = { ':id': id };
            const result = yield this._db.all(sql, params);
        });
    }
}
exports.default = QuestionDb;
//# sourceMappingURL=QuestionDb.js.map
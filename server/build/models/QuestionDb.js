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
exports.QuestionDb = void 0;
class QuestionDb {
    constructor(db) {
        this._db = db;
    }
    getKeys() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT id FROM Questions";
            const result = yield this._db.all(sql);
            return result;
        });
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
            const result = yield this._db.get(sql, params);
            let model = {
                id: result['id'],
                questionHeader: result['header'],
                questionDescription: result['description'],
                userChoices: {}
            };
            const choices_array = result["choices"].split(":");
            const choices_order = result["sort_order"].split(":");
            const choices_obj = {};
            for (let i = 0; i < choices_order.length; i++) {
                choices_obj[choices_order[i]] = choices_array[i];
            }
            const choices = Object.keys(choices_obj).sort().reduce((obj, key) => {
                obj[key] = choices_obj[key];
                return obj;
            }, {});
            model.userChoices = choices;
            return model;
        });
    }
}
exports.QuestionDb = QuestionDb;
exports.default = QuestionDb;
//# sourceMappingURL=QuestionDb.js.map
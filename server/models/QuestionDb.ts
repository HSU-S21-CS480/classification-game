import { Database } from "sqlite3";

interface QuestionModel {
    id: number,
    questionHeader: string,
    questionDescription: string,
    userResponse?: boolean,
    userChoices: {}
}

class QuestionDb {
    private _db;
    constructor(db) {
        this._db = db;
    }

    async getKeys() {
        const sql = "SELECT id FROM Questions";
        const result = await this._db.all(sql);
        return result;
    }

    async get(id: number) {
        const sql = `SELECT 
                        q.*, 
                        GROUP_CONCAT(qc.choice, ':') AS choices, 
                        GROUP_CONCAT(qc.sort_order, ':') AS sort_order 
                    FROM Questions q
                    INNER JOIN QuestionChoices qc on q.choice_group = qc.group_id
                    WHERE q.id = :id`;
        const params = { ':id': id };
        const result = await this._db.get(sql, params);
        let model: QuestionModel = {
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
        const choices = Object.keys(choices_obj).sort().reduce(
            (obj, key) => {
                obj[key] = choices_obj[key];
                return obj;
            },
            {}
        );
        model.userChoices = choices;

        return model;
    }
}

export default QuestionDb;
export { QuestionDb, QuestionModel }